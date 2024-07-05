import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import MyPagination from "@/components/MyPagination";
import { detailPostSize } from "@/utils/constant";

import { Title } from "../titleConfig";
import ArtList from "./ArtList";
import Search from "./Search";
import {
  getArticleListAsync,
  selectArticleData,
  selectArticleLoading,
} from "@/store/slices/articleSlice";
import { useAppDispatch, useAppSelector } from "@/store";

const Articles: React.FC = () => {
  const dispatch = useAppDispatch();
  const articleData = useAppSelector(selectArticleData);
  const articleLoading = useAppSelector(selectArticleLoading);
  const [current, setCurrent] = useState(1);
  const [title, seTtitle] = useState("");

  useEffect(() => {
    dispatch(
      getArticleListAsync({ pagesize: 8, current: 1, isDraft: false, title })
    );
  }, [current]);

  const onSearch = () => {
    dispatch(
      getArticleListAsync({ pagesize: 8, current: 1, isDraft: false, title })
    );
  };
  return (
    <Layout title={Title.Articles}>
      <Search value={title} onChange={seTtitle} onSearch={onSearch} />
      <ArtList data={articleData.list} loading={articleLoading} />
      <MyPagination
        current={current}
        defaultPageSize={detailPostSize}
        total={articleData.total}
        setPage={setCurrent}
        autoScroll={true}
        scrollToTop={440}
      />
    </Layout>
  );
};

export default Articles;
