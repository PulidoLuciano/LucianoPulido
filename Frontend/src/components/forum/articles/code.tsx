import Prism from 'prismjs';
import { useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.min.css'

export default function Code({text, language} : {text : string, language : string}){
    
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    
    return (
        <pre className='py-6'>
            <code slot='' className={`language-${language}`}>{text}</code>
        </pre>
    )
}