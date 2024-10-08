import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSubreddits = createAsyncThunk(
  "subreddits/getSubreddits",
  async () => {
    try {
      const response = await fetch(
        "https://www.reddit.com/subreddits/popular.json?limit=20"
      );
      const json = await response.json();
      return json;
    } catch (err) {
      throw new Error(err);
    }
  }
);
const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    isLoadingSubreddits: false,
    failedToLoadSubreddits: false,
    selectedSubreddit: "pics",
    subredditsList: [],
  },
  reducers: {
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubreddits.pending, (state) => {
        state.isLoadingSubreddits = true;
        state.failedToLoadSubreddits = false;
      })
      .addCase(getSubreddits.fulfilled, (state, action) => {
        state.isLoadingSubreddits = false;
        state.failedToLoadSubreddits = false;
        state.subredditsList = action.payload.data.children;
      })
      .addCase(getSubreddits.rejected, (state) => {
        state.isLoadingSubreddits = false;
        state.failedToLoadSubreddits = true;
      });
  },
});

export const { setSelectedSubreddit } = subredditsSlice.actions;
export default subredditsSlice.reducer;
