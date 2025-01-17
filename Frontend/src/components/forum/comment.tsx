import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch";
import { CommentData } from "../../types";

export default function Comment( { data } : { data : CommentData}){
    
    const { fetcher } = useFetch();
    const [ responses, setResponses ] = useState<Array<CommentData>>([]);
    
    useEffect(() => {
        async function fetchComments(){
            const fetchedResponses = await fetcher(`/comment/${data.id}/response`, "GET");
            setResponses(fetchedResponses)
        }

        fetchComments();
    }, []);
    
    return(
        <article className="pl-3 border-l-2 hover:border-primary-light">
          <div className="flex justify-between py-2">
            <p className="font-semibold">{data.username}</p>
            <p className="text-right text-gray-500">{new Date(data.date).toLocaleString()}</p>
          </div>
          <p>
            {data.message}
          </p>
          <button className="text-secondary-light w-full text-right underline">
            Answer
          </button>
          {
            responses.map(response => <Comment data={response}/>)
          }
        </article>
    )
}