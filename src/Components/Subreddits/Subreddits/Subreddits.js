import "./Subreddits.css";
import Subreddit from "../Subreddit/Subreddit";
import { getSubreddits } from "../subredditsSlice";
import { useEffect, useState } from "react";
import SubredditsMockResponse from "../../../Resources/SubredditsMockResponse";

export default function Subreddits({ state, dispatch }) {
  /*
  const [subreddits, setSubreddits] = useState([]);
  const getSubreddits = async () => {
    try {
      const response = await fetch(
        "https://www.reddit.com/subreddits/popular.json?limit=10"
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json.data.children);
        setSubreddits(json.data.children);
      }
    } catch (error) {
      alert("Error getting subreddits");
    }
  };
  useEffect(() => {
    getSubreddits();
  }, []);
  */

  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  const filteredList =
    state.subredditsList || SubredditsMockResponse.data.children;

  return (
    <aside>
      <h2>Subreddits</h2>
      {state.subredditsList &&
        state.subredditsList.map((subreddit) => (
          <Subreddit
            title={subreddit.data.display_name}
            img={subreddit.data.icon_img}
            selectedSubreddit={state.selectedSubreddit}
            dispatch={dispatch}
            key={subreddit.data.id}
          />
        ))}
    </aside>
  );
}
