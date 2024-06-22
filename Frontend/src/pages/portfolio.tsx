import xIcon from "../assets/x.svg"
import githubIcon from "../assets/github.svg"
import linkedInIcon from "../assets/linkedIn.svg"
import codeIcon from "../assets/code.svg"

export default function Portfolio(){
    return(
        <main>
            <section className="h-[75vh] flex flex-col justify-center p-2 select-none">
                <div className="max-w-screen-mobileS laptop:max-w-screen-tablet m-auto w-full flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl">Welcome! I'm</h1>
                        <h1 className="text-4xl text-secondary-dark"><strong>Luciano Pulido</strong></h1>
                        <h1 className="text-4xl text-primary-dark"><em>software developer</em></h1>  
                        <div className="flex gap-4 mt-4">
                            <a href="x.com"><img src={xIcon} alt="X's icon" className="size-8 invert hover:brightness-110"/></a>
                            <a href="github.com"><img src={githubIcon} alt="GitHub's icon" className="size-8 invert hover:brightness-110"/></a>
                            <a href="linkedIn.com"><img src={linkedInIcon} alt="LinkedIn's icon" className="size-8 invert hover:brightness-110"/></a>
                        </div>
                    </div>
                    <img src={codeIcon} alt="Code icon" className="hidden laptop:block laptop:size-60"/>
                </div>
            </section>
            <section className="flex flex-col justify-center p-2 select-none bg-primary-dark py-16">
                <div className="max-w-screen-mobileS laptop:max-w-screen-tablet m-auto w-full">
                    <h1 className="text-tertiary font-bold text-2xl">About me</h1>
                    <p className="text-tertiary py-1 text-pretty">
                        I'm Luciano Nicolás Pulido. I born and live in Tucumán, Argentina. Since child I was passionate about computers. I learnt a lot alone during high school and when I graduated I chose to study Systems Engineering.
                    </p>
                    <p className="text-tertiary py-1 text-pretty">
                        I'm currently studying on Universidad Tecnológica Nacional - Facultad Regional Tucumán. I'm developing web right now. However, I've practiced with various technologies and languages. 
                    </p>
                    <p className="text-tertiary py-1 text-pretty">
                        I'm always learning new skills. I love reading books and play video games. And I'm eager to hear your offers!
                    </p>
                </div>
            </section>
        </main>
    )
}