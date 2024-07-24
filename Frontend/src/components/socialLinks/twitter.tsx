import SocialLink from "./socialLink";
import xIcon from "../../assets/x.svg";

export default function TwitterLink({className} : {className : string}){
    return <SocialLink href="https://x.com/luciano_pulido" img={xIcon} alt="X's icon" className={className}/>
}