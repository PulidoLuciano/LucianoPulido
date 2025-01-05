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
    url: string
    title : string
    description: string
    imageUrl : string
    date : string
    body : string
    categories: Array<Category>
    published : boolean
}

interface Category{
    url : string
    name : string
}

interface LoginData{
    email : string
    password : string
    keepLoggedIn : boolean
}

interface SessionData{
    username : string
    isAdmin : boolean
    accessToken : string
    refreshToken : string
    tokenType : string
}

interface User{
    username : string
    isAdmin : boolean
}

interface RegisterData{
    email : string
    password : string
    username : string
    sendEmails : boolean
}