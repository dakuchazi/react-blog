import dayjs from "dayjs";
import React from "react";

import s from "./index.scss";

interface Props {
  date: string;
  logContent: string;
}

const TimeItem: React.FC<Props> = ({ date, logContent }) => {
  return (
    <div className={s.item}>
      <div className={s.time}>
        <div className={s.dot}>
          <div className={s.dotIn} />
        </div>
        {date}
      </div>

      <ul className={s.content}>
        <li className={s.timeLi}>{logContent}</li>
      </ul>
    </div>
  );
};

export default TimeItem;
