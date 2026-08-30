-- Registry database schema for claudecmd.com/api/v2
-- Compatible with Cloudflare D1 (SQLite)

CREATE TABLE IF NOT EXISTS publishers (
  github_login     TEXT PRIMARY KEY,
  github_id        INTEGER NOT NULL,
  name             TEXT,
  avatar_url       TEXT,
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS skills (
  id               TEXT PRIMARY KEY,        -- e.g. "agent/agent-browser-automation"
  name             TEXT NOT NULL,
  description      TEXT,
  author           TEXT NOT NULL,           -- GitHub login of original author
  publisher        TEXT,                    -- GitHub login of who published to registry
  tags             TEXT NOT NULL DEFAULT '[]',  -- JSON array
  version          TEXT NOT NULL DEFAULT '1.0.0',
  skill_path       TEXT,                    -- relative path within bundle
  content          TEXT,                    -- full SKILL.md content
  frontmatter      TEXT NOT NULL DEFAULT '{}',  -- JSON object of parsed frontmatter
  install_count    INTEGER NOT NULL DEFAULT 0,
  is_verified      INTEGER NOT NULL DEFAULT 0,  -- 0=false, 1=true
  created_at       TEXT NOT NULL,
  updated_at       TEXT NOT NULL,
  published_at     TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (publisher) REFERENCES publishers(github_login)
);

-- Full-text search virtual table
CREATE VIRTUAL TABLE IF NOT EXISTS skills_fts USING fts5(
  id,
  name,
  description,
  author,
  tags,
  content=skills,
  content_rowid=rowid
);

-- Triggers to keep FTS in sync
CREATE TRIGGER IF NOT EXISTS skills_ai AFTER INSERT ON skills BEGIN
  INSERT INTO skills_fts(rowid, id, name, description, author, tags)
  VALUES (new.rowid, new.id, new.name, new.description, new.author, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS skills_ad AFTER DELETE ON skills BEGIN
  INSERT INTO skills_fts(skills_fts, rowid, id, name, description, author, tags)
  VALUES ('delete', old.rowid, old.id, old.name, old.description, old.author, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS skills_au AFTER UPDATE ON skills BEGIN
  INSERT INTO skills_fts(skills_fts, rowid, id, name, description, author, tags)
  VALUES ('delete', old.rowid, old.id, old.name, old.description, old.author, old.tags);
  INSERT INTO skills_fts(rowid, id, name, description, author, tags)
  VALUES (new.rowid, new.id, new.name, new.description, new.author, new.tags);
END;

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_skills_author ON skills(author);
CREATE INDEX IF NOT EXISTS idx_skills_install_count ON skills(install_count DESC);
CREATE INDEX IF NOT EXISTS idx_skills_published_at ON skills(published_at DESC);

-- Install events for analytics
CREATE TABLE IF NOT EXISTS install_events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  skill_id     TEXT NOT NULL,
  installed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (skill_id) REFERENCES skills(id)
);

CREATE INDEX IF NOT EXISTS idx_install_events_skill ON install_events(skill_id);
