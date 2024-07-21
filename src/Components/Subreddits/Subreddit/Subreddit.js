import "./Subreddit.css";
import { setSelectedSubreddit } from "../subredditsSlice";
import { useEffect } from "react";

export default function Subreddit({ title, img, selectedSubreddit, dispatch }) {
  useEffect(() => {
    if (selectedSubreddit === title) {
      document.getElementById(title).classList.add("selected");
    } else {
      document.getElementById(title).classList.remove("selected");
    }
  }, [selectedSubreddit]);

  return (
    <div
      id={title}
      className="subreddit"
      onClick={() => dispatch(setSelectedSubreddit(title))}
    >
      <img src={img} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}
