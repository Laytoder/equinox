import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import chartConfig from "./chartConfigUtil";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import style from "./StockChart.module.css";

const StockChart: React.FC = () => {
  // uncomment if running docker-compose
  // const socketUrl = "ws://localhost:8080";
  const socketUrl = "wss://equinox-xd8p.onrender.com";
  const [fundData, setFundData] = useState<[number, number][][] | null>(null);
  const { lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = JSON.parse(lastMessage.data);
      const messageType = messageData["messageType"];
      if (messageType == "Fund Data") setFundData(messageData["fundData"]);
      else {
        const fundIdx: number = messageData["fundIdx"];
        const unixDate: number = messageData["unixDate"];
        const newValue: number = messageData["newValue"];

        fundData![fundIdx].push([unixDate, newValue]);
      }
    }
  }, [lastMessage]);

  return fundData ? (
    <div>
      {fundData.map((fund, i) => (
        <div className={style.chart}>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={chartConfig(
              fund.map(([timestamp, price]) => [timestamp * 1000, price]),
              `Fund ${i + 1}`
            )}
          />
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
};

export default StockChart;
