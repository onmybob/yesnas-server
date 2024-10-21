"use client";
import * as echarts from "echarts";
import { memo, useEffect, useRef } from "react";
const byteConvert = function (bytes: number): string {
  if (isNaN(bytes) || bytes < 0) return "";
  const symbols = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = 0;
  while (bytes >= 1024 && i < symbols.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${symbols[i]}`;
};

function Fn() {
  const chartRef = useRef<HTMLDivElement>(null);
  const esRef = useRef<EventSource | null>(null); // 保存 EventSource 实例

  const defS0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const defS1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const defX = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];

  const option = {
    color: ["#4ec4ff", "#90a2fd"],
    tooltip: {
      trigger: "axis",
      formatter: function (param: any[]) {
        const param1 = byteConvert(param[0].value);
        const param2 = byteConvert(param[1].value);

        return `Upload: ${param1}<br/>
            Download: ${param2}`;
      },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisTick: {
          alignWithLabel: true,
        },
        axisLable: {
          color: "#858fa6",
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: "#E2E2E2",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: "#686868",
          },
        },
        data: defX,
      },
    ],
    yAxis: [
      {
        axisLabel: {
          formatter: function (value: number) {
            return byteConvert(value);
          },
        },
        type: "value",
        axisTick: {
          show: false,
        },
        axisLable: {
          color: "#858fa6",
          formatter: "{value} kb/s",
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: "#f2f2f2",
          },
        },
        axisLine: {
          lineStyle: {
            width: 0,
            color: "#686868",
            show: false,
          },
        },
      },
    ],
    grid: [
      {
        bottom: "15%",
        left: "9%",
        right: "0%",
        top: "3%",
        contailable: true,
      },
    ],
    series: [
      {
        showSymbol: false,
        name: "上行流量",
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#e4f2ff" },
              { offset: 1, color: "#ffffff" },
            ],
            global: false,
          },
        },
        lineStyle: {
          width: 1,
        },
        data: defS0,
      },
      {
        showSymbol: false,
        name: "下行流量",
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#eef1ff" },
              { offset: 1, color: "#ffffff" },
            ],
            global: false,
          },
        },
        lineStyle: {
          width: 1,
        },
        data: defS1,
      },
    ],
  };

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption(option);

    const es = new EventSource("http://192.168.168.101:8081/sse/system", {
      withCredentials: true,
    });
    esRef.current = es;

    es.onmessage = (event) => {
      if (chart.isDisposed()) return; // 如果 chart 已经销毁，退出

      const newMessage = JSON.parse(event.data);
      const result = newMessage.network.find((s: any) => s.interface_name === "enp2s0");

      const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);

      option.series[0].data.shift();
      option.series[0].data.push(result.rx_bytes);

      option.series[1].data.shift();
      option.series[1].data.push(result.tx_bytes);
      chart.setOption(option);
    };

    // Cleanup
    return () => {
      if (esRef.current) {
        esRef.current.close(); // 关闭 EventSource
      }
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>;
}

export default memo(Fn);
