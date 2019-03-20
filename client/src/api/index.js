import axios from 'axios'

export const getAll = function() {
    return axios.get('/api/getAll')
}

export const getByType = function (type) {
    return axios.get('/api/type')
}