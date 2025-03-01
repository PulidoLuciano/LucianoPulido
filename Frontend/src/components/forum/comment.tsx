import { useEffect, useState } from "react";
import { CommentData } from "../../types";
import { Form } from "pulido-react-form";

export default function Comment({
  data,
  fetcher,
}: {
  data: CommentData;
  fetcher: (
    route: string,
    method: RequestInit["method"],
    options?: RequestInit | null,
    token?: string | null
  ) => Promise<any>;
}) {
  const [responses, setResponses] = useState<Array<CommentData>>([]);
  const [sendingResponse, setSendingResponse] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<Boolean>(false);

  useEffect(() => {
    async function fetchComments() {
      const fetchedResponses = await fetcher(
        `/comment/${data.id}/response`,
        "GET"
      );
      setResponses(fetchedResponses);
    }

    fetchComments();
  }, []);

  async function postResponse(event: React.SyntheticEvent<HTMLFormElement>) {
    try{
      event.preventDefault();
      setSendingResponse(true);
      const dataResponse = {
        message: ((event.target as HTMLFormElement)[0] as HTMLInputElement).value,
      };
      const newResponse = await fetcher(`/comment/${data.id}/response`, "POST", {
        body: JSON.stringify(dataResponse),
      });
      setResponses([newResponse, ...responses]);
      (event.target as HTMLFormElement).reset();
      setShowForm(false);
    }finally{
      setSendingResponse(false);
    }
  }

  return (
    <article className="pl-3 border-l-2 hover:border-primary-light">
      <div className="flex justify-between py-2">
        <p className="font-semibold">{data.username}</p>
        <p className="text-right text-gray-500">
          {new Date(data.date).toLocaleString()}
        </p>
      </div>
      <p>{data.message}</p>
      {!showForm ? (
        <button
          className="text-secondary-light w-full text-right underline"
          onClick={() => setShowForm(true)}
        >
          Answer
        </button>
      ) : (
        <Form
          className="my-2 w-full flex flex-col gap-2 items-end"
          onSubmit={postResponse}
        >
          <input
            type="text"
            placeholder="Write your response here!"
            className="w-11/12 bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
          />
          <div className="w-full flex justify-end gap-2">
            <button
              type="reset"
              className="text-primary-dark-light underline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="text-secondary-light underline disabled:text-secondary-dark" disabled={sendingResponse}>
              {(!sendingResponse) ? "Submit" : "Submitting..."}
            </button>
          </div>
        </Form>
      )}
      {responses.map((response) => (
        <Comment key={response.id} data={response} fetcher={fetcher}/>
      ))}
    </article>
  );
}
