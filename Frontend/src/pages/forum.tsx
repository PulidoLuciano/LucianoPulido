import { Form } from "pulido-react-form";
import ArticlesCarrousel from "../components/forum/carrousel";

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

export default function Forum(){
    return (
        <main className="max-w-screen-mobileS tablet:max-w-screen-tablet laptopL:max-w-screen-laptopL m-auto w-full px-8">
            <section className="w-full py-6">
                <Form className="flex">
                    <span className="bg-white rounded-3xl rounded-r-none hover:cursor-pointer px-3 text-center flex items-center border-2 border-primary-light border-r-0">🔎</span>
                    <input type="search" name="search" className="w-full rounded-3xl p-2 rounded-l-none border-2 border-primary-light border-l-0 focus:outline-none" placeholder="Search for an article"/>
                </Form>
            </section>
            <section className="w-full py-6 laptopL:grid laptopL:grid-cols-2 laptopL:gap-8">
                <ArticlesCarrousel title={"Recent articles"} articles={exampleArticles} categoryRef="recent"/>
                <ArticlesCarrousel title={"Popular articles"} articles={exampleArticles} categoryRef="/category/popular"/>
            </section>
            <section>
                <ArticlesCarrousel title={"React articles"} articles={exampleArticles} categoryRef="/category/recent"/>
                <ArticlesCarrousel title={"Data base articles"} articles={exampleArticles} categoryRef="/category/recent"/>
                <ArticlesCarrousel title={"Network articles"} articles={exampleArticles} categoryRef="/category/recent"/>
                <ArticlesCarrousel title={"Management articles"} articles={exampleArticles} categoryRef="/category/recent"/>
            </section>
        </main>
    )
}