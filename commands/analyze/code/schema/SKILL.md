---
allowed-tools: Read, Write, Edit, Bash, Task
name: "Schema"
description: "Ultra-fast parallel database schema analysis using 8 sub-agents for comprehensive coverage"
author: "wcygan"
tags: ["analyze","code"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Git status: !`git status --porcelain || echo "Not a git repository"`
- Project files: !`ls -la | grep -E "(deno\.json|package\.json|Cargo\.toml|go\.mod)" || echo "No common project files found"`
- Database config files: !`fd -t f -e sql -e yml -e yaml -e toml | grep -E "(database|diesel|migrate)" | head -5 || echo "No database config files found"`
- Migration directories: !`fd -t d migration | head -3 || echo "No migration directories found"`

## Your task

**IMMEDIATELY DEPLOY 8 PARALLEL SUB-AGENTS** for instant comprehensive database analysis

STEP 1: Initialize Schema Management Session

Arguments: $ARGUMENTS

- Create session state file: `/tmp/schema-state-$SESSION_ID.json`
- Initialize results directory: `/tmp/schema-results-$SESSION_ID/`

STEP 2: **LAUNCH ALL 8 AGENTS SIMULTANEOUSLY**

**NO SEQUENTIAL ANALYSIS** - All agents work in parallel:

1. **Schema Discovery Agent**: Analyze existing database schemas and tables
2. **Migration Analysis Agent**: Scan migration history and pending changes
3. **ORM Detection Agent**: Identify ORM frameworks and patterns
4. **Relationship Mapping Agent**: Map foreign keys and constraints
5. **CRUD Generation Agent**: Generate repository patterns for all entities
6. **Data Seeding Agent**: Create realistic test data generators
7. **Index Optimization Agent**: Analyze query patterns and indexes
8. **API Generation Agent**: Create REST/GraphQL endpoints

Each agent saves results to: `/tmp/schema-results-$SESSION_ID/agent-N.json`

**Expected speedup: 8x faster schema analysis and code generation**

Analyze current project to determine:

- Database tool (golang-migrate, diesel, flyway, etc.)
- ORM framework (sqlx, gorm, diesel, spring-data, etc.)
- Database type (postgres, mysql, sqlite)
- Existing schema structure
- Migration state

Create context file: `/tmp/schema-context-$SESSION_ID.json`

STEP 3: Execute specific action based on detected context

CASE action:
WHEN "migration":

- Generate migration files with UP/DOWN scripts
- Use detected migration tool format
- Create timestamped migration files
- CHECKPOINT: Save migration details to state file

WHEN "crud_generation":

- Analyze model structures
- Generate repository/DAO patterns
- Create CRUD operations in detected language
- Follow existing code patterns

WHEN "data_seeding":

- Generate realistic test data
- Maintain foreign key relationships
- Create seed scripts for detected database
- Environment safety checks

WHEN "schema_analysis":

- Map existing schema structure
- Identify relationships and constraints
- Generate schema documentation
- Find optimization opportunities

STEP 4: Handle framework-specific implementation

Database Tool Detection:

- Go: golang-migrate, goose, atlas, ent
- Rust: diesel, sqlx, sea-orm
- Java: Flyway, Liquibase, JPA/Hibernate
- Node/Deno: Prisma, TypeORM, Drizzle

ORM Pattern Recognition:

- Repository pattern (Go, Java)
- Active Record pattern (Ruby, some JS ORMs)
- Query Builder pattern (Rust sqlx)
- Data Mapper pattern (TypeORM)

STEP 5: Generate appropriate code/files

Based on detected tools and patterns:

- Create migration files with proper naming
- Generate CRUD boilerplate following conventions
- Create seed scripts with realistic data
- Update configuration files if needed

STEP 6: Validation and safety checks

- Validate generated SQL syntax
- Check for environment safety (no production operations)
- Verify foreign key constraints
- Test generated code compilation

STEP 7: Report results and cleanup

- Show summary of generated files
- Provide next steps (run migrations, test code, etc.)
- Clean up temporary files
- Update state tracking

## Framework-Specific Templates

### Go with golang-migrate

```sql
-- migrations/000001_create_users.up.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- migrations/000001_create_users.down.sql
DROP TABLE users;
```

### Rust with Diesel

```rust
// migrations/create_users/up.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Java with Flyway

```sql
-- V1__Create_users_table.sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## CRUD Generation Examples

### Go Repository Pattern

```go
type UserRepository struct {
    db *sqlx.DB
}

func (r *UserRepository) Create(ctx context.Context, user *User) error {
    query := `INSERT INTO users (email) VALUES ($1) RETURNING id`
    return r.db.QueryRowContext(ctx, query, user.Email).Scan(&user.ID)
}
```

### Rust with sqlx

```rust
impl UserRepository {
    pub async fn create(&self, user: &User) -> Result<User, sqlx::Error> {
        let row = sqlx::query_as!(
            User,
            "INSERT INTO users (email) VALUES ($1) RETURNING *",
            user.email
        )
        .fetch_one(&self.pool)
        .await?;
        Ok(row)
    }
}
```

### Java Spring Data

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

## State Management

Session state file: `/tmp/schema-state-$SESSION_ID.json`

```json
{
  "session_id": "$SESSION_ID",
  "action": "migration",
  "detected_tools": ["golang-migrate", "sqlx"],
  "database_type": "postgres",
  "generated_files": [
    "migrations/000001_create_users.up.sql",
    "migrations/000001_create_users.down.sql"
  ],
  "status": "completed"
}
```

## Error Handling

TRY:

- Execute primary operation
- Validate generated code
  CATCH (missing dependencies):
- List required tools/packages
- Provide installation instructions
  CATCH (syntax errors):
- Show specific error details
- Suggest corrections
  FINALLY:
- Clean up temporary files
- Update progress tracking

## Safety Features

- Environment detection (prevent production operations)
- Backup recommendations before destructive operations
- Dry run mode for preview
- Transaction wrapping for migrations
- Foreign key constraint validation