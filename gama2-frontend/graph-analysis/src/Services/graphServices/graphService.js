import axios from 'axios'

const endpoint = `http://127.0.0.1:8000/graph`

const postData = (fileToUpload) => {
    let formData = new FormData()
    formData.append('file', fileToUpload)
    const config = {
        method: 'Post',
        url: `${endpoint}/post_data`,
        data: formData,
        crossdomain: true,
        withcredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
    }
    return axios(config)
}
const getGraph = (payload) => {
    const config = {
        method: 'Post',
        url: `${endpoint}/get_graph`,
        data: payload,
        crossdomain: true,
        withcredentials: true,
        headers: { 'Content-Type': 'application/json' },
    }
    return axios(config)
}

const graphService = {
    postData,
    getGraph,
}
export default graphService
