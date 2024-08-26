import { ArticlesRouter } from "./articles/articles";
import { CategoriesRouter } from "./categories/categories";
import { CommentsRouter } from "./comments/comments";
import { UsersRouter } from "./users/users"

const ROUTERS = [
    {
        path: "/users",
        router: UsersRouter
    },
    {
        path: "/articles",
        router: ArticlesRouter
    },
    {
        path: "/comments",
        router: CommentsRouter
    },
    {
        path: "/categories",
        router: CategoriesRouter
    }
]

export default ROUTERS;