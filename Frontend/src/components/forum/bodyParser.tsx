import parse from "../../utils/parse";

export default function BodyParser({body} : {body : string}){
    
    const bodyParsed = parse(body);
    
    return(
        <>
        {bodyParsed.map(component => component)}
        </>
    )
}