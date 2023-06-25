import { Bar } from "@master-chief/alpaca";
import { funds, stockToFund } from "../funds";
import { saveFundData, saveLatestStockData } from "./saveUtils";

function genFundUpdate(stockData: any, fundData: any, bar: Bar) {
  const stock = bar.S;
  const newStockValue = bar.c;
  if (stock in stockToFund) {
    const fundIdx = stockToFund[stock];
    const fund = funds[fundIdx] as any;
    const stockFraction = fund[stock];
    const fundValues = fundData[fundIdx];
    const fundValue: number = fundValues[fundValues.length - 1][1];
    const unix_date = Math.floor(new Date(bar.t).getTime() / 1000);

    const stockValue: number = stockData[stock];
    const stockFractionalValue = stockValue * stockFraction;
    const newStockContribution = newStockValue * stockFraction;
    const newFundValue =
      fundValue - stockFractionalValue + newStockContribution;

    stockData[stock] = newStockValue;
    fundData[fundIdx].push([unix_date, newFundValue]);

    saveLatestStockData(stockData);
    saveFundData(fundData);

    return [
      stockData,
      fundData,
      {
        messageType: "bar",
        fundIdx: fundIdx,
        unixDate: unix_date,
        newValue: newFundValue,
      },
    ];
  }
}

export default genFundUpdate;
