export default function Image({url, description, alt} : {url : string, description? : string, alt : string}){
    return <article>
        <img src={url} alt={alt} />
        <p>{description}</p>
    </article>
}