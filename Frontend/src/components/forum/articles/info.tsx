export default function Info({text} : {text : string}){
    return <div className="bg-blue-300 my-4 border-4 py-4 rounded border-blue-600 flex justify-center">
        <span>🛈 {text}</span>
    </div>
}