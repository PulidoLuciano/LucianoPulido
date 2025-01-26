import { ARTICLE_ARTIFACTS, ArtifactTypes, TEXT_STYLERS, TextStylers } from "./artifacts";

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
    if(!text) return "There is no text here"
    return text;
}

function getListItems(array:string[]){
    let items = array.splice(0, array.indexOf("EndList"));
    const components = items.map(item => parseStyles(item));
    return components;
}

function parseStyles( text : string ) : JSX.Element[]{
    const components : JSX.Element[] = [];
    let lastIndexSearched = 0;
    while(true){
        let found : { index: number, styler: TextStylers | null}= {
            index: -1,
            styler: null
        };
        TEXT_STYLERS.forEach(styler => { 
            let indexDelimiter = text.indexOf(styler.delimiter, lastIndexSearched);
            if((found.index > indexDelimiter || found.index == -1) && indexDelimiter >= 0){
                found.index = indexDelimiter;
                found.styler = styler;
            }
        });
        if(!found.styler){
            components.push(<>{text.substring(lastIndexSearched)}</>);
            break;
        }
        let textBefore = text.substring(lastIndexSearched, found.index);
        if(textBefore.length > 0) components.push(<>{textBefore}</>);
        
        const closeIndex = text.indexOf(found.styler.delimiter, found.index + 2);
        if(closeIndex === -1){
            components.push(<>{text.substring(found.index, found.index + 2)}</>);
            lastIndexSearched = found.index + 2;
            continue;
        }
        let textBetween = text.substring(found.index + 2, closeIndex);
        if(found.styler.name === "Link"){
            const texts = textBetween.split("|");
            pushComponent(components, found.styler.component({url : texts[0], text : texts[1]}));
        }else{
            pushComponent(components, found.styler.component({text : textBetween}));
        }
        lastIndexSearched = closeIndex + 2;
    }
    return components;
}

function pushComponent(components :  JSX.Element[], component :  JSX.Element){
    components.push(component);
}

function onlyText(components :  JSX.Element[], parts : string[], component : ({children} : {children : JSX.Element[] | string}) => JSX.Element){
    let text = getText(parts);
    const children = (component.name !== "BlockEquation") ? parseStyles(text) : text;
    pushComponent(components, component({children}));
}

function List(components :  JSX.Element[], parts : string[], component : ({items} : {items : JSX.Element[][]}) => JSX.Element){
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

