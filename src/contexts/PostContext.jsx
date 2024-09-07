import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState[false];

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/posts");

      const posts = res.data;

      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  const fetchPost = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/posts/${id}`);

      const post = res.data;

      setCurrentPost(post);
    } catch (error) {
      console.log("Error fetching post by id: ", error);
    }
  };

  const addPost = async (postData) => {
    try {
      const res = await axios.post(`http://localhost:3001/posts`, postData);

      const newPost = res.data;

      setPosts((oldPosts) => [...oldPosts, newPost]);
    } catch (error) {
      console.log("Error adding post: ", error);
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/posts/${id}`,
        postData
      );

      const updatedPost = res.data;

      setPosts((oldPosts) =>
        oldPosts.map((post) => (post.id === id ? updatedPost : post))
      );
    } catch (error) {
      console.log("Error updating post: ", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.log("Error deleting post: ", error);
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
