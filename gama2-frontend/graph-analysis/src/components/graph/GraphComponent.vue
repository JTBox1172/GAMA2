<!-- eslint-disable no-unused-vars -->
<script setup>
import D3Graph from './D3Graph.vue'
import { useGraphData } from '../../stores/graphData'
import { storeToRefs } from 'pinia'

const graphData = useGraphData()
const { showGraph } = storeToRefs(graphData)
</script>

<template>
    <div class="graphControllerContainer">
        <D3Graph v-if="showGraph" />
    </div>
</template>

<style scoped>
.graphControllerContainer {
    margin-top: 25px;
}
</style>
