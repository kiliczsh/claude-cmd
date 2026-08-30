import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { ClaudeCommandAPI } from "../src/core/api";
import type { Command } from "../src/types";

const SAMPLE_COMMANDS: Command[] = [
  {
    id: "cmd-1",
    name: "git-commit",
    description: "Generate a commit message",
    content: "# Git Commit\nGenerate commit messages.",
    tags: ["git", "productivity"],
    author: "alice",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "cmd-2",
    name: "code-review",
    description: "Review code for issues",
    content: "# Code Review\nReview code.",
    tags: ["code", "quality"],
    author: "bob",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "cmd-3",
    name: "analyze-perf",
    description: "Analyze performance",
    content: "# Analyze Performance\nProfile and analyze.",
    tags: ["analyze", "performance"],
    author: "alice",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-06T00:00:00Z",
  },
];

describe("ClaudeCommandAPI - local file loading", () => {
  let tmpDir: string;
  let dataFile: string;
  let api: ClaudeCommandAPI;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "claude-api-test-"));
    dataFile = path.join(tmpDir, "commands.json");
    fs.writeFileSync(dataFile, JSON.stringify(SAMPLE_COMMANDS));
    api = new ClaudeCommandAPI(dataFile);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test("getCommands returns all commands with default pagination", async () => {
    const result = await api.getCommands();
    expect(result.data.length).toBe(3);
    expect(result.pagination.total).toBe(3);
  });

  test("getCommands filters by query string", async () => {
    const result = await api.getCommands({ q: "git" });
    expect(result.data.length).toBe(1);
    expect(result.data[0].name).toBe("git-commit");
  });

  test("getCommands filters by tag", async () => {
    const result = await api.getCommands({ tags: "code" });
    expect(result.data.length).toBe(1);
    expect(result.data[0].name).toBe("code-review");
  });

  test("getCommands filters by author", async () => {
    const result = await api.getCommands({ author: "alice" });
    expect(result.data.length).toBe(2);
  });

  test("getCommands sorts by name", async () => {
    const result = await api.getCommands({ sort: "name" });
    expect(result.data[0].name).toBe("analyze-perf");
    expect(result.data[1].name).toBe("code-review");
    expect(result.data[2].name).toBe("git-commit");
  });

  test("getCommands handles pagination", async () => {
    const page1 = await api.getCommands({ limit: 2, offset: 0 });
    expect(page1.data.length).toBe(2);
    expect(page1.pagination.has_next).toBe(true);
    expect(page1.pagination.has_previous).toBe(false);

    const page2 = await api.getCommands({ limit: 2, offset: 2 });
    expect(page2.data.length).toBe(1);
    expect(page2.pagination.has_next).toBe(false);
    expect(page2.pagination.has_previous).toBe(true);
  });

  test("getCommand returns command by id", async () => {
    const cmd = await api.getCommand("cmd-2");
    expect(cmd.name).toBe("code-review");
  });

  test("getCommand throws when command not found", async () => {
    expect(api.getCommand("nonexistent")).rejects.toThrow(
      "Command nonexistent not found"
    );
  });

  test("getTags returns tags with counts", async () => {
    const tags = await api.getTags();
    const tagNames = tags.map((t) => t.name);
    expect(tagNames).toContain("git");
    expect(tagNames).toContain("code");
    expect(tagNames).toContain("analyze");
  });

  test("getAuthors returns authors with counts", async () => {
    const authors = await api.getAuthors();
    const alice = authors.find((a) => a.name === "alice");
    expect(alice).toBeDefined();
    expect(alice!.count).toBe(2);
  });

  test("searchCommands returns matching commands", async () => {
    const result = await api.searchCommands("review");
    expect(result.commands.length).toBe(1);
    expect(result.commands[0].name).toBe("code-review");
  });

  test("caching: second call returns cached data without re-reading file", async () => {
    const result1 = await api.getCommands();
    expect(result1.pagination.total).toBe(3);

    // Overwrite file after first load — cached result should still have 3
    fs.writeFileSync(dataFile, JSON.stringify([]));

    const result2 = await api.getCommands();
    expect(result2.pagination.total).toBe(3);
  });

  test("returns empty array when local file does not exist", async () => {
    const missingApi = new ClaudeCommandAPI(path.join(tmpDir, "nonexistent.json"));
    const result = await missingApi.getCommands();
    expect(result.data).toEqual([]);
    expect(result.pagination.total).toBe(0);
  });
});
