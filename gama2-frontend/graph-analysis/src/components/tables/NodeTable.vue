<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useGraphData } from '../../stores/graphData'
import { storeToRefs } from 'pinia'

const graphData = useGraphData()
const { graphNodes } = storeToRefs(graphData)
let nodeHeaders = ref([])
let selectedNodes = ref([])
let currSortingcCol = ref(null)
let isSortAscending = ref(true)
const sortingState = reactive({
    sortBy: null,
    sortAscending: true,
})
onMounted(() => {
    if (graphNodes.value.length > 0) {
        nodeHeaders.value = Object.keys(graphNodes.value[0])
    }
})
function sortTable(column) {
    if (sortingState.sortBy === column) {
        sortingState.sortAscending = !sortingState.sortAscending
        isSortAscending.value = sortingState.sortAscending
    } else {
        sortingState.sortBy = column
        currSortingcCol.value = column
        sortingState.sortAscending = true
    }
    graphNodes.value.sort((a, b) => {
        if (a[column] < b[column]) {
            return sortingState.sortAscending ? -1 : 1
        }
        if (a[column] > b[column]) {
            return sortingState.sortAscending ? 1 : -1
        }
        return 0
    })
}
function isSortedBy(header) {
    console.log(sortingState.sortBy, sortingState.sortAscending)
    let title = header
    let isActive = false
    if (header == sortingState.sortBy) {
        if (sortingState.sortAscending) {
            title += '&uarr;'
        } else {
            title += '&darr;'
        }
        isActive = true
    }
    const elem = [
        '<div class=',
        isActive ? "'isActive' style='background-color: blue;'>" : "''>",
        title,
        '</div>',
    ].join('')
    console.log(elem)
    return elem
}
</script>

<template>
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
                            @click="sortTable(header)"
                            class="table-header"
                            v-html="isSortedBy(header)"
                        ></th>
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
</template>

<style scoped>
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
