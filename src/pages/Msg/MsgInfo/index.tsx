import React from "react";
import { useSite } from "./useSite";
import { useTime } from "@/utils/hooks/useTime";

import s from "./index.scss";

const MsgInfo: React.FC = () => {
  const { timeText } = useTime();
  const { mySite } = useSite();

  return (
    <>
      <div className={s.info}>
        <div>
          {timeText}，我叫<span className={s.hoverName}>大苦茶籽</span>，
        </div>
        <div>欢迎来到我的博客!</div>
        <div className={s.hoverName}>交换友链。</div>
      </div>
      <div className={s.siteLink}>
        <div className={s.link}>本站链接：</div>
        {mySite.map(
          (
            item: {
              key: string;
              value: string;
            },
            index
          ) => (
            <div key={index}>
              <span>{item.key}:</span>
              <span className={s.value}>{item.value}</span>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default MsgInfo;
