package usecase

import (
	"context"
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
		IsPublic:  false,
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
