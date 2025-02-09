defmodule Dequel.Adapter.Ecto.Logger do
  @moduledoc """
  Providing an interface for logging to find references more easily and also
  to provide telemetry handlers.
  """

  require Logger

  def install do
    handlers = %{
      [:dequel, :query, :execution, :stop] => &__MODULE__.dequel_query_execution_stop/4
    }

    for {key, fun} <- handlers do
      :telemetry.attach({__MODULE__, key}, key, fun, %{})
    end
  end

  def dequel_query_execution_stop(_event, measuerment, metadata, _config) do
    %{duration: duration} = measuerment

    Logger.notice(fn ->
      [
        "DEQUEL QUERY:",
        "\n\tIN: ",
        inspect(duration),
        "\n\tGOT: ",
        inspect(metadata)
      ]
    end)
  end
end
