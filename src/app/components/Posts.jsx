"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { parseCookies } from "nookies";

import { useGetProfileQuery } from "../redux/features/api/apiSlice";
import {
  useCommentOnPostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useLikePostMutation,
  useReplyOnCommentMutation,
  useUnlikePostMutation,
} from "../redux/features/posts/postSlice";
import { useDispatch } from "react-redux";
import { editData } from "../redux/features/posts/postDataSlice";

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import EditPost from "./EditPost";

function Posts() {
  const { username } = parseCookies();

  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetAllPostsQuery();
  const { data: dataprofile } = useGetProfileQuery();
  const [addLike] = useLikePostMutation();
  const [removeLike] = useUnlikePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [replyOnComment] = useReplyOnCommentMutation();

  const handleLikes = (postId, isLiked) => {
    if (isLiked) {
      removeLike(postId);
    } else {
      addLike(postId);
    }
  };

  const [addComment] = useCommentOnPostMutation();
  const [commentInfo, setCommentInfo] = useState({
    comment: "",
  });
  const [commentModel, setCommentModel] = useState(null);

  const handleComment = (postId) => {
    if (commentModel === postId) {
      setCommentModel(null);
      setReplyOnCommentModel(null);
    } else {
      setCommentModel(postId);
    }
  };

  const handleAddComment = (e, postId, commentInfo) => {
    e.preventDefault();
    const commentString = String(commentInfo.comment);
    addComment({ postId, comment: commentString, username: username });
    setCommentInfo({
      comment: "",
    });
  };

  const options = ["Delete", "Update"];

  const [openOptions, setOpenOptions] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const handleOptions = (postId) => {
    if (openOptions === postId) {
      setOpenOptions(null);
      setSelectedPostId(null);
    } else {
      setOpenOptions(postId);
      setSelectedPostId(postId);
    }
  };

  const optionsRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpenOptions(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [options]);

  const [showModal, setShowModal] = useState(false);

  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedCommentPostId, setSelectedCommentPostId] = useState(null);
  const [replyOnCommentModel, setReplyOnCommentModel] = useState(null);

  const handleCommentReply = (commentId, postId) => {
    if (selectedComment === commentId) {
      setSelectedComment(null);
    } else {
      setSelectedComment(commentId);
      setSelectedCommentPostId(postId);
    }
  };

  const handleReplyModel = (commentId) => {
    if (replyOnCommentModel === commentId) {
      setReplyOnCommentModel(null);
    } else {
      setReplyOnCommentModel(commentId);
    }
  };

  const [replyInfo, setReplyInfo] = useState({
    reply: "",
  });

  const submitReplyToComment = (e, commentId) => {
    e.preventDefault();
    replyOnComment({
      postId: selectedCommentPostId,
      commentId: selectedComment,
      reply: replyInfo.reply,
    });
    setReplyInfo({
      reply: "",
    });

    setSelectedComment(null);
    setReplyOnCommentModel(commentId);
  };

  const calculateDate = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt), {
      addSuffix: false,
    });

    let formattedDistance;

    if (distance.includes("less than a minute")) {
      formattedDistance = "1m";
    } else {
      formattedDistance = distance
        .replace(/(about | ago)/g, "")
        .replace(/\s/g, "");

      if (formattedDistance.includes("minute")) {
        formattedDistance = formattedDistance.replace(/minute(s)?/, "m");
      } else if (formattedDistance.includes("hour")) {
        formattedDistance = formattedDistance.replace(/hour(s)?/, "h");
      } else if (formattedDistance.includes("day")) {
        formattedDistance = formattedDistance.replace(/day(s)?/, "d");
      } else if (formattedDistance.includes("month")) {
        formattedDistance = formattedDistance.replace(/month(s)?/, "mon");
      } else if (formattedDistance.includes("year")) {
        formattedDistance = formattedDistance.replace(/year(s)?/, "yr");
      }
    }

    return <p>{formattedDistance}</p>;
  };

  return (
    <div className="mb-20">
      <h1 className="h1">Posts</h1>

      <div className="flex flex-col gap-5">
        {isLoading && <h1 className="h1">Loading Posts ...</h1>}
        {data &&
          data.posts.map((post) => {
            const isLiked = post.likes.includes(dataprofile.user._id);

            return (
              <div
                key={post._id}
                className="relative w-96 h-auto p-3 border border-black flex flex-col gap-1"
              >
                <EditPost
                  isVisible={showModal && selectedPostId === post._id}
                  postId={selectedPostId}
                  onClose={() => {
                    setShowModal(false);
                    document.body.style.overflow = "scroll";
                    setOpenOptions(null);
                  }}
                />
                <div className="flex justify-between">
                  <div className="flex-col mb-2">
                    <h1 className="font-bold text-lg text-text-secondary">
                      {post.user.username}
                    </h1>
                    <div className="text-sm text-text-secondary">
                      {calculateDate(post.createdAt)}
                    </div>
                  </div>
                  {dataprofile && dataprofile.user._id === post.user._id && (
                    <p className="relative">
                      <SlOptionsVertical
                        fontSize={25}
                        cursor="pointer"
                        onClick={() => handleOptions(post._id)}
                      />
                      <span
                        ref={optionsRef}
                        className="flex flex-col gap-1 absolute right-0 top-10 bg-mode-minuslight border-text-secondary"
                      >
                        {openOptions === post._id &&
                          options.map((item, index) => (
                            <span
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item === "Delete") {
                                  deletePost(post._id);
                                }
                                if (item === "Update") {
                                  dispatch(editData(post));
                                  setShowModal(true);
                                  document.body.style.overflow = "hidden";
                                }
                              }}
                              className="hover:bg-secondary hover:text-mode-extralight py-1 px-2 w-full cursor-pointer rounded"
                            >
                              {item}
                            </span>
                          ))}
                      </span>
                    </p>
                  )}
                </div>
                <p>{post.content}</p>
                {post.image && (
                  <Image
                    src={post.image?.url}
                    alt={post.image?.name || "post image"}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full"
                    priority
                  />
                )}
                <div className="flex flex-col gap-4">
                  <div className="flex gap-7">
                    <span
                      onClick={() => handleLikes(post._id, isLiked)}
                      className="flex items-center gap-0.5 cursor-pointer hover:bg-slate-200 p-2 rounded-md"
                    >
                      <p className="font-bold pt-1">{post.likes.length}</p>
                      <span>
                        {isLiked ? (
                          <AiFillLike
                            fontSize={25}
                            cursor="pointer"
                            className="fill-secondary"
                          />
                        ) : (
                          <AiOutlineLike fontSize={25} />
                        )}
                      </span>
                      Like
                    </span>
                    <span
                      onClick={() => handleComment(post._id)}
                      className="flex items-center gap-0.5 cursor-pointer hover:bg-slate-200 p-2 rounded-md"
                    >
                      <p className="font-bold">{post.comments.length}</p>
                      <BiComment fontSize={25} cursor="pointer" />
                      Comment
                    </span>
                  </div>

                  {commentModel === post._id && (
                    <div className="flex flex-col gap-2 border-t-2 border-t-text-primary pt-4">
                      {post.comments.map((comment) => {
                        const commentUser = comment.user;
                        const username = commentUser
                          ? commentUser.username
                          : "Unknown";
                        const uname = comment.username;
                        // console.log(post.comments);
                        return (
                          <div
                            key={comment._id ? comment._id : uname}
                            className="flex flex-col p-2 border-l border-l-secondary"
                          >
                            <div className="flex gap-2 ">
                              <b>{uname ? uname : username}: </b>
                              <p>{comment.comment}</p>
                            </div>
                            <div className="flex gap-3">
                              <span
                                onClick={() =>
                                  handleCommentReply(comment._id, post._id)
                                }
                                className="text-text-secondary text-sm cursor-pointer underline underline-offset-2"
                              >
                                reply
                              </span>
                              {comment.replies &&
                                comment.replies.length > 0 && (
                                  <span
                                    onClick={() =>
                                      handleReplyModel(comment._id)
                                    }
                                    className="text-text-secondary text-sm cursor-pointer underline underline-offset-2"
                                  >
                                    View Replies ({comment.replies.length})
                                  </span>
                                )}
                            </div>
                            {replyOnCommentModel === comment._id &&
                              comment.replies.length > 0 && (
                                <h1 className="ml-6 font-bold mt-1 text-sm text-text-secondary">
                                  All Replies :
                                </h1>
                              )}
                            {replyOnCommentModel === comment._id &&
                              comment.replies.map((reply) => {
                                const replyUser = reply.user;
                                const username = replyUser
                                  ? replyUser.username
                                  : "Unknown";
                                return (
                                  <div
                                    key={reply._id}
                                    className="text-sm flex gap-2 ml-6 border-l border-l-secondary pl-2"
                                  >
                                    <b className="text-text-secondary">
                                      {username}:{" "}
                                    </b>
                                    <p>{reply.reply}</p>
                                  </div>
                                );
                              })}
                            {selectedComment === comment._id && (
                              <form
                                onSubmit={(e) =>
                                  submitReplyToComment(e, comment._id)
                                }
                                className="flex gap-2 justify-between mt-2"
                              >
                                <input
                                  value={replyInfo.reply}
                                  onChange={(e) =>
                                    setReplyInfo({
                                      ...replyInfo,
                                      [e.target.name]: e.target.value,
                                    })
                                  }
                                  type="text"
                                  name="reply"
                                  placeholder="Enter a Reply.."
                                  required
                                  className="w-full border border-text-secondary p-1 text-sm outline-1 focus:outline-secondary"
                                />
                                <button
                                  type="submit"
                                  className="bg-primary text-mode-extralight  py-1 px-3 text-sm rounded tracking-normal focus:outline-secondary"
                                >
                                  Reply
                                </button>
                              </form>
                            )}
                          </div>
                        );
                      })}

                      <div className="flex flex-col gap-3">
                        <form
                          className="flex gap-3 justify-between"
                          onSubmit={(e) =>
                            handleAddComment(e, post._id, commentInfo)
                          }
                        >
                          <input
                            value={commentInfo.comment}
                            onChange={(e) =>
                              setCommentInfo({
                                ...commentInfo,
                                [e.target.name]: e.target.value,
                              })
                            }
                            type="text"
                            name="comment"
                            placeholder="Write a Comment..."
                            className="w-full border border-text-secondary p-1 pl-4 outline-1 focus:outline-secondary"
                          />
                          <button type="submit">
                            <IoSend fontSize={25} cursor="pointer" />
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Posts;
