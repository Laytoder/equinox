def clean_fund(fund):
    clean_fund = {}
    for stock in fund:
        if fund[stock] != 0.0:
            clean_fund[stock] = fund[stock]
    return clean_fund