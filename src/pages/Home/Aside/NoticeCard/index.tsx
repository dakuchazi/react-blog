import React, { useEffect } from "react";
import Card from "@/components/Card";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getNoticeListAsync,
  selectNoticeData,
  selectNoticeLoading,
} from "@/store/slices/noticeSlice";

import s from "./index.scss";

const NoticeCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const noticeData = useAppSelector(selectNoticeData);
  const noticeLoading = useAppSelector(selectNoticeLoading);

  useEffect(() => {
    dispatch(getNoticeListAsync());
  }, []);
  return (
    <Card loading={noticeLoading}>
      <div className={s.notice}>{noticeData.content}</div>
    </Card>
  );
};

export default NoticeCard;
