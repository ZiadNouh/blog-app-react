import React, { useEffect } from "react";
import { usePostContext } from "../contexts/PostContext";
import { PostCard } from "../components/PostCard";
import { PlusCircle } from "@phosphor-icons/react";
import AddEditPostModal from "../components/AddEditPostModal";
import { useAuthContext } from "../contexts/AuthContext";

export const HomePage = () => {
  const { posts, fetchPosts } = usePostContext();
  const { openAddPostModal } = usePostContext();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  return (
    <div className="flex justify-center relative ">
      <div className=" max-w-[20rem] container mx-7 md:max-w-[30rem] lg:max-w-[40rem]">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {isLoggedIn && (
        <div
          className="fixed bottom-5 right-5 cursor-pointer"
          onClick={openAddPostModal}
        >
          <PlusCircle size={48} color="#21c47e" weight="bold" />
        </div>
      )}

      <AddEditPostModal />
    </div>
  );
};
