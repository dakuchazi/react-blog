import React, { useEffect, useState } from "react";
import ImgView from "@/components/ImgView";
import Layout from "@/components/Layout";
import { Title } from "../titleConfig";
import SayPop from "./SayPop";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getPostListAsync,
  selectPostData,
  selectPostLoading,
} from "@/store/slices/postSlice";

const Say: React.FC = () => {
  const dispatch = useAppDispatch();
  const postData = useAppSelector(selectPostData);
  const postLoading = useAppSelector(selectPostLoading);
  const [url, setUrl] = useState("");
  const [showPreView, setShowPreView] = useState(false);

  const handlePreView = (url: string) => {
    setShowPreView(true);
    setUrl(url);
  };

  useEffect(() => {
    dispatch(getPostListAsync({ pagesize: 15, current: 1 }));
  }, []);

  return (
    <Layout title={Title.Say} loading={postLoading}>
      {postData.list.map(({ _id, content, createDate, imgs }) => (
        <SayPop
          key={_id}
          content={content}
          date={createDate}
          imgs={imgs}
          handlePreView={handlePreView}
        />
      ))}

      <ImgView
        viewUrl={url}
        isViewShow={showPreView}
        onClick={() => setShowPreView(false)}
      />
    </Layout>
  );
};

export default Say;
