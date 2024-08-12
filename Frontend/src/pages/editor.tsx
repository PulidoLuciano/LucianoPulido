import { ErrorMessage, Form } from "pulido-react-form";
import Article from "./article";

export default function Editor({routeParams} : {routeParams : {articleId : string}}){
    return(
        <main className="laptop:max-w-screen-tablet laptopL:flex laptopL:max-w-none w-full px-2 gap-2 justify-center mx-auto">
            <Form className="w-full flex flex-col py-6 max-w-screen-tablet relative">
                <label htmlFor="Id" className="font-semibold pb-1 pt-2">Article's id</label>
                <input type="text" name="Id" readOnly={true} value={routeParams.articleId} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none text-gray-500"/>
                <label htmlFor="Title" className="font-semibold pb-1 pt-2">Title</label>
                <input type="text" name="Title" required={true} maxLength={70} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"/>
                <ErrorMessage htmlFor="Title" className="text-red-500 before:content-['ⓘ_']"/>
                <label htmlFor="Description" className="font-semibold pb-1 pt-2">Description</label>
                <textarea name="Description" required={true} maxLength={200} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"/>
                <ErrorMessage htmlFor="Description" className="text-red-500 before:content-['ⓘ_']"/>
                <label htmlFor="Image" className="font-semibold pb-1 pt-2">Image</label>
                <input type="file" name="Image" required={true} maxLength={70} accept="image/png, image/jpeg" className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"/>
                <ErrorMessage htmlFor="Image" className="text-red-500 before:content-['ⓘ_']"/>
                <label htmlFor="Body" className="font-semibold pb-1 pt-2">Body</label>
                <div className="w-full flex justify-between gap-2 py-3 sticky top-11 overflow-x-auto laptopL:min-h-20">
                    <button className="bg-secondary-light p-1 rounded-md">Title 1</button>
                    <button className="bg-secondary-light p-1 rounded-md">Title 2</button>
                    <button className="bg-secondary-light p-1 rounded-md">Title 3</button>
                    <button className="bg-secondary-light p-1 rounded-md">Danger</button>
                    <button className="bg-secondary-light p-1 rounded-md">Warning</button>
                    <button className="bg-secondary-light p-1 rounded-md">Quote</button>
                    <button className="bg-secondary-light p-1 rounded-md">Image</button>
                    <button className="bg-secondary-light p-1 rounded-md">Ordered list</button>
                    <button className="bg-secondary-light p-1 rounded-md">Unordered list</button>
                    <button className="bg-secondary-light p-1 rounded-md">Table</button>
                    <button className="bg-secondary-light p-1 rounded-md">Code</button>
                </div>
                <textarea name="Body" required={true} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none scroll h-32"/>
                <ErrorMessage htmlFor="Body" className="text-red-500 before:content-['ⓘ_']"/>
                <div className="mt-2 pb-1 relative flex items-center gap-1">
                    <input type="checkbox" name="receiveEmail" id="receiveEmail" className="opacity-0 cursor-pointer size-6 peer z-10"/> 
                    <span className="absolute top-0 left-0 size-6 border-primary-dark border-2 bg-transparent peer-checked:bg-primary-light rounded-md after:hidden peer-checked:after:block after:absolute after:left-[6px] after:w-2 after:h-4 after:border-white after:border-r-4 after:border-b-4 after:rotate-45"/>
                    <label htmlFor="receiveEmail" className="cursor-pointer select-none">Publish</label>
                </div>
                <input type="submit" value="Save article" className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"/>
            </Form>
            <section className="max-w-screen-tablet w-full py-6 overflow-y-auto laptopL:max-h-[880px]"> 
                <Article/>
            </section>
        </main>
    )
}