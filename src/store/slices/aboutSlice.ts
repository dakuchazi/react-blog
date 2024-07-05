import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import axios from "@/utils/apis/axios";
import API from "@/utils/api";

const initialState = {
  aboutDate: {
    _id: "",
    myself: "",
    website: "",
    createDate: "",
  },

  aboutLoading: true,
};

//获取公告列表的的数据
export const getAboutListAsync = createAsyncThunk(
  "get/aboutData",
  async (params, api) => {
    const res: any = await axios.get(API.getAboutListApi);
    return res.data;
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    // 同步修改state
    setAboutDate(state, action) {
      state.aboutDate = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAboutListAsync.rejected, (state, action) => {
        state.aboutLoading = false;
      })
      .addCase(getAboutListAsync.fulfilled, (state, action) => {
        state.aboutDate = action.payload[0];
        state.aboutLoading = false;
      });
  },
});

export const selectAboutData = (state: RootState) => {
  return state.about.aboutDate;
};

export const selectAboutLoading = (state: RootState) => {
  return state.about.aboutLoading;
};

export const { setAboutDate } = aboutSlice.actions;

export default aboutSlice.reducer;
