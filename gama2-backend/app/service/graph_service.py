import networkx as nx 
import matplotlib.pyplot as plt
import pandas as pd
import csv
from networkx.readwrite import json_graph
from typing import List
import json

def get_graph(df, src: str, dest: str):
    G = nx.from_pandas_edgelist(df, src, dest)
    G.name = "graph from pandas adjacency matrix"
    communities = nx.community.louvain_communities(G)
    for node in G.nodes():
        for indice in range(len(communities)):
            for person in communities[indice]:
                if person == node:
                    G.nodes[node]['community'] = indice
    jsonGraph = json_graph.node_link_data(G)
    json.dumps(jsonGraph)
    return jsonGraph

def convert_csv_to_dataframe(filePath):
    df = pd.read_csv(filePath, on_bad_lines='warn', comment='#')
    return df

def convert_xls_to_dataframe(filePath):
    df = pd.read_excel(filePath, on_bad_lines='warn', comment='#')
    return df

def getHeaders(filePath, fileType):
    if(fileType == ".csv"):
        with open(filePath, 'r') as infile:
            reader = csv.DictReader(infile)
            headers = reader.fieldnames
    elif(fileType == ".xls" or fileType == ".xlsx"):
        headers = []
        # todo
    else:
        headers = []
    return list(headers)
