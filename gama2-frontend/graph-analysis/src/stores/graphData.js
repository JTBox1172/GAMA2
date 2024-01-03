import { defineStore } from 'pinia'

export const useGraphData = defineStore('graphData', {
    state: () => ({
        graphNodes: [],
        graphEdges: [],
        showGraph: false,
    }),
    actions: {
        uploadNodes(nodes) {
            this.graphNodes = nodes
        },
        uploadEdges(edges) {
            this.graphEdges = edges
        },
        updateShowGraph() {
            this.showGraph = !this.showGraph
        },
    },
})
