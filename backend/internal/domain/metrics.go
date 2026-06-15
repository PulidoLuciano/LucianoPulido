package domain

import "time"

type PostView struct {
	ID               int64
	PostID           int64
	ViewedAt         time.Time
	CountryCode      *string
	City             *string
	ReadTimeSeconds  *int
	MaxScrollPercent *float64
	VisitorHash      *string
}
