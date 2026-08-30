import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { FileSystemManager } from "../src/core/filesystem";

describe("FileSystemManager - YAML parsing", () => {
  let fsManager: FileSystemManager;

  beforeEach(() => {
    fsManager = new FileSystemManager();
  });

  test("parseSubAgentContent parses valid frontmatter and system prompt", () => {
    const content = `---
name: test-agent
description: A test agent
tools: [Read, Write, Bash]
author: tester
version: 1.0.0
---

You are a test agent.`;

    const result = fsManager.parseSubAgentContent(content);
    expect(result.frontMatter.name).toBe("test-agent");
    expect(result.frontMatter.description).toBe("A test agent");
    expect(result.frontMatter.tools).toEqual(["Read", "Write", "Bash"]);
    expect(result.frontMatter.author).toBe("tester");
    expect(result.frontMatter.version).toBe("1.0.0");
    expect(result.systemPrompt).toBe("You are a test agent.");
  });

  test("parseSubAgentContent parses frontmatter without tools", () => {
    const content = `---
name: simple-agent
description: Simple agent without tools
---

Do something simple.`;

    const result = fsManager.parseSubAgentContent(content);
    expect(result.frontMatter.name).toBe("simple-agent");
    expect(result.frontMatter.description).toBe("Simple agent without tools");
    expect(result.frontMatter.tools).toBeUndefined();
    expect(result.systemPrompt).toBe("Do something simple.");
  });

  test("parseSubAgentContent throws on missing frontmatter", () => {
    const content = `No frontmatter here, just plain text.`;
    expect(() => fsManager.parseSubAgentContent(content)).toThrow(
      "Invalid sub-agent format: missing YAML frontmatter"
    );
  });

  test("parseSubAgentContent handles multiline system prompt", () => {
    const content = `---
name: multi-agent
description: Multi-line prompt agent
---

Line one.
Line two.
Line three.`;

    const result = fsManager.parseSubAgentContent(content);
    expect(result.systemPrompt).toBe("Line one.\nLine two.\nLine three.");
  });

  test("parseSubAgentContent handles quoted values in YAML", () => {
    const content = `---
name: "quoted-agent"
description: 'A quoted description'
---

Prompt here.`;

    const result = fsManager.parseSubAgentContent(content);
    expect(result.frontMatter.name).toBe("quoted-agent");
    expect(result.frontMatter.description).toBe("A quoted description");
  });
});

