import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ selectedSubreddit, term }, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/${
        selectedSubreddit ? `r/${selectedSubreddit}` : "r/Pics"
      }/.json?limit=25`
    );
    const json = await response.json();
    return json;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loadingPosts: false,
    failedToLoadPosts: false,
    postList: [],
  },
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getPosts.pending, (state) => {
        state.loadingPosts = true;
        state.failedToLoadPosts = false;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loadingPosts = false;
        state.failedToLoadPosts = false;
        state.postList = action.payload.data.children;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loadingPosts = false;
        state.failedToLoadPosts = true;
      });
  },
});

export default postsSlice.reducer;
