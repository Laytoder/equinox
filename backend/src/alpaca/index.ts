import { AlpacaClient, AlpacaStream } from "@master-chief/alpaca";
import { apiKey, apiSecret, paper } from "../credentials";
import { stocks } from "../funds";

const alpacaClient = new AlpacaClient({
  credentials: {
    key: apiKey,
    secret: apiSecret,
    paper: paper,
  },
  rate_limit: true,
});

const alpacaStream = new AlpacaStream({
  credentials: {
    key: apiKey,
    secret: apiSecret,
    paper: paper,
  },
  type: "market_data",
  source: "iex",
});

alpacaStream.once("authenticated", () => {
  alpacaStream.subscribe("bars", stocks);
});

export { alpacaClient, alpacaStream };
