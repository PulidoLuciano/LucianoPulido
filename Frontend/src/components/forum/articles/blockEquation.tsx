import Latex from "react-latex";

export default function BlockEquation({ text } : { text : string }){
    return(
        <div>
            <Latex displayMode={true}>{`$$ ${text} $$`}</Latex>
        </div>
    )
}