import "./Posts.css";
import Post from "../Post/Post.js";
import { getPosts } from "../postsSlice.js";
import { useEffect } from "react";

export default function Posts({ state, dispatch }) {
  useEffect(() => {
    dispatch(
      getPosts({
        selectedSubreddit: state.subreddits.selectedSubreddit,
        term: state.navbar.term,
      })
    );
  }, [state.subreddits.selectedSubreddit, dispatch, state.navbar.term]);

  console.log(state.posts.postList);
  console.log(state.subreddits.selectedSubreddit);

  function getCurrContent() {
    if (state.posts.loadingPosts) {
      return <div id="loadingCircle"></div>;
    } else if (state.posts.failedToLoadPosts) {
      return (
        <button
          id="reloadButton"
          onClick={dispatch(
            getPosts({
              selectedSubreddit: state.subreddits.selectedSubreddit,
              term: state.navbar.term,
            })
          )}
        >
          Retry Load
        </button>
      );
    }
    return state.posts.postList
      .filter((post) =>
        post.data.title.toLowerCase().includes(state.navbar.term)
      )
      .map((post, index) => {
        return (
          <Post
            subreddit={state.subreddits.selectedSubreddit}
            postData={post.data}
            id={index}
            key={post.data.id}
          />
        );
      });
  }
  return <main>{getCurrContent()}</main>;
}
