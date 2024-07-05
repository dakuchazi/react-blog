import React, { useEffect, useState } from "react";

import Comment from "@/components/Comment";
import Layout from "@/components/Layout";

import { Title } from "../titleConfig";
import MsgInfo from "./MsgInfo";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getCommentListAsync,
  selectCommentData,
  selectCommentLoading,
} from "@/store/slices/commentSlice";

const Msg: React.FC = () => {
  const dispatch = useAppDispatch();
  const commentData = useAppSelector(selectCommentData);
  const commentLoading = useAppSelector(selectCommentLoading);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch(getCommentListAsync({ pagesize: 10, current, from: "msgBoard" }));
  }, [current]);
  return (
    <Layout title={Title.Msg}>
      <MsgInfo />
      <Comment
        data={commentData}
        autoScroll={true}
        scrollToTop={440 + 370}
        loading={commentLoading}
        isMsg={true}
        current={current}
        setPage={setCurrent}
        from={"msgBoard"}
      />
    </Layout>
  );
};

export default Msg;
