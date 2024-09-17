import "./Navbar.css";
import RedditLogoSVG from "../../Resources/RedditLogoSVG";
import SearchIconSVG from "../../Resources/SearchIconSVG";
import { setTerm } from "./navbarSlice";
import { useState } from "react";

export default function NavBar({ dispatch }) {
  const [search, setSearch] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(setTerm(search));
  };
  return (
    <header>
      <div id="logo">
        {RedditLogoSVG}
        <h1>My Reddit</h1>
      </div>
      <nav>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search"
            id="searchBar"
            aria-label="Search Bar"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <button type="submit" id="submitButton" aria-label="Search">
            {SearchIconSVG}
          </button>
        </form>
      </nav>
    </header>
  );
}
