import { Link } from "luciano-react-router"
import TwitterLink from "./socialLinks/twitter"
import GithubLink from "./socialLinks/github"
import LinkedInLink from "./socialLinks/linkedIn"

export default function Footer(){
    return(
        <footer className="absolute bg-primary-dark bottom-0 w-full z-0">
            <div className="max-w-screen-laptopL mx-auto flex justify-between items-center flex-col gap-4 laptop:flex-row">
                <h1 className="font-bold text-tertiary select-none pt-2 laptop:p-0 laptop:pl-4">Luciano Pulido</h1>
                <div className="flex gap-4">
                    <TwitterLink className="size-8 hover:brightness-110"/>
                    <GithubLink className="size-8 hover:brightness-110"/>
                    <LinkedInLink className="size-8 hover:brightness-110"/>
                </div>
                <nav className="bg-primary-dark text-tertiary pb-2 laptop:p-4">
                    <div className="flex gap-6">
                        <Link href="/" className="hover:text-white">About</Link>
                        <Link href="/articles" className="hover:text-white">Articles</Link>
                    </div>
                </nav>
            </div>
        </footer>
    )
}