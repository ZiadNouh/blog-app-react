import React from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { usePostContext } from "../contexts/PostContext";

export const PostCard = ({ post }) => {
  const { user } = useAuthContext();
  const { deletePost, openEditPostModal } = usePostContext();

  const isOwnPost = user && user.id === post.userId;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id);
    }
  };

  const handleEdit = () => {
    openEditPostModal(post);
  };

  return (
    <div className="card card-compact w-auto shadow-xl my-5 bg-slate-800">
      <figure>
        <img src={post.imageUrl} alt="Post Image" />
      </figure>
      <div className="card-body">
        <Link to={`/posts/${post.id}`}>
          <h2 className="card-title">{post.title}</h2>
        </Link>
        <p>{post.description}</p>
        {isOwnPost && (
          <div className="card-actions justify-end">
            <button className="btn btn-error" onClick={handleDelete}>
              <Trash size={24} />
            </button>
            <button className="btn btn-primary" onClick={handleEdit}>
              <Pencil size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
