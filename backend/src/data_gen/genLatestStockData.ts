import { saveLatestStockData } from "../utils/saveUtils";
import { preProcessStockData } from "./genFundData";

export default function genLatestStockData(stockData: any) {
  stockData = preProcessStockData(stockData);
  let latestStockData: any = {};
  for (let stock in stockData)
    latestStockData[stock] = stockData[stock][stockData[stock].length - 1][1];
  saveLatestStockData(latestStockData);
}
