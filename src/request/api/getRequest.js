import axios from '@/request/http'

const getRequestApi = {
  // get
  get (url) {
    return axios.get(url)
  }
}

export default getRequestApi
