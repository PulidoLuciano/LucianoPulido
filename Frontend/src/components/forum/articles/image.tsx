export default function Image({url, description, alt} : {url : string, description? : string, alt : string}){
    return <article className="w-full overflow-hidden">
        <img src={url} alt={alt} className="max-w-full mx-auto"/>
        <p className="text-center text-lg text-gray-600 font-thin">{description}</p>
    </article>
}