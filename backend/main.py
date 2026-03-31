from fastapi import FastAPI, Request
from collections import defaultdict, deque
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes, edges):
    graph = defaultdict(list)
    indegree = {node["id"]: 0 for node in nodes}

    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        graph[source].append(target)
        indegree[target] += 1

    queue = deque([n for n in indegree if indegree[n] == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1

        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)


@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    data = await request.json()

    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    print("NODES:", nodes)
    print("EDGES:", edges)

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag(nodes, edges),
    }