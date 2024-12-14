import ArticlesCarrousel from "../components/forum/carrousel";
import SearchBar from "../components/forum/searchBar";

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
            <SearchBar/>
            <section className="w-full py-6 laptopL:grid laptopL:grid-cols-2 laptopL:gap-8">
                <ArticlesCarrousel title={"Recent articles"} articles={exampleArticles} categoryRef="recent"/>
                <ArticlesCarrousel title={"Popular articles"} articles={exampleArticles} categoryRef="popular"/>
            </section>
            <section>
                <ArticlesCarrousel title={"React articles"} articles={exampleArticles} categoryRef="react"/>
                <ArticlesCarrousel title={"Data base articles"} articles={exampleArticles} categoryRef="databases"/>
                <ArticlesCarrousel title={"Network articles"} articles={exampleArticles} categoryRef="network"/>
                <ArticlesCarrousel title={"Management articles"} articles={exampleArticles} categoryRef="management"/>
            </section>
        </main>
    )
}