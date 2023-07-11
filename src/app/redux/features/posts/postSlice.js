import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const POSTS_URL = process.env.POSTS_URL;
const BASE_URL = process.env.BASE_POSTS_URL;

export const postSlice = createApi({
  reducerPath: "postapi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    getSinglePost: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    addPost: builder.mutation({
      query: ({ content, image }) => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: { content, image },
      }),
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
    updatePost: builder.mutation({
      query: ({ postId, content }) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["post"],
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["post"],
    }),
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}/unlike`,
        method: "POST",
      }),
      invalidatesTags: ["post"],
    }),
    commentOnPost: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `${POSTS_URL}/${postId}/comments`,
        method: "POST",
        body: { comment },
      }),
      async onQueryStarted(
        { comment, postId, username },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postSlice.util.updateQueryData("getAllPosts", undefined, (draft) => {
            const post = draft.posts.find((post) => post._id === postId);
            if (post) {
              post.comments.push({ comment, username });
            }
            return draft;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    replyOnComment: builder.mutation({
      query: ({ postId, commentId, reply }) => ({
        url: `${POSTS_URL}/${postId}/comments/${commentId}/reply`,
        method: "POST",
        body: { reply },
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useCommentOnPostMutation,
  useReplyOnCommentMutation,
} = postSlice;
