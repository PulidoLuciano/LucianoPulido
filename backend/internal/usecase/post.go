package usecase

import (
	"context"
	"math"
	"time"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
)

const avgWordsPerMinute = 200
const avgCharsPerWordsPattern = 5

type PostPublicUseCase struct {
	postRepo     port.PostRepository
	metricsRepo  port.MetricsRepository
	categoryRepo port.CategoryRepository
}

func NewPostPublicUseCase(pr port.PostRepository, mr port.MetricsRepository, cr port.CategoryRepository) *PostPublicUseCase {
	return &PostPublicUseCase{postRepo: pr, metricsRepo: mr, categoryRepo: cr}
}

type PostSummaryItem struct {
	ID              int64                     `json:"id"`
	Slug            string                    `json:"slug"`
	Title           string                    `json:"title"`
	ImageURL        *string                   `json:"image_url"`
	ReadTimeMinutes int                       `json:"read_time_minutes"`
	Categories      []domain.CategoryWithName `json:"categories"`
	CreatedAt       time.Time                 `json:"created_at"`
}

type PostDetailItem struct {
	ID              int64                     `json:"id"`
	Slug            string                    `json:"slug"`
	Title           string                    `json:"title"`
	Content         string                    `json:"content"`
	ReadTimeMinutes int                       `json:"read_time_minutes"`
	TotalViews      int64                     `json:"total_views"`
	ViewID          int64                     `json:"view_id"`
	Categories      []domain.CategoryWithName `json:"categories"`
	CreatedAt       time.Time                 `json:"created_at"`
}

func (uc *PostPublicUseCase) GetPosts(ctx context.Context, input GetPostsInput) ([]PostSummaryItem, error) {
	catSlug := ""
	if input.CategorySlug != nil {
		catSlug = *input.CategorySlug
	}

	posts, err := uc.postRepo.List(ctx, input.Lang, catSlug)
	if err != nil {
		return nil, err
	}

	result := make([]PostSummaryItem, 0, len(posts))
	for _, p := range posts {
		categories, err := uc.categoryRepo.ListByPostID(ctx, p.Post.ID, input.Lang)
		if err != nil {
			categories = []domain.CategoryWithName{}
		}

		result = append(result, PostSummaryItem{
			ID:              p.Post.ID,
			Slug:            p.Post.Slug,
			Title:           p.Translation.Title,
			ImageURL:        p.Post.ImageURL,
			ReadTimeMinutes: calculateReadTime(p.Translation.Content),
			Categories:      categories,
			CreatedAt:       p.Post.CreatedAt,
		})
	}

	return result, nil
}

func (uc *PostPublicUseCase) GetPostBySlug(ctx context.Context, input GetPostBySlugInput) (*PostDetailItem, error) {
	post, err := uc.postRepo.GetBySlug(ctx, input.Slug, input.Lang)
	if err != nil {
		return nil, err
	}

	categories, err := uc.categoryRepo.ListByPostID(ctx, post.Post.ID, input.Lang)
	if err != nil {
		categories = []domain.CategoryWithName{}
	}

	totalViews, err := uc.metricsRepo.GetTotalViews(ctx, post.Post.ID)
	if err != nil {
		totalViews = 0
	}

	viewID, err := uc.metricsRepo.CreateView(ctx, post.Post.ID, input.CountryCode, input.City, input.VisitorHash)
	if err != nil {
		return nil, err
	}

	return &PostDetailItem{
		ID:              post.Post.ID,
		Slug:            post.Post.Slug,
		Title:           post.Translation.Title,
		Content:         post.Translation.Content,
		ReadTimeMinutes: calculateReadTime(post.Translation.Content),
		TotalViews:      totalViews,
		ViewID:          viewID,
		Categories:      categories,
		CreatedAt:       post.Post.CreatedAt,
	}, nil
}

type GetPostsInput struct {
	Lang         string
	CategorySlug *string
}

type GetPostBySlugInput struct {
	Slug        string
	Lang        string
	CountryCode string
	City        string
	VisitorHash string
}

func calculateReadTime(content string) int {
	words := len([]rune(content)) / avgCharsPerWordsPattern
	minutes := int(math.Ceil(float64(words) / float64(avgWordsPerMinute)))
	if minutes < 1 {
		minutes = 1
	}
	return minutes
}
