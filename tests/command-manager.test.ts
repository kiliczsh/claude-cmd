import { describe, test, expect, beforeEach, afterEach, spyOn } from "bun:test";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { FileSystemManager } from "../src/core/filesystem";
import { ClaudeCommandAPI } from "../src/core/api";
import { CommandManager } from "../src/commands/command-manager";
import type { Command } from "../src/types";

const SAMPLE_COMMANDS: Command[] = [
  {
    id: "git-commit",
    name: "git-commit",
    description: "Generates git commit messages",
    content: "# Git Commit",
    tags: ["git"],
    author: "alice",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "code-review",
    name: "code-review",
    description: "Reviews code for issues",
    content: "# Code Review",
    tags: ["code"],
    author: "bob",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
];

describe("CommandManager - isCommandInstalled detection", () => {
  let tmpDir: string;
  let fsManager: FileSystemManager;
  let api: ClaudeCommandAPI;
  let manager: CommandManager;
  let dataFile: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "cmd-mgr-test-"));
    const commandsDir = path.join(tmpDir, "commands");
    fs.mkdirSync(commandsDir, { recursive: true });

    fsManager = new FileSystemManager();
    (fsManager as any).commandsDir = commandsDir;
    (fsManager as any).claudeDir = tmpDir;
    (fsManager as any).configFile = path.join(tmpDir, "settings.json");
    (fsManager as any).agentsDir = path.join(tmpDir, "agents");
    (fsManager as any).projectCommandsDir = path.join(tmpDir, "project-commands");

    dataFile = path.join(tmpDir, "commands.json");
    fs.writeFileSync(dataFile, JSON.stringify(SAMPLE_COMMANDS));
    api = new ClaudeCommandAPI(dataFile);

    manager = new CommandManager(fsManager, api);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test("listInstalledCommands prints message when no commands installed", async () => {
    const logs: string[] = [];
    const spy = spyOn(console, "log").mockImplementation((msg: string) => {
      logs.push(msg);
    });

    await manager.listInstalledCommands();
    spy.mockRestore();

    const output = logs.join("\n");
    expect(output).toContain("No commands installed");
  });

  test("listInstalledCommands shows installed count when commands exist", async () => {
    const commandsDir = (fsManager as any).commandsDir;
    fs.writeFileSync(path.join(commandsDir, "git-commit.md"), "# Git Commit");
    fs.writeFileSync(path.join(commandsDir, "code-review.md"), "# Code Review");

    const logs: string[] = [];
    const spy = spyOn(console, "log").mockImplementation((msg: string) => {
      logs.push(msg);
    });

    await manager.listInstalledCommands();
    spy.mockRestore();

    const output = logs.join("\n");
    expect(output).toContain("2");
  });

  test("saveCommand creates the file on disk", () => {
    const filePath = fsManager.saveCommand("my-cmd.md", "# My Command", "global");
    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, "utf8")).toBe("# My Command");
  });

  test("deleteCommand removes the file on disk", () => {
    const commandsDir = (fsManager as any).commandsDir;
    const cmdPath = path.join(commandsDir, "del-cmd.md");
    fs.writeFileSync(cmdPath, "content");

    const result = fsManager.deleteCommand("del-cmd.md");
    expect(result).toBe(true);
    expect(fs.existsSync(cmdPath)).toBe(false);
  });

  test("saveCommand with nested path creates directories", () => {
    const filePath = fsManager.saveCommand("git/git-commit.md", "# Git Commit", "global");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test("listInstalledCommands shows nested commands in subdirectories", async () => {
    const commandsDir = (fsManager as any).commandsDir;
    fs.mkdirSync(path.join(commandsDir, "git"), { recursive: true });
    fs.writeFileSync(path.join(commandsDir, "git", "git-commit.md"), "content");
    fs.writeFileSync(path.join(commandsDir, "git", "git-pr.md"), "content");

    const logs: string[] = [];
    const spy = spyOn(console, "log").mockImplementation((msg: string) => {
      logs.push(msg);
    });

    await manager.listInstalledCommands();
    spy.mockRestore();

    const output = logs.join("\n");
    expect(output).toContain("git");
    expect(output).toContain("2");
  });
});
