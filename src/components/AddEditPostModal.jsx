import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePostContext } from "../contexts/PostContext";

const AddEditPostModal = () => {
  const { isModalOpen, closeModal, currentPost, addPost, updatePost } =
    usePostContext();

  const initialValues = {
    title: currentPost?.title || "",
    description: currentPost?.description || "",
    imageUrl: currentPost?.imageUrl || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    imageUrl: Yup.string().required("ImageUrl is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (currentPost) {
        await updatePost(currentPost.id, values);
      } else {
        await addPost(values);
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {currentPost ? "Edit Post" : "Add New Post"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-500"
                >
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 p-2 block w-full rounded-md "
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-500"
                >
                  Image URL
                </label>
                <Field
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  className="mt-1 p-2 block w-full rounded-md "
                />
                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-500"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="mt-1 p-2 block w-full rounded-md"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-red-300 text-gray-900 hover:bg-red-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {currentPost ? "Update" : "Add"} Post
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEditPostModal;
