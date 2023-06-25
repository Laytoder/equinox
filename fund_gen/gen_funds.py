import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_distances
from utils.gen_weights import gen_weights
from utils.fund_cleaner import clean_fund
from config import fund_count
import warnings
import json

# TODO: Create Loading in fund gen using tqdm
# Refactor functional components

# Ignore the warning
warnings.filterwarnings("ignore")

with open('stock_data.json') as f:
    stock_data = json.load(f)

vects = []
vect_labels = []

for stock in stock_data:
    vects.append(stock_data[stock])
    vect_labels.append(stock)

vects = np.array(vects)

print("Generating Matrix .......")

distance_matrix = cosine_distances(vects)

print("Generating Clusters .......")

kmeans = KMeans(n_clusters=fund_count, n_init=10, init='k-means++', max_iter=300, random_state=0)

kmeans.fit(distance_matrix)

labels = kmeans.labels_

cluster_vectors = [{} for _ in range(kmeans.n_clusters)]

for i in range(len(labels)):
    (cluster_vectors[labels[i]])[vect_labels[i]] = vects[i]

print("Generating Weights .......")

for x in range(len(cluster_vectors)):
    cluster = cluster_vectors[x]
    print(f"Cluster Size: {len(cluster)}")
    fund = gen_weights(cluster)
    fund = clean_fund(fund)
    with open(f"../common/funds/Fund{x + 1}.json", 'w') as f:
        json.dump(fund, f)