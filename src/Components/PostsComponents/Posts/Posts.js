import "./Posts.css";
import Post from "../Post/Post.js";
import { getPosts } from "../postsSlice.js";
import { useEffect } from "react";
import PostsMockResponse from "../../../Resources/PostsMockResponse.js";

export default function Posts({ state, dispatch }) {
  useEffect(() => {
    dispatch(
      getPosts({
        selectedSubreddit: state.subreddits.selectedSubreddit,
        term: state.navbar.term,
      })
    );
  }, [state.subreddits.selectedSubreddit]);

  console.log(state.posts.postList);
  console.log(state.subreddits.selectedSubreddit);
  return (
    <main>
      {state.posts.postList
        .filter((post) =>
          post.data.title.toLowerCase().includes(state.navbar.term)
        )
        .map((post, index) => {
          return (
            <Post
              subreddit={state.subreddits.selectedSubreddit}
              postData={post.data}
              id={index}
            />
          );
        })}
    </main>
  );
}
