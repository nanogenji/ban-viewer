<template>
  <div class="mPersonContainer">
    <div class="loading" v-if="this.item.length == []" v-loading='true' element-loading-text="正在加载中...请稍候"></div>
    <div class="loading" v-else-if="this.apiError">
      <el-alert
        title="加载错误...请稍后再试"
        type="error"
        :description="'错误代码：'+this.errorMsg"
        show-icon
        style="marginTop:5rem">
      </el-alert>
    </div>
    <div class="mPersonContent" v-else>
      <div class="titleContainer">
        <a class="titleCN">{{this.name_cn?this.name_cn:item.name}}</a><!-- 部分作品中文名为空 -->
        <a class="title">{{this.name_cn?item.name:''}}</a>
      </div>
      <div class="platform">
        <a>{{item.platform}}</a>
      </div>
      <!-- 图 -->
      <div class="imgContainer">
        <el-image
        :src='item.images.medium'
        :fit="'fill'"
        :preview-src-list="[item.images.large]"
        >
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
        </el-image>
      </div>
      <el-card class="summary" shadow="never">
        <a v-if="item.summary">{{item.summary}}</a>
        <a v-else>暂无角色简介...</a>
      </el-card>
      <div v-if="this.nickname.length > 0" class="nicknameContainer">
        <div class="nicknameTitle">
          <a>别名</a>
        </div>
        <el-table
          :data="this.nickname"
          :show-header="false"
          :cell-style="cellStyle"
          :size="'small'"
          class="nicknameTable"
          >
          <el-table-column
            prop="v"
            label="value"
            width="180">
          </el-table-column>
        </el-table>
      </div>
      <!-- staff信息 -->
      <!-- cell-style设置背景色 -->
      <el-table
        :data="item.infobox"
        :show-header="false"
        :cell-style="cellStyle"
        :size="'small'"
        class="infoTable"
        >
        <el-table-column
          prop="key"
          label="key"
          width="70">
        </el-table-column>
        <el-table-column
          prop="value"
          label="value"
          width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'mCharacter',
  data(){
    return {
      item:[],
      characters:[],
      infoList:[],
      nickname:[],
      name_cn:'',
      apiError:false,
      errorMsg:''
    }
  },
  methods:{
    //侧栏css
    cellStyle(){
      return 'background-color: var(--secondary-background)'
    }
  },
  beforeCreate(){
    if(this.$store.state.device === 'PC'){
      this.$router.push({
        path:'person',
        query:{
          actorId:this.$route.query.actorId
        }
      })
    }
  },
  created(){
    //剧集信息
    axios.get(`https://api.bgm.tv/v0/persons/${this.$route.query.actorId}`).then(
      response => {
      this.item = response.data
        for(let i=0;i<this.item.infobox.length;i++){
          let del1 = null
          let del2 = null
          if(this.item.infobox[i].key === '别名'){
            this.nickname = this.item.infobox[i].value
            del1 = i
          }
          if(this.item.infobox[i].key === '简体中文名'){
            this.name_cn = this.item.infobox[i].value
            del2 = i
          }
          delete this.item.infobox[del1]
          delete this.item.infobox[del2]
        }
      },
      error => {
        this.apiError = true
        this.errorMsg = error.message
        console.log(error.messgae)
      }
    )
  }
}
</script>

<style scoped lang='scss'>
  .mPersonContainer{
    width: 100%;
    min-height: 800px;
    margin-top: -2rem;
    border-radius: 0.75rem;
    padding-bottom: 3rem;
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
    .mPersonContent{
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .titleContainer{
        margin-top: 2rem;
        margin-bottom: 1rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        .titleCN{
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
          font-size: 20px;
          font-weight: 600;
          color: var(--pure);
        }
        .title{
          margin-left: 0.7rem;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          color: var(--regular-text);
        }
      }
    }
      .platform{
        margin-left: 6rem;
        height: 2rem;
        color: #999999;
      }
      .imgContainer{
        /deep/.el-image__inner.el-image__preview {
          border-radius: 0.5rem;
        }
      }
      .nicknameContainer{
        margin-top: 2rem;
        display: flex;
        flex-flow: row nowrap;
        .nicknameTitle{
          width: 50px;
          line-height: 23px;
          font-size: 14px;
          padding: 0 10px 0 10px;
          margin-top: 0.5rem;
          color: #606266;
        }
        .nicknameTable{
          // min-width: 100px;
          // margin-left: 1rem;
          background-color: var(--secondary-background)!important;
        }
      }
      .infoTable{
        // min-width: 100px;
        margin-top: 1.5rem;
      }
      /deep/.el-table{
        width: auto;
      }
      .summary{
        width: 85%;
        margin-top: 1.5rem;
        border-radius: 0.75rem;
        background-color: var(--secondary-background);
        line-height: 1.5;
        color: var(--primary-text);
      }
  }
</style>