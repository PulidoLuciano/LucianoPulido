import Latex from "react-latex";

export default function BlockEquation({ children } : { children : string }){
    return(
        <div>
            <Latex displayMode={true}>{`$$ ${children} $$`}</Latex>
        </div>
    )
}