---
allowed-tools: Read, Write, Bash(fd:*), Bash(rg:*), Bash(jq:*), Bash(gdate:*), Task
name: "Api Docs"
description: "Generate comprehensive API documentation with OpenAPI specs and interactive sites"
author: "wcygan"
tags: ["docs","generate"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s000000000 2>/dev/null || echo "1751900987850553000"`
- Current directory: !`pwd`
- Target: $ARGUMENTS
- Project structure: !`fd . -t d -d 2 | head -10 || echo "No subdirectories found"`
- API files: !`fd "\.(js|ts|go|rs|java|py|php|cs|rb|kt|scala)$" . | wc -l | tr -d ' ' || echo "0"`
- Route patterns: !`rg "(app|router|route)\.(get|post|put|delete|patch)" . --type js --type ts --type go --type rust | wc -l | tr -d ' ' || echo "0"`
- Controller files: !`fd "(controller|handler|route)" . -t f | head -5 || echo "No controllers found"`
- Existing docs: !`fd "(openapi|swagger)\.(json|yaml|yml)$" . | head -3 || echo "No existing API docs found"`
- Package files: !`fd "(package\.json|Cargo\.toml|go\.mod|pom\.xml|requirements\.txt)" . | head -3 || echo "No package files detected"`
- Framework indicators: !`rg "(express|fastify|axum|actix|gin|echo|spring|django|flask)" . --type js --type ts --type go --type rust --type java --type python | wc -l | tr -d ' ' || echo "0"`
- Git status: !`git status --porcelain | head -3 || echo "Not a git repository"`

## Your Task

STEP 1: Initialize API documentation session

- CREATE session state file: `/tmp/api-docs-session-$SESSION_ID.json`
- SET initial state:
  ```json
  {
    "sessionId": "$SESSION_ID",
    "phase": "discovery",
    "target": "$ARGUMENTS",
    "frameworks_detected": [],
    "endpoints_found": [],
    "documentation_strategy": "auto",
    "output_formats": []
  }
  ```

STEP 2: Determine documentation scope and strategy

Think hard about the optimal documentation approach based on project complexity and framework diversity.

**Extended Thinking Areas:**

- Framework detection strategies and confidence scoring algorithms
- Multi-language API schema extraction and synthesis approaches
- Interactive documentation UX patterns and developer experience optimization
- Deployment automation and CI/CD integration for documentation maintenance
- Sub-agent coordination for large-scale API analysis and documentation generation

IF $ARGUMENTS provided:
IF $ARGUMENTS is file:

- SET scope to "single_file"
- ANALYZE specific route file for endpoint definitions
- EXTRACT authentication and middleware requirements
  ELSE IF $ARGUMENTS is directory:
- SET scope to "directory_scan"
- RECURSIVELY process all controller/handler files
- BUILD comprehensive API specification with hierarchy
  ELSE:

- SET scope to "project_wide"
- SCAN entire project for API route definitions and controllers
- DETECT existing OpenAPI/Swagger specifications
- ANALYZE framework structure for automatic documentation

STEP 3: Framework detection and analysis

TRY:

- EXECUTE systematic framework detection from Context section
- IDENTIFY primary backend framework(s) in use
- DETERMINE API pattern conventions for detected frameworks
- SAVE framework information to session state

**Framework Analysis Logic:**

CASE framework_indicators from Context:
WHEN contains "express" OR "fastify":

- SET framework to "node_express"
- SEARCH for: `fd "(routes|controllers)" --type d`
- EXTRACT patterns: `rg "(app|router)\.(get|post|put|delete|patch)" --type js --type ts -A 5`

WHEN contains "axum" OR "actix":

- SET framework to "rust_web"
- SEARCH for: `fd "src" --type d`
- EXTRACT patterns: `rg "Router::new\(\)|\.route\(|#\[axum::" --type rust -A 3`

WHEN contains "spring" OR framework indicators show Java:

- SET framework to "java_spring"
- SEARCH for: `fd "(controller|resource)" --type d`
- EXTRACT patterns: `rg "@(RestController|Path|GET|POST|PUT|DELETE)Mapping" --type java -A 3`

WHEN contains "gin" OR "echo":

- SET framework to "go_web"
- EXTRACT patterns: `rg "router\.(GET|POST|PUT|DELETE)|func.*Handler" --type go -A 3`

WHEN API files > 20 AND multiple frameworks detected:

- USE sub-agent delegation for parallel framework analysis
- DELEGATE framework-specific documentation generation

CATCH (framework_detection_failed):

- LOG detection failures to session state
- CONTINUE with generic HTTP documentation approach
- PROVIDE manual framework specification option

STEP 4: Documentation generation strategy selection

BASED ON detected frameworks and project complexity:

FOR comprehensive projects (>50 endpoints OR multiple frameworks):

**Use parallel sub-agents for optimal performance:**

```
Analyze this API codebase using 5 parallel agents:
1. Schema Analysis Agent: Extract data models, types, and validation rules
2. Endpoint Discovery Agent: Map all API routes, methods, and parameter patterns
3. Authentication Analysis Agent: Document auth flows, middleware, and security patterns
4. Response Analysis Agent: Analyze response schemas, status codes, and error handling
5. Integration Documentation Agent: Create deployment guides, testing frameworks, and CI/CD integration

Each agent should focus exclusively on their domain and provide structured output for synthesis.
```

FOR targeted projects (<50 endpoints, single framework):

- EXECUTE sequential documentation generation
- FOCUS on framework-specific patterns and conventions
- GENERATE comprehensive OpenAPI specification

STEP 5: Execute documentation generation workflow

FOR EACH detected framework:

- GENERATE framework-specific OpenAPI specifications
- CREATE interactive documentation interfaces
- EXTRACT schema definitions from code
- COMPILE multi-language code examples
- VALIDATE generated documentation completeness

STEP 6: State management and checkpoint creation

- UPDATE session state with generation progress
- CREATE checkpoint: `/tmp/api-docs-checkpoint-$SESSION_ID.json`
- SAVE generated specifications for review
- PREPARE deployment-ready documentation

FINALLY:

- ARCHIVE session data for future reference
- CLEAN UP temporary generation files
- PROVIDE documentation deployment instructions

## Framework-Specific Implementation Templates

### OpenAPI Specification Generation Patterns

**Express.js with Swagger JSDoc:**

```typescript
// Generated OpenAPI specification from Express routes
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Automatically generated API documentation",
      contact: {
        name: "API Support",
        email: "api-support@example.com",
      },
    },
    servers: [
      {
        url: process.env.API_BASE_URL || "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://api.production.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        apiKey: {
          type: "apiKey",
          in: "header",
          name: "X-API-Key",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["email", "name"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00Z",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Bad Request",
            },
            message: {
              type: "string",
              example: "Invalid input provided",
            },
            details: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const specs = swaggerJSDoc(swaggerOptions);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Number of users per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   users:
 *                     - id: "123e4567-e89b-12d3-a456-426614174000"
 *                       email: "john@example.com"
 *                       name: "John Doe"
 *                       createdAt: "2024-01-01T00:00:00Z"
 *                   pagination:
 *                     page: 1
 *                     totalPages: 5
 *                     totalItems: 50
 *       401:
 *         description: Unauthorized - Invalid or missing authentication
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, name]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newuser@example.com"
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "Jane Smith"
 *               role:
 *                 type: string
 *                 enum: [user, admin, moderator]
 *                 default: user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict - User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
```

**Rust Axum with utoipa:**

```rust
// Generated API documentation for Rust Axum
use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::Json,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use utoipa::{OpenApi, ToSchema};
use utoipa_swagger_ui::SwaggerUi;
use uuid::Uuid;

#[derive(OpenApi)]
#[openapi(
    paths(
        get_users,
        create_user,
        get_user_by_id,
        update_user,
        delete_user,
    ),
    components(
        schemas(User, CreateUserRequest, UpdateUserRequest, UserResponse, ErrorResponse)
    ),
    tags(
        (name = "users", description = "User management operations")
    ),
    security(
        ("bearer_auth" = []),
        ("api_key" = [])
    )
)]
pub struct ApiDoc;

