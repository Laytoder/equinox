import numpy as np
import pandas as pd
from scipy.optimize import minimize

# Weight Generation Using Markowitz Portfolio Theory

def gen_weights(stock_data):
    
    returns = pd.DataFrame(stock_data).pct_change().dropna()

    print("Generating Covariance Matrix .......")

    cov_matrix = returns.cov()

    def objective(weights):
        portfolio_variance = np.dot(weights.T, np.dot(cov_matrix, weights))
        return portfolio_variance

    constraints = [{'type': 'eq', 'fun': lambda x: np.sum(x) - 1}]

    bounds = [(0, 1) for _ in range(len(returns.columns))]

    initial_weights = np.ones(len(returns.columns)) / len(returns.columns)

    print("Minimizing Risk .......")

    result = minimize(objective, initial_weights, method='SLSQP', bounds=bounds, constraints=constraints)

    optimal_weights = result.x

    portfolio = {}

    for i, stock in enumerate(returns.columns):
        portfolio[stock] = optimal_weights[i] * 100
    
    return portfolio