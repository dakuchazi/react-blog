import classNames from "classnames";
import React from "react";

import s from "./index.scss";

interface Props {
  title?: string;
  desc?: string;
  className?: string;
}

const PageTitle: React.FC<Props> = ({ title, desc, className, children }) => {
  return (
    <div className={classNames(s.box, className)}>
      <div className={s.title}>{title}</div>
      {children}
      {desc && <div className={s.desc}>{desc}</div>}
    </div>
  );
};

export default PageTitle;
