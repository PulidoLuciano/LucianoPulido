import { useState } from "react";
import { Link } from "react-router-dom";
import menuIcon from "../assets/menu.svg"
import xIcon from "../assets/x.svg"
import githubIcon from "../assets/github.svg"
import linkedInIcon from "../assets/linkedIn.svg"

export default function Header(){
    
    const [isOpenMobileNav, setIsOpenMobileMap] = useState(false);
    
    function openMobileNav() : void{
        setIsOpenMobileMap(!isOpenMobileNav);
    }

    return(
        <header className="bg-primary-light flex justify-center z-50 sticky top-0">
            <div className="flex items-center justify-between py-2 px-2 max-w-screen-laptopL w-full text-tertiary text-lg">
                <div>
                    <a href="/"><h1 className="font-bold">Luciano Pulido</h1></a>
                </div>
                <nav className="hidden laptop:flex gap-5 items-center">
                    <a href="/" className="hover:text-white">About</a>
                    <a href="/articles" className="hover:text-white">Articles</a>
                    <Link to="/login" className="bg-secondary-light font-semibold hover:bg-secondary-dark py-1 px-3 rounded-2xl text-black">Log in</Link>
                </nav>
                <button className="laptop:hidden" onClick={openMobileNav}><img src={menuIcon} alt="Menu icon"/></button>
            </div>
            <div className={isOpenMobileNav ? "absolute w-screen h-full laptop:hidden transition-transform" : "absolute w-screen laptop:hidden -translate-y-full"}>
                <nav className="bg-primary-dark w-full text-tertiary p-4" onClick={openMobileNav}>
                    <button className="text-3xl text-right mr-4 w-full" onClick={openMobileNav}>X</button>
                    <div className="flex flex-col text-center text-2xl gap-6 my-6">
                        <a href="/" className="hover:text-white">About</a>
                        <Link to="/articles" className="bg-secondary-light font-semibold hover:bg-secondary-dark py-1 px-3 rounded-2xl text-black">Log in</Link>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="font-bold text-tertiary select-none pt-2">Luciano Pulido</h1>
                        <div className="flex gap-4">
                            <a href="x.com"><img src={xIcon} alt="X's icon" className="size-8 hover:brightness-110"/></a>
                            <a href="github.com"><img src={githubIcon} alt="GitHub's icon" className="size-8 hover:brightness-110"/></a>
                            <a href="linkedIn.com"><img src={linkedInIcon} alt="LinkedIn's icon" className="size-8 hover:brightness-110"/></a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}