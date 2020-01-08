import axios from '@/request/http'

const postRequestApi = {
  // post
  post (url, param) {
    return axios.post(url, param)
  }
}

export default postRequestApi
