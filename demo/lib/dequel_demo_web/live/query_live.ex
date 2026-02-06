defmodule DequelDemoWeb.QueryLive do
  @moduledoc """
  LiveView for the Dequel demo query interface.
  Provides real-time query preview as users type.
  """

  use DequelDemoWeb, :live_view

  alias DequelDemo.Bookstore

  @debounce_ms 300

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:collection, "books")
     |> assign(:query, "")
     |> assign(:results, [])
     |> assign(:error, nil)
     |> assign(:loading, false)
     |> assign(:collections, Bookstore.collections())
     |> assign(:schema, Bookstore.get_schema("books"))
     |> assign(:debounce_ref, nil)}
  end

  def handle_event("change_collection", %{"collection" => collection}, socket) do
    schema = Bookstore.get_schema(collection)

    {:noreply,
     socket
     |> assign(:collection, collection)
     |> assign(:schema, schema)
     |> assign(:results, [])
     |> assign(:error, nil)}
  end

  def handle_event("query_changed", %{"query" => query}, socket) do
    # Cancel any pending debounce
    if socket.assigns[:debounce_ref] do
      Process.cancel_timer(socket.assigns[:debounce_ref])
    end

    # Set up debounced execution
    ref = Process.send_after(self(), {:execute_query, query}, @debounce_ms)

    {:noreply,
     socket
     |> assign(:query, query)
     |> assign(:debounce_ref, ref)
     |> assign(:loading, true)}
  end

  def handle_event("run_query", _params, socket) do
    %{collection: collection, query: query} = socket.assigns
    result = Bookstore.execute(collection, query)

    {:noreply, apply_result(socket, result)}
  end

  def handle_info({:execute_query, query}, socket) do
    %{collection: collection} = socket.assigns
    result = Bookstore.execute(collection, query)

    {:noreply, apply_result(socket, result)}
  end

  defp apply_result(socket, {:ok, results}) do
    socket
    |> assign(:results, results)
    |> assign(:error, nil)
    |> assign(:loading, false)
  end

  defp apply_result(socket, {:error, message}) do
    socket
    |> assign(:results, [])
    |> assign(:error, message)
    |> assign(:loading, false)
  end

  def render(assigns) do
    ~H"""
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-2">Dequel Demo</h1>
      <p class="text-gray-600 mb-6">Query the bookstore database using Dequel syntax.</p>

      <div class="card bg-base-100 shadow-md mb-6">
        <div class="card-body">
          <div class="form-control mb-4">
            <label class="label" for="collection">
              <span class="label-text font-medium">Collection</span>
            </label>
            <select
              id="collection"
              class="select select-bordered w-full max-w-xs"
              phx-change="change_collection"
              name="collection"
            >
              <%= for col <- @collections do %>
                <option value={col} selected={col == @collection}><%= col %></option>
              <% end %>
            </select>
          </div>

          <div class="form-control mb-4">
            <label class="label" for="editor">
              <span class="label-text font-medium">Query</span>
            </label>
            <dequel-editor
              id="editor"
              phx-hook="DequelEditor"
              data-schema={Jason.encode!(@schema)}
              autocompletions={~p"/api/schema?collection=#{@collection}"}
              class="w-full min-h-[80px] border border-base-300 rounded-lg p-2 bg-base-100 font-mono"
            />
          </div>

          <button
            type="button"
            class="btn btn-primary"
            phx-click="run_query"
            disabled={@loading}
          >
            <%= if @loading, do: "Loading...", else: "Run Query" %>
          </button>
        </div>
      </div>

      <div id="result" class="mb-6">
        <%= if @error do %>
          <div class="alert alert-error">
            <span><%= @error %></span>
          </div>
        <% end %>

        <%= if @results != [] do %>
          <div class="font-semibold mb-2"><%= length(@results) %> results:</div>
          <div class="space-y-1">
            <%= for item <- @results do %>
              <div class="bg-base-100 border border-base-300 rounded p-3 font-mono text-sm">
                <%= item.title || item.name || "ID: #{item.id}" %>
                <span class="text-gray-400">(id: <%= item.id %>)</span>
              </div>
            <% end %>
          </div>
        <% end %>

        <%= if @results == [] and is_nil(@error) and not @loading do %>
          <div class="alert alert-info">
            <span>Enter a query above. Results update as you type.</span>
          </div>
        <% end %>
      </div>

      <.syntax_help />
    </div>
    """
  end

  defp syntax_help(assigns) do
    ~H"""
    <div class="card bg-base-100 shadow-sm border border-base-300">
      <div class="card-body">
        <h3 class="card-title text-lg">Query Syntax</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li><code class="bg-base-200 px-1 rounded">genre:fiction</code> - Exact match</li>
          <li><code class="bg-base-200 px-1 rounded">title:*journey</code> - Contains "journey"</li>
          <li><code class="bg-base-200 px-1 rounded">title:^"The"</code> - Starts with "The"</li>
          <li><code class="bg-base-200 px-1 rounded">title:$"end"</code> - Ends with "end"</li>
          <li>
            <code class="bg-base-200 px-1 rounded">genre:fiction genre:mystery</code>
            - AND (both conditions)
          </li>
          <li>
            <code class="bg-base-200 px-1 rounded">genre:fiction or genre:mystery</code>
            - OR (either condition)
          </li>
          <li><code class="bg-base-200 px-1 rounded">-genre:fiction</code> - Exclude (NOT fiction)</li>
        </ul>
      </div>
    </div>
    """
  end
end
