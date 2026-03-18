defmodule DequelDemoWeb.QueryHTML do
  @moduledoc """
  HTML templates for QueryController.
  """

  use DequelDemoWeb, :html

  embed_templates "query_html/*"

  attr :class, :string, default: ""
  def syntax_help(assigns)
end
