import axios from 'axios'

const request = axios.create({
  // 指定请求的根路径
  baseURL: 'http://127.0.0.1:4396/'
})

export default request