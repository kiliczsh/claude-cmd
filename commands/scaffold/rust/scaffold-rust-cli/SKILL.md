---
allowed-tools: Bash(cargo:*), Write, Read, Bash(mkdir:*), Bash(fd:*), Bash(rg:*), Bash(gdate:*)
name: "Scaffold Rust Cli"
description: "Generate production-ready Rust CLI application with modern architecture and comprehensive scaffolding"
author: "wcygan"
tags: ["scaffold","rust"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target CLI name: $ARGUMENTS
- Current directory: !`pwd`
- Rust toolchain: !`rustc --version 2>/dev/null || echo "Rust not found - will provide installation guidance"`
- Cargo version: !`cargo --version 2>/dev/null || echo "Cargo not found"`
- Available disk space: !`df -h . | tail -1 | awk '{print $4}' 2>/dev/null || echo "Unknown"`
- Git repository status: !`git status --porcelain 2>/dev/null | wc -l | tr -d ' ' || echo "0"` uncommitted changes

## Your task

STEP 1: Initialize project structure and validate environment

TRY:

- VERIFY Rust toolchain availability
- CREATE new Cargo project: `cargo new $ARGUMENTS --bin`
- INITIALIZE session state for tracking progress
- VALIDATE project name follows Rust naming conventions

```bash
# Create session state file
echo '{
  "sessionId": "'$SESSION_ID'",
  "projectName": "'$ARGUMENTS'",
  "status": "initializing",
  "completedSteps": [],
  "dependencies": [],
  "features": []
}' > /tmp/scaffold-rust-cli-$SESSION_ID.json
```

IF Rust not available:

- PROVIDE installation instructions for platform
- SUGGEST rustup installation: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- EXIT with guidance for setup

STEP 2: Configure modern Cargo.toml with production-ready dependencies

**Core Dependencies Configuration:**

```toml
[package]
name = "$ARGUMENTS"
version = "0.1.0"
edition = "2021"
authors = ["Your Name <your.email@example.com>"]
description = "A modern CLI application"
license = "MIT OR Apache-2.0"
repository = "https://github.com/username/$ARGUMENTS"
readme = "README.md"
keywords = ["cli", "terminal", "command-line"]
categories = ["command-line-utilities"]

[dependencies]
# Core CLI framework with derive features
clap = { version = "4.5", features = ["derive", "env", "color", "suggestions"] }

# Error handling and logging
anyhow = "1.0"
thiserror = "1.0"
env_logger = "0.11"
log = "0.4"

# Terminal UI and styling
colored = "2.1"
indicatif = "0.17"
dialoguer = "0.11"
console = "0.15"

# Signal handling and graceful shutdown
ctrlc = "3.4"
signal-hook = "0.3"
tokio = { version = "1.37", features = ["full"] }

# Serialization and configuration
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
toml = "0.8"

# Filesystem and path utilities
dirs = "5.0"
walkdir = "2.5"

# User experience improvements
human-panic = "2.0"
is-terminal = "0.4"

[dev-dependencies]
# Testing framework
assert_cmd = "2.0"
predicates = "3.1"
tempfile = "3.10"
tokio-test = "0.4"

[[bin]]
name = "$ARGUMENTS"
path = "src/main.rs"
```

STEP 3: Create comprehensive project directory structure

```bash
# Navigate to project directory
cd $ARGUMENTS

# Create organized source structure
mkdir -p src/{cli,commands,config,error,utils}
mkdir -p tests/{integration,fixtures}
mkdir -p docs/examples
mkdir -p .github/workflows

# Create essential files
touch src/{main.rs,cli.rs,lib.rs}
touch src/commands/{mod.rs,init.rs,status.rs}
touch src/{config.rs,error.rs}
touch src/utils/{mod.rs,logging.rs,signals.rs}
touch tests/integration/{cli_tests.rs,command_tests.rs}
touch README.md CHANGELOG.md LICENSE
```

STEP 4: Implement main.rs with robust architecture

**Core Application Structure:**

```rust
use anyhow::Result;
use clap::Parser;
use std::process;

mod cli;
mod commands;
mod config;
mod error;
mod utils;

use cli::Cli;
use utils::{logging, signals};

#[tokio::main]
async fn main() {
    // Set up human-readable panic messages in production
    human_panic::setup_panic!();
    
    // Initialize logging early
    logging::init();
    
    // Set up graceful shutdown handling
    let shutdown_handler = signals::setup_shutdown_handler();
    
    // Parse CLI arguments
    let cli = Cli::parse();
    
    // Execute main application logic
    let result = tokio::select! {
        result = run_app(cli) => result,
        _ = shutdown_handler => {
            log::info!("Received shutdown signal, cleaning up...");
            Ok(())
        }
    };
    
    if let Err(err) = result {
        log::error!("Application error: {:?}", err);
        eprintln!("Error: {}", err);
        process::exit(1);
    }
}

async fn run_app(cli: Cli) -> Result<()> {
    log::debug!("Starting application with args: {:?}", cli);
    
    match cli.command {
        commands::Commands::Init(args) => commands::init::execute(args).await,
        commands::Commands::Status(args) => commands::status::execute(args).await,
    }
}
```

STEP 5: Implement CLI structure with clap derive patterns

**CLI Argument Parsing (src/cli.rs):**

```rust
use clap::{Parser, Subcommand};
use std::path::PathBuf;

#[derive(Parser)]
#[command(name = "$ARGUMENTS")]
#[command(about = "A modern CLI application", long_about = None)]
#[command(version, author)]
pub struct Cli {
    /// Enable verbose output (-v, -vv, -vvv)
    #[arg(short, long, action = clap::ArgAction::Count)]
    pub verbose: u8,
    
    /// Configuration file path
    #[arg(short, long, value_name = "FILE")]
    pub config: Option<PathBuf>,
    
    /// Disable colored output
    #[arg(long)]
    pub no_color: bool,
    
    /// Output format
    #[arg(long, value_enum, default_value_t = OutputFormat::Human)]
    pub format: OutputFormat,
    
    #[command(subcommand)]
    pub command: crate::commands::Commands,
}

#[derive(clap::ValueEnum, Clone, Debug)]
pub enum OutputFormat {
    Human,
    Json,
    Yaml,
}
```

STEP 6: Create modular command structure with async support

**Commands Module (src/commands/mod.rs):**

```rust
use clap::Subcommand;
use anyhow::Result;

pub mod init;
pub mod status;

#[derive(Subcommand)]
pub enum Commands {
    /// Initialize a new project or configuration
    Init(init::InitArgs),
    
    /// Show current status and information
    Status(status::StatusArgs),
}

// Common command result type
pub type CommandResult = Result<()>;

// Shared command utilities
pub mod utils {
    use colored::*;
    use indicatif::{ProgressBar, ProgressStyle};
    
    pub fn success_message(msg: &str) {
        println!("{} {}", "✓".green().bold(), msg);
    }
    
    pub fn error_message(msg: &str) {
        eprintln!("{} {}", "✗".red().bold(), msg);
    }
    
    pub fn create_progress_bar(len: u64, message: &str) -> ProgressBar {
        let pb = ProgressBar::new(len);
        pb.set_style(
            ProgressStyle::default_bar()
                .template("{spinner:.green} [{elapsed_precise}] [{bar:40.cyan/blue}] {pos}/{len} {msg}")
                .unwrap()
                .progress_chars("#>-")
        );
        pb.set_message(message.to_string());
        pb
    }
}
```

STEP 7: Implement robust error handling and logging

**Error Types (src/error.rs):**

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum CliError {
    #[error("Configuration error: {0}")]
    Config(String),
    
    #[error("IO operation failed: {0}")]
    Io(#[from] std::io::Error),
    
    #[error("Serialization error: {0}")]
    Serde(#[from] serde_json::Error),
    
    #[error("Invalid argument: {message}")]
    InvalidArgument { message: String },
    
    #[error("Operation failed: {message}")]
    OperationFailed { message: String },
}

pub type Result<T> = std::result::Result<T, CliError>;
```

**Logging Setup (src/utils/logging.rs):**

```rust
use env_logger::{Builder, Target};
use log::LevelFilter;
use std::io::Write;

pub fn init() {
    let mut builder = Builder::from_default_env();
    
    builder
        .target(Target::Stderr)
        .filter_level(LevelFilter::Info)
        .format(|buf, record| {
            writeln!(
                buf,
                "[{}] {}: {}",
                record.level(),
                record.target(),
                record.args()
            )
        })
        .init();
}

pub fn set_level_from_verbosity(verbosity: u8) {
    let level = match verbosity {
        0 => LevelFilter::Warn,
        1 => LevelFilter::Info,
        2 => LevelFilter::Debug,
        _ => LevelFilter::Trace,
    };
    
    log::set_max_level(level);
}
```

STEP 8: Add signal handling and graceful shutdown

**Signal Handling (src/utils/signals.rs):**

```rust
use anyhow::Result;
use tokio::signal;

pub async fn setup_shutdown_handler() -> Result<()> {
    #[cfg(unix)]
    {
        let mut sigterm = signal::unix::signal(signal::unix::SignalKind::terminate())?;
        let mut sigint = signal::unix::signal(signal::unix::SignalKind::interrupt())?;
        
        tokio::select! {
            _ = sigterm.recv() => {
                log::info!("Received SIGTERM");
            },
            _ = sigint.recv() => {
                log::info!("Received SIGINT");
            },
        }
    }
    
    #[cfg(windows)]
    {
        signal::ctrl_c().await?;
        log::info!("Received Ctrl+C");
    }
    
    Ok(())
}
```

STEP 9: Create comprehensive testing structure

**Integration Tests (tests/integration/cli_tests.rs):**

```rust
use assert_cmd::Command;
use predicates::prelude::*;
use tempfile::TempDir;

#[test]
fn test_cli_help() {
    let mut cmd = Command::cargo_bin(env!("CARGO_PKG_NAME")).unwrap();
    cmd.arg("--help")
        .assert()
        .success()
        .stdout(predicate::str::contains("A modern CLI application"));
}

#[test]
fn test_cli_version() {
    let mut cmd = Command::cargo_bin(env!("CARGO_PKG_NAME")).unwrap();
    cmd.arg("--version")
        .assert()
        .success()
        .stdout(predicate::str::contains(env!("CARGO_PKG_VERSION")));
}

#[test]
fn test_init_command() {
    let temp_dir = TempDir::new().unwrap();
    let mut cmd = Command::cargo_bin(env!("CARGO_PKG_NAME")).unwrap();
    
    cmd.arg("init")
        .current_dir(&temp_dir)
        .assert()
        .success();
}

#[test]
fn test_invalid_subcommand() {
    let mut cmd = Command::cargo_bin(env!("CARGO_PKG_NAME")).unwrap();
    cmd.arg("invalid-command")
        .assert()
        .failure()
        .stderr(predicate::str::contains("error"));
}
```

STEP 10: Generate comprehensive documentation and configuration

**Production README.md:**

````markdown
# $ARGUMENTS

A modern CLI application built with Rust.

## Quick Start

```bash
cargo install --path .
$ARGUMENTS --help
```
````

## Commands

- `$ARGUMENTS init` - Initialize configuration
- `$ARGUMENTS status` - Show current status

## Development

```bash
cargo test          # Run tests
cargo run -- --help # Run locally
cargo build --release # Build optimized binary
```

## Configuration

Configuration file location: `~/.config/$ARGUMENTS/config.toml`

````
CATCH (project_creation_failed):

- LOG error details to session state
- PROVIDE troubleshooting guidance
- SUGGEST alternative approaches
- CLEANUP partial project state if needed

FINALLY:

- UPDATE session state with completion status
- PROVIDE next steps for development
- SUGGEST additional features to implement
- SAVE project template for future reference

STEP 11: Validate project structure and provide usage guidance

```bash
# Verify project structure
echo "📁 Project structure:"
fd . $ARGUMENTS -t d | head -10

echo "\n📄 Key files created:"
fd . $ARGUMENTS -t f | rg '\.(rs|toml|md)$' | head -10

echo "\n🧪 Run initial tests:"
cd $ARGUMENTS && cargo test

echo "\n🚀 Build and run:"
cd $ARGUMENTS && cargo run -- --help
````

**Development Workflow Recommendations:**

1. **Start Development**: `cd $ARGUMENTS && cargo run -- --help`
2. **Add Commands**: Extend `src/commands/` with new subcommands
3. **Configure CI**: Add GitHub Actions for testing and releases
4. **Add Features**: Implement interactive prompts, progress bars, and configuration
5. **Test Thoroughly**: Run `cargo test` and `cargo clippy` regularly
6. **Document**: Update README.md with usage examples

**Modern Rust CLI Best Practices Implemented:**

- ✅ Clap v4 with derive macros for type-safe argument parsing
- ✅ Async/await support with Tokio runtime
- ✅ Comprehensive error handling with anyhow and thiserror
- ✅ Structured logging with env_logger
- ✅ Graceful shutdown with signal handling
- ✅ Terminal UI with colored output and progress indicators
- ✅ Integration testing with assert_cmd
- ✅ Production-ready dependencies and configuration
- ✅ Modular architecture for extensibility
- ✅ Human-friendly panic messages
- ✅ Cross-platform compatibility

This scaffold provides a robust foundation for building production-ready CLI applications following modern Rust practices and industry standards.