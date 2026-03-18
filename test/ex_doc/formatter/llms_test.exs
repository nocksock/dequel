defmodule ExDoc.Formatter.LLMSTest do
  # Not async — formatter writes to a fixed path (llms.txt in CWD)
  use ExUnit.Case, async: false

  alias ExDoc.Formatter.LLMS

  @output_file "llms.txt"

  setup do
    on_exit(fn -> File.rm(@output_file) end)
    :ok
  end

  # ExDoc is only: :dev, so its structs aren't available in test.
  # We build plain maps matching the struct shapes that the formatter reads.

  defp config(overrides \\ []) do
    Map.merge(
      %{project: "TestProject", version: "1.0.0"},
      Map.new(overrides)
    )
  end

  defp module_node(attrs) do
    Map.merge(
      %{id: "TestModule", title: "TestModule", doc: nil, docs: [], typespecs: [], type: :module},
      Map.new(attrs)
    )
  end

  defp function_node(attrs) do
    Map.merge(
      %{
        id: "test_fun/1",
        name: :test_fun,
        arity: 1,
        signature: "test_fun(arg)",
        type: :function,
        doc: nil
      },
      Map.new(attrs)
    )
  end

  defp type_node(attrs) do
    Map.merge(
      %{
        id: "t:my_type/0",
        name: :my_type,
        arity: 0,
        signature: "my_type()",
        type: :type,
        doc: nil
      },
      Map.new(attrs)
    )
  end

  defp read_output do
    File.read!(@output_file)
  end

  describe "run/3" do
    test "creates llms.txt in the project root" do
      result = LLMS.run([], [], config())
      assert result == "llms.txt"
      assert File.exists?(@output_file)
    end

    test "includes project header with version" do
      LLMS.run([], [], config())
      assert read_output() =~ "# TestProject v1.0.0"
    end

    test "includes project header without version when nil" do
      LLMS.run([], [], config(version: nil))
      content = read_output()
      assert content =~ "# TestProject\n"
      refute content =~ " v"
    end

    test "lists modules sorted alphabetically" do
      modules = [
        module_node(id: "Zeta", title: "Zeta"),
        module_node(id: "Alpha", title: "Alpha"),
        module_node(id: "Mid", title: "Mid")
      ]

      LLMS.run(modules, [], config())
      content = read_output()

      alpha_pos = :binary.match(content, "## Alpha") |> elem(0)
      mid_pos = :binary.match(content, "## Mid") |> elem(0)
      zeta_pos = :binary.match(content, "## Zeta") |> elem(0)

      assert alpha_pos < mid_pos
      assert mid_pos < zeta_pos
    end

    test "includes module documentation from string" do
      modules = [
        module_node(
          id: "MyMod",
          title: "MyMod",
          doc: "This module does important things. It has many features."
        )
      ]

      LLMS.run(modules, [], config())
      assert read_output() =~ "This module does important things."
    end

    test "includes function signatures and first-paragraph docs" do
      modules = [
        module_node(
          id: "MyMod",
          title: "MyMod",
          docs: [
            function_node(
              signature: "parse(query)",
              doc:
                "Parses a query string. Returns an AST tuple.\n\nSecond paragraph with details."
            )
          ]
        )
      ]

      LLMS.run(modules, [], config())
      content = read_output()
      assert content =~ "- `parse(query)` - Parses a query string. Returns an AST tuple."
      refute content =~ "Second paragraph"
    end

    test "skips undocumented functions" do
      modules = [
        module_node(
          id: "MyMod",
          title: "MyMod",
          docs: [
            function_node(signature: "documented(x)", doc: "Has docs."),
            function_node(id: "hidden/0", name: :hidden, signature: "hidden()", doc: nil)
          ]
        )
      ]

      LLMS.run(modules, [], config())
      content = read_output()
      assert content =~ "documented(x)"
      refute content =~ "hidden()"
    end

    test "separates functions, macros, and callbacks" do
      modules = [
        module_node(
          id: "MyMod",
          title: "MyMod",
          docs: [
            function_node(
              signature: "my_fun(a)",
              type: :function,
              doc: "A function."
            ),
            function_node(
              id: "my_macro/1",
              name: :my_macro,
              signature: "my_macro(a)",
              type: :macro,
              doc: "A macro."
            ),
            function_node(
              id: "my_callback/1",
              name: :my_callback,
              signature: "my_callback(a)",
              type: :callback,
              doc: "A callback."
            )
          ]
        )
      ]

      LLMS.run(modules, [], config())
      content = read_output()
      assert content =~ "### Functions"
      assert content =~ "### Macros"
      assert content =~ "### Callbacks"
    end

    test "includes documented types" do
      modules = [
        module_node(
          id: "MyMod",
          title: "MyMod",
          typespecs: [
            type_node(
              signature: "t()",
              doc: "The main type."
            )
          ]
        )
      ]

      LLMS.run(modules, [], config())
      content = read_output()
      assert content =~ "### Types"
      assert content =~ "- `t()` - The main type."
    end

    test "omits empty sections" do
      modules = [
        module_node(
          id: "MyMod",
          title: "MyMod",
          docs: [],
          typespecs: []
        )
      ]

      LLMS.run(modules, [], config())
      content = read_output()
      refute content =~ "### Functions"
      refute content =~ "### Types"
    end
  end
end
