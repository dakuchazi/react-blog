import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import axios from "@/utils/axios";
import API from "@/utils/api";

export type LogData = {
  list:
    | {
        _id: string;
        createDate: string;
        content: string;
      }[]
    | [];
  total: number;
};

const initialState: {
  logData: LogData;
  logLoading: boolean;
} = {
  logData: {
    list: [],
    total: 0,
  },
  logLoading: true,
};

export const getLogListAsync = createAsyncThunk<LogData, any>(
  "log/logData",
  async (params, api) => {
    const res: any = await axios.post(API.getLogListApi, params);
    return res.data;
  }
);

const logSlice = createSlice({
  name: "log",
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
      .addCase(getLogListAsync.pending, (state, action) => {
        state.logLoading = true;
      })
      .addCase(getLogListAsync.rejected, (state, action) => {
        state.logLoading = false;
      })
      .addCase(getLogListAsync.fulfilled, (state, action) => {
        state.logData = action.payload;
        state.logLoading = false;
      });
  },
});

export const selectLogData = (state: RootState) => {
  return state.log.logData;
};

export const selectLogLoading = (state: RootState) => {
  return state.log.logLoading;
};

export default logSlice.reducer;
