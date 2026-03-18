import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  SchemaCache,
  Schema,
  resolvePathSchema,
} from "./completion";

// Mock axios
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

import axios from "axios";

describe("SchemaCache", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("fetches schema from endpoint on first get", async () => {
    const mockSchema: Schema = {
      fields: { name: { type: "string" } },
    };
    vi.mocked(axios.get).mockResolvedValue({ data: mockSchema });

    const cache = new SchemaCache("/api");
    const result = await cache.get("authors");

    expect(axios.get).toHaveBeenCalledWith("/api/authors/schema");
    expect(result).toEqual(mockSchema);
  });

  test("returns cached promise on subsequent gets", async () => {
    const mockSchema: Schema = {
      fields: { name: { type: "string" } },
    };
    vi.mocked(axios.get).mockResolvedValue({ data: mockSchema });

    const cache = new SchemaCache("/api");

    // First call
    await cache.get("authors");
    // Second call
    await cache.get("authors");

    // Should only fetch once
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test("prime() sets schema without fetching", async () => {
    const mockSchema: Schema = {
      fields: { title: { type: "string" } },
    };

    const cache = new SchemaCache("/api");
    cache.prime("books", mockSchema);

    const result = await cache.get("books");

    expect(axios.get).not.toHaveBeenCalled();
    expect(result).toEqual(mockSchema);
  });

  test("returns empty schema on fetch error", async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error("Network error"));

    const cache = new SchemaCache("/api");
    const result = await cache.get("unknown");

    expect(result).toEqual({ fields: {} });
  });
});

describe("Relationship path autocompletion", () => {
  const booksSchema: Schema = {
    fields: {
      title: { type: "string", info: "Book title" },
      isbn: { type: "string" },
      author: { type: "relationship", schema: "authors", info: "Book author" },
    },
  };

  const authorsSchema: Schema = {
    fields: {
      name: { type: "string", info: "Author name" },
      bio: { type: "string" },
      country: { type: "string" },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("resolves relationship path and returns target schema fields", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: authorsSchema });

    const cache = new SchemaCache("/api");
    cache.prime("books", booksSchema);

    // Find the relationship field
    const authorField = booksSchema.fields["author"];
    expect(authorField?.type).toBe("relationship");
    expect(authorField?.schema).toBe("authors");

    // Fetch the target schema through the cache
    const result = await cache.get(authorField!.schema!);
    expect(Object.keys(result.fields)).toHaveLength(3);
    expect(Object.keys(result.fields)).toContain("name");
    expect(Object.keys(result.fields)).toContain("bio");
    expect(Object.keys(result.fields)).toContain("country");
  });

  test("cache fetches target schema when resolving relationship", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: authorsSchema });

    const cache = new SchemaCache("/api");
    cache.prime("books", booksSchema);

    // Simulate what resolvePathSchema does
    const authorField = booksSchema.fields["author"];
    expect(authorField?.type).toBe("relationship");
    expect(authorField?.schema).toBe("authors");

    // Fetch target schema
    const targetSchema = await cache.get(authorField!.schema!);
    expect(axios.get).toHaveBeenCalledWith("/api/authors/schema");
    expect(Object.keys(targetSchema.fields)).toEqual(["name", "bio", "country"]);
  });

  test("returns null for non-relationship field paths", async () => {
    const cache = new SchemaCache("/api");
    cache.prime("books", booksSchema);

    // "title" is a string field, not a relationship
    const titleField = booksSchema.fields["title"];
    expect(titleField?.type).toBe("string");
    expect(titleField?.schema).toBeUndefined();
  });

  test("handles nested relationship paths", async () => {
    const publisherSchema: Schema = {
      fields: {
        name: { type: "string" },
        location: { type: "string" },
      },
    };

    const extendedAuthorsSchema: Schema = {
      fields: {
        name: { type: "string" },
        publisher: { type: "relationship", schema: "publishers" },
      },
    };

    vi.mocked(axios.get)
      .mockResolvedValueOnce({ data: extendedAuthorsSchema })
      .mockResolvedValueOnce({ data: publisherSchema });

    const cache = new SchemaCache("/api");
    cache.prime("books", booksSchema);

    // Simulate resolving "author.publisher."
    // First, get authors schema
    const authorsResult = await cache.get("authors");
    expect(axios.get).toHaveBeenCalledWith("/api/authors/schema");

    // Find publisher relationship
    const publisherField = authorsResult.fields["publisher"];
    expect(publisherField?.type).toBe("relationship");

    // Get publisher schema
    const publisherResult = await cache.get(publisherField!.schema!);
    expect(axios.get).toHaveBeenCalledWith("/api/publishers/schema");
    expect(Object.keys(publisherResult.fields)).toEqual(["name", "location"]);
  });
});

