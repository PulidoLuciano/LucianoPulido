-- 001_initial_schema.up.sql
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
