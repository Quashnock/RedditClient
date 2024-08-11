import "./App.css";
import NavBar from "../Components/Navbar/Navbar";
import Subreddits from "../Components/Subreddits/Subreddits/Subreddits";
import Posts from "../Components/PostsComponents/Posts/Posts";

function App({ state, dispatch }) {
  console.log(state.navbar.term);
  return (
    <div id="app">
      <NavBar dispatch={dispatch} />
      <div id="mainContentContainer">
        <Posts state={state} dispatch={dispatch} />
        <div id="subredditsContainer">
          <Subreddits state={state.subreddits} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
}

export default App;
