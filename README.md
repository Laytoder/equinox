# Equinox

Equinox is an index fund generator designed to analyze stocks in the stock market and create diversified funds using the [K-means clustering algorithm](https://en.wikipedia.org/wiki/K-means_clustering) and the [Markowitz portfolio theory](https://en.wikipedia.org/wiki/Modern_portfolio_theory). By clustering similar stocks together, Equinox aims to capture the trends of constituent stocks within a fund. Additionally, the utilization of Markowitz portfolio theory ensures the generation of funds with lower risk and potentially higher returns.

## Key Features

- Index fund generation based on stock market analysis.
- Utilization of K-means clustering to group similar stocks together within a fund.
- Assignment of weights to stocks in a cluster/fund using the Markowitz portfolio theory.
- Proper diversification of funds to manage risk effectively.

## Fund Generation

Funds have already been generated and can be cloned directly from the repository. However, if you want to regenerate the funds, here are the steps.

1. Generate your `<API KEY>` and `<API SECRET>` from the [Alpaca API](https://alpaca.markets/) and paste them in [credentials.json](/common/credentials.json):

   ```bash
   {
     "apiKey": "<API KEY>",
     "apiSecret": "<API SECRET>",
     "paper": false
   }

3. In a console, navigate to the `fund_gen` directory:

   ```bash
   cd fund_gen

4. Install the required python libraries:

   ```bash
   pip3 install -r requirements.txt

5. Generate stock_data.json and wait from the script to finish running, you can modify the years of historic data generated in [config.py](/fund_gen/config.py):

   ```bash
   python3 data_gen/gen_stock_data.py

5. Generate funds and wait for the script to finish running, you can modify the number of funds generated in [config.py](/fund_gen/config.py):

   ```bash
   python3 gen_funds.py

## Execution

To run the Equinox project, follow these steps:

1. Open two separate consoles or terminal windows.
2. In the first console, navigate to the `backend` directory:

   ```bash
   cd backend

3. Install the required dependencies using your preferred package manager (e.g., `pnpm`, `yarn`):

   ```bash
   pnpm install

4. Start the backend server:

   ```bash
   pnpm dev

5. In the second console, navigate to the `frontend` directory:

   ```bash
   cd frontend

6. Install the required dependencies using your preferred package manager (e.g., `pnpm`, `yarn`):

   ```bash
   pnpm install

7. Start the frontend development server:

   ```bash
   pnpm dev

8. Alternatively, if you have Docker and Docker Compose installed, you can use the following command to start the application:

   ```bash
   docker-compose up -d

## Live Demo

A live version of the Equinox project is available [here](https://laytoder.github.io/equinox/). 

## Additional Resources

To gain a deeper understanding of the underlying concepts and algorithms used in Equinox, you may find the following resources helpful:

- [Markowitz Portfolio Theory on Wikipedia](https://en.wikipedia.org/wiki/Modern_portfolio_theory)
- [K-means Clustering on Wikipedia](https://en.wikipedia.org/wiki/K-means_clustering)

Feel free to explore these resources to enhance your knowledge and grasp the foundations of Equinox's functionality.
