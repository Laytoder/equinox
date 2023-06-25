import { alpacaStream } from "./alpaca";
import broadcastJSON from "./utils/broadcastJSON";
import { fetchFundData, fetchLatestStockData } from "./utils/fetchUtils";
import genFundUpdate from "./utils/genFundUpdate";
import createWebSocket from "./web_socket";

async function run() {
  let stockData = await fetchLatestStockData();
  let fundData = await fetchFundData();
  const wss = createWebSocket(fundData);

  alpacaStream.on("bar", async (bar) => {
    const fundUpdateRes = genFundUpdate(stockData, fundData, bar);
    if (fundUpdateRes) {
      const [updatedStockData, updatedFundData, fundUpdate] = fundUpdateRes;
      stockData = updatedStockData;
      fundData = updatedFundData;
      broadcastJSON(wss, fundUpdate);
    }
  });
}

run();
