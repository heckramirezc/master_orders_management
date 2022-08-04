import axios from "axios"

const API_URL = "http://servicios.grupomaster.com.gt:8081/api"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}
