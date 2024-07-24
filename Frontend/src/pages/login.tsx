import { Link } from "luciano-react-router";
console.log("test");
export default function Login(){
    return (
        <section className="pt-24 text-center flex items-center flex-col justify-center">
            <h1 className="text-4xl font-bold text-primary-dark">Oops...</h1>
            <h2 className="text-3xl font-bold text-primary-dark">I'm <span className="text-secondary-dark">building</span> this yet!</h2>
            <h3 className="text-xl font-bold text-primary-dark">Coming soon...</h3>
            <Link href={"/"} className="text-secondary-dark underline">Back to main page</Link>
        </section>
    )
}