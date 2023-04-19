<template>
  <div class="mrecentlyContainer">
    <div class="loading" v-if="isloading" v-loading='true' element-loading-text="正在加载中...请稍候"></div>
    <div class="loading" v-else-if="this.apiError">
      <el-alert
        title="加载错误...请稍后再试"
        type="error"
        :description="'错误代码：'+this.errorMsg"
        show-icon
        style="marginTop:5rem">
      </el-alert>
    </div>
    <div v-else class="mrecentlyContent">
      <mSearchCard v-for="recentlyItem in recentlyItems" :key="recentlyItem.id"
      :id='recentlyItem.id'
      :date='recentlyItem.date'
      :img='recentlyItem.image'
      :name='recentlyItem.name'
      :nameCN='recentlyItem.name_cn'
      :rank='recentlyItem.rank'
      :score='recentlyItem.score'
      :tags='recentlyItem.tags'
      :type='recentlyItem.type'
      />
      <!-- vif 让分页器在未获取到数据时不显示 -->
      <el-pagination
        v-if="recentlyTotal"
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="this.recentlyTotal"
        :current-page='this.currentPage'
        @current-change='handleCurrentChange'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import mSearchCard from '../../components/mSearchCard'
export default {
  name:'Recently',
  components:{
    mSearchCard
  },
  data(){
    return{
      recentlyItems:0,
      recentlyTotal:0,
      currentPage:1,
      type:0,
      dateStart:'',
      dateEnd:'',
      apiError:false,
      errorMsg:'',
      isloading:true,
      searchdata:{
        "sort": "rank",
        "filter": {
          "type": [
            2
          ],
          "air_date": [
          ],
        }
      }
    }
  },
  methods:{
    //评分排序
    objArraySort(objArr, key) {
      let result = objArr.slice(0);
      return result.sort((a, b) => b[key] - a[key]);
    },
    getMonth() {
      let now = new Date();
      now = this.$moment(now).format("YYYY-MM-DD")
      return now
    },
    getlastMonth() {
      let now = new Date();
      // 当前月的日期
      let nowDate = now.getDate();
      let lastMonth = new Date(now.getTime());
      // 设置上一个月（这里不需要减1）
      lastMonth.setMonth(lastMonth.getMonth());
      // 设置为0，默认为当前月的最后一天
      lastMonth.setDate(0);
      // 上一个月的天数
      let daysOflastMonth = lastMonth.getDate();
      // 设置上一个月的日期，如果当前月的日期大于上个月的总天数，则为最后一天
      lastMonth.setDate(nowDate > daysOflastMonth ? daysOflastMonth : nowDate);
      lastMonth = this.$moment(lastMonth).format("YYYY-MM-DD")
      return lastMonth
    },
    handleCurrentChange(val){
      this.currentPage = val
      axios.post(`https://api.bgm.tv/v0/search/subjects?limit=10&offset=${(this.currentPage-1)*10}`,this.searchdata).then(
        response => {
          this.recentlyItems = response.data.data
          this.recentlyTotal = response.data.total//获取结果总数
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
    this.dateStart = '>=' + this.getlastMonth()
    this.dateEnd = '<' + this.getMonth()
    // this.dateStart = '>=' + this.getlastMonth().toLocaleDateString().split('/').join('-');
    // this.dateEnd = '<' + this.getMonth().toLocaleDateString().split('/').join('-');
    this.searchdata.filter.air_date[0] = this.dateStart
    this.searchdata.filter.air_date[1] = this.dateEnd
    this.type = Number(this.$route.query.type)
    this.searchdata.filter.type[0] = Number(this.$route.query.type)
    axios.post(`https://api.bgm.tv/v0/search/subjects?limit=10&offset=${(this.currentPage-1)*10}`,this.searchdata).then(
      response => {
        this.recentlyItems = this.objArraySort(response.data.data,'score')
        for (let i = 0; i < this.recentlyItems.length; i++) {
          this.recentlyItems[i].type= this.type// 添加type属性
        }
        this.recentlyTotal = response.data.total
        this.isloading = false
      },
      error => {
        this.apiError = true
        this.errorMsg = error.message
      }
    )
  }
}
</script>

<style lang="scss" scoped>
  .mrecentlyContainer{
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
    .loading{
      width: 85%;
      min-height: 500px;
      //原生带有白色bgc
      /deep/.el-loading-mask{
        background-color: rgba(255,255,255,0);
        }
    }
    .mrecentlyContent{
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
    }
  }
</style>