export default function Ordered({items} : {items : string[]}){
    return <ol className="list-decimal list-inside pl-6">{items.map((item, index) => <li key={index}>{item}</li>)}</ol>
}