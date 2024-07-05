import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPagination from "@/components/MyPagination";
import { homeSize } from "@/utils/constant";
import PostCard from "./PostCard";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getArticleListAsync,
  selectArticleData,
  selectArticleLoading,
} from "@/store/slices/articleSlice";

import s from "./index.scss";

const Section: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const dispatch = useAppDispatch();
  const articleData = useAppSelector(selectArticleData);
  const articleLoading = useAppSelector(selectArticleLoading);

  useEffect(() => {
    dispatch(getArticleListAsync({ current, isDraft: false, pagesize: 8 }));
  }, [current]);

  return (
    <section className={s.section}>
      {articleData.list.map(({ _id, title, content, createDate, tags }) => (
        <PostCard
          key={_id}
          title={title}
          content={content}
          date={createDate}
          tags={tags}
          loading={articleLoading}
          onClick={() => navigate(`/post?id=${_id}`)}
        />
      ))}
      <MyPagination
        current={current}
        defaultPageSize={homeSize}
        total={articleData.total}
        setPage={setCurrent}
        autoScroll={true}
        scrollToTop={document.body.clientHeight - 80}
      />
    </section>
  );
};

export default Section;
