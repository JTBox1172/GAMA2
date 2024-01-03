<script setup>
import { onMounted, ref } from 'vue'
import { useGraphData } from '../../stores/graphData'
import { Modal } from 'bootstrap'
let selectedNode = ref(null)
const keys = ref(null)
let modal = null
onMounted(() => {
    console.log('showing baseball card')
    const graphData = useGraphData()
    selectedNode.value = graphData.getViewNode()
    console.log(selectedNode.value)
    keys.value = Object.keys(selectedNode.value)
    console.log(keys)
    modal = new Modal(document.getElementById('baseBallCardModal'))
    modal.show()
})
</script>

<template>
    <div class="container-fluid">
        <div class="modal" tabindex="-1" id="baseBallCardModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">
                            BaseBallCard for {{ selectedNode }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
