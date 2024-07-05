import React from "react";
import { useNavigate } from "react-router-dom";

import DisplayBar from "@/components/DisplayBar";

import s from "./index.scss";

interface Props {
  data: {
    _id: string;
    createDate: string;
    title: string;
    type: string;
    tags: string[];
    content: string;
  }[];
  loading?: boolean;
}

const ArtList: React.FC<Props> = ({ data, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      {data?.length ? (
        data?.map((item) => (
          <DisplayBar
            key={item._id}
            content={item.title}
            right={item.createDate.split(" ")[0]}
            onClick={() => navigate(`/artDetail?artId=${item._id}`)}
            loading={loading}
          />
        ))
      ) : (
        <div className={s.none}>暂时无相应文章 ~</div>
      )}
    </>
  );
};

export default ArtList;
