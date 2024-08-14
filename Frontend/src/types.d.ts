export interface ArticleShortPreview{
    title : string
    image : string
    date : string
    url : string
}

interface ArticleExtendedPreview extends ArticleShortPreview{
    description : string
}

interface Article{
    title : string
    description: string
    image : string
    date : string
    body : string
}