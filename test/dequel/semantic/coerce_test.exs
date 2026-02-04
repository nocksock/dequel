defmodule Dequel.Semantic.CoerceTest do
  use ExUnit.Case

  alias Dequel.Semantic.Coerce

  doctest Dequel.Semantic.Coerce

  describe "coerce/2 with :integer" do
    test "coerces valid integer string" do
      assert Coerce.coerce("42", :integer) == 42
      assert Coerce.coerce("-123", :integer) == -123
      assert Coerce.coerce("0", :integer) == 0
    end

    test "returns original value for invalid integer" do
      assert Coerce.coerce("abc", :integer) == "abc"
      assert Coerce.coerce("12.5", :integer) == "12.5"
      assert Coerce.coerce("12abc", :integer) == "12abc"
    end

    test "passes through non-string values unchanged" do
      assert Coerce.coerce(42, :integer) == 42
      assert Coerce.coerce(nil, :integer) == nil
    end
  end

  describe "coerce/2 with :id" do
    test "coerces like integer" do
      assert Coerce.coerce("42", :id) == 42
      assert Coerce.coerce("abc", :id) == "abc"
    end
  end

  describe "coerce/2 with :float" do
    test "coerces valid float string" do
      assert Coerce.coerce("3.14", :float) == 3.14
      assert Coerce.coerce("-2.5", :float) == -2.5
      assert Coerce.coerce("0.0", :float) == 0.0
      assert Coerce.coerce("42", :float) == 42.0
    end

    test "returns original value for invalid float" do
      assert Coerce.coerce("abc", :float) == "abc"
      assert Coerce.coerce("12.5abc", :float) == "12.5abc"
    end
  end

  describe "coerce/2 with :boolean" do
    test "coerces true values" do
      assert Coerce.coerce("true", :boolean) == true
      assert Coerce.coerce("TRUE", :boolean) == true
      assert Coerce.coerce("True", :boolean) == true
      assert Coerce.coerce("1", :boolean) == true
    end

    test "coerces false values" do
      assert Coerce.coerce("false", :boolean) == false
      assert Coerce.coerce("FALSE", :boolean) == false
      assert Coerce.coerce("False", :boolean) == false
      assert Coerce.coerce("0", :boolean) == false
    end

    test "returns original value for invalid boolean" do
      assert Coerce.coerce("yes", :boolean) == "yes"
      assert Coerce.coerce("no", :boolean) == "no"
      assert Coerce.coerce("2", :boolean) == "2"
    end
  end

  describe "coerce/2 with :date" do
    test "coerces valid ISO8601 date" do
      assert Coerce.coerce("2024-01-15", :date) == ~D[2024-01-15]
      assert Coerce.coerce("2023-12-31", :date) == ~D[2023-12-31]
    end

    test "returns original value for invalid date" do
      assert Coerce.coerce("2024-13-01", :date) == "2024-13-01"
      assert Coerce.coerce("not-a-date", :date) == "not-a-date"
      assert Coerce.coerce("01-15-2024", :date) == "01-15-2024"
    end
  end

  describe "coerce/2 with :naive_datetime" do
    test "coerces valid ISO8601 datetime" do
      assert Coerce.coerce("2024-01-15T10:30:00", :naive_datetime) == ~N[2024-01-15 10:30:00]
      assert Coerce.coerce("2024-01-15 10:30:00", :naive_datetime) == ~N[2024-01-15 10:30:00]
    end

    test "returns original value for invalid datetime" do
      assert Coerce.coerce("not-a-datetime", :naive_datetime) == "not-a-datetime"
      assert Coerce.coerce("2024-01-15", :naive_datetime) == "2024-01-15"
    end

    test "naive_datetime_usec coerces like naive_datetime" do
      assert Coerce.coerce("2024-01-15T10:30:00.123456", :naive_datetime_usec) ==
               ~N[2024-01-15 10:30:00.123456]
    end
  end

  describe "coerce/2 with :utc_datetime" do
    test "coerces valid ISO8601 UTC datetime" do
      assert Coerce.coerce("2024-01-15T10:30:00Z", :utc_datetime) == ~U[2024-01-15 10:30:00Z]
    end

    test "returns original value for invalid datetime" do
      assert Coerce.coerce("not-a-datetime", :utc_datetime) == "not-a-datetime"
      assert Coerce.coerce("2024-01-15T10:30:00", :utc_datetime) == "2024-01-15T10:30:00"
    end

    test "utc_datetime_usec coerces like utc_datetime" do
      assert Coerce.coerce("2024-01-15T10:30:00.123456Z", :utc_datetime_usec) ==
               ~U[2024-01-15 10:30:00.123456Z]
    end
  end

  describe "coerce/2 with :decimal" do
    test "coerces valid decimal string" do
      result = Coerce.coerce("19.99", :decimal)
      assert Decimal.equal?(result, Decimal.new("19.99"))
    end

    test "coerces integer-like decimal string" do
      result = Coerce.coerce("42", :decimal)
      assert Decimal.equal?(result, Decimal.new("42"))
    end

    test "returns original value for invalid decimal" do
      assert Coerce.coerce("not-a-number", :decimal) == "not-a-number"
    end
  end

  describe "coerce/2 with :string and unknown types" do
    test "passes through string values for :string type" do
      assert Coerce.coerce("hello", :string) == "hello"
    end

    test "passes through string values for :binary type" do
      assert Coerce.coerce("hello", :binary) == "hello"
    end

    test "passes through string values for nil type" do
      assert Coerce.coerce("hello", nil) == "hello"
    end

    test "passes through string values for unknown types" do
      assert Coerce.coerce("hello", :unknown_type) == "hello"
    end
  end
end
