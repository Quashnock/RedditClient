import "./Post.css";
import CommentsLogo from "../../../Resources/CommentsLogo.js";
import Comment from "../Comment/Comment.js";
import { useState, useEffect } from "react";

export default function Post({ subreddit, postData, id }) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState();
  const [upVoteMod, setUpVoteMode] = useState(0);

  function getTimeSincePostString() {
    const currDate = Date.now();
    const hoursSincePostCreated = Math.round(
      (Math.floor(currDate / 1000) - postData.created) / 3600
    );
    if (hoursSincePostCreated > 25) {
      return `${Math.floor(hoursSincePostCreated / 24)} days ago`;
    } else if (hoursSincePostCreated === 24) {
      return "1 day ago";
    } else if (hoursSincePostCreated > 1) {
      return `${hoursSincePostCreated} hours ago`;
    } else {
      return "< 1 hour ago";
    }
  }
  function reduceNumSring(num) {
    if (num > 1000) {
      return `${Math.floor(num / 100) / 10}K`;
    }
    return num;
  }

  function handleUpvoteChange(command) {
    let upVoteArrowClassList = document.getElementById(
      "upVoteArrow" + id
    ).classList;
    let upVoteCountClassList = document.getElementById(
      "upVoteCount" + id
    ).classList;
    let downVoteArrowClassList = document.getElementById(
      "downVoteArrow" + id
    ).classList;
    if (command === "up") {
      downVoteArrowClassList.remove("downVoteRed");
      upVoteCountClassList.remove("downVoteRed");
      upVoteArrowClassList.toggle("upVoteGreen");
      upVoteCountClassList.toggle("upVoteGreen");
      setUpVoteMode(1);
    } else if (command === "down") {
      upVoteArrowClassList.remove("upVoteGreen");
      upVoteCountClassList.remove("upVoteGreen");
      upVoteCountClassList.toggle("downVoteRed");
      downVoteArrowClassList.toggle("downVoteRed");
      setUpVoteMode(-1);
    }
    if (
      !upVoteCountClassList.contains("upVoteGreen") &&
      !upVoteCountClassList.contains("downVoteRed")
    ) {
      setUpVoteMode(0);
    }
  }
  useEffect(() => {
    async function fetchComments() {
      if (expanded) {
        try {
          const response = await fetch(
            `https://www.reddit.com/r/${subreddit}/comments/${postData.id}.json?limit=25`
          );
          const comments = await response.json();
          setComments(comments);
        } catch (error) {
          alert(error);
        }
      }
    }
    fetchComments();
  }, [expanded, postData.id, subreddit]);

  useEffect(() => {
    setComments();
  }, [subreddit]);
  return (
    <article className="post">
      <div id="subColumn">
        <div id="upVotes">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            id={"upVoteArrow" + id}
            onClick={() => handleUpvoteChange("up")}
          >
            <path
              fill="currentColor"
              d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"
            />
          </svg>
          <h3 id={"upVoteCount" + id}>
            {reduceNumSring(postData.ups + upVoteMod)}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="downArrow"
            id={"downVoteArrow" + id}
            onClick={() => handleUpvoteChange("down")}
          >
            <path
              fill="currentColor"
              d="m4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"
            />
          </svg>
        </div>
        {(postData.url.includes("jpeg") || postData.url.includes("png")) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            id="imageIcon"
          >
            <path
              fill="currentColor"
              d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71l-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0"
            />
          </svg>
        )}
        <div id="comments">
          {CommentsLogo}
          <p id="commentsNum">{reduceNumSring(postData.num_comments)}</p>
        </div>
      </div>
      <div
        id="contentColumn"
        onClick={() => {
          setExpanded((prev) => !prev);
        }}
      >
        <h2 id="postTitle">{postData.title}</h2>
        {expanded &&
          (postData.url.includes("jpeg") || postData.url.includes("png")) && (
            <img id="mainImage" src={postData.url} alt="" />
          )}

        <div id="postSubContent">
          <div id="userProfile">
            <p id="username">{postData.author}</p>
          </div>
          <p id="postDate">{getTimeSincePostString()}</p>
        </div>
        {expanded && comments && comments[1].data.children.length > 1 && (
          <div id="commentsContainer">
            {comments[1].data.children.slice(0, -1).map((comment) => {
              return (
                <Comment commentData={comment.data} key={comment.data.id} />
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
