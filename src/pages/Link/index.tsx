import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { shuffleArray } from "@/utils/function";
import { Title } from "../titleConfig";
import LinkItem from "./LinkItem";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getLinkListAsync,
  selectLinkData,
  selectLinkLoading,
} from "@/store/slices/linkSlice";

import s from "./index.scss";

const Link: React.FC = () => {
  const dispatch = useAppDispatch();
  const linkData = useAppSelector(selectLinkData);
  const linkLoading = useAppSelector(selectLinkLoading);

  useEffect(() => {
    dispatch(getLinkListAsync({ pagesize: 999, current: 1 }));
  }, []);

  return (
    <Layout title={Title.Link} loading={linkLoading} className={s.box}>
      {shuffleArray(linkData.list).map((item) => (
        <LinkItem
          key={item._id}
          link={item.link}
          avatar={item.avatar}
          name={item.name}
          descr={item.description}
        />
      ))}
    </Layout>
  );
};

export default Link;
