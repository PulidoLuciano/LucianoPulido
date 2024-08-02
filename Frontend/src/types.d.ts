export interface ArticleShortPreview{
    title : string
    image : string
    date : string
    url : string
}

interface ArticleExtendedPreview extends ArticleShortPreview{
    description : string
}