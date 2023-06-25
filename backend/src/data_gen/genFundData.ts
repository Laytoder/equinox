import { funds, stocks } from "../funds";
import { saveFundData } from "../utils/saveUtils";

export function preProcessStockData(stockData: any) {
  // Find range for timestamp that satisfies all stocks

  let maxStartDate = -1,
    minEndDate = Infinity;

  for (let stock of stocks) {
    const startDate = stockData[stock][0][0];
    const endDate = stockData[stock][stockData[stock].length - 1][0];
    if (startDate > maxStartDate) maxStartDate = startDate;
    if (endDate < minEndDate) minEndDate = endDate;
  }

  // Filter stock prices within the timestamp range

  for (let stock of stocks) {
    const stockPrices = stockData[stock];
    let filteredStockPrices = [];
    for (let [timestamp, price] of stockPrices)
      if (timestamp >= maxStartDate && timestamp <= minEndDate)
        filteredStockPrices.push([timestamp, price]);
    stockData[stock] = filteredStockPrices;
  }

  // Create a list of hashset of all timestamps of every stock

  let timeSetList: Set<number>[] = [];

  for (let stock of stocks) {
    const stockPrices = stockData[stock];
    let timeSet = new Set<number>();
    for (let stockPrice of stockPrices) timeSet.add(stockPrice[0]);
    timeSetList.push(timeSet);
  }

  // Use the set to figure out timestamps common among all stocks

  let timestampList: number[] = [];

  for (
    let timestamp = maxStartDate;
    timestamp <= minEndDate;
    timestamp += 86400
  ) {
    let includeTimestamp = true;
    for (let timeSet of timeSetList)
      if (!timeSet.has(timestamp)) {
        includeTimestamp = false;
        break;
      }
    if (includeTimestamp) timestampList.push(timestamp);
  }

  // Filter data for the common timestamps

  for (let stock of stocks) {
    const stockPrices = stockData[stock];
    let filteredStockPrices = [];
    let timeIdx = 0;

    for (let [timestamp, price] of stockPrices)
      if (
        timeIdx < timestampList.length &&
        timestamp == timestampList[timeIdx]
      ) {
        filteredStockPrices.push([timestampList[timeIdx], price]);
        timeIdx += 1;
      }

    stockData[stock] = filteredStockPrices;
  }

  return stockData;
}

function addStockContribution(
  fundPrices: [number, number][],
  stockPrices: [number, number][],
  stockFraction: number
) {
  let stockFractionalPrices: [number, number][] = [];
  for (let stockPrice of stockPrices) {
    const [timestamp, price] = stockPrice;
    stockFractionalPrices.push([timestamp, price * stockFraction]);
  }

  if (fundPrices.length == 0) fundPrices = stockFractionalPrices;
  else
    for (let i = 0; i < fundPrices.length; i++) {
      let [fundTimestamp, fundPrice] = fundPrices[i];
      const fractionalStockPrice = stockFractionalPrices[i][1];
      fundPrice += fractionalStockPrice;
      fundPrices[i] = [fundTimestamp, fundPrice];
    }

  return fundPrices;
}

export function genFundData(rawStockData: any) {
  const stockData = preProcessStockData(rawStockData);

  let fundData: [number, number][][] = [];

  for (let fund of funds) {
    let fundPrices: [number, number][] = [];
    for (let stock in fund) {
      const stockPrices = stockData[stock];
      fundPrices = addStockContribution(
        fundPrices,
        stockPrices,
        (fund as any)[stock]
      );
    }
    fundData.push(fundPrices);
  }

  saveFundData(fundData);
}
