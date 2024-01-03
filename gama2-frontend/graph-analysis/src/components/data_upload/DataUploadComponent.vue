<script setup>
import graphService from '../../services/graphServices/graphService.js'
import TargetFormComponent from '@/components/graph/TargetFormComponent.vue'
import { ref, onMounted } from 'vue'
import { useGraphData } from '../../stores/graphData'
import { useRouter } from 'vue-router'

let fileSelected = ref(false)
let showfileSelectionButton = ref(false)
let selectedFile = ref(null)
let dataHeaders = ref([])
let showTargetsForm = ref(false)
let targetsFormData = ref({
    filePath: '',
    src: '',
    dest: '',
})
let showLoader = ref(false)
const graphData = useGraphData()
const router = useRouter()

onMounted(() => {
    console.log('mounted Data Upload')
    showfileSelectionButton.value = true
})
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
    showLoader.value = true
    graphService
        .getGraph(request)
        .then((res) => onsSuccessfulGraphRetrieval(res))
        .catch((err) => console.log('error: ', err))
}

function onsSuccessfulGraphRetrieval(response) {
    showTargetsForm.value = false
    console.log('graph response', response)
    graphData.uploadNodes(response.data.data.graph.nodes)
    graphData.uploadEdges(response.data.data.graph.links)
    graphData.showGraph = true
    router.push('/graph-view')
}
</script>
<template>
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
    <div v-if="showLoader" class="centered">
        <div class="loader">
            <div class="centerInSpinner">
                <h1 class="text-white">Loading Graph</h1>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card {
    background-color: rgba(255, 255, 255, 0.9);
    max-width: fit-content;
    margin: 0 auto;
    margin-top: 25px;
}
.loader {
    margin: auto auto;
    border: 60px solid #f3f3f3;
    border-radius: 50%;
    border-top: 60px solid #3498db;
    width: 600px;
    height: 600px;
    animation: spin 2s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;
}
.centered {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
}
.centerInSpinner {
    animation: reverse-spin 2s linear infinite;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes reverse-spin {
    0% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
</style>
