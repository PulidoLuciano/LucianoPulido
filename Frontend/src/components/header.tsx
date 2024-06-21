import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header(){
    
    const [isOpenMobileNav, setIsOpenMobileMap] = useState(false);
    
    function openMobileNav() : void{
        setIsOpenMobileMap(!isOpenMobileNav);
    }

    return(
        <header className="bg-primary-light flex justify-center z-50">
            <div className="flex items-center justify-between py-2 px-2 max-w-screen-laptopL w-full text-tertiary text-lg">
                <div>
                    <a href="/"><h1 className="font-bold">Luciano Pulido</h1></a>
                </div>
                <nav className="hidden laptop:flex gap-5 items-center">
                    <a href="/" className="hover:text-white">About</a>
                    <a href="" className="hover:text-white">Contact</a>
                    <a href="/articles" className="hover:text-white">Articles</a>
                    <Link to="/articles" className="bg-secondary-light font-semibold hover:bg-secondary-dark py-1 px-3 rounded-2xl text-black">Log in</Link>
                </nav>
                <button className="laptop:hidden" onClick={openMobileNav}>Test</button>
            </div>
            <div className={isOpenMobileNav ? "absolute w-screen h-full laptop:hidden transition-transform" : "absolute w-screen h-full laptop:hidden -translate-y-full"}>
                <nav className="bg-primary-dark w-full h-full text-tertiary p-4" onClick={openMobileNav}>
                    <button className="text-3xl text-right mr-4 w-full" onClick={openMobileNav}>X</button>
                    <div className="flex flex-col text-center text-2xl gap-6 my-6">
                        <a href="/" className="hover:text-white">About</a>
                        <a href="" className="hover:text-white">Contact</a>
                        <Link to="/articles" className="bg-secondary-light font-semibold hover:bg-secondary-dark py-1 px-3 rounded-2xl text-black">Log in</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}