import { genFundData } from "./genFundData";
import genLatestStockData from "./genLatestStockData";
import genStockData from "./genStockData";

async function run() {
  const stockData = await genStockData();
  genFundData(stockData);
  genLatestStockData(stockData);
}

run();
