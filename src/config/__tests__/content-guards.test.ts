// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { sample, content } from "@/config/site-content";
import { brand } from "@/config/brand";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return entry === "__tests__" ? [] : files(path);
    return /\.(ts|tsx)$/.test(entry) ? [path] : [];
  });
}

describe("content guards", () => {
  it("flags all preview data as illustrative", () => {
    expect(sample.illustrative).toBe(true);
  });

  it("keeps the brand name and hex colours out of components (rename-safe, tokens-only)", () => {
    for (const file of files(join(process.cwd(), "src/components"))) {
      const source = readFileSync(file, "utf8");
      expect(source, file).not.toMatch(new RegExp(`\\b${brand.name}\\b`));
      expect(source, file).not.toMatch(/#[0-9a-fA-F]{6}\b/);
    }
  });

  it("makes no forbidden claims in copy", () => {
    const copy = JSON.stringify(content).toLowerCase();
    for (const phrase of ["trusted by", "testimonial", "reconciled automatically", "collect rent online", "enterprise-grade", "ai-powered", "free trial", "coming in q"]) {
      expect(copy).not.toContain(phrase);
    }
  });

  it("answers the eight FAQ questions in order", () => {
    expect(content.faq.items).toHaveLength(8);
    expect(content.faq.items[5].a.startsWith("No.")).toBe(true);
    expect(content.faq.items[6].a.startsWith("No.")).toBe(true);
  });
});
