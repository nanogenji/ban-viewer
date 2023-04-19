<template>
  <div class="mRankingContainer">
    <div class="loading" v-if="this.rankingItems.length == []" v-loading='true' element-loading-text="正在加载中...请稍候"></div>
    <div class="loading" v-else-if="this.apiError">
      <el-alert
        title="加载错误...请稍后再试"
        type="error"
        :description="'错误代码：'+this.errorMsg"
        show-icon
        style="marginTop:5rem">
      </el-alert>
    </div>
    <div class="mRankingContent" v-else>
      <mSearchCard v-for="rankingItem in rankingItems" :key="rankingItem.id"
      :id='rankingItem.id'
      :date='rankingItem.date'
      :img='rankingItem.image'
      :name='rankingItem.name'
      :nameCN='rankingItem.name_cn'
      :rank='rankingItem.rank'
      :score='rankingItem.score'
      :tags='rankingItem.tags'
      :type='rankingItem.type'
      />
      <!-- vif 让分页器在未获取到数据时不显示 -->
      <el-pagination
      v-if="rankingTotal"
      background
      layout="prev, pager, next"
      :page-size="10"
      :total="this.rankingTotal"
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
  name:'mRanking',
  components:{
    mSearchCard
  },
  data(){
    return{
      rankingItems:0,
      rankingTotal:0,
      currentPage:1,
      type:0,
      apiError:false,
      errorMsg:'',
      isloading:true,
      datePickStart:'',
      datePickEnd:'',
      datePick:'',
      searchdata:{
        // "keyword": "string",
        "sort": "rank",
        "filter": {
          "type": [
            2
          ],
          "air_date": [
          ],
          "rank": [
            ">=1",
            "<=50"
          ],
        }
      }
    }
  },
  methods:{
    handleCurrentChange(val){
      this.currentPage = val
      axios.post(`https://api.bgm.tv/v0/search/subjects?limit=10&offset=${(this.currentPage-1)*10}`,this.searchdata).then(
        response => {
          this.rankingItems = response.data.data
          this.rankingTotal = response.data.total //获取结果总数
        },
        error => {
          this.apiError = true
          this.errorMsg = error.message
          console.log(error.message)
        }
      )
      window.scrollTo({ top: 480, behavior: 'smooth' });
    },
  },
  watch:{
    //监听分类,实现反复进入
    '$route.query.type':{
      handler:function(){
        location.reload();
      },
    },
  },
  created(){
    this.type = Number(this.$route.query.type)
    this.searchdata.filter.type[0] = Number(this.$route.query.type)
    axios.post(`https://api.bgm.tv/v0/search/subjects?limit=10&offset=${(this.currentPage-1)*10}`,this.searchdata).then(
      response => {
        this.rankingItems = response.data.data //data.data
        this.rankingTotal = response.data.total
        for (let i = 0; i < this.rankingItems.length; i++) {
          this.rankingItems[i].type = this.type //添加type属性
        }
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
  .mRankingContainer{
    width: 100%;
    min-height: 800px;
    margin-top: -2rem;
    border-radius: 0.75rem;
    padding-bottom: 3rem;
    padding-top: 3rem;
    background-color: var(--regular-background);
    backdrop-filter: saturate(600%) blur(30px);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    .mRankingContent{
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
    }
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
</style>