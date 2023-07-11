"use client";
import { IoCloseSharp } from "react-icons/io5";
import {
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "../redux/features/posts/postSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditPost = ({ isVisible, onClose, postId }) => {
  const { data } = useGetSinglePostQuery(postId ? postId : "");
  const [updatePost] = useUpdatePostMutation();
  const { editData } = useSelector((state) => state.postData);
  const [editPostInfo, setEditPostInfo] = useState({
    content: "",
  });

  useEffect(() => {
    if (editData) {
      setEditPostInfo((prevEditPostInfo) => ({
        ...prevEditPostInfo,
        content: editData.content,
      }));
    }
  }, [editData]);

  const handleUpdatePost = (e) => {
    e.preventDefault();
    updatePost({ postId, content: editPostInfo.content });
    onClose();
  };

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-center items-center bg-neutral-800/70">
      <div className="w-[500px] flex flex-col">
        <button className="place-self-end" onClick={onClose}>
          <IoCloseSharp
            fontSize={40}
            cursor="pointer"
            className="fill-mode-extralight"
          />
        </button>
        <div className="bg-mode-light p-4">
          <form onSubmit={handleUpdatePost} className="flex flex-col gap-3">
            <input
              value={editPostInfo.content ? editPostInfo.content : ""}
              onChange={(e) =>
                setEditPostInfo({
                  ...editPostInfo,
                  content: e.target.value,
                })
              }
              type="text"
              name="content"
              placeholder="Content..."
              required
              className="border border-text-secondary p-2 outline-1 focus:outline-secondary"
            />
            <button
              className="bg-primary text-mode-extralight  py-3 rounded-md font-bold tracking-normal focus:outline-secondary"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
