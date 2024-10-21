"use client";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const GaugeChart = ({ height, width, value, name }: { height: string; width: string; value: number; name: string }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: "green" },
        { offset: 1, color: "red" },
      ]);
      const option = {
        series: [
          {
            startAngle: 90,
            endAngle: -270,
            type: "gauge",
            // startAngle: 360,
            // center: ["0%", "100%"],
            // min: 0,
            // max: 1,
            // splitNumber: 8,

            progress: {
              show: true,
              width: 3,
              color: {
                color: "#4f62f7",
              },
            },
            axisLine: {
              lineStyle: {
                width: 7,
                color: [[1, "#f0f0f2"]],
              },
            },

            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 5,
              distance: 0,
              lineStyle: {
                color: color,
                width: 2,
              },
              show: false,
            },

            axisLabel: {
              color: "inherit",
              distance: -50,
              fontSize: 12,
              rotate: "tangential",
              show: false,
            },
            title: {
              offsetCenter: [0, "-15%"],
              // fontWeight: "bold",
              fontSize: 14,
              color: "#595959",
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}%",
              fontWeight: "normal",
              color: "#5164ba",
              fontSize: 12,
              offsetCenter: [0, "35%"],
            },
            data: [
              {
                value: value,
                fontSize: 12,
                name: name,
              },
            ],
          },
        ],
      };
      //   setInterval(function () {
      //     myChart.setOption({
      //       series: [
      //         {
      //           data: [
      //             {
      //               value: +(Math.random() * 100).toFixed(2),
      //               name: "CPU Usage",
      //               fontSize: 12,
      //             },
      //           ],
      //         },
      //       ],
      //     });
      //   }, 2000);

      myChart.setOption(option);

      // Clean up
      return () => {
        myChart.dispose();
      };
    }
  }, [height, width, value, name]);

  return <div ref={chartRef} style={{ width: width, height: height }} />;
};

export default GaugeChart;
