import { ErrorMessage, Form } from "pulido-react-form"
import ArticlesCarrousel from "../components/forum/carrousel"
import ArticleBody from "../components/forum/articleBody"

const example = {
    title: "How to made your react app easy and well stated",
    date: "07/13/2024",
    image: "https://e1.pxfuel.com/desktop-wallpaper/556/915/desktop-wallpaper-how-to-install-reactjs-frontend.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus in expedita aspernatur ipsam! Nisi voluptatibus ducimus voluptatem vel dignissimos.",
    body: "test"
}

const exampleArticles = [
    {
        title: "How to made your react app easy and well stated",
        date: "07/13/2024",
        image: "https://e1.pxfuel.com/desktop-wallpaper/556/915/desktop-wallpaper-how-to-install-reactjs-frontend.jpg",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated"
    },
    {
        title: "Use probabilities and linear programming to calculate your resources",
        date: "06/11/2024",
        image: "https://files.realpython.com/media/Linear-Programming-in-Python_Watermarked.88e2dbe17fbf.jpg",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated"
    },
    {
        title: "Dev blog 1: I started a new project",
        date: "07/13/2024",
        image: "https://dcgamedevblog.wordpress.com/wp-content/uploads/2014/09/game-bg-1.png",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated"
    },
    {
        title: "How to made your react app easy and well stated",
        date: "07/13/2024",
        image: "https://e1.pxfuel.com/desktop-wallpaper/556/915/desktop-wallpaper-how-to-install-reactjs-frontend.jpg",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated"
    },
    {
        title: "Use probabilities and linear programming to calculate your resources",
        date: "06/11/2024",
        image: "https://files.realpython.com/media/Linear-Programming-in-Python_Watermarked.88e2dbe17fbf.jpg",
        url: "/articles/how-to-made-your-react-app-easy-and-well-stated"
    }
]

export default function Article(){
    return(
        <main className="laptop:max-w-screen-tablet m-auto w-full px-2">
            <ArticleBody article={example}/>
            <section>
                <div className="grid grid-cols-[auto_1fr] items-center mb-4">
                    <h2 className="text-3xl text-primary-dark mr-3">Comments</h2>
                    <div className="hidden laptop:block h-1 w-full bg-primary-light relative -bottom-1"/>
                </div>
                <Form className="flex mb-3">
                    <span className="bg-white rounded-3xl rounded-r-none hover:cursor-pointer px-3 text-center flex items-center border-2 border-primary-light border-r-0">
                    🗨
                    </span>
                    <textarea name="Comment" className="w-full rounded-3xl p-2 rounded-l-none border-2 border-primary-light border-l-0 focus:outline-none" placeholder="Write your comment" autoComplete="off" required={true}/>
                    <input type="submit" className="bg-secondary-light font-semibold hover:bg-secondary-dark py-1 px-3 rounded-2xl text-black"/>
                </Form>
                <article className="pl-3 border-l-2">
                    <div className="flex justify-between py-2">
                        <p className="font-semibold">Username</p>
                        <p className="text-right text-gray-500">07/13/2024</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure consectetur quia facilis. Doloremque cupiditate obcaecati recusandae, eaque ex perferendis molestias, quos labore itaque esse nobis ullam provident, laborum sequi dignissimos.</p>
                    <button className="text-secondary-light w-full text-right underline">Answer</button>
                    <article className="pl-3 border-l-2">
                    <div className="flex justify-between py-2">
                        <p className="font-semibold">Username</p>
                        <p className="text-right text-gray-500">07/13/2024</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure consectetur quia facilis. Doloremque cupiditate obcaecati recusandae, eaque ex perferendis molestias, quos labore itaque esse nobis ullam provident, laborum sequi dignissimos.</p>
                    <button className="text-secondary-light w-full text-right underline">Answer</button>
                </article>
                </article>
            </section>
            <section>
                <ArticlesCarrousel title="Related articles" articles={exampleArticles} categoryRef="/articles"/>
                <ArticlesCarrousel title="Recent articles" articles={exampleArticles} categoryRef="/articles"/>
                <ArticlesCarrousel title="Popular articles" articles={exampleArticles} categoryRef="/articles"/>
            </section>
        </main>
    )
}