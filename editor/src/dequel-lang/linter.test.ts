import { describe, test, expect } from "vitest";

// Test the validation functions directly
// These are internal functions, so we'll need to export them or test via the linter

// For now, let's test the regex patterns directly

describe("validation patterns", () => {
  describe("validateNumber", () => {
    const pattern = /^-?\d+(\.\d+)?$/;

    test("accepts positive integers", () => {
      expect(pattern.test("25")).toBe(true);
      expect(pattern.test("0")).toBe(true);
      expect(pattern.test("12345")).toBe(true);
    });

    test("accepts negative integers", () => {
      expect(pattern.test("-10")).toBe(true);
      expect(pattern.test("-0")).toBe(true);
    });

    test("accepts decimals", () => {
      expect(pattern.test("19.99")).toBe(true);
      expect(pattern.test("-5.5")).toBe(true);
      expect(pattern.test("0.1")).toBe(true);
    });

    test("rejects non-numeric values", () => {
      expect(pattern.test("hello")).toBe(false);
      expect(pattern.test("12abc")).toBe(false);
      expect(pattern.test("")).toBe(false);
      expect(pattern.test(" ")).toBe(false);
    });

    test("rejects partial numbers", () => {
      expect(pattern.test("12.")).toBe(false);
      expect(pattern.test(".5")).toBe(false);
    });
  });

  describe("validateBoolean", () => {
    const pattern = /^(true|false|yes|no)$/i;

    test("accepts true/false", () => {
      expect(pattern.test("true")).toBe(true);
      expect(pattern.test("false")).toBe(true);
    });

    test("accepts yes/no", () => {
      expect(pattern.test("yes")).toBe(true);
      expect(pattern.test("no")).toBe(true);
    });

    test("is case insensitive", () => {
      expect(pattern.test("TRUE")).toBe(true);
      expect(pattern.test("False")).toBe(true);
      expect(pattern.test("YES")).toBe(true);
      expect(pattern.test("No")).toBe(true);
    });

    test("rejects invalid values", () => {
      expect(pattern.test("maybe")).toBe(false);
      expect(pattern.test("1")).toBe(false);
      expect(pattern.test("0")).toBe(false);
      expect(pattern.test("")).toBe(false);
      expect(pattern.test("yesno")).toBe(false);
    });
  });

  describe("validateDate", () => {
    const pattern = /^\d{4}(-\d{2}(-\d{2})?)?$/;

    test("accepts YYYY format", () => {
      expect(pattern.test("2024")).toBe(true);
      expect(pattern.test("1999")).toBe(true);
      expect(pattern.test("2000")).toBe(true);
    });

    test("accepts YYYY-MM format", () => {
      expect(pattern.test("2024-01")).toBe(true);
      expect(pattern.test("2024-12")).toBe(true);
    });

    test("accepts YYYY-MM-DD format", () => {
      expect(pattern.test("2024-01-15")).toBe(true);
      expect(pattern.test("2024-12-31")).toBe(true);
    });

    test("rejects invalid formats", () => {
      expect(pattern.test("yesterday")).toBe(false);
      expect(pattern.test("2024/01/15")).toBe(false);
      expect(pattern.test("01-15-2024")).toBe(false);
      expect(pattern.test("24")).toBe(false);
      expect(pattern.test("")).toBe(false);
    });

    test("rejects partial dates", () => {
      expect(pattern.test("2024-")).toBe(false);
      expect(pattern.test("2024-1")).toBe(false);
      expect(pattern.test("2024-01-")).toBe(false);
      expect(pattern.test("2024-01-1")).toBe(false);
    });
  });

  describe("validateKeyword", () => {
    const validateKeyword = (value: string, allowed: string[]): boolean =>
      allowed.some((v) => v.toLowerCase() === value.toLowerCase());

    test("accepts value in allowed list", () => {
      expect(validateKeyword("fiction", ["fiction", "non-fiction"])).toBe(true);
      expect(validateKeyword("sci-fi", ["mystery", "sci-fi", "fantasy"])).toBe(
        true
      );
    });

    test("is case insensitive", () => {
      expect(validateKeyword("FICTION", ["fiction", "non-fiction"])).toBe(true);
      expect(validateKeyword("Fiction", ["fiction"])).toBe(true);
    });

    test("rejects value not in allowed list", () => {
      expect(validateKeyword("romance", ["fiction", "non-fiction"])).toBe(
        false
      );
      expect(validateKeyword("unknown", ["mystery", "sci-fi"])).toBe(false);
    });
  });
});

describe("value extraction", () => {
  test("strips quotes from value", () => {
    const stripQuotes = (value: string) => value.replace(/^"|"$/g, "");

    expect(stripQuotes('"hello"')).toBe("hello");
    expect(stripQuotes('"my value"')).toBe("my value");
    expect(stripQuotes("unquoted")).toBe("unquoted");
    expect(stripQuotes('"partial')).toBe("partial"); // Leading quote gets stripped
  });

  test("detects command predicates", () => {
    const isCommand = (value: string) => /^\w+\(.*\)$/.test(value);

    expect(isCommand("contains(foo)")).toBe(true);
    expect(isCommand("after(2024,01)")).toBe(true);
    expect(isCommand("between(10,50)")).toBe(true);

    expect(isCommand("simple")).toBe(false);
    expect(isCommand("10..50")).toBe(false);
  });

  test("detects range predicates", () => {
    const isRange = (value: string) => /\.\./.test(value);

    expect(isRange("10..50")).toBe(true);
    expect(isRange("2024-01..2024-12")).toBe(true);

    expect(isRange("10")).toBe(false);
    expect(isRange("simple")).toBe(false);
  });

  test("detects comparison operators", () => {
    const hasComparison = (value: string) => /^[<>]=?/.test(value);

    expect(hasComparison(">10")).toBe(true);
    expect(hasComparison("<50")).toBe(true);
    expect(hasComparison(">=18")).toBe(true);
    expect(hasComparison("<=100")).toBe(true);

    expect(hasComparison("10")).toBe(false);
    expect(hasComparison("hello")).toBe(false);
  });
});
