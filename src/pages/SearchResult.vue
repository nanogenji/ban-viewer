<template>
  <div class="searchResContainer">
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
    <div v-if="!this.searchResTotal && !isloading">
      <div class="nonePick">
        <i class="el-icon-s-promotion"></i>
        <div class="nonePickContant">
          <a style="lineHeight:1.8">未搜索到符合条件的作品</a>
        </div>
      </div>
    </div>
    <div class="searchResContent" v-if="!isloading && this.searchResTotal">
      <el-container>
        <el-aside class="searchResAside" width="200px">
          <el-menu
            @select="handleSelect"
            :default-active="String(this.searchdata.filter.type[0])"
            class="el-menu-vertical-demo"
            active-text-color="#ff8b88">
            <el-menu-item index="2">
              <i class="el-icon-film"></i>
              <span slot="title">anime</span>
            </el-menu-item>
            <el-menu-item index="1">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">books</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-headset"></i>
              <span slot="title">music</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-coordinate"></i>
              <span slot="title">game</span>
            </el-menu-item>
          </el-menu>
          <!--  -->
          <a class="datePickerTitle">日期筛选</a>
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
            <el-button class="datePickerBtn" size="samll" round @click="datePickBtn">确定</el-button>
          </div>
            <!--  -->
        </el-aside>
        <el-main class="searchResMain">
          <SearchCard v-for="searchResItem in searchResItems" :key="searchResItem.id"
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
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import SearchCard from '../components/SearchCard'
import axios from 'axios'
import throttle from 'lodash/throttle'
export default {
  name:'SearchResult',
  components:{
    SearchCard
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
    //获取nav类别并重新搜索
    handleSelect(key) {
      if(this.searchdata.filter.type[0] !== Number(key)){
        this.currentPage = 1
        this.searchdata.filter.type[0] = Number(key)//转换类型
        this.searchdata.keyword = this.$route.query.inputValue
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
      }
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
      window.scrollTo({ top: 480, behavior: 'smooth' });
    },
    datePickBtn:throttle(function(){
      if(this.datePickStart && this.datePickEnd){//防止未选择时null发到后台
        if(this.datePickStart.substr(0,2) === '>=' && this.datePickEnd.substr(0,1) === '<'){//重复点击，联动type
          this.searchdata.filter.air_date[0] = this.datePickStart
          this.searchdata.filter.air_date[1] = this.datePickEnd
        }
        else{//初次点击
          this.datePickStart = '>=' + this.datePickStart
          this.datePickEnd = '<' + this.datePickEnd
          this.searchdata.filter.air_date[0] = this.datePickStart
          this.searchdata.filter.air_date[1] = this.datePickEnd
        }
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
          this.searchResItems = response.data.data //data.data
          this.searchResTotal = response.data.total
        },
        error => {
          this.apiError = true
          this.errorMsg = error.message
          console.log(error.message)
        }
      )
    },2000)
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
        window.scrollTo({ top: 480, behavior: 'smooth' });
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
  //tag搜索$bus
  // mounted(){
  //   this.$bus.$on('sendTag',(data)=>{
  //     this.searchdata.filter.tag[0] = data
  //     this.searchdata.keyword = undefined//关键词与tag互斥
  //     console.log(this.searchdata)
  //     axios.post(`https://api.bgm.tv/v0/search/subjects?limit=10&offset=${(this.currentPage-1)*10}`,this.searchdata).then(
  //       response => {
  //         this.searchResItems = response.data.data //data.data
  //         this.searchResTotal = response.data.total
  //         this.isloading = false
  //         console.log(response.data)
  //       },
  //       error => {
  //         this.apiError = true
  //         this.errorMsg = error.message
  //         console.log(error.message)
  //       }
  //     )
  //   })
  // }
}
</script>

<style lang="scss" scoped>
  .searchResContainer{
    width: 75%;
    min-height: 1000px;
    padding-bottom: 5rem;
    margin-top: -7.4rem;
    border-radius: 0.75rem;
    backdrop-filter: saturate(600%) blur(30px);
    background-color: var(--regular-background);
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
    .nonePick{
      height: 150px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: center;
      margin-top: 8rem;
      .el-icon-s-promotion{
        font-size: 5rem;
        color: var(--primary-text);
      }
      .nonePickContant{
        width: 70%;
        margin-top: 1rem;
        color: var(--primary-text);
        text-align: center;
      }
    }
    .searchResContent{
      // 减少信息显示宽度,符合阅读习惯
      width: 75%;
      min-height: 1000px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      // align-items: center; //为啥detail不会挤在一起
      .el-menu-vertical-demo{
        border: none;
        margin-top: 160px;
        //修改侧边栏hover背景色
        .el-menu-item:hover{
          background-color: rgb(240, 240, 240) !important;
        }
      }
      .searchResAside{
        overflow: hidden;//隐藏aside底部滚动条
        .datePickerTitle{
          display: flex;
          justify-content: flex-start;
          margin-top: 8rem;
          margin-left: 1.3rem;
          font-size: 1.1rem;
          color: var(--primary-text);;
        }
        .el-menu-vertical-demo{
          background-color: var(--secondary-background);
          .el-menu-item{
            color: var(--primary-text);
          }
        }
        .datePicker{
          height: 150px;
          margin-top: 1rem;
          margin-left: 2.5rem;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          /deep/.el-input__inner{
            background-color: var(--regular-background);;
            border: none;
          }
          .datePickerBtn{
            width:50%;
            margin-right:7.4rem;
            color: var(--primary-text);;
            background-color: var(--secondary-background);
          }
        }
      }
      .searchResMain{
        // width: 100%;
        padding-top: 5rem;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
  //样式穿透？
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