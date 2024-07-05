import useUrlState from "@ahooksjs/use-url-state";
import { useSafeState } from "ahooks";

import React from "react";
import { useNavigate } from "react-router-dom";

import DisplayBar from "@/components/DisplayBar";
import Layout from "@/components/Layout";
import MyPagination from "@/components/MyPagination";

import { detailPostSize } from "@/utils/constant";
import { useAppSelector } from "@/store";
import {
  selectArticleData,
  selectArticleLoading,
} from "@/store/slices/articleSlice";

const ArtList: React.FC = () => {
  const [query] = useUrlState();
  const navigate = useNavigate();
  const [current, setCurrent] = useSafeState(1);
  const articleData = useAppSelector(selectArticleData);
  const articleLoading = useAppSelector(selectArticleLoading);

  return (
    <Layout title={query.tag || query.class}>
      {articleData.list.map((item) => (
        <DisplayBar
          key={item._id}
          content={item.title}
          right={item.createDate}
          loading={articleLoading}
          onClick={() => navigate(`/post?id=${item._id}`)}
        />
      ))}
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

export default ArtList;
