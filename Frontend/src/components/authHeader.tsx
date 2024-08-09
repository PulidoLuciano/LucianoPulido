import { Link } from "luciano-react-router";
import { useState } from "react";

export default function AuthHeader({isMobile} : {isMobile : boolean}){
    
    const [isAuth, setIsAuth] = useState(true);
    
    return(
        (isAuth) ?
        (isMobile) ?
        <>
            <Link href="/user/edit">Change your data</Link>
            <button>Log out</button>
        </>
        :
        <>
            <div className="select-none font-semibold relative group py-1">Username
                <span className="group-hover:flex hidden bg-secondary-dark p-2 flex-col text-center rounded-md absolute w-44 z-20 right-1/2 after:content-[''] top-[105%] after:absolute after:bottom-full after:right-2 after:border-8 after:border-solid after:border-b-secondary-dark after:border-transparent">
                    <Link href="/user/edit" className="py-1">Change your data</Link>
                    <hr/>
                    <button className="py-1">Log out</button>
                </span>
            </div>
        </>
        :
        <Link href="/login" className="bg-secondary-light font-semibold hover:bg-secondary-dark py-1 px-3 rounded-2xl text-black">Log in</Link>
    )
}