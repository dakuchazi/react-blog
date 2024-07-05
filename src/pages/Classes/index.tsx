import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

import { Title } from "../titleConfig";
import ClassBar from "./ClassBar";
import s from "./index.scss";
import { useAppSelector } from "@/store";
import { selectTypeData, selectTypeLoading } from "@/store/slices/typeSlice";

interface ClassType {
  _id: string;
  class: string;
  count: number;
}

const Classes: React.FC = () => {
  const navigate = useNavigate();
  const typeData = useAppSelector(selectTypeData);
  const typeLoading = useAppSelector(selectTypeLoading);

  return (
    <Layout
      title={Title.Classes}
      loading={typeLoading}
      className={s.classBox}
      rows={8}
    >
      {typeData.map((item) => (
        <ClassBar
          className={s.classItem}
          key={item._id}
          content={item.name}
          num={item.count}
          onClick={() => navigate(`/artDetail?class=${item.name}`)}
        />
      ))}
    </Layout>
  );
};

export default Classes;
