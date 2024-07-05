import React from "react";

import AboutText from "./AboutText";
import Chart from "./Chart";

export interface ClassType {
  _id: string;
  createDate: string;
  name: string;
  count: number;
}

interface Props {
  content: string;
  classData: ClassType[];
  className?: string;
  mode: number;
}

const AboutSite: React.FC<Props> = ({
  content,
  classData,
  className,
  mode,
}) => {
  return (
    <div className={className}>
      <Chart classData={classData} mode={mode} />
      <AboutText content={content} />
    </div>
  );
};

export default AboutSite;
