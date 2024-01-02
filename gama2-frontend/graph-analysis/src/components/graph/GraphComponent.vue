<!-- eslint-disable no-unused-vars -->
<script setup>
import graphService from '../../stores/graphServices/graphService.js'
import TargetFormComponent from './TargetFormComponent.vue'
import D3Graph from './D3Graph.vue'
import { ref, watchEffect } from 'vue'

let fileSelected = ref(false)
let showfileSelectionButton = ref(true)
let buildGraph = ref(false)
let selectedFile = ref(null)
let dataHeaders = ref([])
let showTargetsForm = ref(false)
let nodes = ref(null)
let edges = ref(null)
let targetsFormData = ref({
    filePath: '',
    src: '',
    dest: '',
})
var d3margin = ref(null)
var d3svg = ref(null)

function postGraphData(event) {
    fileSelected.value = true
    showfileSelectionButton.value = false
    selectedFile.value = event.target.files[0]
    graphService
        .postData(selectedFile.value)
        .then((res) => onSuccessfulPost(res))
        .catch((err) => console.log(err))
}
function onSuccessfulPost(response) {
    targetsFormData.value.filePath = response.data.data.filePath
    dataHeaders.value = response.data.data.fileHeaders
    fileSelected.value = false
    showTargetsForm.value = true
    console.log('response.data', response.data)
}

function targetFormSubmission(targetFormData) {
    console.log(targetFormData.src)
    const request = {
        filePath: targetFormData.filePath,
        src: dataHeaders.value[targetFormData.src],
        dest: dataHeaders.value[targetFormData.dest],
    }
    console.log('get request: ', request)
    graphService
        .getGraph(request)
        .then((res) => onsSuccessfulGraphRetrieval(res))
        .catch((err) => console.log('error: ', err))
}

function onsSuccessfulGraphRetrieval(response) {
    showTargetsForm.value = false
    console.log('graph response', response)
    edges.value = response.data.data.graph.links
    nodes.value = response.data.data.graph.nodes
    buildGraph.value = true
}
</script>

<template>
    <div class="graphControllerContainer">
    <div v-if="showfileSelectionButton" class="card">
        <div class="card-body">
            <div>Please Select the file(s) you would like to upload</div>
            <input type="file" @change="postGraphData" />
            <div v-if="selectedFile">
                <p>File Selected: {{ selectedFile.name }}</p>
            </div>
        </div>
    </div>
    <div v-if="fileSelected" class="card">
        <div class="card-body">
            <h5 class="card-title">File Selected: {{ selectedFile.name }}</h5>
        </div>
    </div>
    <TargetFormComponent
        v-if="showTargetsForm"
        :targetsFormData="targetsFormData"
        :dataHeaders="dataHeaders"
        @targetFormSubmission="targetFormSubmission"
    />
    <D3Graph v-if="buildGraph" :nodes="nodes" :edges="edges" />
</div>
</template>

<style scoped>
.card {
    background-color: rgba(255, 255, 255, 0.9);    
    max-width: fit-content;
    margin:0 auto;
}
.graphControllerContainer{
    min-height: 100vh;
}
</style>
