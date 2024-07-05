// @/store/index.ts
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  AnyAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage"; // 使用 localStorage 作为默认存储机制
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; // 合并状态的策略

import noticeReducer from "./slices/noticeSlice";
import typeReducer from "./slices/typeSlice";
import tagReducer from "./slices/tagSlice";
import articleReducer from "./slices/articleSlice";
import postReducer from "./slices/postSlice";
import linkReducer from "./slices/linkSlice";
import commentReducer from "./slices/commentSlice";
import workReducer from "./slices/workSlice";
import logReducer from "./slices/logSlice";
import aboutReducer from "./slices/aboutSlice";
import layoutReducer from "./slices/layoutSlice";
import userInfoSlice from "./slices/userInfoSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// 配置持久化
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  layout: layoutReducer,
  notice: noticeReducer,
  type: typeReducer,
  tag: tagReducer,
  article: articleReducer,
  post: postReducer,
  link: linkReducer,
  comment: commentReducer,
  work: workReducer,
  log: logReducer,
  about: aboutReducer,
  userInfo: userInfoSlice,
});

// 显式地定义 persistedReducer 的类型
const persistedReducer = persistReducer<RootState, AnyAction>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// 只是加上了类型定义
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
