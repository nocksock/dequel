defmodule Dequel.Query do
  @moduledoc """
  Represents a Dequel query structure with filters and relations.
  """

  defstruct where: [], relations: []
end
