import axios from 'axios'
import { PATHS } from './config'

const api = axios.create({ baseURL: `http://backend:8000/api` })

const exceptions = [`/token/`, `/token/refresh/`]

api.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401 && !exceptions.includes(error.config.url)) {
    localStorage.clear()
    window.location.replace(PATHS.LOGIN)
  }
})

export default api
