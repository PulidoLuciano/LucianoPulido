import { useState } from "react";
import menuIcon from "../assets/menu.svg"
import { Link } from "luciano-react-router";
import TwitterLink from "./socialLinks/twitter";
import GithubLink from "./socialLinks/github";
import LinkedInLink from "./socialLinks/linkedIn";
import AuthHeader from "./authHeader";

export default function Header(){
    
    const [isOpenMobileNav, setIsOpenMobileMap] = useState(false);
    
    function openMobileNav() : void{
        setIsOpenMobileMap(!isOpenMobileNav);
    }

    return(
        <header className="bg-primary-light flex justify-center z-50 sticky top-0">
            <div className="flex items-center justify-between py-2 px-2 max-w-screen-laptopL w-full text-tertiary text-lg">
                <div>
                    <Link href="/"><h1 className="font-bold">Luciano Pulido</h1></Link>
                </div>
                <nav className="hidden laptop:flex gap-5 items-center">
                    <Link href="/" className="hover:text-white">About</Link>
                    <Link href="/articles" className="hover:text-white">Articles</Link>
                    <AuthHeader isMobile={false}/>
                </nav>
                <button className="laptop:hidden" onClick={openMobileNav}><img src={menuIcon} alt="Menu icon"/></button>
            </div>
            <div className={isOpenMobileNav ? "absolute w-screen h-full laptop:hidden transition-transform" : "absolute w-screen laptop:hidden -translate-y-full"}>
                <nav className="bg-primary-dark w-full text-tertiary p-4" onClick={openMobileNav}>
                    <button className="text-3xl text-right mr-4 w-full" onClick={openMobileNav}>X</button>
                    <div className="flex flex-col text-center text-2xl gap-6 my-6">
                        <Link href="/" className="hover:text-white">About</Link>
                        <Link href="/articles" className="hover:text-white">Articles</Link>
                        <AuthHeader isMobile={true}/>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="font-bold text-tertiary select-none pt-2">Luciano Pulido</h1>
                        <div className="flex gap-4">
                            <TwitterLink className="size-8 hover:brightness-110"/>
                            <GithubLink className="size-8 hover:brightness-110"/>
                            <LinkedInLink className="size-8 hover:brightness-110"/>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}