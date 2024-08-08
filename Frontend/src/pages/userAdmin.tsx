import { Link } from "luciano-react-router";

export default function UserAdmin({routeParams} : {routeParams : {username : string}}){
    return(
        <main className="max-w-screen-mobileS tablet:max-w-screen-tablet laptopL:max-w-screen-laptopL m-auto w-full px-8">
            <h1 className="text-3xl font-bold py-4">{routeParams.username}'s comments</h1>
            <section>
                <article className="tablet:flex w-full justify-between pb-2">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet accusantium quod eum illo commodi harum aliquid nisi, voluptate quos saepe dolorum minus, aspernatur nemo magnam fuga ullam, maxime expedita sed!</p>
                    <div className="flex gap-2">
                        <Link href="/articles" className="bg-secondary-light px-1 rounded-lg">Go to article</Link>
                        <button className="bg-secondary-light px-1 rounded-lg">Delete</button>
                    </div>
                </article>
                <article className="tablet:flex w-full justify-between pb-2">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet accusantium quod eum illo commodi harum aliquid nisi, voluptate quos saepe dolorum minus, aspernatur nemo magnam fuga ullam, maxime expedita sed!</p>
                    <div className="flex gap-2">
                        <button className="bg-secondary-light px-1 rounded-lg">Delete</button>
                    </div>
                </article>
            </section>
        </main>
    )
}