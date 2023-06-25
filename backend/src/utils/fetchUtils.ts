import * as fs from "fs";
import * as path from "path";

export function fetchStockData() {
  const filePath = path.resolve(__dirname, "../../../common/stock_data.json");
  return new Promise<any>((resolve, error) => {
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        console.error("Error reading stock data:", err);
        return;
      }

      try {
        const stockData = JSON.parse(data);
        resolve(stockData);
      } catch (parseError) {
        console.error("Error occured while parsing stock data:", parseError);
        error(parseError);
      }
    });
  });
}

export function fetchLatestStockData() {
  const filePath = path.resolve(
    __dirname,
    "../../../common/stock_data_latest.json"
  );
  return new Promise<any>((resolve, error) => {
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        console.error("Error reading stock data:", err);
        return;
      }

      try {
        const stockData = JSON.parse(data);
        resolve(stockData);
      } catch (parseError) {
        console.error("Error occured while parsing stock data:", parseError);
        error(parseError);
      }
    });
  });
}

export function fetchFundData() {
  const filePath = path.resolve(__dirname, "../../../common/fund_data.json");
  return new Promise<any>((resolve, error) => {
    fs.readFile(filePath, "utf-8", async (err, data) => {
      if (err) {
        console.error("Error reading fund data:", err);
        return;
      }

      try {
        const fundData = JSON.parse(data);
        resolve(fundData);
      } catch (parseError) {
        console.error("Error occured while parsing fund data:", parseError);
        error(parseError);
      }
    });
  });
}
