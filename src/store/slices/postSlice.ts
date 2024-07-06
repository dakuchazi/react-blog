import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import axios from "@/utils/axios";
import API from "@/utils/api";

export type PostData = {
  list:
    | {
        _id: string;
        createDate: string;
        content: string;
        imgs: string[];
      }[]
    | [];
  total: number;
};

const initialState: {
  postData: PostData;
  postLoading: boolean;
} = {
  postData: {
    list: [],
    total: 0,
  },
  postLoading: true,
};

export const getPostListAsync = createAsyncThunk<PostData, any>(
  "post/postData",
  async (params, api) => {
    const res: any = await axios.post(API.getPostListApi, params);
    return res.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getPostListAsync.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(getPostListAsync.rejected, (state, action) => {
        state.postLoading = false;
      })
      .addCase(getPostListAsync.fulfilled, (state, action) => {
        state.postData = action.payload;
        state.postLoading = false;
      });
  },
});

export const selectPostData = (state: RootState) => {
  return state.post.postData;
};

export const selectPostLoading = (state: RootState) => {
  return state.post.postLoading;
};

export default postSlice.reducer;
