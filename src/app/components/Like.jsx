"use client";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../redux/features/posts/postSlice";
import { BiComment } from "react-icons/bi";

const Like = ({ post, isLiked }) => {
  const [addLike] = useLikePostMutation();
  const [removeLike] = useUnlikePostMutation();
  const handleLikes = (postId, isLiked) => {
    if (isLiked) {
      removeLike(postId);
    } else {
      addLike(postId);
    }
  };
  return (
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
  );
};

export default Like;
