import ArticlesDashboard from "../components/forum/dashboard/articlesDashboard";
import UsersDashboard from "../components/forum/dashboard/usersDashboard";
import CommentsDashboard from "../components/forum/dashboard/commentsDashboard";
import ContactsDashboard from "../components/forum/dashboard/contactsDashboard";
import CategoryForm from "../components/forum/dashboard/CategoryForm";
import { useFetch } from "../hooks/useFetch";

export default function Dashboard(){
    
    const { fetcher } = useFetch(true);
    
    return(
        <main className="max-w-screen-mobileS tablet:max-w-screen-tablet laptopL:max-w-screen-laptopL m-auto w-full px-8">
            <section className="my-5 flex justify-between">
                <h1 className="text-3xl font-bold">Admin's dashboard</h1>
            </section>
            <section className="laptop:grid laptop:grid-cols-2 gap-8 py-8">
                <ArticlesDashboard fetcher={fetcher}/>
                <UsersDashboard fetcher={fetcher}/>
                <CommentsDashboard fetcher={fetcher}/>
                <ContactsDashboard fetcher={fetcher}/>
            </section>
            <CategoryForm/>
        </main>
    )
}