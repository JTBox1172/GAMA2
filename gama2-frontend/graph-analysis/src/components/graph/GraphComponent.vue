<!-- eslint-disable no-unused-vars -->
<script setup>
import graphService from '../../stores/graphServices/graphService.js'
import TargetFormComponent from './TargetFormComponent.vue'
import { ref, watchEffect } from 'vue'
let fileSelected = ref(false)
let showfileSelectionButton = ref(true)
let selectedFile = ref(null)
let dataHeaders = ref([])
let graphDataAvailable = ref(null)
let showTargetsForm = ref(false)
let graphData = ref(null)
let graphTitle = ref(null)
let nodes = ref(null)
let edges = ref(null)
let targetsFormData = ref({
  filePath: '',
  src: '',
  dest: '',
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
  graphService
    .getGraph(request)
    .then((res) => onsSuccessfulGraphRetrieval(res))
    .catch((err) => console.log('error: ', err))
}

function onsSuccessfulGraphRetrieval(response) {
  console.log('graph response', response)
  this.graphData = response.data.data.graph
  this.graphTitle = this.graphData.graph.name
  this.nodes = this.graphData.nodes
  this.edges = this.graphData.links
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
</template>
