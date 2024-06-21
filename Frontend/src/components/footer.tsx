import xIcon from "../assets/x.svg"
import githubIcon from "../assets/github.svg"
import linkedInIcon from "../assets/linkedIn.svg"

export default function Footer(){
    return(
        <footer className="absolute bg-primary-dark bottom-0 w-full">
            <div className="max-w-screen-laptopL mx-auto flex justify-between items-center">
                <h1 className="font-bold text-tertiary select-none">Luciano Pulido</h1>
                <div className="flex gap-4">
                    <a href="x.com"><img src={xIcon} alt="X's icon" className="size-8 hover:brightness-110"/></a>
                    <a href="github.com"><img src={githubIcon} alt="GitHub's icon" className="size-8 hover:brightness-110"/></a>
                    <a href="linkedIn.com"><img src={linkedInIcon} alt="LinkedIn's icon" className="size-8 hover:brightness-110"/></a>
                </div>
                <nav className="bg-primary-dark text-tertiary p-4">
                    <div className="flex gap-6">
                        <a href="/" className="hover:text-white">About</a>
                        <a href="" className="hover:text-white">Contact</a>
                        <a href="/articles" className="hover:text-white">Articles</a>
                    </div>
                </nav>
            </div>
        </footer>
    )
}