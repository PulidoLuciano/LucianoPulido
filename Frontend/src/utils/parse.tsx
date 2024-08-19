import ARTICLE_ARTIFACTS, { ArtifactTypes } from "./artifacts";

export default function parse(body : string){
    const components : JSX.Element[] = [];
    let bodyParts = body.split("#&");
    while(bodyParts.length){
        let entry = bodyParts.shift();
        const artifact = ARTICLE_ARTIFACTS.filter(artifactType => artifactType.name === entry)[0];
        if(artifact)
            switch(artifact.type){
                case ArtifactTypes.OnlyText:
                    onlyText(components, bodyParts, artifact.component);
                    break;
                case ArtifactTypes.List:
                    List(components, bodyParts, artifact.component);
                    break;
                case ArtifactTypes.Image:
                    ImageWithDescription(components, bodyParts, artifact.component);
                    break;
                case ArtifactTypes.Code:
                    LanguageCode(components, bodyParts, artifact.component);
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

