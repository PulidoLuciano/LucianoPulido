import { ErrorMessage, Form, GeneralStatus } from "pulido-react-form";
import Comment from "./comment";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { CommentData } from "../../types";

export default function CommentSection({ articleId } : { articleId : string }) {
  
  const { fetcher } = useFetch();
  const [ comments, setComments ] = useState<Array<CommentData>>([]);

  useEffect(() => {
    async function fetchComments(){
      const articleComments = await fetcher(`/article/${articleId}/comment`, "GET");
      setComments(articleComments);
    }

    fetchComments();
  }, []);

  async function postComment(event : React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = { message : ((event.target as HTMLFormElement)[0] as HTMLInputElement).value };
    const newComment = await fetcher(`/article/${articleId}/comment`, "POST", { body: JSON.stringify(data) });
    setComments([newComment, ...comments]);
    (event.target as HTMLFormElement).reset();
  }
  
  return (
    <section>
      <div className="grid grid-cols-[auto_1fr] items-center mb-4">
        <h2 className="text-3xl text-primary-dark mr-3">Comments</h2>
        <div className="hidden laptop:block h-1 w-full bg-primary-light relative -bottom-1" />
      </div>
      <Form className="grid grid-cols-[auto_1fr] mb-3" onSubmit={postComment}>
        <span className="bg-white rounded-3xl rounded-r-none hover:cursor-pointer px-3 text-center flex items-center border-2 border-primary-light border-r-0">
          🗨
        </span>
        <textarea
          name="Comment"
          className="w-full rounded-3xl p-2 rounded-l-none border-2 border-primary-light border-l-0 focus:outline-none"
          placeholder="Write your comment"
          autoComplete="off"
          required={true}
          maxLength={255}
        />
        <input
          type="submit"
          className="bg-secondary-light font-semibold hover:bg-secondary-dark py-1 my-1 px-3 rounded-2xl text-black text-right"
        />
        <ErrorMessage className="text-red-500 before:content-['ⓘ_'] my-auto mx-2" htmlFor="Comment"/>
        <GeneralStatus successMessage={<SuccessMessage/>} errorMessage={<GeneralMessage/>}/>
      </Form>
      <section>
        {
          (comments?.length > 0) ?
            comments.map(comment => <Comment data={comment} key={comment.id}/>)
          :
            <p className="text-gray-500">Be the first to comment in this post!</p>
        }
      </section>
    </section>
  );
}

function GeneralMessage(){
  return(
    <div className="bg-red-300 my-2 p-2 w-full rounded-md text-center border-2 border-red-600">ⓘ There was an error creating your comment. Try again!</div>
  )
}

function SuccessMessage() {
  return (
    <div className="bg-green-300 my-2 mx-2 p-2 w-full rounded-md text-center border-2 border-green-600">
      ✓ Message sended successfully
    </div>
  );
}
