import { useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { CommentDashboard } from "../../../types";
import { Link } from "luciano-react-router";

export default function CommentsDashboard() {
  const { fetcher } = useFetch();
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [responsesCount, setResponsesCount] = useState<number>(0);
  const [comments, setComments] = useState<Array<CommentDashboard>>([]);
  const [offset, setOffset] = useState<number>(0);
  const limit : number = 10;

  useEffect(() => {
    async function fetchData() {
      let data: { count: number } = await fetcher("/comment/count", "GET");
      setCommentsCount(data.count);
      data = await fetcher("/comment/count/responses", "GET");
      setResponsesCount(data.count);
      await fetchFirstComments();
    }

    fetchData();
  }, []);

  async function fetchFirstComments() {
    const commentsData = await fetcher(`/comment/dashboard?limit=${limit}&offset=${0}`, "GET");
    setComments(commentsData);
    setOffset(0 + limit);
  }
  
  async function fetchMoreComments() {
    const moreComments = await fetcher(`/comment/dashboard?limit=${limit}&offset=${offset}`, "GET");
    setOffset(offset + limit);
    setComments([...comments, ...moreComments]);
  }

  async function deleteComment(comment: CommentDashboard) {
    try {
      await fetcher(`/comment/${comment.id}`, "DELETE");
    } catch (error) {
        if((error as Error).message == "Failed to execute 'json' on 'Response': Unexpected end of JSON input"){
        setComments(comments.filter(c => c.id !== comment.id));
        setCommentsCount(commentsCount - 1);
      }else{
        console.error("Error deleting article:", error);
      }
    }
  }

  return (
    <article>
      <section className="flex justify-between">
        <h2 className="text-2xl font-semibold">Comments</h2>
      </section>
      <section className="flex justify-around py-4">
        <span>
          <p className="text-gray-500 italic">Quantity</p>
          <p className="text-2xl">{commentsCount}</p>
        </span>
        <span>
          <p className="text-gray-500 italic">Responses</p>
          <p className="text-2xl">{responsesCount}</p>
        </span>
      </section>
      <section className="border-2 border-primary-light rounded-3xl h-96 overflow-auto px-4 py-4">
        {comments.length ? (
          comments.map((comment) => (
            <article className="w-full justify-between mb-3" key={comment.id}>
              <Link href={`/articles/${comment.articleUrl}`} className="font-semibold">
                {comment.message}
              </Link>
              <p>
                {comment.username}
              </p>
              <div className="flex gap-2">
                <button className="px-1" onClick={() => deleteComment(comment)}>
                🗑️
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>There's no comments</p>
        )}
        {
            (comments.length < commentsCount) ?
            <button className="text-secondary-dark underline w-full" onClick={fetchMoreComments}>
                Show more
            </button>
            :
            null
        }
      </section>
    </article>
  );
}