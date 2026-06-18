package usecase

import (
	"context"
	"math"
	"time"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
)

type PostAdminUseCase struct {
	postRepo port.PostRepository
}

func NewPostAdminUseCase(pr port.PostRepository) *PostAdminUseCase {
	return &PostAdminUseCase{postRepo: pr}
}

type CreatePostInput struct {
	Slug         string                          `json:"slug"`
	ImageURL     *string                         `json:"image_url,omitempty"`
	IsPublic     bool                            `json:"is_public"`
	CategoryIDs  []int64                         `json:"category_ids"`
	Translations map[string]PostTranslationInput `json:"translations"`
}

type PostTranslationInput struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

type CreatePostOutput struct {
	ID   int64  `json:"id"`
	Slug string `json:"slug"`
}

func (uc *PostAdminUseCase) CreatePost(ctx context.Context, input CreatePostInput) (*CreatePostOutput, error) {
	if input.Slug == "" {
		return nil, domain.ErrInvalidInput
	}
	if len(input.Translations) == 0 {
		return nil, domain.ErrInvalidInput
	}

	now := time.Now()
	post := &domain.Post{
		Slug:      input.Slug,
		ImageURL:  input.ImageURL,
		IsPublic:  input.IsPublic,
		CreatedAt: now,
	}

	translations := make([]domain.PostTranslation, 0, len(input.Translations))
	for lang, t := range input.Translations {
		translations = append(translations, domain.PostTranslation{
			LanguageCode: lang,
			Title:        t.Title,
			Content:      t.Content,
		})
	}

	created, err := uc.postRepo.Create(ctx, post, translations, input.CategoryIDs)
	if err != nil {
		return nil, err
	}

	return &CreatePostOutput{
		ID:   created.ID,
		Slug: created.Slug,
	}, nil
}

func (uc *PostAdminUseCase) UpdatePost(ctx context.Context, id int64, input CreatePostInput) error {
	post := &domain.Post{
		ID:       id,
		Slug:     input.Slug,
		ImageURL: input.ImageURL,
		IsPublic: input.IsPublic,
	}

	translations := make([]domain.PostTranslation, 0, len(input.Translations))
	for lang, t := range input.Translations {
		translations = append(translations, domain.PostTranslation{
			PostID:       id,
			LanguageCode: lang,
			Title:        t.Title,
			Content:      t.Content,
		})
	}

	return uc.postRepo.Update(ctx, post, translations, input.CategoryIDs)
}

func (uc *PostAdminUseCase) DeletePost(ctx context.Context, id int64) error {
	return uc.postRepo.Delete(ctx, id)
}

type AdminPostSummaryItem struct {
	ID              int64                   `json:"id"`
	Slug            string                  `json:"slug"`
	Title           string                  `json:"title"`
	ImageURL        *string                 `json:"image_url"`
	IsPublic        bool                    `json:"is_public"`
	ReadTimeMinutes int                     `json:"read_time_minutes"`
	Categories      []CategorySummaryOutput `json:"categories"`
	CreatedAt       time.Time               `json:"created_at"`
}

type AdminGetPostsInput struct {
	Lang    string
	Page    int
	PerPage int
}

type AdminGetPostsOutput struct {
	Posts      []AdminPostSummaryItem `json:"posts"`
	Page       int                    `json:"page"`
	PerPage    int                    `json:"per_page"`
	Total      int64                  `json:"total"`
	TotalPages int                    `json:"total_pages"`
}

func (uc *PostAdminUseCase) GetPosts(ctx context.Context, input AdminGetPostsInput) (*AdminGetPostsOutput, error) {
	posts, total, err := uc.postRepo.ListAll(ctx, input.Lang, "", input.Page, input.PerPage)
	if err != nil {
		return nil, err
	}

	totalPages := int(math.Ceil(float64(total) / float64(input.PerPage)))

	result := make([]AdminPostSummaryItem, 0, len(posts))
	for _, p := range posts {
		result = append(result, AdminPostSummaryItem{
			ID:              p.Post.ID,
			Slug:            p.Post.Slug,
			Title:           p.Translation.Title,
			ImageURL:        p.Post.ImageURL,
			IsPublic:        p.Post.IsPublic,
			ReadTimeMinutes: calculateReadTime(p.Translation.Content),
			Categories:      []CategorySummaryOutput{},
			CreatedAt:       p.Post.CreatedAt,
		})
	}

	return &AdminGetPostsOutput{
		Posts:      result,
		Page:       input.Page,
		PerPage:    input.PerPage,
		Total:      total,
		TotalPages: totalPages,
	}, nil
}

type AdminPostDetailOutput struct {
	ID           int64                           `json:"id"`
	Slug         string                          `json:"slug"`
	ImageURL     *string                         `json:"image_url"`
	IsPublic     bool                            `json:"is_public"`
	CreatedAt    time.Time                       `json:"created_at"`
	Translations map[string]PostTranslationInput `json:"translations"`
	CategoryIDs  []int64                         `json:"category_ids"`
}

func (uc *PostAdminUseCase) GetPost(ctx context.Context, id int64) (*AdminPostDetailOutput, error) {
	post, translations, categoryIDs, err := uc.postRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	transMap := make(map[string]PostTranslationInput)
	for _, t := range translations {
		transMap[t.LanguageCode] = PostTranslationInput{
			Title:   t.Title,
			Content: t.Content,
		}
	}

	if categoryIDs == nil {
		categoryIDs = []int64{}
	}

	return &AdminPostDetailOutput{
		ID:           post.ID,
		Slug:         post.Slug,
		ImageURL:     post.ImageURL,
		IsPublic:     post.IsPublic,
		CreatedAt:    post.CreatedAt,
		Translations: transMap,
		CategoryIDs:  categoryIDs,
	}, nil
}
