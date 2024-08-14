export default function Warning({text} : {text : string}){
    return <div className="bg-yellow-300 my-4 border-4 py-4 rounded border-yellow-600 flex justify-center">
        <span>⚠ {text}</span>
    </div>
}