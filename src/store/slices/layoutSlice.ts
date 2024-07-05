import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

const initialState = {
  navShow: true,
  mode: 0,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    //同步修改state
    setNavShow(state, actions) {
      state.navShow = actions.payload;
    },
    setMode(state, actions) {
      state.mode = actions.payload;
    },
  },
});

export const { setNavShow, setMode } = layoutSlice.actions;

export const selectNavShow = (state: RootState) => {
  return state.layout.navShow;
};

export const selectMode = (state: RootState) => {
  return state.layout.mode;
};

export default layoutSlice.reducer;
