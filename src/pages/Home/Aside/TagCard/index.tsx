import React from "react";

import Card from "@/components/Card";

import s from "./index.scss";
import { useAppSelector } from "@/store";
import { selectTagData, selectTagLoading } from "@/store/slices/tagSlice";

const TagCard: React.FC = () => {
  const tagData = useAppSelector(selectTagData);
  const tagLoading = useAppSelector(selectTagLoading);
  return (
    <Card className={s.card} loading={tagLoading}>
      {tagData.map((item) => (
        <span className={s.tag} key={item._id}>
          {item.name}
        </span>
      ))}
    </Card>
  );
};

export default TagCard;
