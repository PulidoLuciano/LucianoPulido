import Code from "../components/forum/articles/code";
import Danger from "../components/forum/articles/danger";
import Image from "../components/forum/articles/image";
import Info from "../components/forum/articles/info";
import Ordered from "../components/forum/articles/ordered";
import Paragraph from "../components/forum/articles/paragraph";
import Title1 from "../components/forum/articles/Title1";
import Title2 from "../components/forum/articles/Title2";
import Title3 from "../components/forum/articles/Title3";
import Unordered from "../components/forum/articles/unordered";
import Warning from "../components/forum/articles/warning";

const RESERVED_WORDS = ["Title1", "Title2", "Title3", "Paragraph", "Danger", "Warning", "Info", "Image", "Ordered", "Unordered", "EndList", "Code"]

export default function parse(body : string){
    const components : JSX.Element[] = [];
    //body = body.split("\n").join("");
    let bodyParts = body.split("#&");
    console.log(bodyParts);
    while(bodyParts.length){
        let entry = bodyParts.shift();
        switch(entry){
            case "Title1":
                onlyText(components, bodyParts, Title1);
                break;
            case "Title2":
                onlyText(components, bodyParts, Title2);
                break;
            case "Title3":
                onlyText(components, bodyParts, Title3);
                break;
            case "Paragraph":
                onlyText(components, bodyParts, Paragraph);
                break;
            case "Danger":
                onlyText(components, bodyParts, Danger);
                break;
            case "Warning":
                onlyText(components, bodyParts, Warning);
                break;
            case "Info":
                onlyText(components, bodyParts, Info);
                break;
            case "Ordered":
                List(components, bodyParts, Ordered)
                break;
            case "Unordered":
                List(components, bodyParts, Unordered)
                break;
            case "Image":
                ImageWithDescription(components, bodyParts, Image)
                break;
            case "Code":
                LanguageCode(components, bodyParts, Code)
                break;
        }
    }

    return components;
}

function getText(array : string[]){
    let text = array.shift();
    if(!text) text = "There is no text here"
    return text;
}

function getListItems(array:string[]){
    let endIndex = array.indexOf("EndList");
    return array.splice(0, endIndex);
}

function pushComponent(components :  JSX.Element[], component :  JSX.Element){
    components.push(component);
}

function onlyText(components :  JSX.Element[], parts : string[], component : ({text} : {text : string}) => JSX.Element){
    let text = getText(parts);
    pushComponent(components, component({text}));
}

function List(components :  JSX.Element[], parts : string[], component : ({items} : {items : string[]}) => JSX.Element){
    const items = getListItems(parts);
    pushComponent(components, component({items}));
}

function ImageWithDescription(components :  JSX.Element[], parts : string[], component : ({url, description, alt} : {url : string, description : string, alt : string}) => JSX.Element){
    const url = getText(parts);
    const alt = getText(parts);
    const description = getText(parts);
    pushComponent(components, component({url, alt, description}));
}

function LanguageCode(components :  JSX.Element[], parts : string[], component : ({text, language} : {text : string, language : string}) => JSX.Element){
    const language = getText(parts);
    const text = getText(parts);
    pushComponent(components, component({text, language}));
}

