import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const api = axios.create({
    baseURL: "https://blog-react-api-pied.vercel.app/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  const fetchPost = async (id) => {
    try {
      const res = await api.get(`/posts/${id}`);
      setCurrentPost(res.data);
    } catch (error) {
      console.error("Error fetching post by id: ", error);
    }
  };

  const addPost = async (postData) => {
    try {
      const res = await api.post("/posts", postData);
      const newPost = res.data;
      setPosts((oldPosts) => [...oldPosts, newPost]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const res = await api.put(`/posts/${id}`, postData);
      const updatedPost = res.data;
      setPosts((oldPosts) =>
        oldPosts.map((post) => (post.id === id ? updatedPost : post))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const openAddPostModal = () => {
    setCurrentPost(null);
    setIsModalOpen(true);
  };

  const openEditPostModal = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        currentPost,
        isModalOpen,
        fetchPosts,
        fetchPost,
        addPost,
        updatePost,
        deletePost,
        openAddPostModal,
        openEditPostModal,
        closeModal,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
