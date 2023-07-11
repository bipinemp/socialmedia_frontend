"use client";

import { useRef, useState } from "react";
import { useAddPostMutation } from "../redux/features/posts/postSlice";

const AddPost = () => {
  const imageRef = useRef();

  const [postInfo, setPostInfo] = useState({
    content: "",
  });
  const [postImage, setPostImage] = useState("");

  const handleChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };

  const [addPost, { isLoading, error }] = useAddPostMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ content: postInfo.content, image: postImage })
      .unwrap()
      .then((response) => {
        setPostInfo({ content: "" });
        setPostImage("");
      })
      .catch((error) => {
        console.log(error);
      });
    setPostInfo({ content: "" });
    setPostImage("");
    // imageRef.current.value = "";
  };

  const handlePostImageUpload = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
    } else {
      setPostImage("");
    }
  };

  return (
    <div className="w-96 text-center flex flex-col mx-auto mt-10">
      <h1 className="h1">Add the post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          onChange={handleChange}
          value={postInfo.content}
          type="text"
          name="content"
          placeholder="Content..."
          required
          className="border border-text-secondary p-2 outline-1 focus:outline-secondary"
        />
        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          onChange={handlePostImageUpload}
        />
        <button
          type="submit"
          className="bg-primary text-mode-extralight  py-3 rounded-md font-bold tracking-normal focus:outline-secondary"
        >
          Add Post
        </button>
      </form>
      {postImage ? (
        <>
          <img src={postImage} alt="post image" />
        </>
      ) : (
        <p>Image Preview</p>
      )}
    </div>
  );
};

export default AddPost;
