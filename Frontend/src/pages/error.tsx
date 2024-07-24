

export default function ErrorPage(){
    return (
        <section className="h-screen text-center flex items-center flex-col justify-center">
            <h1 className="text-4xl font-bold text-primary-dark">Oops...</h1>
            <h2 className="text-3xl font-bold text-primary-dark">That was <span className="text-secondary-dark">unexpected!</span></h2>
            <h3 className="text-xl font-bold text-primary-dark">An error has ocurred</h3>
            <a href={"/"} className="text-secondary-dark underline">Back to main page</a>
        </section>
    )
}