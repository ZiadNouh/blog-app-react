import { useEffect } from "react";
import { usePostContext } from "../contexts/PostContext";
import { useParams } from "react-router-dom";

export const PostDetailsPage = () => {
  const { currentPost, fetchPost } = usePostContext();
  const { id } = useParams();

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  if (!currentPost) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="card card-side bg-slate-800 shadow-xl max-w-[80rem] w-full">
        <figure className="w-1/2">
          <img
            src={currentPost.imageUrl}
            alt="Post Image"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body w-1/2 p-4">
          <h2 className="card-title text-2xl font-bold">{currentPost.title}</h2>
          <p className="text-base">{currentPost.description}</p>
        </div>
      </div>
    </div>
  );
};
