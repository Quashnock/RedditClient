import "./Post.css";
import CommentsLogo from "../../../Resources/CommentsLogo.js";
import Comment from "../Comment/Comment.js";
import { useState, useEffect } from "react";

export default function Post({ subreddit, postData, id }) {
  const [commentsActive, setCommentsActive] = useState(false);
  const [comments, setComments] = useState();
  const [upVoteMod, setUpVoteMode] = useState(0);
  const [showImage, setShowImage] = useState(false);

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
      if (commentsActive) {
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
  }, [commentsActive, postData.id, subreddit]);

  useEffect(() => {
    setComments();
  }, [subreddit]);
  return (
    <article className="post">
      <div id="upvotesColumn">
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
            d="M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115a3.002 3.002 0 0 1 0-4.242L12 1.758l7.121 7.121a3.002 3.002 0 0 1 0 4.242c-1.094 1.095-2.979 1.14-4.121.115V18c0 1.654-1.346 3-3 3M11 8.414V18a1.001 1.001 0 0 0 2 0V8.414l3.293 3.293a1.023 1.023 0 0 0 1.414 0a.999.999 0 0 0 0-1.414L12 4.586l-5.707 5.707a.999.999 0 0 0 0 1.414a1.023 1.023 0 0 0 1.414 0z"
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
            d="M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115a3.002 3.002 0 0 1 0-4.242L12 1.758l7.121 7.121a3.002 3.002 0 0 1 0 4.242c-1.094 1.095-2.979 1.14-4.121.115V18c0 1.654-1.346 3-3 3M11 8.414V18a1.001 1.001 0 0 0 2 0V8.414l3.293 3.293a1.023 1.023 0 0 0 1.414 0a.999.999 0 0 0 0-1.414L12 4.586l-5.707 5.707a.999.999 0 0 0 0 1.414a1.023 1.023 0 0 0 1.414 0z"
          />
        </svg>
      </div>
      <div
        id="contentColumn"
        onClick={() => {
          setShowImage((prev) => !prev);
        }}
      >
        <h2 id="postTitle">{postData.title}</h2>
        {(showImage || commentsActive) &&
          (postData.url.includes("jpeg") || postData.url.includes("png")) && (
            <img id="mainImage" src={postData.url} alt="" />
          )}
        <hr></hr>
        <div id="postSubContent">
          <div id="userProfile">
            <p id="username">{postData.author}</p>
          </div>
          <p id="postDate">{getTimeSincePostString()}</p>
          <div
            id="commentsToggle"
            onClick={() => {
              setCommentsActive((curr) => !curr);
            }}
          >
            {CommentsLogo}
            <p id="commentsNum">{reduceNumSring(postData.num_comments)}</p>
          </div>
        </div>
        {commentsActive &&
          comments &&
          comments[1].data.children.length !== 0 && (
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
