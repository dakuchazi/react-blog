import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

const initialState = {
  user: { email: "", name: "", website: "", avatar: "", role: "" },
};

const userInfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    //同步修改state
    setName(state, actions) {
      state.user.name = actions.payload;
    },
    setEmail(state, actions) {
      state.user.email = actions.payload;
    },
    setWebsite(state, actions) {
      state.user.website = actions.payload;
    },
    setAvatar(state, actions) {
      state.user.avatar = actions.payload;
    },
    setRole(state, actions) {
      state.user.role = actions.payload;
    },
  },
});

export const { setName, setEmail, setWebsite, setAvatar, setRole } =
  userInfoSlice.actions;

export const selectUserInfo = (state: RootState) => {
  return state.userInfo.user;
};

export default userInfoSlice.reducer;
