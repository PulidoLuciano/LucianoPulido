import Code from "./articles/code";
import Danger from "./articles/danger";
import Image from "./articles/image";
import Info from "./articles/info";
import Ordered from "./articles/ordered";
import Paragraph from "./articles/paragraph";
import Title1 from "./articles/Title1";
import Title2 from "./articles/Title2";
import Title3 from "./articles/Title3";
import Unordered from "./articles/unordered";
import Warning from "./articles/warning";

export default function BodyParser({body} : {body : string}){
    return(
        <>
            <Title1 text="Esto es un Title1"/>
            <Title2 text="Esto es un Title2"/>
            <Title3 text="Esto es un Title3"/>
            <Paragraph text="Esto es un Paragraph"/>
            <Danger text="Esto es un danger"/>
            <Warning text="Esto es un warning"/>
            <Info text="Esto es un info"/>
            <Image url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFrwVKIUJoNSGgL47u1dQtBfeobOEvGB4Hw&s" alt="Alt de la imagen xd" description="test de descripción de la imagen vista arriba"/>
            <Ordered items={["uno", "dos", "tres"]}/>
            <Unordered items={["uno", "dos", "tres"]}/>
            <Code text={"console.log('Hola mundo')"} language="javascript"/>
        </>
    )
}