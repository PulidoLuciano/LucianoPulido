package testutil

import (
	"context"
	"database/sql"
	"os"
	"testing"

	_ "github.com/lib/pq"
)

func SetupTestDB(t *testing.T) *sql.DB {
	t.Helper()

	url := os.Getenv("DATABASE_URL_TEST")
	if url == "" {
		url = "postgres://postgres:postgres@localhost:5433/lucianopulido_test?sslmode=disable"
	}

	db, err := sql.Open("postgres", url)
	if err != nil {
		t.Skipf("skipping integration test: cannot open test database: %v", err)
	}

	if err := db.Ping(); err != nil {
		t.Cleanup(func() { db.Close() })
		t.Skipf("skipping integration test: cannot ping test database: %v", err)
	}

	runMigrations(t, db)

	t.Cleanup(func() {
		truncateAllTables(t, db)
		db.Close()
	})

	return db
}

func runMigrations(t *testing.T, db *sql.DB) {
	t.Helper()

	migrations := []string{
		migration001,
		migration002,
	}

	for i, m := range migrations {
		if _, err := db.ExecContext(context.Background(), m); err != nil {
			t.Fatalf("failed to execute migration %d: %v", i+1, err)
		}
	}
}

func truncateAllTables(t *testing.T, db *sql.DB) {
	t.Helper()

	tables := []string{
		"login_attempts",
		"admin_sessions",
		"admins",
		"post_views",
		"post_categories",
		"post_translations",
		"posts",
		"category_translations",
		"categories",
	}

	for _, table := range tables {
		if _, err := db.ExecContext(context.Background(), "DELETE FROM "+table); err != nil {
			t.Logf("warning: failed to truncate table %s: %v", table, err)
		}
	}
}

const migration001 = `
CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    image_url TEXT,
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS post_translations (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    language_code VARCHAR(3) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    UNIQUE(post_id, language_code)
);

CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category_translations (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    language_code VARCHAR(3) NOT NULL,
    name VARCHAR(255) NOT NULL,
    UNIQUE(category_id, language_code)
);

CREATE TABLE IF NOT EXISTS post_categories (
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY(post_id, category_id)
);

CREATE TABLE IF NOT EXISTS post_views (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    country_code VARCHAR(5),
    city VARCHAR(100),
    read_time_seconds INT,
    max_scroll_percent FLOAT,
    visitor_hash VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS admins (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_sessions (
    token VARCHAR(64) PRIMARY KEY,
    admin_id BIGINT NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_post_translations_post_id ON post_translations(post_id);
CREATE INDEX IF NOT EXISTS idx_post_translations_lang ON post_translations(language_code);
CREATE INDEX IF NOT EXISTS idx_post_views_post_id ON post_views(post_id);
CREATE INDEX IF NOT EXISTS idx_post_categories_post_id ON post_categories(post_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
`

const migration002 = `
CREATE TABLE IF NOT EXISTS login_attempts (
    email VARCHAR(255) NOT NULL,
    attempted_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
`