describe("FileSystemManager - file operations", () => {
  let fsManager: FileSystemManager;
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "claude-cmd-test-"));
    fsManager = new FileSystemManager();
    // Override paths to use temp dir
    (fsManager as any).commandsDir = path.join(tmpDir, "commands");
    (fsManager as any).claudeDir = tmpDir;
    (fsManager as any).configFile = path.join(tmpDir, "settings.json");
    (fsManager as any).agentsDir = path.join(tmpDir, "agents");
    fs.mkdirSync(path.join(tmpDir, "commands"), { recursive: true });
    fs.mkdirSync(path.join(tmpDir, "agents"), { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test("getClaudeConfig returns defaults when config file missing", () => {
    const config = fsManager.getClaudeConfig();
    expect(config.allowedTools).toEqual([]);
    expect(config.securityProfile).toBe("moderate");
    expect(config.version).toBe("1.0.0");
  });

  test("saveClaudeConfig and getClaudeConfig round-trip", () => {
    const config = {
      allowedTools: ["Read", "Write"],
      securityProfile: "strict" as const,
      version: "2.0.0",
    };
    fsManager.saveClaudeConfig(config);
    const loaded = fsManager.getClaudeConfig();
    expect(loaded.allowedTools).toEqual(["Read", "Write"]);
    expect(loaded.securityProfile).toBe("strict");
    expect(loaded.version).toBe("2.0.0");
  });

  test("saveCommand writes file and returns path", () => {
    (fsManager as any).projectCommandsDir = path.join(tmpDir, "project-commands");
    fs.mkdirSync((fsManager as any).projectCommandsDir, { recursive: true });

    const filePath = fsManager.saveCommand("test-cmd.md", "# Test Command", "global");
    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, "utf8")).toBe("# Test Command");
  });

  test("deleteCommand removes the file", () => {
    const cmdPath = path.join(tmpDir, "commands", "my-cmd.md");
    fs.writeFileSync(cmdPath, "content");
    expect(fs.existsSync(cmdPath)).toBe(true);

    const result = fsManager.deleteCommand("my-cmd.md");
    expect(result).toBe(true);
    expect(fs.existsSync(cmdPath)).toBe(false);
  });

  test("listInstalledCommands returns markdown files", () => {
    fs.writeFileSync(path.join(tmpDir, "commands", "cmd-a.md"), "");
    fs.writeFileSync(path.join(tmpDir, "commands", "cmd-b.md"), "");
    fs.writeFileSync(path.join(tmpDir, "commands", "readme.txt"), "");

    const commands = fsManager.listInstalledCommands();
    expect(commands).toContain("cmd-a.md");
    expect(commands).toContain("cmd-b.md");
    expect(commands).not.toContain("readme.txt");
  });

  test("listInstalledCommands returns empty array when directory missing", () => {
    fs.rmdirSync(path.join(tmpDir, "commands"));
    const commands = fsManager.listInstalledCommands();
    expect(commands).toEqual([]);
  });

  test("saveSubAgent and getSubAgent round-trip", () => {
    const frontMatter = {
      name: "test-bot",
      description: "A test bot",
      tools: ["Read", "Grep"],
      author: "tester",
      version: "1.0.0",
    };
    const prompt = "You are a test bot.";

    fsManager.saveSubAgent("test-bot", frontMatter, prompt, "global");
    const agent = fsManager.getSubAgent("test-bot");

    expect(agent).not.toBeNull();
    expect(agent!.name).toBe("test-bot");
    expect(agent!.description).toBe("A test bot");
    expect(agent!.tools).toEqual(["Read", "Grep"]);
    expect(agent!.systemPrompt).toBe(prompt);
    expect(agent!.location).toBe("global");
  });

  test("deleteSubAgent removes agent file", () => {
    const frontMatter = { name: "del-bot", description: "Delete me" };
    fsManager.saveSubAgent("del-bot", frontMatter, "Prompt.", "global");
    expect(fsManager.getSubAgent("del-bot")).not.toBeNull();

    const deleted = fsManager.deleteSubAgent("del-bot", "global");
    expect(deleted).toBe(true);
    expect(fsManager.getSubAgent("del-bot")).toBeNull();
  });

  test("deleteSubAgent returns false when agent not found", () => {
    const result = fsManager.deleteSubAgent("nonexistent-agent", "global");
    expect(result).toBe(false);
  });

  test("fileExists returns correct boolean", () => {
    const testFile = path.join(tmpDir, "exists.txt");
    fs.writeFileSync(testFile, "hi");
    expect(fsManager.fileExists(testFile)).toBe(true);
    expect(fsManager.fileExists(path.join(tmpDir, "missing.txt"))).toBe(false);
  });

  test("ensureSkillsDirectory creates skills dir", () => {
    const skillsDir = path.join(tmpDir, "skills");
    (fsManager as any).skillsDir = skillsDir;
    expect(fs.existsSync(skillsDir)).toBe(false);
    fsManager.ensureSkillsDirectory();
    expect(fs.existsSync(skillsDir)).toBe(true);
  });

  test("saveSkill writes SKILL.md with frontmatter and content", () => {
    const skillsDir = path.join(tmpDir, "skills");
    (fsManager as any).skillsDir = skillsDir;

    const frontmatter = {
      name: "my-skill",
      description: "A test skill",
      author: "tester",
      version: "1.0.0",
      tags: ["test", "demo"],
    };
    const content = "Do something useful.";

    const filePath = fsManager.saveSkill("my-skill", frontmatter, content);

    expect(fs.existsSync(filePath)).toBe(true);
    const written = fs.readFileSync(filePath, "utf8");
    expect(written).toContain("name: my-skill");
    expect(written).toContain("description: A test skill");
    expect(written).toContain("author: tester");
    expect(written).toContain("Do something useful.");
    expect(filePath).toContain(path.join("my-skill", "SKILL.md"));
  });

  test("saveSkill creates skill subdirectory", () => {
    const skillsDir = path.join(tmpDir, "skills");
    (fsManager as any).skillsDir = skillsDir;

    fsManager.saveSkill("new-skill", { name: "new-skill", description: "desc" }, "body");

    expect(fs.existsSync(path.join(skillsDir, "new-skill"))).toBe(true);
    expect(fs.existsSync(path.join(skillsDir, "new-skill", "SKILL.md"))).toBe(true);
  });
});
