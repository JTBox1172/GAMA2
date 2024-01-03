<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
const props = defineProps({
    targetsFormData: {
        type: Object,
        required: true,
    },
    dataHeaders: {
        type: Array,
        required: true,
    },
})
const emit = defineEmits(['targetFormSubmission'])
const formData = ref(props.targetsFormData)
const dataHeaders = ref(props.dataHeaders)
let modal = null
function onSubmit() {
    console.log(formData.value)
    emit('targetFormSubmission', formData.value)
    modal.hide()
}

onMounted(() => {
    modal = new Modal(document.getElementById('targetFormModal'))
    modal.show()
})
</script>

<template>
    <div class="modal" tabindex="-1" id="targetFormModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Source and Destination Selection
                    </h5>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <form @submit.prevent="onSubmit">
                            <div class="row">
                                <div class="col-sm">
                                    <label class="form-label"
                                        >Select Source Column</label
                                    >
                                </div>
                                <div class="col-sm">
                                    <select v-model="formData.src">
                                        <option
                                            v-for="header in dataHeaders"
                                            :key="dataHeaders.indexOf(header)"
                                            :value="dataHeaders.indexOf(header)"
                                        >
                                            {{ header }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <label class="form-label"
                                        >Select Destination Column</label
                                    >
                                </div>
                                <div class="col-sm">
                                    <select v-model="formData.dest">
                                        <option
                                            v-for="header in dataHeaders"
                                            :key="dataHeaders.indexOf(header)"
                                            :value="dataHeaders.indexOf(header)"
                                        >
                                            {{ header }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
