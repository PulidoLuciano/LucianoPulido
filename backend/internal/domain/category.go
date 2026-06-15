package domain

import "time"

type Category struct {
	ID        int64
	Slug      string
	CreatedAt time.Time
}

type CategoryTranslation struct {
	ID           int64
	CategoryID   int64
	LanguageCode string
	Name         string
}
