import { PieChart } from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import ReactEChartsCore from "echarts-for-react/lib/core";
import React from "react";
import { ClassType } from "../index";
import s from "./index.scss";
import { useOption } from "./useOption";
import { useAppSelector } from "@/store";
import { selectMode } from "@/store/slices/layoutSlice";

interface Props {
  classData: ClassType[];
  mode: number;
}

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const Chart: React.FC<Props> = ({ classData, mode }) => {
  const option = useOption(classData, mode);

  return (
    <div className={s.box}>
      <h3>📊文章分布</h3>
      <ReactEChartsCore
        style={{
          height: "400px",
        }}
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme="theme_name"
      />
    </div>
  );
};

export default Chart;
