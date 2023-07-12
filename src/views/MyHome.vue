<template>
  <div class="home-container">
    <van-nav-bar title="头条" fixed />

    <!-- 导入，注册，并使用ArticleInfo组件 -->
    <!-- 在使用组件的时候，如果某个属性名是小驼峰，官方建议绑定属性的时候改写成连字符格式 -->
    <!-- 如cmtCount 建议写成 cmt-count -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :disabled="finished"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListApi } from '@/api/articleAPI.js'
// 导入需要的组件
import ArticleInfo from '@/components/ArticleInfo.vue'
import _ from 'lodash'
export default {
  name: 'MyHome',
  data() {
    return {
      // 页码
      page: 1,
      // 显示多少
      limit: 10,
      // 存放从服务器获取的文章列表
      artlist: [],
      // 是否加载下一页数据，如果loading一直为treu，则不会防护触发
      // 每当下一页数据请求回来后，要把loading改为false
      loading: true,
      // 所有数据是否加载完毕了，如果没有更多数据，一定要把此数据值改为true
      finished: false,
      // 控制是否下拉刷新
      refreshing: false
    }
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList(isRefresh) {
      // 获取文章的列表数据
      const { data: res } = await getArticleListApi(this.page, this.limit)
      if (!res.data[0]) {
        // 如果没有更多数据，把finished改为true
        this.refreshing = false
        this.finished = true
      } else {
        if (isRefresh) {
          this.artlist = [...res.data[0], ...this.artlist]
          this.refreshing = false
        } else {
          // 上拉加载更多
          // this.artlist = [旧数据在前，新数据在后]
          this.artlist = [...this.artlist, ...res.data[0]]
          this.loading = false
        }
      }
    },
    // 只要onload被调用就应该请求下一页的数据
    onLoad() {
      // 1.让页码值+1
      this.page++
      // 2.重新获取接口请求数据
      this.initArticleList()
    },
    // 下拉刷新的处理函数
    onRefresh() {
      // 1.让页码值+1
      this.page++
      // 2.重新请求接口获取数据
      this.initArticleList(true)
    },
    recordTopHandler() {
      return _.debounce(
        () => {
          this.$route.meta.top = window.scrollY
        },
        50,
        { trailing: true }
      )
    }
  },
  created() {
    this.initArticleList()
  },
  // 注册组件
  components: { ArticleInfo },
  activated() {
    window.addEventListener('scroll', this.recordTopHandler())
  },
  deactivated() {
    window.removeEventListener('scroll', this.recordTopHandler())
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
  // .van-nav-bar {
  //   background-color: #007bff;
  // }

  // /deep/.van-nav-bar__title {
  //   color: white;
  // }
}
</style>
