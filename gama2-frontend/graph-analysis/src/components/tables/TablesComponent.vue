<script setup>
import { useGraphData } from '../../stores/graphData'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import NodeTable from '@/components/tables/NodeTable.vue'
import EdgeTable from '@/components/tables/EdgeTable.vue'
const graphData = useGraphData()
const { graphEdges, graphNodes, showGraph } = storeToRefs(graphData)
let showEdgeTable = ref(false)
let showNodeTable = ref(false)
onMounted(() => {
    if (graphEdges.value.length > 0) {
        showEdgeTable.value = true
    }
    if (graphNodes.value.length > 0) {
        showNodeTable.value = true
    }
})
</script>

<template>
    <div class="tablesContainer container-md" v-if="showGraph">
        <NodeTable v-if="showNodeTable" />
        <EdgeTable v-if="showEdgeTable" />
    </div>
</template>

<style scoped>
.tablesContainer {
    background-color: rgba(0, 0, 0, 0.5);
}
.dataTable {
    max-height: 40vh; /* or your preferred height */
    overflow-y: auto;
    overflow-x: hidden;
    border-top: 0 solid black;
}
thead {
    position: sticky;
    top: -1px;
    z-index: 10;
    margin-top: 0px;
}
h2 {
    color: white;
}
</style>
