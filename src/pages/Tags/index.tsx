import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Title } from "../titleConfig";

import s from "./index.scss";
import { useAppSelector } from "@/store";
import { selectTagData, selectTagLoading } from "@/store/slices/tagSlice";

const Tags: React.FC = () => {
  const navigate = useNavigate();
  const tagData = useAppSelector(selectTagData);
  const tagLoading = useAppSelector(selectTagLoading);

  return (
    <Layout
      title={Title.Tags}
      loading={tagLoading}
      className={s.tagsBox}
      rows={3}
    >
      {tagData.map((item) => (
        <span
          className={s.tagItem}
          key={item._id}
          onClick={() => navigate(`/artList?tag=${item._id}&key=tag`)}
        >
          {item.name}
        </span>
      ))}
    </Layout>
  );
};

export default Tags;