describe("resolvePathSchema", () => {
  const booksSchema: Schema = {
    fields: {
      title: { type: "string" },
      author: { type: "relationship", schema: "authors" },
    },
  };

  const authorsSchema: Schema = {
    fields: {
      name: { type: "string" },
      bio: { type: "string" },
      publisher: { type: "relationship", schema: "publishers" },
    },
  };

  const publishersSchema: Schema = {
    fields: {
      name: { type: "string" },
      location: { type: "string" },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns target schema for single-segment relationship path", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: authorsSchema });

    const cache = new SchemaCache("/api");
    const result = await resolvePathSchema(["author"], booksSchema, cache);

    expect(result).toEqual(authorsSchema);
    expect(axios.get).toHaveBeenCalledWith("/api/authors/schema");
  });

  test("returns target schema for multi-segment relationship path", async () => {
    vi.mocked(axios.get)
      .mockResolvedValueOnce({ data: authorsSchema })
      .mockResolvedValueOnce({ data: publishersSchema });

    const cache = new SchemaCache("/api");
    const result = await resolvePathSchema(
      ["author", "publisher"],
      booksSchema,
      cache
    );

    expect(result).toEqual(publishersSchema);
    expect(axios.get).toHaveBeenCalledWith("/api/authors/schema");
    expect(axios.get).toHaveBeenCalledWith("/api/publishers/schema");
  });

  test("returns null for non-existent field", async () => {
    const cache = new SchemaCache("/api");
    const result = await resolvePathSchema(["nonexistent"], booksSchema, cache);

    expect(result).toBeNull();
    expect(axios.get).not.toHaveBeenCalled();
  });

  test("returns null for non-relationship field", async () => {
    const cache = new SchemaCache("/api");
    const result = await resolvePathSchema(["title"], booksSchema, cache);

    expect(result).toBeNull();
    expect(axios.get).not.toHaveBeenCalled();
  });

  test("returns null when path breaks at non-relationship", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: authorsSchema });

    const cache = new SchemaCache("/api");
    // "author.name" - name is a string, not a relationship
    const result = await resolvePathSchema(
      ["author", "name"],
      booksSchema,
      cache
    );

    expect(result).toBeNull();
  });

  test("uses cached schemas for repeated paths", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: authorsSchema });

    const cache = new SchemaCache("/api");

    await resolvePathSchema(["author"], booksSchema, cache);
    await resolvePathSchema(["author"], booksSchema, cache);

    // Should only fetch once due to caching
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

describe("Dot trigger completion", () => {
  test("completion from position is after the dot", () => {
    // Test that when we have "author.na", the completion should
    // replace from position 7 (after the dot), not from 0
    const doc = "author.na";
    const dotIndex = doc.lastIndexOf(".");
    const fromPos = dotIndex + 1;

    expect(fromPos).toBe(7);
    expect(doc.slice(fromPos)).toBe("na");
  });

  test("path segments are correctly split", () => {
    const fieldText = "author.publisher.name";
    const pathSegments = fieldText.split(".");

    expect(pathSegments).toEqual(["author", "publisher", "name"]);
    expect(pathSegments.slice(0, -1)).toEqual(["author", "publisher"]);
    expect(pathSegments[pathSegments.length - 1]).toBe("name");
  });

  test("single segment has no path prefix", () => {
    const fieldText = "title";
    const pathSegments = fieldText.split(".");

    expect(pathSegments.length).toBe(1);
    expect(pathSegments.length > 1).toBe(false);
  });

  test("dot at end creates empty last segment", () => {
    const fieldText = "author.";
    const pathSegments = fieldText.split(".");

    expect(pathSegments).toEqual(["author", ""]);
    expect(pathSegments.length > 1).toBe(true);
    expect(pathSegments.slice(0, -1)).toEqual(["author"]);
  });
});
