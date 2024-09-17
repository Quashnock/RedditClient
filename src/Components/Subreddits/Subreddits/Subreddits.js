import "./Subreddits.css";
import Subreddit from "../Subreddit/Subreddit";
import { getSubreddits } from "../subredditsSlice";
import { useEffect } from "react";

export default function Subreddits({ state, dispatch }) {
  useEffect(() => {
    dispatch(getSubreddits());
  }, [dispatch]);

  return (
    <aside>
      <div id="subredditsContainer">
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
      </div>
    </aside>
  );
}
