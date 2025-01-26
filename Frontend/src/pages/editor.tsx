import { ErrorMessage, Form, GeneralStatus } from "pulido-react-form";
import ArticleBody from "../components/forum/articleBody";
import { useEffect, useRef, useState } from "react";
import { Article, Category } from "../types";
import {ARTICLE_ARTIFACTS, TEXT_STYLERS} from "../utils/artifacts";
import { useFetch } from "../hooks/useFetch";

export default function Editor({routeParams} : {routeParams : {articleId : string}}){
    
    const [article, setArticle] = useState<Article>({url: "",title: "", description:"", date:new Date().toJSON().slice(0, 10), body:"", imageUrl: "", categories: [], published: false});
    const [categories, setCategories] = useState<Array<Category>>([]);
    const categoryInput = useRef(null);
    const { fetcher } = useFetch();

    useEffect(() => {
        async function fetchCategories(){
            const categories : Array<Category> = await fetcher("/category", "GET");
            setCategories(categories);
        }

        async function fetchArticle(){
            if(!routeParams.articleId) return;
            const article = await fetcher(`/article/${routeParams.articleId}`, "GET");
            setArticle(article);
        }
        
        fetchCategories();
        fetchArticle();
    }, [])
    
    function changePreview(event : React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>){
        let newArticle : Article = {...article};
        const fieldName = (event.target as HTMLInputElement).name;
        newArticle[fieldName] = (fieldName != "published") ? (event.target as HTMLInputElement).value : (event.target as HTMLInputElement).checked;
        setArticle(newArticle);
    }

    function handleArtefactClick(event : React.SyntheticEvent<HTMLButtonElement>){
        event.preventDefault();
        const artifact = (event.target as HTMLButtonElement).innerText;
        let body = article.body + "\n" + ARTICLE_ARTIFACTS.filter(type => type.name === artifact)[0].structure;
        setArticle({...article, body});
    }

    function handleStyleClick(event : React.SyntheticEvent<HTMLButtonElement>){
        event.preventDefault();
        const artifact = (event.target as HTMLButtonElement).innerText;
        let body = article.body + TEXT_STYLERS.filter(type => type.name === artifact)[0].structure;
        setArticle({...article, body});
    }

    function addCategory(){
        if(!categoryInput.current) return;
        const input = categoryInput.current as HTMLInputElement;
        const category = categories.find(category => category.name === input.value);
        if(!category || article.categories.find(category => category.name === input.value)) return;
        const newCategories = [...article.categories, category];
        input.value = "";
        setArticle({...article, categories: newCategories});
    }

    function deleteCategory(categoryUrl : string){
        const newCategories = article.categories.filter(category => category.url !== categoryUrl);
        setArticle({...article, categories: newCategories});
    }

    async function handleSubmitArticle(event : React.SyntheticEvent<HTMLFormElement>){
        event.preventDefault();
        await fetcher("/article", "POST", {
            body: JSON.stringify(article)
        })
        window.history.pushState({}, "", "/admin");
        const navigationEvent = new Event("pushstate");
        window.dispatchEvent(navigationEvent);
    }

    return(
        <main className="laptop:max-w-screen-tablet laptopL:flex laptopL:max-w-none w-full px-2 gap-2 justify-center mx-auto">
            <Form className="w-full flex flex-col py-6 max-w-screen-tablet relative" onSubmit={handleSubmitArticle}>
                <label htmlFor="url" className="font-semibold pb-1 pt-2">Article's url</label>
                <input type="text" name="url" minLength={3} maxLength={100} pattern="^[a-zA-Z0-9._-]+$" readOnly={routeParams.articleId ? true : false} value={routeParams.articleId} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none" onChange={changePreview}/>
                <ErrorMessage htmlFor="url" className="text-red-500 before:content-['ⓘ_']"/>

                <label htmlFor="title" className="font-semibold pb-1 pt-2">Title</label>
                <input type="text" name="title" required={true} minLength={1} maxLength={75} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none" onChange={changePreview} value={article.title}/>
                <ErrorMessage htmlFor="title" className="text-red-500 before:content-['ⓘ_']"/>
                
                <label htmlFor="description" className="font-semibold pb-1 pt-2">Description</label>
                <textarea name="description" required={true} maxLength={200} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none" onChange={changePreview} value={article.description}/>
                <ErrorMessage htmlFor="description" className="text-red-500 before:content-['ⓘ_']"/>
                
                <label htmlFor="imageUrl" className="font-semibold pb-1 pt-2">Image url</label>
                <input type="text" name="imageUrl" required={true} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none" onChange={changePreview} value={article.imageUrl}/>
                <ErrorMessage htmlFor="imageUrl" className="text-red-500 before:content-['ⓘ_']"/>

                <div className="w-full flex flex-col py-6 max-w-screen-tablet relative">
                    <label className="font-semibold pb-1 pt-2">Categories</label>
                    <input ref={categoryInput} type="text" list="categories" className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"/>
                    <button onClick={addCategory} type="button" className="mt-4 py-2 w-1/2 mx-auto border-primary-light border-4 rounded-md font-semibold cursor-pointer">Add</button>
                    <datalist id="categories">
                        {categories.map(category => <option key={category.url}>{category.name}</option>)}
                    </datalist>
                    <div className="pt-2 flex items-center justify-center gap-2">
                        {article.categories.map(category => <span key={category.url} onClick={() => deleteCategory(category.url)} className="border rounded-md border-secondary-light py-1 px-2">{category.name}</span>)}
                    </div>
                </div>
                
                <label htmlFor="body" className="font-semibold pb-1 pt-2">Body</label>
                <div className="w-full flex justify-between gap-2 py-3 sticky top-11 overflow-x-auto laptopL:min-h-20">
                    {ARTICLE_ARTIFACTS.map(artifact => <button className="bg-secondary-light p-1 rounded-md" onClick={handleArtefactClick}>{artifact.name}</button>)}
                    {TEXT_STYLERS.map(artifact => <button className="bg-secondary-light p-1 rounded-md" onClick={handleStyleClick}>{artifact.name}</button>)}
                </div>
                <textarea name="body" required={true} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none scroll h-32" onChange={changePreview} value={article.body}/>
                <ErrorMessage htmlFor="body" className="text-red-500 before:content-['ⓘ_']" />
                
                <div className="mt-2 pb-1 relative flex items-center gap-1">
                    <input type="checkbox" name="published" id="published" className="opacity-0 cursor-pointer size-6 peer z-10" onChange={changePreview} checked={article.published}/> 
                    <span className="absolute top-0 left-0 size-6 border-primary-dark border-2 bg-transparent peer-checked:bg-primary-light rounded-md after:hidden peer-checked:after:block after:absolute after:left-[6px] after:w-2 after:h-4 after:border-white after:border-r-4 after:border-b-4 after:rotate-45"/>
                    <label htmlFor="published" className="cursor-pointer select-none">Publish</label>
                </div>
                
                <input type="submit" value="Save article" className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"/>
                <GeneralStatus errorMessage={<GeneralMessage/>} successMessage={null}/>
            </Form>
            <section className="max-w-screen-tablet w-full py-6 overflow-y-auto laptopL:max-h-[880px]"> 
                <ArticleBody article={article}/>
            </section>
        </main>
    )
}

function GeneralMessage(){
    return(
      <div className="bg-red-300 my-2 p-2 w-full rounded-md text-center border-2 border-red-600">ⓘ There was an error creating the article</div>
    )
}