import { Form } from "pulido-react-form";

export default function SearchBar() {
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
        />
      </Form>
    </section>
  );
}
