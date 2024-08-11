import { configureStore } from "@reduxjs/toolkit";
import SubredditsSlice from "../Components/Subreddits/subredditsSlice";
import postsSlice from "../Components/PostsComponents/postsSlice";
import navbarSlice from "../Components/Navbar/navbarSlice";

export default configureStore({
  reducer: {
    posts: postsSlice,
    subreddits: SubredditsSlice,
    navbar: navbarSlice,
  },
});
