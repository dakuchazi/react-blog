import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { Title } from "../titleConfig";
import ShowItem from "./ShowItem";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getWorkListAsync,
  selectWorkData,
  selectWorkLoading,
} from "@/store/slices/workSlice";

import s from "./index.scss";

const Show: React.FC = () => {
  const dispatch = useAppDispatch();
  const workData = useAppSelector(selectWorkData);
  const workLoading = useAppSelector(selectWorkLoading);

  useEffect(() => {
    dispatch(getWorkListAsync({ pagesize: 999, current: 1 }));
  }, []);

  return (
    <Layout title={Title.Show} loading={workLoading} className={s.showBox}>
      {workData.list.map((item) => (
        <ShowItem
          key={item._id}
          cover={item.cover}
          link={item.link}
          name={item.name}
          descr={item.description}
        />
      ))}
    </Layout>
  );
};

export default Show;
