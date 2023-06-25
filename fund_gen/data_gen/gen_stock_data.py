from alpaca.data.historical import StockHistoricalDataClient
from alpaca.trading.client import TradingClient
from alpaca.data.timeframe import TimeFrame
from datetime import datetime
from alpaca.data.requests import StockBarsRequest
from stock_data_cleaner import clean_stock_data
from ..config import years_of_historic_data
import json

# TODO: Create Loading in fund gen using tqdm
# Refactor functional components

with open("../../common/credentials.json") as f:
    credentials = json.load(f)

API_KEY = credentials['apiKey']
API_SECRET = credentials['apiSecret']
BASE_URL = 'https://paper-api.alpaca.markets' if credentials['paper'] else 'https://api.alpaca.markets'

client = StockHistoricalDataClient(API_KEY, API_SECRET)

trading_client = TradingClient(API_KEY, API_SECRET, paper=True)

assets = trading_client.get_all_assets()

stocks = [asset for asset in assets if asset.status == 'active' and asset.asset_class == 'us_equity' and asset.tradable]

symbols = []

for stock in stocks:
    symbols.append(stock.symbol)

stock_data = {}

print("Starting fetch ....")

request_params = StockBarsRequest(
                        symbol_or_symbols=symbols[:5000],
                        timeframe=TimeFrame.Month,
                        start=datetime(2016, 1, 1),
                        end=datetime(2023, 1, 1)
                 )

bars = client.get_stock_bars(request_params)

for symbol in symbols[:5000]:
    try:
        stock_data[symbol] = [bar.close for bar in bars[symbol]]
    except:
        pass

print("First 5000 done")

request_params = StockBarsRequest(
                        symbol_or_symbols=symbols[5000:10000],
                        timeframe=TimeFrame.Month,
                        start=datetime(2016, 1, 1),
                        end=datetime(2023, 1, 1)
                 )

bars = client.get_stock_bars(request_params)

for symbol in symbols[5000:10000]:
    try:
        stock_data[symbol] = [bar.close for bar in bars[symbol]]
    except:
        pass

print("Second 5000 done")

request_params = StockBarsRequest(
                        symbol_or_symbols=symbols[10000:],
                        timeframe=TimeFrame.Month,
                        start=datetime(2016, 1, 1),
                        end=datetime(2023, 1, 1)
                 )

bars = client.get_stock_bars(request_params)

for symbol in symbols[10000:]:
    try:
        stock_data[symbol] = [bar.close for bar in bars[symbol]]
    except:
        pass

print("Last iteration done")

stock_data = clean_stock_data(stock_data, years_of_historic_data)

# Convert dictionary to JSON string
json_data = json.dumps(stock_data)

# Write JSON string to a file
with open('../stock_data.json', 'w') as json_file:
    json_file.write(json_data)

print('Data saved')