#[derive(Serialize, Deserialize, ToSchema)]
#[schema(example = json!({
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-01T00:00:00Z"
}))]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub name: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Deserialize, ToSchema)]
#[schema(example = json!({
    "email": "newuser@example.com",
    "name": "Jane Smith"
}))]
pub struct CreateUserRequest {
    #[schema(format = Email)]
    pub email: String,
    #[schema(min_length = 2, max_length = 100)]
    pub name: String,
}

#[derive(Serialize, ToSchema)]
pub struct UserResponse {
    pub user: User,
}

#[derive(Serialize, ToSchema)]
pub struct ErrorResponse {
    pub error: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub details: Option<Vec<String>>,
}

/// Get list of users
#[utoipa::path(
    get,
    path = "/api/users",
    tag = "users",
    summary = "Retrieve a list of users",
    description = "Returns a paginated list of users with optional filtering",
    params(
        ("page" = Option<u32>, Query, description = "Page number for pagination", example = 1),
        ("limit" = Option<u32>, Query, description = "Number of users per page", example = 10),
        ("search" = Option<String>, Query, description = "Search term for filtering users")
    ),
    responses(
        (status = 200, description = "List of users retrieved successfully", body = Vec<User>),
        (status = 401, description = "Unauthorized", body = ErrorResponse),
        (status = 500, description = "Internal server error", body = ErrorResponse)
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn get_users(
    Query(params): Query<UserQueryParams>,
    State(state): State<AppState>,
) -> Result<Json<Vec<User>>, StatusCode> {
    // Implementation here
    todo!()
}

/// Create a new user
#[utoipa::path(
    post,
    path = "/api/users",
    tag = "users",
    summary = "Create a new user",
    description = "Creates a new user with the provided information",
    request_body = CreateUserRequest,
    responses(
        (status = 201, description = "User created successfully", body = UserResponse),
        (status = 400, description = "Bad request - Invalid input", body = ErrorResponse),
        (status = 409, description = "Conflict - User already exists", body = ErrorResponse)
    ),
    security(
        ("bearer_auth" = [])
    )
)]
pub async fn create_user(
    State(state): State<AppState>,
    Json(request): Json<CreateUserRequest>,
) -> Result<Json<UserResponse>, StatusCode> {
    // Implementation here
    todo!()
}

