import { ErrorMessage, Form, GeneralStatus } from "pulido-react-form";
import { useFetch } from "../../../hooks/useFetch";

export default function CategoryForm() {
    
    const { fetcher } = useFetch();
    
    async function createCategory(event:React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        event.currentTarget = event.currentTarget ? event.currentTarget : event.target as HTMLFormElement;
        const { url, name } = event.currentTarget.elements as HTMLFormControlsCollection & {url : {value : string}, name : {value : string}};
        await fetcher("/category", "POST", { body: JSON.stringify({ url: url.value, name: name.value }) });
        event.currentTarget.reset();
    }
    
    return(
        <Form className="mb-12 flex flex-col gap-2" onSubmit={createCategory}>
            <h2 className="text-2xl font-semibold mb-4">Create categories</h2>
            <label htmlFor="url" className="font-semibold pb-1 pt-2">Url</label>
            <input type="text" name="url" required={true} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"/>
            <ErrorMessage htmlFor="url" className="text-red-500 before:content-['ⓘ_']"/>
            <label htmlFor="name" className="font-semibold pb-1 pt-2">Name</label>
            <input type="text" name="name" required={true} className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"/>
            <ErrorMessage htmlFor="name" className="text-red-500 before:content-['ⓘ_']"/>
            <input type="submit" value="⊕ Create category" className="bg-secondary-light font-semibold px-4 py-1 rounded-md"/>
            <GeneralStatus
                    successMessage={<SuccessMessage />}
                    errorMessage={<GeneralMessage />}
            />
        </Form>
    )
}

function SuccessMessage() {
    return (
      <div className="bg-green-300 my-2 p-2 w-full rounded-md text-center border-2 border-green-600">
        ✓ Category created successfully
      </div>
    );
  }
  
  function GeneralMessage() {
    return (
      <div className="bg-red-300 my-2 p-2 w-full rounded-md text-center border-2 border-red-600">
        ⓘ There was an error. Try again!
      </div>
    );
  }
  
