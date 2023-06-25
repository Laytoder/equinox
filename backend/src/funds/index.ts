import fund1 from "../../../common/funds/Fund_1.json";
import fund2 from "../../../common/funds/Fund_2.json";
import fund3 from "../../../common/funds/Fund_3.json";
import fund4 from "../../../common/funds/Fund_4.json";
import fund5 from "../../../common/funds/Fund_5.json";
import fund6 from "../../../common/funds/Fund_6.json";
import fund7 from "../../../common/funds/Fund_7.json";
import fund8 from "../../../common/funds/Fund_8.json";

const funds = [fund1, fund2, fund3, fund4, fund5, fund6, fund7, fund8];
let stockToFund: { [key: string]: number } = {};
let stocks: string[] = [];

for (let i = 0; i < funds.length; i++) {
  for (let stock in funds[i]) {
    stockToFund[stock] = i;
    stocks.push(stock);
  }
}

export { funds, stockToFund, stocks };
