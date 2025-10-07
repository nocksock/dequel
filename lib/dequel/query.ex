defmodule Dequel.Query do
  @moduledoc """
  Query structure for representing Dequel queries with metadata.

  This struct holds the parsed query components and can track
  relationships and filtering conditions for more complex query scenarios.

  ## Fields

  - `:where` - List of filter conditions (AST nodes)
  - `:relations` - List of relationship constraints for joined queries

  ## Future Usage

  This struct is designed to support more advanced query features such as:
  - Relationship filtering (e.g., `posts.author:name:john`)
  - Aggregations and grouping
  - Query composition and optimization

  Currently, the simpler AST tuple format is used directly in most cases.
  """

  defstruct where: [], relations: []
end
