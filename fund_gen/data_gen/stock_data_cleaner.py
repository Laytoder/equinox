def clean_stock_data(stock_data, years_of_historic_data):
    clean_stock_data = {}

    for stock in stock_data:
        if len(stock_data[stock]) >= years_of_historic_data * 12:
            clean_stock_data[stock] = stock_data[stock][:years_of_historic_data * 12]
    
    return clean_stock_data