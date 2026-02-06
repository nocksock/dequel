defmodule DequelDemoWeb.Router do
  use DequelDemoWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {DequelDemoWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", DequelDemoWeb do
    pipe_through :browser

    live "/", QueryLive
  end

  # API endpoints for editor autocompletions
  scope "/api", DequelDemoWeb do
    pipe_through :api

    get "/schema", ApiController, :schema
  end

  # Enable LiveDashboard in development
  if Application.compile_env(:dequel_demo, :dev_routes) do
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: DequelDemoWeb.Telemetry
    end
  end
end
