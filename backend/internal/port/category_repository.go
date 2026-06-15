package port

import (
	"context"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
)

type CategoryRepository interface {
	ListByPostID(ctx context.Context, postID int64, lang string) ([]domain.CategoryWithName, error)
}
