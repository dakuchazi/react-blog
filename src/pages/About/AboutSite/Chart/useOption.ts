import { ClassType } from "..";

const format = (chartData: any) => {
  if (!Array.isArray(chartData)) return;
  if (chartData.length === 0) return;

  const tmeArr = chartData.map((item: any) => {
    return { name: item.name, value: item.count };
  });
  return tmeArr;
};

export const useOption = (classData: ClassType[], mode: number) => {
  const labelColor = [
    "rgb(255, 255, 255)",
    "rgb(53, 53, 53)",
    "rgb(53, 53, 53)",
  ];
  const backgroundColor = [
    "rgb(22, 54, 51)",
    "rgb(157, 222, 255)",
    "rgb(194, 209, 223)",
  ];

  return {
    tooltip: {
      trigger: "item",
      backgroundColor: backgroundColor[mode],
      borderColor: backgroundColor[mode],
      textStyle: {
        color: labelColor[mode],
        fontSize: 16,
        fontFamily: "dengxian",
      },
    },
    series: [
      {
        type: "pie",
        radius: "88%",
        height: "400px",
        data: format(classData),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          color: labelColor[mode],
          fontSize: 18,
          fontFamily: "dengxian",
        },
      },
    ],
  };
};
