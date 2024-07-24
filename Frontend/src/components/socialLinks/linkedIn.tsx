import SocialLink from "./socialLink";
import linkedInIcon from "../../assets/linkedIn.svg"

export default function LinkedInLink({className} : {className : string}){
    return <SocialLink href="https://www.linkedin.com/in/lucianopulido/" img={linkedInIcon} alt="LinkedIn's icon" className={className}/>
}