import { parser } from "./parser";
import { testTree } from "@lezer/generator/test";
import { fileTests } from "@lezer/generator/test";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { describe, test } from "vitest";

const dir = "./src/dequel-lang/parser-tests";

for (const file of readdirSync(dir)) {
  const describeCmd = file.startsWith("_") ? describe.skip : describe;
  describeCmd(file, () => {
    const tests = fileTests(readFileSync(join(dir, file), "utf8"), file);
    for (const { name, text, expected } of tests) {
      const result = parser.parse(text);
      test(name, () => {
        testTree(result, expected);
      });
    }
  });
}
