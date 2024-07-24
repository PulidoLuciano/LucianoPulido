import SocialLink from "./socialLink";
import githubIcon from "../../assets/github.svg"

export default function GithubLink({className} : {className : string}){
    return <SocialLink href="https://github.com/PulidoLuciano" img={githubIcon} alt="Github's icon" className={className}/>
}