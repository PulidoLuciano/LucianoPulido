import { Link } from "luciano-react-router";
import ArticlesDashboard from "../components/forum/dashboard/articlesDashboard";

export default function Dashboard(){
    return(
        <main className="max-w-screen-mobileS tablet:max-w-screen-tablet laptopL:max-w-screen-laptopL m-auto w-full px-8">
            <section className="my-5 flex justify-between">
                <h1 className="text-3xl font-bold">Admin's dashboard</h1>
            </section>
            <section className="laptop:grid laptop:grid-cols-2 gap-8 py-8">
                <ArticlesDashboard/>
                <article>
                    <section>
                        <h2 className="text-2xl font-semibold">Users</h2>
                    </section>
                    <section className="flex justify-around py-4">
                        <span>
                            <p className="text-gray-500 italic">Quantity</p>
                            <p className="text-2xl">123</p>
                        </span>
                        <span>
                            <p className="text-gray-500 italic">Suscribe</p>
                            <p className="text-2xl">1230</p>
                        </span>
                    </section>
                    <section className="w-full py-1 flex">
                        <span className="bg-white rounded-3xl rounded-r-none hover:cursor-pointer px-3 text-center flex items-center border-2 border-primary-light border-r-0">🔎</span>
                        <input
                        type="search"
                        name="search"
                        className="w-full rounded-3xl p-2 rounded-l-none border-2 border-primary-light border-l-0 focus:outline-none"
                        placeholder="Search for an user"
                        autoComplete="off"
                        />
                        <button className="px-2 py-1 bg-primary-dark text-white rounded-xl ml-2">Show actives</button>
                    </section>
                    <section className="border-2 border-primary-light rounded-3xl h-96 scroll-auto px-4 py-4">
                        <article className="tablet:flex w-full justify-between">
                            <Link className="font-semibold" href="/admin/user/test">Username</Link>
                            <div className="flex gap-2">
                                <p>🗨 225</p>
                                <button className="bg-secondary-light px-1 rounded-lg">Delete</button>
                            </div>
                        </article>
                    </section>
                </article>
                <article>
                    <section>
                        <h2 className="text-2xl font-semibold">Comments</h2>
                    </section>
                    <section className="flex justify-around py-4">
                        <span>
                            <p className="text-gray-500 italic">Quantity</p>
                            <p className="text-2xl">123</p>
                        </span>
                        <span>
                            <p className="text-gray-500 italic">Responses</p>
                            <p className="text-2xl">1230</p>
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