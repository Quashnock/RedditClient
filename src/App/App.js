import "./App.css";
import NavBar from "../Components/Navbar/Navbar";
import Subreddits from "../Components/Subreddits/Subreddits/Subreddits";
import Posts from "../Components/PostsComponents/Posts/Posts";

function App({ state, dispatch }) {
  console.log(state.subreddits);
  return (
    <div id="app">
      <NavBar dispatch={dispatch} />
      <div id="mainContentContainer">
        <Posts state={state} dispatch={dispatch} />
        <Subreddits state={state.subreddits} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
