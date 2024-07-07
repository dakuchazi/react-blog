import useUrlState from "@ahooksjs/use-url-state";
import { useSafeState } from "ahooks";

import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import DisplayBar from "@/components/DisplayBar";
import Layout from "@/components/Layout";
import MyPagination from "@/components/MyPagination";

import { detailPostSize } from "@/utils/constant";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getArticleListAsync,
  selectArticleData,
  selectArticleLoading,
} from "@/store/slices/articleSlice";

const ArtList: React.FC = () => {
  const [query] = useUrlState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useSafeState(1);
  const articleData = useAppSelector(selectArticleData);
  const articleLoading = useAppSelector(selectArticleLoading);

  useEffect(() => {
    console.log(query);

    if (query.key === "type") {
      dispatch(
        getArticleListAsync({
          pagesize: 8,
          current: 1,
          isDraft: false,
          typeId: query.typeId,
        })
      );
    }
    if (query.key === "tag") {
      dispatch(
        getArticleListAsync({
          pagesize: 8,
          current: 1,
          isDraft: false,
          tags: [query.tag],
        })
      );
    }
  }, []);

  return (
    <Layout title={query.tag || query.class}>
      {articleData.list.map((item) => (
        <DisplayBar
          key={item._id}
          content={item.title}
          right={item.createDate.split(" ")[0]}
          loading={articleLoading}
          onClick={() => navigate(`/artDetail?artId=${item._id}`)}
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
