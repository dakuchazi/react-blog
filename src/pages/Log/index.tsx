import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { Title } from "../titleConfig";
import TimeItem from "./TimeItem";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getLogListAsync,
  selectLogData,
  selectLogLoading,
} from "@/store/slices/logSlice";

const Log: React.FC = () => {
  const dispatch = useAppDispatch();
  const workData = useAppSelector(selectLogData);
  const workLoading = useAppSelector(selectLogLoading);

  useEffect(() => {
    dispatch(getLogListAsync({ pagesize: 999, current: 1 }));
  }, []);

  return (
    <Layout title={Title.Log} loading={workLoading}>
      {workData.list.map(({ _id, createDate, content }) => (
        <TimeItem
          key={_id}
          date={createDate.split(" ")[0]}
          logContent={content}
        />
      ))}
    </Layout>
  );
};

export default Log;
