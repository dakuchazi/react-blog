import React, { useEffect, useState } from "react";
import Comment from "@/components/Comment";
import Layout from "@/components/Layout";
import MarkDown from "@/components/MarkDown";
import CopyRight from "./CopyRight";
import Navbar from "./Navbar";
import ArtTags from "./ArtTags";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getArticleDetailAsync,
  selectArticleDetail,
  selectArticleDetailLoading,
} from "@/store/slices/articleSlice";
import { useSearchParams } from "react-router-dom";
import {
  getCommentListAsync,
  selectCommentData,
  selectCommentLoading,
} from "@/store/slices/commentSlice";

import s from "./index.scss";

const ArtDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const articleDetail = useAppSelector(selectArticleDetail);
  const articleDetailLoading = useAppSelector(selectArticleDetailLoading);
  const commentData = useAppSelector(selectCommentData);
  const commentLoading = useAppSelector(selectCommentLoading);
  const [searchParams] = useSearchParams();
  const _id = searchParams.get("artId");

  useEffect(() => {
    if (_id) {
      dispatch(getArticleDetailAsync({ _id }));
      dispatch(
        getCommentListAsync({
          current: 1,
          pagesize: 10,
          from: "art",
          artId: _id,
        })
      );
    }
  }, [_id]);

  return (
    <Layout
      title={articleDetail.title}
      loading={articleDetailLoading}
      classes={articleDetail.type}
      date={articleDetail.createDate}
      isPost={true}
      rows={14}
    >
      <MarkDown content={articleDetail.content} className={s.mb} />
      <ArtTags tags={articleDetail.tags} />
      <CopyRight title={articleDetail.title} titleEng={articleDetail.title2} />
      <Comment
        current={current}
        loading={commentLoading}
        data={commentData}
        isMsg={false}
        setPage={setCurrent}
        from={"art"}
      />
      <Navbar content={articleDetail.content} />
    </Layout>
  );
};

export default ArtDetail;
