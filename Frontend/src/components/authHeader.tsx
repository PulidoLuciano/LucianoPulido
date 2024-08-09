import { Link } from "luciano-react-router";
import { useState } from "react";

export default function AuthHeader({isMobile} : {isMobile : boolean}){
    
    const [isAuth, setIsAuth] = useState(false);
    
    return(
        (isMobile) ?
        (isAuth) ?
        null
        :
        <LoginLink/>
        :
        (isAuth) ?
        null
        :
        <LoginLink/>
    )
}

function LoginLink(){
    return(
        <Link href="/login" className="bg-secondary-light font-semibold hover:bg-secondary-dark py-1 px-3 rounded-2xl text-black">Log in</Link>
    )
}