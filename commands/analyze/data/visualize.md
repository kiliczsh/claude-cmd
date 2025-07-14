---
allowed-tools: Read, Grep, Bash(fd:*), Bash(rg:*), Bash(bat:*), Bash(jq:*), Bash(git:*), Bash(gdate:*), Write, Task
name: "Visualize"
description: "Generate explanatory diagrams from code and architecture analysis"
author: "wcygan"
tags: ["analyze","data"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

# /visualize

## Context

- Session ID: !`gdate +%s%N`
- Current directory: !`pwd`
- Target: $ARGUMENTS
- Project structure: !`fd . -t d -d 3 | head -10`
- Code files: !`fd "\.(go|rs|ts|js|py|java|cpp|c)$" . | wc -l | tr -d ' ' || echo "0"`
- Config files: !`fd "(docker-compose|kubernetes|k8s)" . -t f | head -5 || echo "No infrastructure configs"`
- Database models: !`rg "(struct|class|interface|type).*\{" --type-add 'code:*.{go,rs,ts,js,py,java}' -t code | head -5 || echo "No models found"`
- Git status: !`git status --porcelain | head -5 || echo "Not a git repository"`
- Documentation: !`fd "docs|documentation" . -t d | head -3 || echo "No docs directory"`

## Your Task

STEP 1: Initialize Visualization Session

- Create session state file: /tmp/visualize-$SESSION_ID.json
- Initialize analysis registry and diagram queue
- Setup output directory: docs/diagrams/
- Determine visualization scope from $ARGUMENTS

STEP 2: Analyze Target and Determine Diagram Types

IF $ARGUMENTS contains specific function/method:

- Focus on code flow visualization
- Generate function flowcharts
- Analyze control flow and decision points

ELSE IF $ARGUMENTS contains database/model patterns:

- Generate Entity Relationship Diagrams
- Map table relationships and constraints
- Analyze schema dependencies

ELSE IF $ARGUMENTS contains infrastructure configs:

- Create system architecture diagrams
- Map service dependencies
- Generate deployment topology

ELSE IF $ARGUMENTS contains API/handler patterns:

- Generate sequence diagrams
- Map request/response flows
- Analyze service interactions

ELSE IF $ARGUMENTS is directory or broad scope:

- Use extended thinking to determine optimal visualization strategy
- Consider sub-agent delegation for large codebases:
  - Agent 1: Code flow analysis
  - Agent 2: Database schema mapping
  - Agent 3: System architecture discovery
  - Agent 4: API interaction analysis
- Generate comprehensive diagram suite

STEP 3: Execute Analysis and Generation

FOR EACH diagram type identified:

- Analyze relevant code patterns
- Extract relationships and dependencies
- Generate Mermaid.js diagram syntax
- Create markdown file with embedded diagram
- Add interactive elements and complexity annotations

STEP 4: Output and Documentation

- Save diagrams to docs/diagrams/ directory
- Create index file linking all generated diagrams
- Add source links and explanatory text
- Update session state with completion status

## Diagram Types Generated:

#### 1. Code Flow Visualization

Analyzes function and method logic to create flowcharts:

**Function Analysis:**

```go
// Example Go function
func ProcessPayment(userID string, amount float64, paymentMethod string) (*Payment, error) {
    user, err := GetUser(userID)
    if err != nil {
        return nil, fmt.Errorf("user not found: %w", err)
    }
    
    if user.Balance < amount {
        return nil, errors.New("insufficient funds")
    }
    
    if paymentMethod == "credit_card" {
        if !ValidateCreditCard(user.CreditCard) {
            return nil, errors.New("invalid credit card")
        }
    }
    
    payment := &Payment{
        UserID: userID,
        Amount: amount,
        Method: paymentMethod,
        Status: "pending",
    }
    
    if err := SavePayment(payment); err != nil {
        return nil, fmt.Errorf("failed to save payment: %w", err)
    }
    
    if err := ProcessExternalPayment(payment); err != nil {
        payment.Status = "failed"
        SavePayment(payment)
        return nil, fmt.Errorf("external payment failed: %w", err)
    }
    
    payment.Status = "completed"
    SavePayment(payment)
    
    return payment, nil
}
```

**Generated Flowchart:**

```mermaid
flowchart TD
    A[Start: ProcessPayment] --> B[Get User by ID]
    B --> C{User Found?}
    C -->|No| D[Return Error: User Not Found]
    C -->|Yes| E{Sufficient Balance?}
    E -->|No| F[Return Error: Insufficient Funds]
    E -->|Yes| G{Payment Method == Credit Card?}
    G -->|Yes| H[Validate Credit Card]
    H --> I{Valid Credit Card?}
    I -->|No| J[Return Error: Invalid Credit Card]
    I -->|Yes| K[Create Payment Object]
    G -->|No| K
    K --> L[Save Payment to Database]
    L --> M{Save Successful?}
    M -->|No| N[Return Error: Save Failed]
    M -->|Yes| O[Process External Payment]
    O --> P{External Payment Successful?}
    P -->|No| Q[Update Status to Failed]
    Q --> R[Save Updated Payment]
    R --> S[Return Error: External Payment Failed]
    P -->|Yes| T[Update Status to Completed]
    T --> U[Save Updated Payment]
    U --> V[Return Successful Payment]
    
    style A fill:#e1f5fe
    style D fill:#ffebee
    style F fill:#ffebee
    style J fill:#ffebee
    style N fill:#ffebee
    style S fill:#ffebee
    style V fill:#e8f5e8
```

#### 2. Database Schema Visualization

Analyzes database schemas and models to create Entity Relationship Diagrams:

**Go Struct Analysis:**

```go
type User struct {
    ID        int64     `db:"id" json:"id"`
    Email     string    `db:"email" json:"email"`
    Name      string    `db:"name" json:"name"`
    CreatedAt time.Time `db:"created_at" json:"created_at"`
    Profile   *Profile  `db:"-" json:"profile,omitempty"`
    Orders    []Order   `db:"-" json:"orders,omitempty"`
}

type Profile struct {
    ID     int64  `db:"id" json:"id"`
    UserID int64  `db:"user_id" json:"user_id"`
    Bio    string `db:"bio" json:"bio"`
    Avatar string `db:"avatar" json:"avatar"`
}

type Order struct {
    ID       int64     `db:"id" json:"id"`
    UserID   int64     `db:"user_id" json:"user_id"`
    Total    float64   `db:"total" json:"total"`
    Status   string    `db:"status" json:"status"`
    Items    []Item    `db:"-" json:"items,omitempty"`
}

type Item struct {
    ID       int64   `db:"id" json:"id"`
    OrderID  int64   `db:"order_id" json:"order_id"`
    Name     string  `db:"name" json:"name"`
    Price    float64 `db:"price" json:"price"`
    Quantity int     `db:"quantity" json:"quantity"`
}
```

**Generated ERD:**

```mermaid
erDiagram
    USER {
        int64 id PK
        string email UK
        string name
        timestamp created_at
    }
    
    PROFILE {
        int64 id PK
        int64 user_id FK
        string bio
        string avatar
    }
    
    ORDER {
        int64 id PK
        int64 user_id FK
        float64 total
        string status
        timestamp created_at
    }
    
    ITEM {
        int64 id PK
        int64 order_id FK
        string name
        float64 price
        int quantity
    }
    
    USER ||--o| PROFILE : "has one"
    USER ||--o{ ORDER : "has many"
    ORDER ||--o{ ITEM : "contains many"
```

#### 3. System Architecture Diagrams

Analyzes microservices and system interactions:

**Service Discovery:**

```yaml
# docker-compose.yml analysis
services:
  auth-service:
    image: auth:latest
    ports: ["8080:8080"]
    depends_on: [postgres, redis]

  user-service:
    image: user:latest
    ports: ["8081:8081"]
    depends_on: [postgres, auth-service]

  payment-service:
    image: payment:latest
    ports: ["8082:8082"]
    depends_on: [postgres, user-service]

  api-gateway:
    image: nginx:latest
    ports: ["80:80"]
    depends_on: [auth-service, user-service, payment-service]
```

**Generated Architecture Diagram:**

```mermaid
graph TB
    subgraph "External"
        Client[Client Apps]
        PaymentProvider[Payment Provider API]
    end
    
    subgraph "API Layer"
        Gateway[API Gateway :80]
    end
    
    subgraph "Application Services"
        Auth[Auth Service :8080]
        User[User Service :8081]
        Payment[Payment Service :8082]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL)]
        Cache[(Redis)]
    end
    
    Client --> Gateway
    Gateway --> Auth
    Gateway --> User
    Gateway --> Payment
    
    Auth --> DB
    Auth --> Cache
    User --> DB
    User --> Auth
    Payment --> DB
    Payment --> User
    Payment --> PaymentProvider
    
    style Client fill:#e3f2fd
    style Gateway fill:#f3e5f5
    style Auth fill:#e8f5e8
    style User fill:#e8f5e8
    style Payment fill:#e8f5e8
    style DB fill:#fff3e0
    style Cache fill:#fce4ec
```

#### 4. API Interaction Sequences

Analyzes API calls and interactions to create sequence diagrams:

**REST API Flow Analysis:**

```go
// Analyzed from HTTP handlers and client code
func HandleUserRegistration(w http.ResponseWriter, r *http.Request) {
    // 1. Validate input
    user := parseUserFromRequest(r)
    
    // 2. Check if user exists
    existingUser := userService.GetByEmail(user.Email)
    
    // 3. Create user
    newUser := userService.Create(user)
    
    // 4. Send welcome email
    emailService.SendWelcomeEmail(newUser.Email)
    
    // 5. Create audit log
    auditService.LogUserCreation(newUser.ID)
}
```

**Generated Sequence Diagram:**

```mermaid
sequenceDiagram
    participant Client
    participant API as API Gateway
    participant Auth as Auth Service
    participant User as User Service
    participant Email as Email Service
    participant Audit as Audit Service
    participant DB as Database
    
    Client->>+API: POST /api/users/register
    API->>+Auth: Validate API Key
    Auth->>-API: Valid
    
    API->>+User: Create User Request
    User->>+DB: Check if email exists
    DB->>-User: Email available
    
    User->>+DB: Insert new user
    DB->>-User: User created (ID: 123)
    
    User->>+Email: Send welcome email
    Email-->>-User: Email queued
    
    User->>+Audit: Log user creation
    Audit->>+DB: Insert audit record
    DB->>-Audit: Audit logged
    Audit-->>-User: Logged
    
    User->>-API: User created successfully
    API->>-Client: 201 Created
    
    Note over Email: Async email processing
    Email->>Email: Process welcome email
```

#### 5. Class and Module Relationships

Analyzes object-oriented code to show inheritance and composition:

**Rust Trait Analysis:**

```rust
trait Drawable {
    fn draw(&self);
}

trait Clickable {
    fn on_click(&self);
}

struct Button {
    text: String,
    position: Point,
}

struct Image {
    src: String,
    position: Point,
}

struct Panel {
    children: Vec<Box<dyn Drawable>>,
}

impl Drawable for Button {
    fn draw(&self) { /* implementation */ }
}

impl Clickable for Button {
    fn on_click(&self) { /* implementation */ }
}

impl Drawable for Image {
    fn draw(&self) { /* implementation */ }
}

impl Drawable for Panel {
    fn draw(&self) {
        for child in &self.children {
            child.draw();
        }
    }
}
```

**Generated Class Diagram:**

```mermaid
classDiagram
    class Drawable {
        <<trait>>
        +draw()
    }
    
    class Clickable {
        <<trait>>
        +on_click()
    }
    
    class Point {
        +x: i32
        +y: i32
    }
    
    class Button {
        +text: String
        +position: Point
        +draw()
        +on_click()
    }
    
    class Image {
        +src: String
        +position: Point
        +draw()
    }
    
    class Panel {
        +children: Vec~Box~dyn Drawable~~
        +draw()
    }
    
    Drawable <|.. Button : implements
    Clickable <|.. Button : implements
    Drawable <|.. Image : implements
    Drawable <|.. Panel : implements
    
    Button --> Point : contains
    Image --> Point : contains
    Panel --> Drawable : contains
```

### 6. Network and Infrastructure Diagrams

Analyzes Kubernetes manifests and infrastructure code:

**Kubernetes Deployment Analysis:**

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: web
          image: nginx:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 80
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            backend:
              service:
                name: web-service
                port:
                  number: 80
```

**Generated Infrastructure Diagram:**

```mermaid
graph TB
    subgraph "Internet"
        Users[Users]
    end
    
    subgraph "Kubernetes Cluster"
        subgraph "Ingress"
            Ingress[Ingress Controller<br/>app.example.com]
        end
        
        subgraph "Services"
            Service[web-service<br/>ClusterIP:80]
        end
        
        subgraph "Pods"
            Pod1[web-app-pod-1<br/>nginx:latest]
            Pod2[web-app-pod-2<br/>nginx:latest]
            Pod3[web-app-pod-3<br/>nginx:latest]
        end
    end
    
    Users --> Ingress
    Ingress --> Service
    Service --> Pod1
    Service --> Pod2
    Service --> Pod3
    
    style Users fill:#e3f2fd
    style Ingress fill:#f3e5f5
    style Service fill:#e8f5e8
    style Pod1 fill:#fff3e0
    style Pod2 fill:#fff3e0
    style Pod3 fill:#fff3e0
```

## Output Formats

### Mermaid (Default)

Generates Mermaid.js diagrams that render in GitHub, GitLab, and VS Code:

````markdown
# Function Flow Analysis

```mermaid
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
```
````

````
### PlantUML
Generates PlantUML diagrams for complex enterprise architectures:
```plantuml
@startuml
title Payment Processing Sequence

actor User
participant "Web App" as App
participant "Payment Service" as Payment
participant "Bank API" as Bank

User -> App: Submit Payment
App -> Payment: Process Payment Request
Payment -> Bank: Charge Credit Card
Bank --> Payment: Payment Confirmed
Payment --> App: Payment Success
App --> User: Display Confirmation

@enduml
````

### Graphviz DOT

Generates DOT files for complex dependency graphs:

```dot
digraph Dependencies {
    rankdir=TB;
    node [shape=box];
    
    "auth-service" -> "database";
    "user-service" -> "auth-service";
    "user-service" -> "database";
    "payment-service" -> "user-service";
    "api-gateway" -> "auth-service";
    "api-gateway" -> "user-service";
    "api-gateway" -> "payment-service";
}
```

## Usage Examples

### Function Analysis:

```
/visualize ./src/payment.go:ProcessPayment
```

### Database Schema:

```
/visualize ./models
```

### System Architecture:

```
/visualize ./docker-compose.yml
```

### API Flows:

```
/visualize ./api/handlers
```

### Complete Codebase (uses sub-agents for large projects):

```
/visualize .
```

## File Structure Created

```
project-root/
└── docs/
    └── diagrams/
        ├── payment-flow.md          # Function flowcharts
        ├── database-schema.md       # Entity relationship diagrams  
        ├── system-architecture.md   # System and service diagrams
        ├── api-sequences.md         # API interaction sequences
        ├── class-relationships.md   # Class and module diagrams
        └── infrastructure.md        # Kubernetes and infrastructure
```

## State Management

- Session files: /tmp/visualize-$SESSION_ID.json
- Analysis registry: tracks discovered patterns and relationships
- Diagram queue: manages generation workflow
- Output tracking: monitors created files and links
- Checkpoint system: enables resumable analysis for large codebases

## Advanced Features

- **Interactive Elements**: Clickable diagram nodes linking to source code
- **Complexity Metrics**: Annotated cyclomatic complexity and decision points
- **Dependency Mapping**: Circular dependency detection and warnings
- **Multi-format Output**: Mermaid.js, PlantUML, and Graphviz DOT support
- **Sub-agent Integration**: Parallel analysis for comprehensive codebase coverage

## Integration Patterns

- `/document` - Embed diagrams in generated documentation
- `/refactor` - Visualize architecture before/after changes
- `/review` - Create visual explanations for code reviews