<template>
  <div class="rankingContainer">
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
    <div class="rankingContent">
      <el-container>
        <el-header>
          <div class="rankingHeader" v-if="!isloading">
            <a>排行榜</a>
          </div>
        </el-header>
        <el-container>
          <el-aside width="230px" v-if="!isloading">
            <a class="datePickerTitle">时间</a>
            <div class="datePicker">
              <el-date-picker
                v-model="datePickStart"
                type="date"
                placeholder="起始日期"
                value-format="yyyy-MM-dd"
                size="small">
              </el-date-picker>
              <el-date-picker
                v-model="datePickEnd"
                type="date"
                placeholder="终止日期"
                value-format="yyyy-MM-dd"
                size="small">
              </el-date-picker>
              <el-button type="primary" style="width:60%" icon="el-icon-search" round @click="datePickBtn">确认搜索</el-button>
            </div>
          </el-aside>
          <el-main class="rankingMain" v-if="!this.rankingTotal && !isloading">
            <div class="nonePick">
              <i class="el-icon-s-promotion"></i>
              <div class="nonePickContant">
                <a style="lineHeight:1.8">该日期范围内暂无符合条件的作品哦，请换个范围试试</a>
              </div>
            </div>
          </el-main>
          <el-main v-else class="rankingMain">
            <SearchCard v-for="rankingItem in rankingItems" :key="rankingItem.id"
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
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import SearchCard from '../components/SearchCard'
import axios from 'axios'
import throttle from 'lodash/throttle'
export default {
  name:'Ranking',
  components:{
    SearchCard
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
    datePickBtn:throttle(function(){
      if(this.datePickStart && this.datePickEnd){//防止未选择时null发到后台
        this.datePickStart = '>=' + this.datePickStart
        this.datePickEnd = '<' + this.datePickEnd
        this.searchdata.filter.air_date[0] = this.datePickStart
        this.searchdata.filter.air_date[1] = this.datePickEnd
      }
      else if(this.datePickStart || this.datePickEnd){
        this.$message({
          message: '请正确选择起始日期哦',
          type: 'warning'
        });
      }
      else{
        this.searchdata.filter.air_date[0] = this.datePickStart
        this.searchdata.filter.air_date[1] = this.datePickEnd
      }
      axios.post(`https://api.bgm.tv/v0/search/subjects?limit=10&offset=0`,this.searchdata).then(
        response => {
          this.rankingItems = response.data.data //data.data
          this.rankingTotal = response.data.total
        },
        error => {
          this.apiError = true
          this.errorMsg = error.message
          console.log(error.message)
        }
      )
    },2000),
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
  .rankingContainer{
    width: 75%;
    min-height: 1000px;
    padding-bottom: 5rem;
    margin-top: -7.4rem;
    border-radius: 0.75rem;
    background-color: #fff;
    backdrop-filter: saturate(600%) blur(30px);
    background-color: #fffc!important;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    .loading{
      width: 85%;
      min-height: 500px;
      //原生带有白色bgc
      /deep/.el-loading-mask{
        background-color: rgba(255,255,255,0);
        }
    }
    .rankingContent{
      width: 75%;
      min-height: 1000px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      .datePickerTitle{
        display: flex;
        justify-content: center;
        margin-top: 5rem;
        font-size: 1.5rem;
        color: #344767;
      }
      .datePicker{
        height: 150px;
        margin-top: 1rem;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        /deep/.el-input__inner{
          background-color: #fcfcfc;
        }
      }
      .rankingMain{
        padding-top: 5rem;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        .nonePick{
          height: 150px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          margin-top: 5rem;
          .el-icon-s-promotion{
            font-size: 5rem;
            color: #344767;
          }
          .nonePickContant{
            width: 70%;
            margin-top: 1rem;
            color: #344767;
            text-align: center;
          }
        }
      }
      .rankingHeader{
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin-top: 3rem;
        font-size: 1.8rem;
        color: #344767;
      }
    }
  }
  //样式穿透
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ffbebc;//#c44444
    color: #FFF!important;
  }
  /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #ffbebc;
  }
</style>