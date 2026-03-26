defmodule ExDoc.Formatter.LLMS do
  @moduledoc """
  ExDoc formatter that outputs a single `llms.txt` file.

  Produces a concise markdown reference of all modules, functions, types,
  and callbacks — designed to be consumed as context by large language models.

  ## Usage

      mix docs -f llms

  Or add to your `mix.exs`:

      docs: [formatters: ["html", "llms"]]
  """

  @block_tags ~w(p h1 h2 h3 h4 h5 h6 li pre blockquote ul ol dl dt dd)a

  @doc """
  Generates `llms.txt` for the given modules.

  Receives module nodes, filtered modules (unused by this formatter),
  and the ExDoc config. Writes a single markdown file to `config.output`.
  """
  @spec run([ExDoc.ModuleNode.t()], [ExDoc.ModuleNode.t()], ExDoc.Config.t()) :: String.t()
  def run(module_nodes, _filtered_modules, config) do
    content = build_content(module_nodes, config)
    File.write!("llms.txt", content)
    "llms.txt"
  end

  defp build_content(module_nodes, config) do
    header = build_header(config)
    modules = module_nodes |> sort_modules() |> Enum.map_join("\n", &build_module/1)

    header <> modules
  end

  defp build_header(config) do
    project = config.project || "Documentation"

    case config.version do
      nil -> "# #{project}\n\n"
      vsn -> "# #{project} v#{vsn}\n\n"
    end
  end

  defp sort_modules(module_nodes) do
    Enum.sort_by(module_nodes, & &1.id)
  end

  defp build_module(module_node) do
    title = "## #{module_node.title}\n"
    moduledoc = extract_text(module_node.doc)

    sections =
      [
        title,
        moduledoc,
        build_doc_section("Functions", module_node.docs, :function),
        build_doc_section("Macros", module_node.docs, :macro),
        build_doc_section("Callbacks", module_node.docs, :callback),
        build_type_section(module_node.typespecs)
      ]
      |> Enum.reject(&(&1 == ""))
      |> Enum.join("\n")

    sections <> "\n"
  end

  defp build_doc_section(heading, docs, type) do
    entries =
      docs
      |> Enum.filter(&(&1.type == type and &1.doc != nil))
      |> Enum.sort_by(&{&1.name, &1.arity})
      |> Enum.map(&build_doc_entry/1)

    case entries do
      [] -> ""
      items -> "### #{heading}\n\n" <> Enum.join(items, "\n") <> "\n"
    end
  end

  defp build_type_section(typespecs) do
    entries =
      typespecs
      |> Enum.filter(&(&1.doc != nil))
      |> Enum.sort_by(&{&1.name, &1.arity})
      |> Enum.map(&build_type_entry/1)

    case entries do
      [] -> ""
      items -> "### Types\n\n" <> Enum.join(items, "\n") <> "\n"
    end
  end

  defp build_doc_entry(doc_node), do: format_entry(doc_node.signature, doc_node.doc)
  defp build_type_entry(type_node), do: format_entry(type_node.signature, type_node.doc)

  defp format_entry(signature, doc) do
    case doc |> extract_text() |> first_paragraph() do
      "" -> "- `#{signature}`\n"
      summary -> "- `#{signature}` - #{summary}\n"
    end
  end

  # Text extraction from ExDoc DocAST.
  #
  # ExDoc.DocAST.text_from_ast/1 concatenates all text nodes without
  # preserving paragraph breaks, which produces run-on text. This custom
  # extraction inserts newlines between block-level elements so we can
  # later split on paragraph boundaries.

  defp extract_text(nil), do: ""
  defp extract_text(doc) when is_binary(doc), do: String.trim(doc)

  defp extract_text(doc) when is_list(doc) do
    doc
    |> Enum.map_join("", &ast_to_text/1)
    |> String.replace(~r/\n{3,}/, "\n\n")
    |> String.trim()
  end

  defp extract_text(doc) do
    ast_to_text(doc)
    |> String.replace(~r/\n{3,}/, "\n\n")
    |> String.trim()
  end

  defp ast_to_text(text) when is_binary(text), do: text

  defp ast_to_text({tag, _attrs, children, _meta}) when tag in @block_tags do
    inner = children |> List.wrap() |> Enum.map_join("", &ast_to_text/1)
    "\n" <> String.trim(inner) <> "\n"
  end

  defp ast_to_text({_tag, _attrs, children, _meta}) do
    children |> List.wrap() |> Enum.map_join("", &ast_to_text/1)
  end

  defp ast_to_text(_other), do: ""

  defp first_paragraph(""), do: ""

  defp first_paragraph(text) do
    text
    |> String.split(~r/\n\n/, parts: 2)
    |> List.first("")
    |> String.replace(~r/\s+/, " ")
    |> String.trim()
  end
end
