<template>
  <div class="personContainer">
    <div class="personContent">
      <div class="loading" v-if="this.isLoading" v-loading='true' element-loading-text="正在加载中...请稍候"></div>
      <div class="loading" v-else-if="this.apiError">
        <el-alert
          title="加载错误...请稍后再试"
          type="error"
          :description="'错误代码：'+this.errorMsg"
          show-icon
          style="marginTop:5rem">
        </el-alert>
      </div>
      <el-container v-else>
        <el-header :style="{marginTop:'2rem'}"><a class="title">{{this.name_cn?this.name_cn:item.name}}</a></el-header><!-- 部分作品中文名为空 -->
        <el-container>
          <el-aside width='350px' class="personAside">
            <div class="platform">
              <a>{{item.platform}}</a>
            </div>
            <!-- 图 -->
            <div class="block imgContainer">
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
          </el-aside>
          <el-main class="personMain">
            <el-card class="summary" shadow="never">
              <a v-if="item.summary">{{item.summary}}</a>
              <a v-else>暂无角色简介...</a>
              <a class="translateIcon" @click="translate">
                <img src='../assets/translate.svg'>
              </a>
              <div class="translate" v-if="isTrans">
                <el-divider></el-divider>
                <a>{{this.translatedText}}</a>
              </div>
            </el-card>
            <el-card class="relationsContainer">
              <a class="relationsTitle">参演条目</a>
              <div class="loading" style="min-height:100px" v-if="this.isRelationLoading" v-loading='this.isRelationLoading' element-loading-text="正在加载中...请稍候"></div>
              <div v-else-if='relations.length>0' class="relationsContent">
                <GridCard v-for='relation in sliceRelation' :key='relation.id'
                  :id='relation.id'
                  :img='relation.image'
                  :name='relation.name'
                  :name_cn='relation.name_cn'
                  :relation='relation.relation'
                />
                <el-button size="mini" type="text" @click="relationToggle" class="Toggle" v-if="relationToggleBtn">
                  {{isRelationToggle?'收起':'展开'}}
                  <i class="el-icon--right" :class="isRelationToggle?'el-icon-arrow-up':'el-icon-arrow-down' " />
                </el-button>
              </div>
              <div v-else class="relationsContent">
                暂无相关条目信息
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GridCard from '../components/GridCard'
export default {
  name:'Person',
  data(){
    return {
      item:[],
      isLoading:true,
      isRelationLoading:true,
      relations:[],
      nickname:[],
      name_cn:'',
      apiError:false,
      errorMsg:'',
      isRelationToggle:false,
      relationToggleBtn:false,
      relationMax:16,
      isTrans:false,
      translatedText:'',
      translatedata:{
        'q':'',
        'from':'auto',
        'to':'zh',
        'appid':'',
        'salt':'',
        'sign':''
      }
    }
  },
  components:{
    GridCard
  },
  methods:{
    //侧栏css
    cellStyle(){
      return 'background-color: var(--secondary-background)'
    },
    handleTag(value){
      this.$router.push({
        path:'searchresult',
        query:{
          tagValue:value
        }
      })
    },
    relationToggle(){
      this.isRelationToggle = !this.isRelationToggle
      this.isRelationToggle === false ? this.relationMax = 16 : this.relationMax = 99999
    },
    translate(){
      if(!this.isTrans && this.translatedText.length === 0){
        let sign = ''
        let appId = '20230427001658354'
        let key = 'BORIiVqIc6d4rWj6w4_D'
        let salt = parseInt(Math.random()*100000)
        let q = this.item.summary
        let str = appId + q + salt + key
        sign = this.$md5(str)
        this.translatedata.q = q
        this.translatedata.appid = appId
        this.translatedata.salt = salt
        this.translatedata.sign = sign
        //q转为utf-8
        this.$jsonp(encodeURI(`https://fanyi-api.baidu.com/api/trans/vip/translate?q=${this.translatedata.q}&from=auto&to=zh&appid=${this.translatedata.appid}&salt=${this.translatedata.salt}&sign=${this.translatedata.sign}`), {
        }).then((res)=>{
          console.log(res)
          for(let i = 0;i < res.trans_result.length;i++){
            this.translatedText += res.trans_result[i].dst
          }
            console.log(this.translatedText)
        })
      }
      this.isTrans = !this.isTrans
    }
  },
  computed:{
    sliceRelation(){
      if(this.relations === '' || this.relations === undefined){
        return this.relations
      }
      else if(this.relations.length > this.relationMax){
        return this.relations.slice(0,this.relationMax)
      }
      return this.relations
    }
  },
  beforeCreate(){
    if(this.$store.state.device === 'Mobile'){
      this.$router.push({
        path:'mperson',
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
        this.isLoading = false
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
        this.isLoading = false
        this.apiError = true
        this.errorMsg = error.message
        console.log(error.message)
      }
    )
    //参演
    axios.get(`https://api.bgm.tv/v0/persons/${this.$route.query.actorId}/subjects`).then(
      response => {
        this.relations = response.data
        this.isRelationLoading = false
        if(this.relations.length > this.relationMax){
          this.relationToggleBtn = true
        }
      },
      error => {
        this.isRelationLoading = false
        console.log(error.message)
      }
    )
  }
}
</script>

<style scoped lang='scss'>
  .personContainer{
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
    .personContent{
      width: 80%;
      min-height: 1000px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      .loading{
        width: 85%;
        min-height: 500px;
        //原生带有白色bgc
        /deep/.el-loading-mask{
          background-color: rgba(255,255,255,0);
        }
      }
      .title{
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        margin-left: 80px;
        font-size: 26px;
        font-weight: 600;
        color: var(--pure);
      }
    }
    .personAside{
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      .platform{
        width: 250px;
        margin-left: 6rem;
        height: 2rem;
        color: #999999;
      }
      .imgContainer{
        margin-left: 6rem;
        /deep/.el-image__inner.el-image__preview {
          border-radius: 0.5rem;
        }
      }
      .nicknameContainer{
        width: 250px;
        margin-top: 2rem;
        margin-left: 6rem;
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
          width: 250px;
          min-width: 100px;
          // margin-left: 1rem;
        }
        /deep/.nicknameTable{
          background-color: var(--secondary-background);
        }
      }
      .infoTable{
        width: 250px;
        min-width: 100px;
        margin-left: 6rem;
        margin-top: 1.5rem;
      }
      /deep/.infoTable{
        background-color: var(--secondary-background);
      }

    }
    .personMain{
      padding-top: 2rem;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      .summary{
        width: 70%;
        margin: 1.5rem 0 2rem 5rem;
        border-radius: 0.75rem;
        background-color: var(--secondary-background);
        padding: 1rem 1.8rem 1rem 1.8rem;
        font-size: 15px;
        line-height: 1.8;
        color: var(--primary-text);
        .translateIcon{
          display:flex;
          width:95%;
          flex-flow: row-reverse nowrap;
        }
      }
      .relationsContainer{
        width: 70%;
        margin: 0 0 3rem 5rem;
        padding: 1rem 1.8rem;
        border-radius: 0.75rem;
        // background-color: #fafafa;
        background-color: var(--secondary-background);
        .relationsTitle{
          display: block;
          font-size: 1.1rem;
          color: var(--primary-text);
          margin-bottom: 1.2rem;
          padding-left: 10px;
        }
        .relationsContent{
          width: 100%;
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;
        }
        .Toggle{
          width: 100%;
        }
      }
    }
  }
</style>