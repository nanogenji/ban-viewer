<template>
  <div class="msearchResultContainer">
    <div class="loading" v-if="this.isloading" v-loading='true' element-loading-text="正在加载中...请稍候"></div>
    <div class="loading" v-else-if="this.apiError">
      <el-alert
        title="加载错误...请稍后再试"
        type="error"
        :description="'错误代码：'+this.errorMsg"
        show-icon
        style="marginTop:5rem">
      </el-alert>
    </div>
    <div class="msearchResultContent" v-else>
      <div class="fullSearch" v-hammer:tap="tomSearch">更多搜索</div>
      <mSearchCard v-for="searchResItem in searchResItems" :key="searchResItem.id"
      :id='searchResItem.id'
      :date='searchResItem.date'
      :img='searchResItem.image'
      :name='searchResItem.name'
      :nameCN='searchResItem.name_cn'
      :rank='searchResItem.rank'
      :score='searchResItem.score'
      :tags='searchResItem.tags'
      />
      <!-- vif 让分页器在未获取到数据时不显示 -->
      <el-pagination
        v-if="searchResTotal"
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="this.searchResTotal"
        :current-page='this.currentPage'
        @current-change='handleCurrentChange'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import mSearchCard from '../../components/mSearchCard'
import axios from 'axios'
export default {
  name:'mSearchResult',
  components:{
    mSearchCard
  },
  data(){
    return{
      searchResItems:0,
      searchResTotal:0,
      currentPage:1,
      isloading:true,
      apiError:false,
      errorMsg:'',
      datePickStart:'',
      datePickEnd:'',
      searchdata:{
        "keyword": "string",
        "sort": "rank",
        "filter": {
          "type": [
            2
          ],
          "tag": [

          ],
          "air_date": [

          ],
          // "rating": [
          //   ">=6",
          //   "<8"
          // ],
        }
      }
    }
  },
  methods:{
    tomSearch(){
      this.$router.push({
        path:'/msearch'
      })
    },
    handleCurrentChange(val){
      this.currentPage = val
      axios.post(`https://api.bgm.tv/v0/search/subjects?limit=10&offset=${(this.currentPage-1)*10}`,this.searchdata).then(
        response => {
          this.searchResItems = response.data.data
          this.searchResTotal = response.data.total//获取结果总数
          this.isloading = false
        },
        error => {
          this.apiError = true
          this.errorMsg = error.message
          console.log(error.message)
        }
      )
      window.scrollTo({ top: 280, behavior: 'smooth' });
    },
  },
  watch:{
    //监听搜索关键词，实现重复搜索
    '$route.query.inputValue':{
      handler:function(){
        // this.$router.go(0)
        location.reload();
      },
      deep: true
    },
    '$store.state.tag':{
      handler(newValue){
        this.searchdata.filter.tag[0] = newValue
        this.searchdata.keyword = undefined//关键词与tag互斥
        axios.post(`https://api.bgm.tv/v0/search/subjects?limit=10&offset=${(this.currentPage-1)*10}`,this.searchdata).then(
          response => {
            this.searchResItems = response.data.data //data.data
            this.searchResTotal = response.data.total
            this.isloading = false
          },
          error => {
            this.apiError = true
            this.errorMsg = error.message
            console.log(error.message)
          }
        )
        window.scrollTo({ top: 280, behavior: 'smooth' });
      }
    }
  },
  created(){
    this.searchdata.keyword = this.$route.query.inputValue//获取搜索词
    if(this.$route.query.tagValue){//获取tag前先判定detail来的数据不为空
      this.searchdata.filter.tag[0] = this.$route.query.tagValue
    }
    if(this.$route.query.type){
      this.searchdata.filter.type[0] = Number(this.$route.query.type)
    }
    if(this.$route.query.dateStart && this.$route.query.dateEnd){
      this.searchdata.filter.air_date[0] = this.$route.query.dateStart
      this.searchdata.filter.air_date[1] = this.$route.query.dateEnd
      console.log(this.$route.query.dateStart, this.$route.query.dateEnd)
    }
    axios.post(`https://api.bgm.tv/v0/search/subjects?limit=10&offset=${(this.currentPage-1)*10}`,this.searchdata).then(
      response => {
        this.searchResItems = response.data.data //data.data
        this.searchResTotal = response.data.total
        this.isloading = false
      },
      error => {
        this.apiError = true
        this.errorMsg = error.message
        console.log(error.message)
      }
    )
  },
}
</script>

<style lang="scss" scoped>
  .msearchResultContainer{
    width: 100%;
    min-height: 700px;
    margin-top: -2rem;
    border-radius: 0.75rem;
    padding-bottom: 3rem;
    padding-top: 3rem;
    background-color: var(--regular-background);
    backdrop-filter: saturate(600%) blur(30px);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    .loading{
      width: 85%;
      min-height: 500px;
      //原生带有白色bgc
      /deep/.el-loading-mask{
        background-color: rgba(255,255,255,0);
      }
    }
    .msearchResultContent{
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .fullSearch{
        color: var(--regular-text);
        font-size: 0.9rem;
        margin-bottom: 2rem;
      }
      /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ffbebc;//#c44444
        color: #FFF!important;
      }
      /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #ffbebc;
      }
      /deep/.el-pagination.is-background .btn-next{
        background-color: var(--btn-background);
      }
      /deep/.el-pagination.is-background .btn-prev{
        background-color: var(--btn-background);
      }
      /deep/.el-pagination.is-background .el-pager li{
        background-color: var(--btn-background);
      }
    }
  }
</style>