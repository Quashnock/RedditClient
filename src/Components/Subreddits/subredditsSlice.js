import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSubreddits = createAsyncThunk(
  "subreddits/getSubreddits",
  async () => {
    const response = await fetch(
      "https://www.reddit.com/subreddits/popular.json?limit=20"
    );
    const json = await response.json();
    return json;
  }
);
const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    isLoadingSubreddits: false,
    failedToLoadSubreddits: false,
    selectedSubreddit: "Pics",
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
