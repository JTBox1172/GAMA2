<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { useGraphData } from '../../stores/graphData'
import { storeToRefs } from 'pinia'

const graphData = useGraphData()
const { graphEdges } = storeToRefs(graphData)
let edgeHeaders = ref([])
let selectedEdges = ref([])
let isSorting = ref(false)
const sortingState = reactive({
    sortBy: null,
    sortAscending: true,
})
onMounted(() => {
    if (graphEdges.value.length > 0) {
        console.log('running')
        edgeHeaders.value = Object.keys(graphEdges.value[0])
    }
})
// Sorting function
function sortTable(column) {
    isSorting.value = true
    if (sortingState.sortBy === column) {
        sortingState.sortAscending = !sortingState.sortAscending
    } else {
        sortingState.sortBy = column
        sortingState.sortAscending = true
    }

    graphEdges.value.sort((a, b) => {
        if (a[column] < b[column]) {
            return sortingState.sortAscending ? -1 : 1
        }
        if (a[column] > b[column]) {
            return sortingState.sortAscending ? 1 : -1
        }
        return 0
    })
    isSorting.value = false
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
        isActive
            ? "'isActive' style='background-color: blue;'>"
            : "''>",
        title,
        '</div>',
    ].join('')
    console.log(elem)
    return elem
}
</script>

<template>
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
                            @click="sortTable(header)"
                            :key="header"
                            v-html="isSortedBy(header)"
                        ></th>
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
