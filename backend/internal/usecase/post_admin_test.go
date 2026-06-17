package usecase_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase/testutil"
)

func TestPostAdminUseCase_CreatePost(t *testing.T) {
	ctx := context.Background()

	t.Run("creates post successfully", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)

		input := usecase.CreatePostInput{
			Slug: "new-post",
			Translations: map[string]usecase.PostTranslationInput{
				"en": {Title: "New Post", Content: "Content here"},
			},
			CategoryIDs: []int64{1},
		}

		mockRepo.On("Create", ctx, mock.Anything, mock.Anything, mock.Anything).
			Return(&domain.Post{ID: 1, Slug: "new-post"}, nil)

		output, err := uc.CreatePost(ctx, input)

		require.NoError(t, err)
		assert.Equal(t, int64(1), output.ID)
		assert.Equal(t, "new-post", output.Slug)
		mockRepo.AssertExpectations(t)
	})

	t.Run("fails with empty slug", func(t *testing.T) {
		uc := usecase.NewPostAdminUseCase(new(testutil.MockPostRepository))

		_, err := uc.CreatePost(ctx, usecase.CreatePostInput{
			Slug: "",
			Translations: map[string]usecase.PostTranslationInput{
				"en": {Title: "Test", Content: "Test"},
			},
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrInvalidInput, err)
	})

	t.Run("fails with empty translations", func(t *testing.T) {
		uc := usecase.NewPostAdminUseCase(new(testutil.MockPostRepository))

		_, err := uc.CreatePost(ctx, usecase.CreatePostInput{
			Slug:         "test",
			Translations: map[string]usecase.PostTranslationInput{},
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrInvalidInput, err)
	})

	t.Run("fails with duplicate slug", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)

		mockRepo.On("Create", ctx, mock.Anything, mock.Anything, mock.Anything).
			Return((*domain.Post)(nil), domain.ErrConflict)

		_, err := uc.CreatePost(ctx, usecase.CreatePostInput{
			Slug: "existing-slug",
			Translations: map[string]usecase.PostTranslationInput{
				"en": {Title: "Test", Content: "Test"},
			},
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrConflict, err)
		mockRepo.AssertExpectations(t)
	})
}

func TestPostAdminUseCase_UpdatePost(t *testing.T) {
	ctx := context.Background()

	t.Run("updates post successfully", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)

		mockRepo.On("Update", ctx, mock.Anything, mock.Anything, mock.Anything).Return(nil)

		err := uc.UpdatePost(ctx, 1, usecase.CreatePostInput{
			Slug: "updated-post",
			Translations: map[string]usecase.PostTranslationInput{
				"en": {Title: "Updated", Content: "Updated content"},
			},
		})

		require.NoError(t, err)
		mockRepo.AssertExpectations(t)
	})

	t.Run("fails with duplicate slug", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)

		mockRepo.On("Update", ctx, mock.Anything, mock.Anything, mock.Anything).
			Return(domain.ErrConflict)

		err := uc.UpdatePost(ctx, 1, usecase.CreatePostInput{
			Slug: "existing-slug",
			Translations: map[string]usecase.PostTranslationInput{
				"en": {Title: "Test", Content: "Test"},
			},
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrConflict, err)
		mockRepo.AssertExpectations(t)
	})
}

func TestPostAdminUseCase_DeletePost(t *testing.T) {
	ctx := context.Background()

	t.Run("deletes post successfully", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)

		mockRepo.On("Delete", ctx, int64(1)).Return(nil)

		err := uc.DeletePost(ctx, 1)

		require.NoError(t, err)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns error when not found", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)

		mockRepo.On("Delete", ctx, int64(999)).Return(domain.ErrNotFound)

		err := uc.DeletePost(ctx, 999)

		require.Error(t, err)
		assert.Equal(t, domain.ErrNotFound, err)
		mockRepo.AssertExpectations(t)
	})
}
