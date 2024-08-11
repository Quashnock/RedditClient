import "./Comment.css";
export default function Comment({ commentData }) {
  function getTimeSincePostString() {
    const currDate = Date.now();
    const hoursSincePostCreated = Math.round(
      (Math.floor(currDate / 1000) - commentData.created) / 3600
    );
    if (hoursSincePostCreated > 24) {
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
  return (
    <article className="comment">
      <div id="commentHeader">
        <h3 id="author">{commentData.author}</h3>
        <h3 id="commentDate">{getTimeSincePostString()}</h3>
      </div>
      <p id="commentContent">{commentData.body}</p>
    </article>
  );
}
