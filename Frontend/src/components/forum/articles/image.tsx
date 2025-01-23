export default function Image({url, description, alt} : {url : string, description? : string, alt : string}){
    return <article className="w-full overflow-hidden mb-4 mt-2">
        <img src={url} alt={alt} className="max-w-full mx-auto"/>
        {description && <p className="text-center text-lg text-gray-600 font-thin">{description}</p>}
    </article>
}