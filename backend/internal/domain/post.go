package domain

import "time"

type Post struct {
	ID        int64
	Slug      string
	ImageURL  *string
	IsPublic  bool
	CreatedAt time.Time
}

type PostTranslation struct {
	ID           int64
	PostID       int64
	LanguageCode string
	Title        string
	Content      string
}

type PostWithTranslation struct {
	Post        Post
	Translation PostTranslation
}

type CategoryWithName struct {
	ID   int64
	Slug string
	Name string
}
