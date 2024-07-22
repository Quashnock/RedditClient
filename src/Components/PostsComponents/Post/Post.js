import "./Post.css";
import UpArrowLogo from "../../../Resources/UpArrowLogo.js";
import DownArrowLogo from "../../../Resources/DownArrowLogo.js";
import CommentsLogo from "../../../Resources/CommentsLogo.js";

export default function Post() {
  return (
    <article className="post">
      <div id="upvotesColumn">
        {UpArrowLogo}
        <h3 id="upvoteCount">23</h3>
        {DownArrowLogo}
      </div>
      <div id="contentColumn">
        <h2 id="postTitle">Post Title</h2>
        <img id="mainImage" src="https://i.redd.it/z0dunnifzwdd1.jpeg" />
        <hr></hr>
        <div id="postSubContent">
          <div id="userProfile">
            <img
              id="userProfileImage"
              src="https://tse3.mm.bing.net/th?id=OIP.sg8zzVAlUW8aWC5PrQw_9gHaHa&pid=Api&P=0&h=220"
            />
            <p id="username">Sea879</p>
          </div>
          <p id="postDate">20 hours ago</p>
          <div id="commentsToggle">
            {CommentsLogo}
            <p id="commentsNum">1.9k</p>
          </div>
        </div>
      </div>
    </article>
  );
}
