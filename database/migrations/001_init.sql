-- Migration: 001_init.sql
-- Simple Web Calculator — Initial Schema

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- --------------------------------------------------------
-- Table: calculation_history
-- Stores an optional log of expressions and their results
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS calculation_history (
  id          TEXT     NOT NULL PRIMARY KEY,          -- cuid()
  expression  TEXT     NOT NULL,                      -- e.g. "8 * 6"
  result      TEXT     NOT NULL,                      -- e.g. "48"
  created_at  DATETIME NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_calculation_history_created_at
  ON calculation_history (created_at);

-- --------------------------------------------------------
-- Table: app_config
-- Key-value pairs for application-level settings
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS app_config (
  id         TEXT     NOT NULL PRIMARY KEY,           -- cuid()
  key        TEXT     NOT NULL UNIQUE,                -- setting name
  value      TEXT     NOT NULL,                       -- setting value
  updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- --------------------------------------------------------
-- Trigger: keep app_config.updated_at current
-- --------------------------------------------------------
CREATE TRIGGER IF NOT EXISTS trg_app_config_updated_at
  AFTER UPDATE ON app_config
  FOR EACH ROW
  BEGIN
    UPDATE app_config
    SET updated_at = datetime('now')
    WHERE id = OLD.id;
  END;