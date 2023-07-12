// 文章相关api借口，都存放到此
import request from '@/utils/request.js'

export const getArticleListApi = function(_page, _limit) {
  return request.get('api/get/articleslist', {
    // 请求参数
    params: {
      _page,
      _limit
    }
  })
}
