<script setup>
import { useGraphData } from '../../stores/graphData'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const graphData = useGraphData()
const { graphEdges, graphNodes, showGraph } = storeToRefs(graphData)
let edgeHeaders = ref([])
let nodeHeaders = ref([])
let selectedNodes = ref([])
let selectedEdges = ref([])
onMounted(() => {
    if (graphEdges.value.length > 0) {
        console.log('running')
        edgeHeaders.value = Object.keys(graphEdges.value[0])
    }
    if (graphNodes.value.length > 0) {
        nodeHeaders.value = Object.keys(graphNodes.value[0])
    }
})
</script>

<template>
    <div class="tablesContainer container-md" v-if="showGraph">
        <div class="container-fluid">
            <div class="row justify-content-center"><h2>Node Table</h2></div>
            <div class="row justify-content-center dataTable">
                <table
                    class="table table-striped table-hover table-dark table-bordered"
                >
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                v-for="header in nodeHeaders"
                                :key="header"
                                class="table-header"
                            >
                                {{ header }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            scope="row"
                            v-for="(row, rowIndex) in graphNodes"
                            :key="rowIndex"
                        >
                            <td v-for="column in nodeHeaders" :key="column">
                                {{ row[column] }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row justify-content-center"><h2>Edge Table</h2></div>
            <div class="row justify-content-center dataTable">
                <table
                    class="table table-striped table-hover table-dark table-bordered no-border-collapse"
                >
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                class="table-header"
                                v-for="header in edgeHeaders"
                                :key="header"
                            >
                                {{ header }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            scope="row"
                            v-for="(row, rowIndex) in graphEdges"
                            :key="rowIndex"
                        >
                            <td v-for="column in edgeHeaders" :key="column">
                                {{ row[column] }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
