import { alpacaClient } from "../alpaca";
import { stocks } from "../funds";
import { fetchStockData } from "../utils/fetchUtils";
import { saveStockData } from "../utils/saveUtils";
import fs from "fs";
import path from "path";

async function generateDataForStock(stock: string) {
  try {
    let bars = [];
    let page_token = "";

    while (page_token != null) {
      let resp = await alpacaClient.getBars({
        symbol: stock,
        start: new Date(2016, 0, 1),
        end: new Date(new Date().getTime() - 15 * 60 * 1000),
        timeframe: "1Day",
        page_token,
      });
      bars.push(...resp.bars);
      page_token = resp.next_page_token;
    }

    let formatted_stock_data: [number, number][] = [];
    for (let bar of bars) {
      const unix_date = Math.floor(new Date(bar.t).getTime() / 1000);
      formatted_stock_data.push([unix_date, bar.c]);
    }

    return formatted_stock_data;
  } catch (e) {
    console.log(e);
  }
}

async function genMissingStockData(stockData: any) {
  let genCount = -1;
  while (genCount != 0) {
    genCount = 0;
    for (let stock of stocks)
      if (Object.keys(stockData[stock]).length == 0) {
        stockData[stock] = await generateDataForStock(stock);
        genCount += 1;
        console.log(`Generating missing data for ${stock}`);
      }
  }

  return stockData;
}

function pathExists(filePath: string): boolean {
  const absolutePath = path.resolve(__dirname, filePath);
  try {
    fs.accessSync(absolutePath);
    return true;
  } catch (err) {
    return false;
  }
}

export default async function genStockData() {
  let stockData: any = {};
  if (pathExists("../../../common/stock_data.json")) {
    stockData = await fetchStockData();
  }

  if (Object.keys(stockData).length == 0)
    for (let i = 0; i < stocks.length; i++) {
      stockData[stocks[i]] = await generateDataForStock(stocks[i]);
      console.log(`Processing iteration ${i + 1}/${stocks.length}`);
    }

  stockData = await genMissingStockData(stockData);
  saveStockData(stockData);
  return stockData;
}