pub fn create_docs_router() -> Router<AppState> {
    Router::new()
        .merge(SwaggerUi::new("/docs").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .route("/api/users", get(get_users).post(create_user))
        .route("/api/users/:id", get(get_user_by_id).put(update_user).delete(delete_user))
}
```

### 2. Interactive Documentation Sites

**Deno Fresh Documentation Site:**

```typescript
// Generated documentation site with Deno Fresh
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  parameters: Parameter[];
  requestBody?: Schema;
  responses: Record<string, Response>;
  examples: Example[];
}

interface Parameter {
  name: string;
  in: "query" | "path" | "header";
  required: boolean;
  schema: Schema;
  description: string;
}

interface Schema {
  type: string;
  format?: string;
  example?: any;
  properties?: Record<string, Schema>;
}

interface Example {
  name: string;
  request?: any;
  response?: any;
  curl?: string;
}

export const handler: Handlers<ApiEndpoint[]> = {
  async GET(req, ctx) {
    // Parse OpenAPI specification and extract endpoints
    const spec = await loadOpenApiSpec();
    const endpoints = parseEndpoints(spec);
    return ctx.render(endpoints);
  },
};

export default function ApiDocsPage({ data: endpoints }: PageProps<ApiEndpoint[]>) {
  return (
    <>
      <Head>
        <title>API Documentation</title>
        <meta name="description" content="Interactive API documentation" />
        <link rel="stylesheet" href="/styles/api-docs.css" />
      </Head>

      <div class="api-docs">
        <nav class="sidebar">
          <h2>API Reference</h2>
          <ul>
            {endpoints.map((endpoint) => (
              <li>
                <a href={`#${endpoint.method}-${endpoint.path.replace(/[^a-zA-Z0-9]/g, "-")}`}>
                  <span class={`method ${endpoint.method.toLowerCase()}`}>
                    {endpoint.method}
                  </span>
                  {endpoint.path}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main class="content">
          <h1>API Documentation</h1>
          <p>Interactive documentation for our REST API</p>

          {endpoints.map((endpoint) => (
            <section
              id={`${endpoint.method}-${endpoint.path.replace(/[^a-zA-Z0-9]/g, "-")}`}
              class="endpoint"
            >
              <div class="endpoint-header">
                <span class={`method ${endpoint.method.toLowerCase()}`}>
                  {endpoint.method}
                </span>
                <span class="path">{endpoint.path}</span>
              </div>

              <p class="description">{endpoint.description}</p>

              {endpoint.parameters.length > 0 && (
                <div class="parameters">
                  <h3>Parameters</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoint.parameters.map((param) => (
                        <tr>
                          <td>
                            <code>{param.name}</code>
                          </td>
                          <td>{param.schema.type}</td>
                          <td>{param.required ? "Yes" : "No"}</td>
                          <td>{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div class="examples">
                <h3>Examples</h3>
                {endpoint.examples.map((example) => (
                  <div class="example">
                    <h4>{example.name}</h4>

                    {example.curl && (
                      <div class="curl-example">
                        <h5>cURL</h5>
                        <pre><code>{example.curl}</code></pre>
                        <button onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent)">
                          Copy
                        </button>
                      </div>
                    )}

                    {example.request && (
                      <div class="request-example">
                        <h5>Request Body</h5>
                        <pre><code>{JSON.stringify(example.request, null, 2)}</code></pre>
                      </div>
                    )}

                    {example.response && (
                      <div class="response-example">
                        <h5>Response</h5>
                        <pre><code>{JSON.stringify(example.response, null, 2)}</code></pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div class="try-it">
                <h3>Try it out</h3>
                <InteractiveApiTester endpoint={endpoint} />
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}

// Interactive API testing component
function InteractiveApiTester({ endpoint }: { endpoint: ApiEndpoint }) {
  return (
    <div class="api-tester">
      <form onSubmit="handleApiTest(event, this)">
        {endpoint.parameters.map((param) => (
          <div class="parameter-input">
            <label for={param.name}>{param.name}</label>
            <input
              type="text"
              id={param.name}
              name={param.name}
              placeholder={param.schema.example || `Enter ${param.name}`}
              required={param.required}
            />
          </div>
        ))}

        {endpoint.requestBody && (
          <div class="request-body">
            <label for="requestBody">Request Body</label>
            <textarea
              id="requestBody"
              name="requestBody"
              placeholder={JSON.stringify(endpoint.requestBody.example || {}, null, 2)}
              rows="10"
            >
            </textarea>
          </div>
        )}

        <button type="submit">Send Request</button>
      </form>

      <div class="response-container" style="display: none;">
        <h4>Response</h4>
        <div class="response-status"></div>
        <pre class="response-body"></pre>
      </div>
    </div>
  );
}
```

### 3. Automated Schema Extraction

**TypeScript Interface to OpenAPI:**

```typescript
// Automated schema generation from TypeScript interfaces
import * as ts from "typescript";
import { zodToJsonSchema } from "zod-to-json-schema";

interface SchemaExtractor {
  extractFromInterfaces(filePath: string): OpenAPISchema[];
  extractFromZodSchemas(filePath: string): OpenAPISchema[];
  extractFromTypeORM(filePath: string): OpenAPISchema[];
}

class TypeScriptSchemaExtractor implements SchemaExtractor {
  extractFromInterfaces(filePath: string): OpenAPISchema[] {
    const program = ts.createProgram([filePath], {});
    const sourceFile = program.getSourceFile(filePath);
    const schemas: OpenAPISchema[] = [];

    if (sourceFile) {
      ts.forEachChild(sourceFile, (node) => {
        if (ts.isInterfaceDeclaration(node)) {
          const schema = this.interfaceToSchema(node, program.getTypeChecker());
          schemas.push(schema);
        }
      });
    }

    return schemas;
  }

  private interfaceToSchema(
    node: ts.InterfaceDeclaration,
    typeChecker: ts.TypeChecker,
  ): OpenAPISchema {
    const symbol = typeChecker.getSymbolAtLocation(node.name);
    const type = typeChecker.getTypeOfSymbolAtLocation(symbol!, node);

    const properties: Record<string, any> = {};
    const required: string[] = [];

    type.getProperties().forEach((prop) => {
      const propType = typeChecker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);
      const propName = prop.getName();

      // Extract property schema
      properties[propName] = this.typeToJsonSchema(propType, typeChecker);

      // Check if property is required
      if (!(prop.flags & ts.SymbolFlags.Optional)) {
        required.push(propName);
      }
    });

    return {
      type: "object",
      properties,
      required: required.length > 0 ? required : undefined,
      title: node.name.text,
    };
  }

  private typeToJsonSchema(type: ts.Type, typeChecker: ts.TypeChecker): any {
    if (type.flags & ts.TypeFlags.String) {
      return { type: "string" };
    }
    if (type.flags & ts.TypeFlags.Number) {
      return { type: "number" };
    }
    if (type.flags & ts.TypeFlags.Boolean) {
      return { type: "boolean" };
    }
    if (typeChecker.isArrayType(type)) {
      const elementType = typeChecker.getElementTypeOfArrayType(type);
      return {
        type: "array",
        items: elementType ? this.typeToJsonSchema(elementType, typeChecker) : { type: "any" },
      };
    }

    return { type: "object" };
  }
}

// Example usage for automatic documentation
async function generateDocsFromCode(projectPath: string) {
  const extractor = new TypeScriptSchemaExtractor();

  // Extract schemas from interfaces
  const interfaces = await findTypeScriptFiles(projectPath);
  const schemas = interfaces.flatMap((file) => extractor.extractFromInterfaces(file));

  // Extract endpoints from route files
  const routes = await findRouteFiles(projectPath);
  const endpoints = routes.flatMap((file) => extractEndpoints(file));

  // Generate OpenAPI specification
  const openApiSpec = {
    openapi: "3.0.0",
    info: {
      title: "Generated API Documentation",
      version: "1.0.0",
    },
    paths: endpointsToPaths(endpoints),
    components: {
      schemas: schemasToComponents(schemas),
    },
  };

  return openApiSpec;
}
```

### 4. Multi-Language Code Examples

**Automatic Code Generation:**

```typescript
// Generate code examples in multiple languages
interface CodeExample {
  language: string;
  code: string;
  description: string;
}

class CodeExampleGenerator {
  generateExamples(endpoint: ApiEndpoint): CodeExample[] {
    return [
      this.generateJavaScript(endpoint),
      this.generatePython(endpoint),
      this.generateCurl(endpoint),
      this.generateGo(endpoint),
      this.generateRust(endpoint),
    ];
  }

  private generateJavaScript(endpoint: ApiEndpoint): CodeExample {
    const { method, path, requestBody } = endpoint;
    const hasBody = method !== "GET" && requestBody;

    const code = `// Using fetch API
const response = await fetch('${path}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }${
      hasBody
        ? `,
  body: JSON.stringify(${JSON.stringify(requestBody?.example || {}, null, 2)})`
        : ""
    }
});

const data = await response.json();
console.log(data);

// Using axios
import axios from 'axios';

const { data } = await axios.${method.toLowerCase()}('${path}'${
      hasBody ? `, ${JSON.stringify(requestBody?.example || {})}` : ""
    }, {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
});`;

    return {
      language: "javascript",
      code,
      description: "JavaScript example using fetch and axios",
    };
  }

  private generatePython(endpoint: ApiEndpoint): CodeExample {
    const { method, path, requestBody } = endpoint;
    const hasBody = method !== "GET" && requestBody;

    const code = `import requests
import json

url = '${path}'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

${
      hasBody
        ? `data = ${JSON.stringify(requestBody?.example || {}, null, 2)}

response = requests.${method.toLowerCase()}(url, headers=headers, json=data)`
        : `response = requests.${method.toLowerCase()}(url, headers=headers)`
    }

if response.status_code == 200:
    result = response.json()
    print(json.dumps(result, indent=2))
else:
    print(f"Error: {response.status_code} - {response.text}")`;

    return {
      language: "python",
      code,
      description: "Python example using requests library",
    };
  }

  private generateCurl(endpoint: ApiEndpoint): CodeExample {
    const { method, path, requestBody } = endpoint;
    const hasBody = method !== "GET" && requestBody;

    let code = `curl -X ${method} '${path}' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer YOUR_TOKEN_HERE'`;

    if (hasBody) {
      code += ` \\
  -d '${JSON.stringify(requestBody?.example || {})}'`;
    }

    return {
      language: "bash",
      code,
      description: "cURL command line example",
    };
  }
}
```

## Deployment Integration

**Generated Documentation Deployment:**

```yaml
# GitHub Actions for documentation deployment
name: Deploy API Documentation

on:
  push:
    branches: [main]
    paths: ["src/**", "docs/**"]

jobs:
  build-docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm install

      - name: Generate API documentation
        run: |
          npm run build:docs
          npm run generate:openapi

      - name: Build documentation site
        run: |
          cd docs-site
          npm install
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs-site/dist

      - name: Update README with API docs link
        run: |
          sed -i 's|API Documentation: .*|API Documentation: https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/|' README.md
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add README.md
          git diff --staged --quiet || git commit -m "Update API documentation link"
          git push
```

## Expected Output

After executing this command, you will have:

**Generated Documentation:**

1. **OpenAPI Specifications**: Complete API documentation with schemas, examples, and security definitions
2. **Interactive Documentation Sites**: Swagger UI, Redoc, or custom documentation with live testing
3. **Multi-Language Code Examples**: Client code examples in JavaScript, Python, Go, Rust, curl
4. **Schema Validation**: Request/response validation based on generated documentation
5. **API Testing Interface**: Built-in API testing capabilities with authentication support

**Deployment Ready Assets:**

6. **Deployment Configuration**: GitHub Actions, GitLab CI, or other CI/CD for automated docs
7. **Hosting Setup**: GitHub Pages, Netlify, or Vercel deployment configurations
8. **Integration Scripts**: Package.json tasks or deno.json tasks for documentation maintenance

**Development Integration:**

9. **IDE Integration**: VS Code snippets and IntelliSense for documented APIs
10. **Testing Integration**: Generated test templates based on documented endpoints
11. **Monitoring Setup**: Basic observability configuration for API usage tracking

## Integration with Other Commands

- `/test-generate-api-tests` - Generate comprehensive API tests from generated documentation
- `/load-test-api` - Performance testing for documented endpoints with realistic scenarios
- `/ci-generate-docs-pipeline` - Automated documentation updates in CI/CD workflows
- `/deploy-docs-site` - Deploy interactive documentation to hosting platforms
- `/validate-api-contracts` - Contract validation between documentation and implementation
- `/context-load-openapi` - Load OpenAPI context for further API development
- `/security-audit-api` - Security analysis based on documented endpoints and schemas

## Session State Management Schema

**State Files Created:**

- `/tmp/api-docs-session-$SESSION_ID.json` - Main documentation generation state
- `/tmp/api-docs-checkpoint-$SESSION_ID.json` - Progress checkpoint for resumability
- `/tmp/api-docs-specs-$SESSION_ID/` - Generated OpenAPI specifications directory
- `/tmp/api-docs-agents-$SESSION_ID/` - Inter-agent communication (for large projects)

**Enhanced State Schema:**

```json
{
  "sessionId": "$SESSION_ID",
  "timestamp": "ISO_8601_TIMESTAMP",
  "target": "$ARGUMENTS",
  "phase": "discovery|analysis|generation|validation|deployment|complete",
  "scope": "single_file|directory_scan|project_wide",
  "frameworks_detected": [
    {
      "name": "express|axum|spring|gin|etc",
      "confidence": "high|medium|low",
      "endpoints_count": "number",
      "file_patterns": ["list_of_relevant_files"]
    }
  ],
  "endpoints_discovered": [
    {
      "method": "GET|POST|PUT|DELETE|PATCH",
      "path": "/api/endpoint/path",
      "source_file": "path/to/source.ext",
      "line_number": "number",
      "framework": "detected_framework",
      "middleware": ["auth", "validation", "etc"],
      "parameters": ["list_of_parameters"],
      "documented": "boolean"
    }
  ],
  "documentation_outputs": [
    {
      "format": "openapi|swagger|postman|etc",
      "file_path": "generated/docs/path",
      "status": "generated|validated|deployed",
      "endpoints_covered": "number",
      "completeness_score": "percentage"
    }
  ],
  "sub_agent_coordination": {
    "agents_used": ["schema", "endpoint", "auth", "response", "integration"],
    "communication_files": ["/tmp/paths/to/agent/outputs"],
    "synthesis_complete": "boolean",
    "cross_cutting_concerns": ["shared_schemas", "common_middleware"]
  },
  "deployment_ready": {
    "interactive_site": "path/to/docs/site",
    "ci_integration": "github_actions|gitlab_ci|etc",
    "hosting_target": "github_pages|netlify|vercel|etc"
  }
}
```

**Advanced Features:**

- **Cross-Platform Session IDs**: Fallback date commands for non-GNU systems
- **Framework Auto-Detection**: Intelligent pattern matching with confidence scoring
- **Incremental Documentation**: Update existing docs without full regeneration
- **Multi-Framework Support**: Handle polyglot APIs with multiple backend languages
- **Deployment Automation**: Generate CI/CD configurations for documentation updates
- **Interactive Testing**: Built-in API testing interface in generated documentation

The documentation generation adapts to detected frameworks and provides comprehensive, interactive API documentation with automated deployment and maintenance.