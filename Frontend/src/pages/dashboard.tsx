import { Link } from "luciano-react-router";
import ArticlesDashboard from "../components/forum/dashboard/articlesDashboard";
import UsersDashboard from "../components/forum/dashboard/usersDashboard";
import CommentsDashboard from "../components/forum/dashboard/commentsDashboard";

export default function Dashboard(){
    return(
        <main className="max-w-screen-mobileS tablet:max-w-screen-tablet laptopL:max-w-screen-laptopL m-auto w-full px-8">
            <section className="my-5 flex justify-between">
                <h1 className="text-3xl font-bold">Admin's dashboard</h1>
            </section>
            <section className="laptop:grid laptop:grid-cols-2 gap-8 py-8">
                <ArticlesDashboard/>
                <UsersDashboard/>
                <CommentsDashboard/>
                <article>
                    <section>
                        <h2 className="text-2xl font-semibold">Contacts</h2>
                    </section>
                    <section className="flex justify-around py-4">
                        <span>
                            <p className="text-gray-500 italic">Quantity</p>
                            <p className="text-2xl">123</p>
                        </span>
                    </section>
                    <section className="border-2 border-primary-light rounded-3xl h-96 scroll-auto px-4 py-4">
                        <article className="tablet:flex w-full justify-between">
                            <Link className="font-semibold" href="/admin/user/test">Username</Link>
                            <div className="flex gap-2">
                                <button className="bg-secondary-light px-1 rounded-lg">Delete</button>
                            </div>
                        </article>
                    </section>
                </article>
            </section>
        </main>
    )
}