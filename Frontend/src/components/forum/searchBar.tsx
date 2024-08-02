import { Form } from "pulido-react-form";
import { useState } from "react";

interface searchBarProps{
  autoFocus? : boolean
  value? : string | undefined
}

export default function SearchBar({autoFocus, value} : searchBarProps) {
  
  const [searchQuery, setQuery] = useState(value);

  function changeHandler(event : React.SyntheticEvent<HTMLInputElement>){
    setQuery((event.target as HTMLInputElement).value);
    window.history.pushState({}, "", `/search?q=${(event.target as HTMLInputElement).value}`);
    const navigationEvent = new Event("pushstate");
    dispatchEvent(navigationEvent);
  }
  
  return (
    <section className="w-full py-6">
      <Form className="flex">
        <span className="bg-white rounded-3xl rounded-r-none hover:cursor-pointer px-3 text-center flex items-center border-2 border-primary-light border-r-0">
          🔎
        </span>
        <input
          type="search"
          name="search"
          className="w-full rounded-3xl p-2 rounded-l-none border-2 border-primary-light border-l-0 focus:outline-none"
          placeholder="Search for an article"
          onChange={changeHandler}
          autoFocus={autoFocus}
          value={searchQuery}
        />
      </Form>
    </section>
  );
}
