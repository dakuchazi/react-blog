import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import axios from "@/utils/axios";
import API from "@/utils/api";

export type WorkData = {
  list:
    | {
        _id: string;
        createDate: string;
        name: string;
        link: string;
        cover: string;
        description: string;
      }[]
    | [];
  total: number;
};

const initialState: {
  workData: WorkData;
  workLoading: boolean;
} = {
  workData: {
    list: [],
    total: 0,
  },
  workLoading: true,
};

export const getWorkListAsync = createAsyncThunk<WorkData, any>(
  "post/WorkData",
  async (params, api) => {
    const res: any = await axios.post(API.getWorkListApi, params);
    return res.data;
  }
);

const workSlice = createSlice({
  name: "work",
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
      .addCase(getWorkListAsync.pending, (state, action) => {
        state.workLoading = true;
      })
      .addCase(getWorkListAsync.rejected, (state, action) => {
        state.workLoading = false;
      })
      .addCase(getWorkListAsync.fulfilled, (state, action) => {
        state.workData = action.payload;
        state.workLoading = false;
      });
  },
});

export const selectWorkData = (state: RootState) => {
  return state.work.workData;
};

export const selectWorkLoading = (state: RootState) => {
  return state.work.workLoading;
};

export default workSlice.reducer;
