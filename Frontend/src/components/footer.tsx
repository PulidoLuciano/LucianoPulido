import xIcon from "../assets/x.svg"
import githubIcon from "../assets/github.svg"
import linkedInIcon from "../assets/linkedIn.svg"

export default function Footer(){
    return(
        <footer className="absolute bg-primary-dark bottom-0 w-full z-0">
            <div className="max-w-screen-laptopL mx-auto flex justify-between items-center flex-col gap-4 laptop:flex-row">
                <h1 className="font-bold text-tertiary select-none pt-2 laptop:p-0 laptop:pl-4">Luciano Pulido</h1>
                <div className="flex gap-4">
                    <a href="x.com"><img src={xIcon} alt="X's icon" className="size-8 hover:brightness-110"/></a>
                    <a href="github.com"><img src={githubIcon} alt="GitHub's icon" className="size-8 hover:brightness-110"/></a>
                    <a href="linkedIn.com"><img src={linkedInIcon} alt="LinkedIn's icon" className="size-8 hover:brightness-110"/></a>
                </div>
                <nav className="bg-primary-dark text-tertiary pb-2 laptop:p-4">
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