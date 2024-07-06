import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import axios from "@/utils/axios";
import API from "@/utils/api";

export type ArticleDetailData = {
  title: string;
  title2?: string;
  createDate: string;
  content: string;
  type: string;
  tags: string[];
  isDraft: boolean;
  _id: string;
};

export type ArticleData = {
  list:
    | {
        _id: string;
        createDate: string;
        title: string;
        type: string;
        tags: string[];
        content: string;
      }[]
    | [];
  total: number;
};

const initialState: {
  articleData: ArticleData;
  articleLoading: boolean;
  articleDetail: ArticleDetailData;
  articleDetailLoading: boolean;
} = {
  articleData: {
    list: [],
    total: 0,
  },
  articleLoading: true,
  articleDetail: {
    title: "",
    title2: "",
    tags: [],
    createDate: "",
    content: "",
    type: "",
    isDraft: true,
    _id: "",
  },
  articleDetailLoading: true,
};

export const getArticleListAsync = createAsyncThunk<ArticleData, any>(
  "post/articleData",
  async (params, api) => {
    const res: any = await axios.post(API.getArticleListApi, params);
    return res.data;
  }
);

export const getArticleDetailAsync = createAsyncThunk<ArticleDetailData, any>(
  "post/articleDetail",
  async (params) => {
    const res: any = await axios.post(API.getArticleDetailApi, params);
    return res.data;
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    // 同步修改state
    setArticleDetail(state, action) {
      state.articleDetail = action.payload;
    },
  },

  //extraReducers字段可以让slice处理在其他地方定义的action
  //pengding rejected 可以用来处理等待和失败
  extraReducers: (builder) => {
    builder
      .addCase(getArticleListAsync.pending, (state, action) => {
        state.articleLoading = true;
      })
      .addCase(getArticleListAsync.rejected, (state, action) => {
        state.articleLoading = false;
      })
      .addCase(getArticleListAsync.fulfilled, (state, action) => {
        state.articleData = action.payload;
        state.articleLoading = false;
      })
      .addCase(getArticleDetailAsync.pending, (state, action) => {
        state.articleDetailLoading = true;
      })
      .addCase(getArticleDetailAsync.rejected, (state, action) => {
        state.articleDetailLoading = false;
      })
      .addCase(getArticleDetailAsync.fulfilled, (state, action) => {
        state.articleDetail = action.payload;
        state.articleDetailLoading = false;
      });
  },
});

export const selectArticleData = (state: RootState) => {
  return state.article.articleData;
};

export const selectArticleLoading = (state: RootState) => {
  return state.article.articleLoading;
};

export const selectArticleDetail = (state: RootState) => {
  return state.article.articleDetail;
};

export const selectArticleDetailLoading = (state: RootState) => {
  return state.article.articleDetailLoading;
};

export const { setArticleDetail } = articleSlice.actions;

export default articleSlice.reducer;
