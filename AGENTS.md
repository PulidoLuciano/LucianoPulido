# AGENTS.md

## Project Overview

Monorepo with an Astro frontend (`frontend/`) and a Go backend (`backend/`). The backend is a headless CMS and analytics engine following clean architecture with PostgreSQL.

## Build / Lint / Test Commands

### Backend (Go)

```bash
# Build all packages
go build ./...

# Run vet (static analysis)
go vet ./...

# Run all tests
go test ./...

# Run tests in a single package
go test ./internal/usecase/...

# Run a single test by name
go test ./internal/usecase/... -run TestGetPosts

# Run tests with coverage
go test ./... -coverprofile=coverage.out
go tool cover -html=coverage.out

# Auto-format code
gofmt -w ./...
goimports -w ./...

# Tidy dependencies
go mod tidy
```

### Frontend (Astro)

```bash
# Working directory: frontend/
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
```

## Code Style

### Go

**Architecture** — Follows clean architecture with strict layer boundaries. Dependency direction: `domain → port → usecase → adapter → main.go`. Never import from an outer layer into an inner one.

```
internal/
├── domain/       # Pure entities, value objects, sentinel errors. Zero external imports.
├── port/         # Repository interfaces consumed by use cases.
├── usecase/      # Application business logic. Depends only on domain and port.
├── adapter/      # Concrete implementations of ports.
│   ├── http/     # HTTP handlers, middleware, router.
│   └── repository/postgres/  # PostgreSQL repository implementations.
└── config/       # Environment-based configuration.
```

**Package naming** — Lowercase, single word. Same as directory name. Exception: `package httpadapter` in `adapter/http/` to avoid collision with `net/http`.

**Imports** — Group order: stdlib, third-party, internal. Separate groups with a blank line. Use `goimports` to auto-format.

```go
import (
    "context"
    "database/sql"

    _ "github.com/lib/pq"

    "github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
    "github.com/PulidoLuciano/LucianoPulido.git/internal/port"
)
```

**Constructors** — `NewXxx(args) *Xxx`. No interfaces for the return type; callers depend on the concrete pointer.

**Interface compliance** — Each repository implementation asserts interface satisfaction at compile time with a nil-pointer check:

```go
var _ port.PostRepository = (*PostRepo)(nil)
```

**Context** — Always the first parameter of repository and usecase methods. Domain entities never take context. Repositories pass it to `database/sql` methods (`QueryRowContext`, `ExecContext`, etc.).

**Error handling** — Domain defines sentinel errors in `domain/errors.go`:

```go
var (
    ErrNotFound     = errors.New("resource not found")
    ErrUnauthorized = errors.New("unauthorized")
    ErrInvalidInput = errors.New("invalid input")
)
```

- Repositories translate `sql.ErrNoRows` → `domain.ErrNotFound` (use `errors.Is`).
- HTTP handlers map domain errors to status codes via `mapErrorStatus()`.
- Use cases return domain errors directly; never wrap internal details.

**JSON** — Struct tags belong on usecase output types, never on domain entities. Domain entities are transport-agnostic.

**Formatting** — Tabs for indentation (go fmt standard). Run `gofmt -w ./...` before committing. No maximum line length enforced, but break long function signatures onto multiple lines with aligned parameters.

**Naming** — Exported types use PascalCase. Unexported use camelCase. Short variable names for narrow scope (`r`, `tx`, `p`). Avoid `this` or `self`; use the type's abbreviation as the receiver name (`func (r *PostRepo)`, `func (uc *PostPublicUseCase)`).

**Middleware** — Follows standard `func(http.Handler) http.Handler` pattern. Wrap each middleware as a separate function that accepts dependencies and returns a middleware function.

**Router** — Uses Go 1.22+ pattern routing: `mux.HandleFunc("METHOD /api/path/{param}", handler)`. All routes are registered in `adapter/http/router.go`.

**DI** — Manual wiring in `cmd/server/main.go`. No DI framework. Order: config → database → repositories → use cases → handlers → router.

**Logging** — Use `log/slog` structured logging. `slog.NewJSONHandler` for production. Key-value pairs after the message string.

**Secrets** — Environment variables only. No hardcoded credentials. No `.env` files committed. Config uses `os.Getenv` with fallbacks in `config/config.go`.

### Frontend (Astro)

- TypeScript strict mode (extends `astro/tsconfigs/strict`).
- ESM modules (`"type": "module"`).
- TailwindCSS v4 with `@tailwindcss/vite` plugin.
- i18n with `en` and `es` locales, prefix default locale routing.
