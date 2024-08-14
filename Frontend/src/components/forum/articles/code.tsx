export default function Code({text, language} : {text : string, language : string}){
    return (
        <pre>
            <code slot="">{text}</code>
        </pre>
    )
}