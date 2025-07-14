---
allowed-tools: Write, Bash(cargo:*), Bash(mkdir:*), Bash(cd:*), Bash(gdate:*), Bash(jq:*), Bash(pwd:*), Bash(eza:*), Bash(fd:*)
name: "Scaffold Rust Axum"
description: "Scaffold production-ready Rust Axum web server with modern async patterns, dependency injection, and comprehensive testing setup"
author: "wcygan"
tags: ["scaffold","rust"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Target project name: $ARGUMENTS
- Current directory: !`pwd`
- Rust toolchain: !`rustc --version 2>/dev/null || echo "Rust not installed - install via rustup"`
- Cargo version: !`cargo --version 2>/dev/null || echo "Cargo not available"`
- Available disk space: !`df -h . | tail -1 | awk '{print $4}' 2>/dev/null || echo "Unknown"`
- Directory contents: !`eza -la . 2>/dev/null | head -5 || ls -la . | head -5`

## Your Task

STEP 1: Initialize session state and validate prerequisites

- CREATE session state file: `/tmp/scaffold-rust-axum-$SESSION_ID.json`
- VALIDATE Rust toolchain installation
- CHECK project name validity (alphanumeric, hyphens, underscores only)
- ENSURE target directory doesn't already exist
- VERIFY sufficient disk space for project creation

```bash
# Initialize scaffold session state
echo '{
  "sessionId": "'$SESSION_ID'",
  "projectName": "'$ARGUMENTS'",
  "timestamp": "'$(gdate -Iseconds 2>/dev/null || date -Iseconds)'",
  "phase": "initialization",
  "components": [],
  "dependencies": {}
}' > /tmp/scaffold-rust-axum-$SESSION_ID.json
```

STEP 2: Project structure creation with modern Rust patterns

TRY:

- CREATE project directory with proper ownership
- INITIALIZE Cargo project with workspace configuration
- SET UP modern project structure following Rust best practices
- CONFIGURE development environment optimizations

**Modern Rust Axum Project Structure:**

```
$ARGUMENTS/
├── Cargo.toml              # Workspace configuration
├── .gitignore              # Comprehensive Rust gitignore
├── README.md               # Concise project documentation
├── docker-compose.yml      # Development services (Postgres, DragonflyDB)
├── src/
│   ├── main.rs            # Application entry point
│   ├── lib.rs             # Library interface
│   ├── config/            # Configuration management
│   │   ├── mod.rs
│   │   └── database.rs
│   ├── handlers/          # HTTP request handlers
│   │   ├── mod.rs
│   │   ├── health.rs
│   │   └── api/
│   ├── models/            # Data models and types
│   │   └── mod.rs
│   ├── services/          # Business logic layer
│   │   └── mod.rs
│   ├── middleware/        # Custom middleware
│   │   └── mod.rs
│   └── utils/             # Utility functions
│       └── mod.rs
├── tests/                 # Integration tests
│   ├── common/
│   │   └── mod.rs
│   └── integration_test.rs
└── benches/               # Performance benchmarks
    └── api_bench.rs
```

**Cargo.toml with Modern Dependencies:**

```toml
[package]
name = "$ARGUMENTS"
version = "0.1.0"
edition = "2021"
rust-version = "1.70"
authors = ["Your Name <your.email@example.com>"]
description = "Production-ready Axum web server"
license = "MIT OR Apache-2.0"
repository = "https://github.com/yourusername/$ARGUMENTS"
keywords = ["axum", "web", "api", "async"]
categories = ["web-programming::http-server"]

[dependencies]
# Core web framework
axum = { version = "0.7", features = ["macros", "json", "query", "form"] }
tokio = { version = "1.0", features = ["full"] }
tower = { version = "0.4", features = ["util", "timeout", "load-shed", "limit"] }
tower-http = { version = "0.5", features = ["add-extension", "cors", "compression-gzip", "trace"] }
hyper = { version = "1.0", features = ["full"] }

# Serialization
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# Database (Postgres focus)
sqlx = { version = "0.7", features = ["runtime-tokio-rustls", "postgres", "uuid", "chrono", "json"] }
uuid = { version = "1.0", features = ["v4", "serde"] }

# Configuration
config = "0.14"
envconfig = "0.10"

# Observability
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter", "json"] }
tracing-opentelemetry = "0.22"
opentelemetry = "0.21"

# Error handling
anyhow = "1.0"
thiserror = "1.0"

# Security
argon2 = "0.5"
jsonwebtoken = "9.0"

# Time
chrono = { version = "0.4", features = ["serde"] }

[dev-dependencies]
# Testing
tokio-test = "0.4"
axum-test = "14.0"
httpc-test = "0.1"

# Benchmarking
criterion = { version = "0.5", features = ["html_reports"] }

[[bench]]
name = "api_bench"
harness = false

[profile.dev]
opt-level = 0
debug = true

[profile.release]
opt-level = 3
lto = true
codegen-units = 1
panic = "abort"

[profile.test]
opt-level = 1
```

STEP 3: Core application implementation with dependency injection

**Main Application (src/main.rs):**

```rust
//! Production-ready Axum web server with modern async patterns

use axum::{
    extract::State,
    response::Html,
    routing::{get, post},
    Json, Router,
};
use std::net::SocketAddr;
use tower::ServiceBuilder;
use tower_http::{
    cors::CorsLayer,
    compression::CompressionLayer,
    trace::TraceLayer,
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod config;
mod handlers;
mod middleware;
mod models;
mod services;
mod utils;

use config::AppConfig;

#[derive(Clone)]
pub struct AppState {
    config: AppConfig,
    // Add database pool, redis client, etc.
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "$ARGUMENTS=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Load configuration
    let config = AppConfig::from_env()?;
    
    // Initialize application state
    let state = AppState {
        config: config.clone(),
    };

    // Build application router
    let app = create_router(state);

    // Start server
    let addr = SocketAddr::from(([127, 0, 0, 1], config.port));
    tracing::info!("Server starting on {}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;
    
    Ok(())
}

fn create_router(state: AppState) -> Router {
    Router::new()
        .route("/", get(handlers::root))
        .route("/health", get(handlers::health::health_check))
        .route("/api/v1/ping", get(handlers::api::ping))
        .with_state(state)
        .layer(
            ServiceBuilder::new()
                .layer(TraceLayer::new_for_http())
                .layer(CompressionLayer::new())
                .layer(CorsLayer::permissive())
                .into_inner(),
        )
}
```

STEP 4: Comprehensive handler implementation

**Health Check Handler (src/handlers/health.rs):**

```rust
use axum::{extract::State, Json};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

use crate::AppState;

#[derive(Serialize, Deserialize)]
pub struct HealthResponse {
    status: String,
    timestamp: chrono::DateTime<chrono::Utc>,
    version: String,
    dependencies: HashMap<String, String>,
}

pub async fn health_check(State(_state): State<AppState>) -> Json<HealthResponse> {
    let mut dependencies = HashMap::new();
    dependencies.insert("database".to_string(), "ok".to_string());
    dependencies.insert("cache".to_string(), "ok".to_string());
    
    Json(HealthResponse {
        status: "healthy".to_string(),
        timestamp: chrono::Utc::now(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        dependencies,
    })
}
```

STEP 5: Configuration management and environment setup

**Configuration Module (src/config/mod.rs):**

```rust
use envconfig::Envconfig;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Envconfig)]
pub struct AppConfig {
    #[envconfig(from = "PORT", default = "3000")]
    pub port: u16,
    
    #[envconfig(from = "DATABASE_URL", default = "postgres://localhost/$ARGUMENTS")]
    pub database_url: String,
    
    #[envconfig(from = "REDIS_URL", default = "redis://localhost:6379")]
    pub redis_url: String,
    
    #[envconfig(from = "LOG_LEVEL", default = "info")]
    pub log_level: String,
    
    #[envconfig(from = "JWT_SECRET")]
    pub jwt_secret: Option<String>,
}

impl AppConfig {
    pub fn from_env() -> anyhow::Result<Self> {
        Ok(Self::init_from_env()?)
    }
}
```

STEP 6: Docker Compose for development services

**docker-compose.yml:**

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: $ARGUMENTS
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev"]
      interval: 10s
      timeout: 5s
      retries: 5

  dragonflydb:
    image: docker.dragonflydb.io/dragonflydb/dragonfly:latest
    ports:
      - "6379:6379"
    command: >
      --logtostderr
      --requirepass=dev
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "dev", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

STEP 7: Comprehensive testing setup

**Integration Test (tests/integration_test.rs):**

```rust
use axum_test::TestServer;
use serde_json::Value;

mod common;

#[tokio::test]
async fn test_health_endpoint() {
    let app = $ARGUMENTS::create_router($ARGUMENTS::AppState {
        config: $ARGUMENTS::config::AppConfig::from_env().unwrap(),
    });
    
    let server = TestServer::new(app).unwrap();
    
    let response = server.get("/health").await;
    response.assert_status_ok();
    
    let health: Value = response.json();
    assert_eq!(health["status"], "healthy");
}

#[tokio::test]
async fn test_root_endpoint() {
    let app = $ARGUMENTS::create_router($ARGUMENTS::AppState {
        config: $ARGUMENTS::config::AppConfig::from_env().unwrap(),
    });
    
    let server = TestServer::new(app).unwrap();
    
    let response = server.get("/").await;
    response.assert_status_ok();
    response.assert_text("Hello, $ARGUMENTS!");
}
```

CATCH (scaffold_failed):

- LOG error details to session state
- PROVIDE debugging information
- SUGGEST manual recovery steps
- CLEAN UP partial project creation

```bash
echo "⚠️ Scaffolding failed. Debugging information:"
echo "Rust toolchain: $(rustc --version 2>&1)"
echo "Cargo status: $(cargo --version 2>&1)"
echo "Directory permissions: $(ls -la . | head -1)"
echo "Available space: $(df -h . | tail -1)"
```

STEP 8: Project initialization and validation

- CHANGE to project directory
- RUN `cargo check` to validate project structure
- RUN `cargo test` to verify test setup
- START development services with `docker compose up -d`
- UPDATE session state with completion status

```bash
# Validate project creation
echo "✅ Project scaffolding completed"
echo "📁 Project: $ARGUMENTS"
echo "🦀 Rust version: $(rustc --version)"
echo "📦 Dependencies: $(cargo metadata --format-version 1 | jq '.packages | length') packages"
echo "🧪 Test status: $(cargo test --quiet 2>&1 | tail -1)"
echo "⏱️ Session: $SESSION_ID"
```

FINALLY:

- SAVE session state with completion timestamp
- PROVIDE next steps guidance for development
- SUGGEST useful cargo commands for development workflow
- CLEAN UP temporary session files

## Development Workflow

### Essential Commands

```bash
# Development
cargo run                    # Start development server
cargo watch -x run           # Auto-reload on changes
cargo test                   # Run all tests
cargo test --test integration_test  # Run specific test

# Services
docker compose up -d         # Start development services
docker compose down          # Stop services

# Code Quality
cargo fmt                    # Format code
cargo clippy                 # Lint code
cargo audit                  # Security audit
cargo bench                  # Run benchmarks

# Database
sqlx migrate add create_users_table  # Add migration
sqlx migrate run             # Apply migrations
```

### Production Features

- **Modern Axum Framework**: Latest async/await patterns with middleware stack
- **Database Integration**: SQLx with Postgres, migrations, connection pooling
- **Configuration Management**: Environment-based config with validation
- **Observability**: Structured logging with tracing, OpenTelemetry ready
- **Security**: Argon2 password hashing, JWT authentication scaffolding
- **Testing**: Integration tests with test server, benchmarking setup
- **Development Services**: Docker Compose with Postgres and DragonflyDB
- **Code Quality**: Clippy, rustfmt, security auditing configuration

### Next Steps

1. **Customize Configuration**: Update `src/config/mod.rs` with your specific needs
2. **Add Database Models**: Implement your data models in `src/models/`
3. **Implement Business Logic**: Add services in `src/services/`
4. **Create API Endpoints**: Extend handlers in `src/handlers/api/`
5. **Add Authentication**: Implement JWT middleware and user management
6. **Configure Deployment**: Set up production Docker, Kubernetes, or cloud deployment

This scaffold provides a production-ready foundation following Rust and Axum best practices with comprehensive testing, observability, and modern development workflows.