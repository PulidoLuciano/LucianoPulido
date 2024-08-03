const example = {
    title: "How to made your react app easy and well stated",
    date: "07/13/2024",
    image: "https://e1.pxfuel.com/desktop-wallpaper/556/915/desktop-wallpaper-how-to-install-reactjs-frontend.jpg",
    url: "/articles/how-to-made-your-react-app-easy-and-well-stated",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus in expedita aspernatur ipsam! Nisi voluptatibus ducimus voluptatem vel dignissimos."
}

export default function Article(){
    return(
        <main className="laptop:max-w-screen-tablet m-auto w-full px-2">
            <section className="py-4">
                <h1 className="text-5xl text-pretty font-semibold pb-1">{example.title}</h1>
                <p className="text-xl font-light pb-2 text-balance">{example.description}</p>
                <p className="text-right text-gray-500">{example.date}</p>
                <img src={example.image} alt="" />
            </section>
            <section className="pb-4 text-balance">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, aliquid pariatur incidunt obcaecati deleniti maxime cupiditate distinctio? Dignissimos illum mollitia distinctio maiores unde enim facilis, eaque iste eius alias non? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, aliquid pariatur incidunt obcaecati deleniti maxime cupiditate distinctio? Dignissimos illum mollitia distinctio maiores unde enim facilis, eaque iste eius alias non? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, aliquid pariatur incidunt obcaecati deleniti maxime cupiditate distinctio? Dignissimos illum mollitia distinctio maiores unde enim facilis, eaque iste eius alias non?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, aliquid pariatur incidunt obcaecati deleniti maxime cupiditate distinctio? Dignissimos illum mollitia distinctio maiores unde enim facilis, eaque iste eius alias non?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, aliquid pariatur incidunt obcaecati deleniti maxime cupiditate distinctio? Dignissimos illum mollitia distinctio maiores unde enim facilis, eaque iste eius alias non?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, aliquid pariatur incidunt obcaecati deleniti maxime cupiditate distinctio? Dignissimos illum mollitia distinctio maiores unde enim facilis, eaque iste eius alias non?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, aliquid pariatur incidunt obcaecati deleniti maxime cupiditate distinctio? Dignissimos illum mollitia distinctio maiores unde enim facilis, eaque iste eius alias non?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, aliquid pariatur incidunt obcaecati deleniti maxime cupiditate distinctio? Dignissimos illum mollitia distinctio maiores unde enim facilis, eaque iste eius alias non?
            </section>
        </main>
    )
}