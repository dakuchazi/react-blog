import "./index.custom.scss";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import React from "react";
import { useAppDispatch } from "@/store";
import { setNavShow } from "@/store/slices/layoutSlice";

import s from "./index.scss";

interface Props {
  setNavShow?: Function;
}

const BackToTop: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const backTop = () => {
    dispatch(setNavShow(true));
  };

  return (
    <BackTop
      duration={700}
      visibilityHeight={300}
      onClick={backTop}
      className="BackTop"
    >
      <div className={s.backTop}>
        <VerticalAlignTopOutlined />
      </div>
    </BackTop>
  );
};

export default BackToTop;
