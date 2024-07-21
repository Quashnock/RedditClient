import "./App.css";
import RedditLogoSVG from "../Resources/RedditLogoSVG";
import SearchIconSVG from "../Resources/SearchIconSVG";

function App() {
  return (
    <div id="app">
      <header>
        <div id="logo">
          {RedditLogoSVG}
          <h1>RedditMinimal</h1>
        </div>
        <nav>
          <form>
            <input
              type="text"
              placeholder="Search"
              id="searchBar"
              aria-role="Search Bar"
            />
            <button type="submit" id="submitButton" aria-label="Search">
              {SearchIconSVG}
            </button>
          </form>
        </nav>
      </header>
    </div>
  );
}

export default App;
