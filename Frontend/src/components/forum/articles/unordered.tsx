export default function Unordered({items} : {items : string[]}){
    return <ul className="list-disc list-inside pl-6">{items.map(item => <li>{item}</li>)}</ul>
}