import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  validateNumber,
  validateBoolean,
  validateDate,
  validateKeyword,
  validateValue,
} from "./linter";

describe("validateNumber", () => {
  test("accepts positive integers", () => {
    expect(validateNumber("25")).toBe(true);
    expect(validateNumber("0")).toBe(true);
    expect(validateNumber("12345")).toBe(true);
  });

  test("accepts negative integers", () => {
    expect(validateNumber("-10")).toBe(true);
    expect(validateNumber("-0")).toBe(true);
  });

  test("accepts decimals", () => {
    expect(validateNumber("19.99")).toBe(true);
    expect(validateNumber("-5.5")).toBe(true);
    expect(validateNumber("0.1")).toBe(true);
  });

  test("rejects non-numeric values", () => {
    expect(validateNumber("hello")).toBe(false);
    expect(validateNumber("12abc")).toBe(false);
    expect(validateNumber("")).toBe(false);
    expect(validateNumber(" ")).toBe(false);
  });

  test("rejects partial numbers", () => {
    expect(validateNumber("12.")).toBe(false);
    expect(validateNumber(".5")).toBe(false);
  });
});

describe("validateBoolean", () => {
  test("accepts true/false", () => {
    expect(validateBoolean("true")).toBe(true);
    expect(validateBoolean("false")).toBe(true);
  });

  test("accepts yes/no", () => {
    expect(validateBoolean("yes")).toBe(true);
    expect(validateBoolean("no")).toBe(true);
  });

  test("is case insensitive", () => {
    expect(validateBoolean("TRUE")).toBe(true);
    expect(validateBoolean("False")).toBe(true);
    expect(validateBoolean("YES")).toBe(true);
    expect(validateBoolean("No")).toBe(true);
  });

  test("rejects invalid values", () => {
    expect(validateBoolean("maybe")).toBe(false);
    expect(validateBoolean("1")).toBe(false);
    expect(validateBoolean("0")).toBe(false);
    expect(validateBoolean("")).toBe(false);
    expect(validateBoolean("yesno")).toBe(false);
  });
});

describe("validateDate", () => {
  test("accepts YYYY format", () => {
    expect(validateDate("2024")).toBe(true);
    expect(validateDate("1999")).toBe(true);
    expect(validateDate("2000")).toBe(true);
  });

  test("accepts YYYY-MM format", () => {
    expect(validateDate("2024-01")).toBe(true);
    expect(validateDate("2024-12")).toBe(true);
  });

  test("accepts YYYY-MM-DD format", () => {
    expect(validateDate("2024-01-15")).toBe(true);
    expect(validateDate("2024-12-31")).toBe(true);
  });

  test("rejects invalid formats", () => {
    expect(validateDate("yesterday")).toBe(false);
    expect(validateDate("2024/01/15")).toBe(false);
    expect(validateDate("01-15-2024")).toBe(false);
    expect(validateDate("24")).toBe(false);
    expect(validateDate("")).toBe(false);
  });

  test("rejects partial dates", () => {
    expect(validateDate("2024-")).toBe(false);
    expect(validateDate("2024-1")).toBe(false);
    expect(validateDate("2024-01-")).toBe(false);
    expect(validateDate("2024-01-1")).toBe(false);
  });
});

describe("validateKeyword", () => {
  test("accepts value in allowed list", () => {
    expect(validateKeyword("fiction", ["fiction", "non-fiction"])).toBe(true);
    expect(validateKeyword("sci-fi", ["mystery", "sci-fi", "fantasy"])).toBe(true);
  });

  test("is case insensitive", () => {
    expect(validateKeyword("FICTION", ["fiction", "non-fiction"])).toBe(true);
    expect(validateKeyword("Fiction", ["fiction"])).toBe(true);
  });

  test("rejects value not in allowed list", () => {
    expect(validateKeyword("romance", ["fiction", "non-fiction"])).toBe(false);
    expect(validateKeyword("unknown", ["mystery", "sci-fi"])).toBe(false);
  });
});

describe("validateValue", () => {
  describe("number field", () => {
    const fieldInfo = { type: "number" };

    test("accepts valid number", () => {
      expect(validateValue("42", fieldInfo)).toBeNull();
      expect(validateValue("-10", fieldInfo)).toBeNull();
      expect(validateValue("3.14", fieldInfo)).toBeNull();
    });

    test("rejects invalid number", () => {
      const result = validateValue("hello", fieldInfo);
      expect(result).not.toBeNull();
      expect(result?.severity).toBe("error");
    });
  });

  describe("boolean field", () => {
    const fieldInfo = { type: "boolean" };

    test("accepts valid boolean", () => {
      expect(validateValue("true", fieldInfo)).toBeNull();
      expect(validateValue("false", fieldInfo)).toBeNull();
      expect(validateValue("yes", fieldInfo)).toBeNull();
      expect(validateValue("no", fieldInfo)).toBeNull();
    });

    test("rejects invalid boolean", () => {
      const result = validateValue("maybe", fieldInfo);
      expect(result).not.toBeNull();
      expect(result?.severity).toBe("error");
    });
  });

  describe("date field", () => {
    const fieldInfo = { type: "date" };

    test("accepts valid date", () => {
      expect(validateValue("2024", fieldInfo)).toBeNull();
      expect(validateValue("2024-01", fieldInfo)).toBeNull();
      expect(validateValue("2024-01-15", fieldInfo)).toBeNull();
    });

    test("rejects invalid date", () => {
      const result = validateValue("yesterday", fieldInfo);
      expect(result).not.toBeNull();
      expect(result?.severity).toBe("error");
    });
  });

  describe("keyword field", () => {
    test("accepts valid keyword value", () => {
      const fieldInfo = { type: "keyword", values: ["fiction", "non-fiction"] };
      expect(validateValue("fiction", fieldInfo)).toBeNull();
      expect(validateValue("FICTION", fieldInfo)).toBeNull();
    });

    test("warns on unknown keyword value", () => {
      const fieldInfo = { type: "keyword", values: ["fiction", "non-fiction"] };
      const result = validateValue("horror", fieldInfo);
      expect(result).not.toBeNull();
      expect(result?.severity).toBe("warning");
    });

    test("allows any value when values list is not provided", () => {
      const fieldInfo = { type: "keyword" };
      expect(validateValue("anything", fieldInfo)).toBeNull();
    });
  });

  describe("skips validation for special formats", () => {
    const fieldInfo = { type: "number" };

    test("skips contains() command", () => {
      expect(validateValue("contains(foo)", fieldInfo)).toBeNull();
    });

    test("skips range", () => {
      expect(validateValue("10..50", fieldInfo)).toBeNull();
    });

    test("skips comparison operators", () => {
      expect(validateValue(">10", fieldInfo)).toBeNull();
      expect(validateValue("<50", fieldInfo)).toBeNull();
      expect(validateValue(">=18", fieldInfo)).toBeNull();
      expect(validateValue("<=100", fieldInfo)).toBeNull();
    });
  });

  describe("string field", () => {
    test("accepts any value", () => {
      const fieldInfo = { type: "string" };
      expect(validateValue("hello", fieldInfo)).toBeNull();
      expect(validateValue("anything goes", fieldInfo)).toBeNull();
    });
  });
});
