import * as path from "path";
import * as fs from "fs";

export function saveFundData(fundData: any) {
  return new Promise<void>((resolve, error) => {
    const jsonString = JSON.stringify(fundData);
    const filePath = path.resolve(__dirname, "../../../common/fund_data.json");
    fs.writeFile(filePath, jsonString, "utf8", function (err) {
      if (err) error(err);
      else resolve();
    });
  });
}

export function saveStockData(stockData: any) {
  return new Promise<void>((resolve, error) => {
    const jsonString = JSON.stringify(stockData);
    const filePath = path.resolve(__dirname, "../../../common/stock_data.json");
    fs.writeFile(filePath, jsonString, "utf8", function (err) {
      if (err) error(err);
      else resolve();
    });
  });
}

export function saveLatestStockData(stockData: any) {
  return new Promise<void>((resolve, error) => {
    const jsonString = JSON.stringify(stockData);
    const filePath = path.resolve(
      __dirname,
      "../../../common/stock_data_latest.json"
    );
    fs.writeFile(filePath, jsonString, "utf8", function (err) {
      if (err) error(err);
      else resolve();
    });
  });
}
