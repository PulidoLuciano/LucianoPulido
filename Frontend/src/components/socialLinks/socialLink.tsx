export default function SocialLink({href, img, alt, className} : {href : string, img: string, alt : string, className? : string}){
    return <a href={href} target="_blank" referrerPolicy="no-referrer"><img src={img} alt={alt} className={className}/></a>
}