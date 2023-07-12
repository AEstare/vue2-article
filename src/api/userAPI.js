import request from '@/utils/request'

// 这个是演示，并非实际接口
export const getUserInfoAPI = function() {
  return request.get('/user')
}
