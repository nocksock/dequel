defmodule Dequel.Query.ContextTest do
  use ExUnit.Case

  alias Dequel.Query.Context

  describe "new/0" do
    test "creates empty context" do
      ctx = Context.new()
      assert ctx.joins == %{}
      assert ctx.preloads == []
    end
  end

  describe "ensure_joins/2" do
    test "simple field returns base binding and unchanged context" do
      ctx = Context.new()
      {binding, new_ctx} = Context.ensure_joins(ctx, :name)

      assert binding == :q
      assert new_ctx.joins == %{}
    end

    test "single-segment path returns base binding" do
      ctx = Context.new()
      {binding, new_ctx} = Context.ensure_joins(ctx, [:name])

      assert binding == :q
      assert new_ctx.joins == %{}
    end

    test "two-segment path registers one join" do
      ctx = Context.new()
      {binding, new_ctx} = Context.ensure_joins(ctx, [:author, :name])

      assert binding == :join_author
      assert map_size(new_ctx.joins) == 1

      join = new_ctx.joins[[:author]]
      assert join.assoc == :author
      assert join.parent == :q
      assert join.binding == :join_author
      assert join.path == [:author]
    end

    test "three-segment path registers two joins" do
      ctx = Context.new()
      {binding, new_ctx} = Context.ensure_joins(ctx, [:author, :address, :city])

      assert binding == :join_author_address
      assert map_size(new_ctx.joins) == 2

      author_join = new_ctx.joins[[:author]]
      assert author_join.assoc == :author
      assert author_join.parent == :q
      assert author_join.binding == :join_author
      assert author_join.path == [:author]

      address_join = new_ctx.joins[[:author, :address]]
      assert address_join.assoc == :address
      assert address_join.parent == :join_author
      assert address_join.binding == :join_author_address
      assert address_join.path == [:author, :address]
    end

    test "deduplicates joins for same path" do
      ctx = Context.new()
      {_binding1, ctx} = Context.ensure_joins(ctx, [:author, :name])
      {binding2, ctx} = Context.ensure_joins(ctx, [:author, :bio])

      # Same join reused
      assert binding2 == :join_author
      assert map_size(ctx.joins) == 1
    end

    test "different paths get different joins" do
      ctx = Context.new()
      {binding1, ctx} = Context.ensure_joins(ctx, [:author, :name])
      {binding2, ctx} = Context.ensure_joins(ctx, [:publisher, :name])

      assert binding1 == :join_author
      assert binding2 == :join_publisher
      assert map_size(ctx.joins) == 2
    end
  end

  describe "ordered_joins/1" do
    test "returns joins in dependency order" do
      ctx = Context.new()
      {_binding, ctx} = Context.ensure_joins(ctx, [:author, :address, :city])

      joins = Context.ordered_joins(ctx)

      assert length(joins) == 2
      [first, second] = joins
      assert first.assoc == :author
      assert second.assoc == :address
    end

    test "returns empty list when no joins" do
      ctx = Context.new()
      assert Context.ordered_joins(ctx) == []
    end
  end

  describe "add_preload/2" do
    test "adds preload path" do
      ctx = Context.new()
      ctx = Context.add_preload(ctx, [:author])

      assert ctx.preloads == [[:author]]
    end

    test "accumulates multiple preloads" do
      ctx = Context.new()
      ctx = Context.add_preload(ctx, [:author])
      ctx = Context.add_preload(ctx, [:publisher])

      assert ctx.preloads == [[:publisher], [:author]]
    end
  end
end
