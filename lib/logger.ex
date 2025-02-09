defmodule Dequel.Parser.Logger do
  @moduledoc """
  Providing an interface for logging to find references more easily and also
  to provide telemetry handlers.
  """

  require Logger

  def install do
    handlers = %{
      [:dequel, :parser, :parse, :stop] => &__MODULE__.dequel_parser_parse_stop/4
    }

    for {key, fun} <- handlers do
      :telemetry.attach({__MODULE__, key}, key, fun, %{})
    end
  end

  def dequel_parser_parse_stop(_, measurement, _meta, _config) do
    # TODO: IO.inspect should probably be removed, no?
    IO.inspect(measurement)
    Logger.info("PARSE")
  end
end
