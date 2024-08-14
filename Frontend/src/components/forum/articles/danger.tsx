export default function Danger({text} : {text : string}){
    return <div className="bg-red-300 my-4 border-4 py-4 rounded border-red-600 flex justify-center">
        <span>⚠ {text}</span>
    </div>
}