import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import { useAppSelector } from "@/store";
import { selectTagData } from "@/store/slices/tagSlice";
import { selectTypeData } from "@/store/slices/typeSlice";
import {
  selectArticleData,
  selectArticleLoading,
} from "@/store/slices/articleSlice";

import s from "./index.scss";

const DataCard: React.FC = () => {
  const navigate = useNavigate();
  const tagData = useAppSelector(selectTagData);
  const typeData = useAppSelector(selectTypeData);
  const articleData = useAppSelector(selectArticleData);
  const articleLoading = useAppSelector(selectArticleLoading);

  return (
    <Card className={s.card} loading={articleLoading}>
      <div className={s.blogData} onClick={() => navigate("/articles")}>
        <div className={s.name}>文章</div>
        <div className={s.num}>{articleData.total}</div>
      </div>
      <div className={s.blogData} onClick={() => navigate("/classes")}>
        <div className={s.name}>分类</div>
        <div className={s.num}>{typeData.length}</div>
      </div>
      <div className={s.blogData} onClick={() => navigate("/tags")}>
        <div className={s.name}>标签</div>
        <div className={s.num}>{tagData.length}</div>
      </div>
    </Card>
  );
};

export default DataCard;
