package testutil

import (
	"context"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
	"github.com/stretchr/testify/mock"
)

var _ port.CategoryRepository = (*MockCategoryRepository)(nil)

type MockCategoryRepository struct {
	mock.Mock
}

func (m *MockCategoryRepository) ListByPostID(ctx context.Context, postID int64, lang string) ([]domain.CategoryWithName, error) {
	args := m.Called(ctx, postID, lang)
	return args.Get(0).([]domain.CategoryWithName), args.Error(1)
}

func (m *MockCategoryRepository) List(ctx context.Context) ([]domain.Category, []domain.CategoryTranslation, error) {
	args := m.Called(ctx)
	return args.Get(0).([]domain.Category), args.Get(1).([]domain.CategoryTranslation), args.Error(2)
}

func (m *MockCategoryRepository) GetByID(ctx context.Context, id int64) (*domain.Category, []domain.CategoryTranslation, error) {
	args := m.Called(ctx, id)
	return args.Get(0).(*domain.Category), args.Get(1).([]domain.CategoryTranslation), args.Error(2)
}

func (m *MockCategoryRepository) Create(ctx context.Context, category *domain.Category, translations []domain.CategoryTranslation) (*domain.Category, error) {
	args := m.Called(ctx, category, translations)
	return args.Get(0).(*domain.Category), args.Error(1)
}

func (m *MockCategoryRepository) Update(ctx context.Context, category *domain.Category, translations []domain.CategoryTranslation) error {
	args := m.Called(ctx, category, translations)
	return args.Error(0)
}

func (m *MockCategoryRepository) Delete(ctx context.Context, id int64) error {
	args := m.Called(ctx, id)
	return args.Error(0)
}
