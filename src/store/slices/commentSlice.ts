import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import axios from "@/utils/axios";
import API from "@/utils/api";

export type CommentData = {
  list:
    | {
        _id: string;
        createDate: string;
        content: string;
        email: string;
        website: string;
        name: string;
        children: [];
      }[]
    | [];
  total: number;
};

const initialState: {
  commentData: CommentData;
  commentLoading: boolean;
} = {
  commentData: {
    list: [],
    total: 0,
  },
  commentLoading: true,
};

export const getCommentListAsync = createAsyncThunk<CommentData, any>(
  "post/CommentData",
  async (params, api) => {
    const res: any = await axios.post(API.getCommentListApi, params);
    return res.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // 同步修改state
    // setNoticeDate(state, payload) {
    //   //   state.noticeDate = payload;
    //   console.log("===payload===", payload);
    // },
  },

  //extraReducers字段可以让slice处理在其他地方定义的action
  //pengding rejected 可以用来处理等待和失败
  extraReducers: (builder) => {
    builder
      .addCase(getCommentListAsync.pending, (state, action) => {
        state.commentLoading = true;
      })
      .addCase(getCommentListAsync.rejected, (state, action) => {
        state.commentLoading = false;
      })
      .addCase(getCommentListAsync.fulfilled, (state, action) => {
        state.commentData = action.payload;
        state.commentLoading = false;
      });
  },
});

export const selectCommentData = (state: RootState) => {
  return state.comment.commentData;
};

export const selectCommentLoading = (state: RootState) => {
  return state.comment.commentLoading;
};

export default commentSlice.reducer;
