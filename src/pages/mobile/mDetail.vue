<template>
  <div class="mdetailContainer">
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
    <div class="mdetailContent" v-else>
      <div class="mdetailHeader">
        <div class="imgContainer">
          <el-image
          :src='item.images.common'
          :fit="'fill'"
          :preview-src-list="[item.images.large]"
          >
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="headerRight">
          <div class="info">
            <div class="titleCN"><a>{{item.name_cn?item.name_cn:item.name}}</a></div>
            <div class="title"><a>{{item.name?item.name:''}}</a></div>
            <div class="platform"><a>{{item.platform}}</a></div>
            <div class="title"><a>{{item.date}}</a></div>
          </div>
          <div class="score">
            <a>{{item.rating.score.toString()}}</a>
          </div>
        </div>
      </div>
      <el-card class="rating">
        <div>
          <a>站内评分排名：
            <!-- 部分作品无排名 -->
            <a>{{item.rating.rank===0?'暂无排名':item.rating.rank}}</a>
          </a>
        </div>
        <el-rate
          v-model="item.rating.score"
          disabled
          show-score
          text-color="#ff9900"
          :max='Number(10)'
          :score-template="item.rating.score.toString()"
          >
        </el-rate>
        <div class="collection">
          <!-- <a style='marginRight:0.6rem'>{{item.rating.total}}评分</a> -->
          <a style='marginRight:0.6rem'>{{item.collection.wish}}想看</a>
          <a style='marginRight:0.6rem'>{{item.collection.collect}}看过</a>
          <a style='marginRight:0.6rem'>{{item.collection.doing}}在看</a>
          <a style='marginRight:0.6rem'>{{item.collection.on_hold}}搁置</a>
          <a style='marginRight:0.6rem'>{{item.collection.dropped}}抛弃</a>
        </div>
      </el-card>
      <div class="player">
        <a class="playerTitle">播放源:</a>
        <el-button class="findplayer" round plain size="mini" :loading="findPlayerLoading" v-show="findShow" @click="findPlayer">查找播放源</el-button>
        <div class="playerResource" v-show="!findShow">
          <a v-show="isbili" :href="bilisrc" style="marginRight:0.3rem">
            <img src='../../assets/bilibili.svg'>
          </a>
          <a v-show="isacfun" :href="acfunsrc" style="marginRight:0.3rem">
            <img src='../../assets/acfun.svg'>
          </a>
          <a v-show="iswetv" :href="wetvsrc" style="marginRight:0.3rem">
            <img src='../../assets/wetv.svg'>
          </a>
          <a v-show="isiqiyi" :href="iqiyisrc" style="marginRight:0.3rem">
            <img src='../../assets/iqiyi.svg'>
          </a>
          <a v-show="isyouku" :href="youkusrc" style="marginRight:0.3rem">
            <img src='../../assets/youku.svg'>
          </a>
        </div>
        <div class="notfound" v-show="notfound"><a>未找到播放源</a></div>
      </div>
      <el-card class="summary">
        <a v-if="item.summary" style="padding:1rem 1.1rem 1rem 1.1rem;display:block;">{{sliceStr}}</a>
        <a v-else>暂无剧集简介...</a>
        <el-button size="mini" type="text" @click="textToggle" class="Toggle" v-if="textToggleBtn">
          {{ isTextToggle?'收起':'展开' }}
          <i class="el-icon--right " :class="isTextToggle?'el-icon-arrow-up':'el-icon-arrow-down' " />
        </el-button>
      </el-card>
      <el-card class="tagContainer">
        <a class="tagTitle" v-if="item.tags.length > 0">大家把{{item.name_cn?item.name_cn:item.name}}标注为：</a>
        <a class="tagTitle" v-else>该作品还没有标签</a>
        <el-tag class="tag" v-for='tag in sliceTag' :key="tag.id" type="info" v-hammer:tap="(event)=>handleTag(tag.name)" size="mini">
          <a class="tagName">{{tag.name}}</a>
          <a class="tagCount">{{tag.count}}</a>
          </el-tag>
        <el-button size="mini" type="text" @click="tagToggle" class="Toggle" v-if="tagToggleBtn">
          {{ isTagToggle?'收起':'展开' }}
          <i class="el-icon--right " :class="isTagToggle?'el-icon-arrow-up':'el-icon-arrow-down' " />
        </el-button>
      </el-card>
      <el-card class="charactersContainer">
        <a class="charactersTitle">角色介绍</a>
        <!-- 部分作品未收录角色信息 -->
        <div v-if='characters.length>0' class="charactersContent">
          <!-- cv信息可能不全 -->
          <CharacterCard v-for='character in sliceCha' :key='character.id'
            :id='character.id'
            :actor="character.actors[0]?character.actors[0].name:''"
            :actorId='character.actors[0]?character.actors[0].id:0'
            :img='character.images.grid'
            :name='character.name'
            :relation='character.relation'
          />
          <el-button size="mini" type="text" @click="chaToggle" class="Toggle" v-if="chaToggleBtn">
            {{ isChaToggle?'收起':'展开' }}
            <i class="el-icon--right " :class="isChaToggle?'el-icon-arrow-up':'el-icon-arrow-down' " />
          </el-button>
        </div>
        <div v-else class="charactersContent">
          暂无相关角色信息
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import CharacterCard from '../../components/CharacterCard'
import { nanoid } from 'nanoid'
import axios from 'axios'
export default {
  name:'mDetail',
  data(){
    return {
      item:[],
      characters:[],
      infoList:[],
      apiError:false,
      errorMsg:'',
      isDark:false,
      findPlayerLoading:false,
      notfound:false,
      findShow:true,
      isbili:false,
      isacfun:false,
      iswetv:false,
      isiqiyi:false,
      isyouku:false,
      bilisrc:'',
      acfunsrc:'',
      wetvsrc:'',
      iqiyisrc:'',
      youkusrc:'',
      isTextToggle:false,
      textToggleBtn:false,
      textMax:120,
      isTagToggle:false,
      tagToggleBtn:false,
      tagMax:8,
      isChaToggle:false,
      chaToggleBtn:false,
      chaMax:8
    }
  },
  components:{
    CharacterCard
  },
  methods:{
    //查找播放源
    findPlayer(){
      this.findPlayerLoading = true
      axios.get(`https://cdn.jsdelivr.net/gh/ekibot/bangumi-onair/onair/${Math.floor(this.item.id/1000)}/${this.item.id}.json`).then(
        response => {
          this.findPlayerLoading = false
          console.log(response.data)
          this.findShow = false
          for(let i = 0;i < response.data.sites.length;i++){
            if(response.data.sites[i].site === 'iqiyi'){
              this.isiqiyi = true
              for(let j = 0;j < response.data.eps[0].sites.length;j++){
                if(response.data.eps[0].sites[j].site === 'iqiyi'){
                  this.iqiyisrc = response.data.eps[0].sites[j].url
                }
              }
            }
            else if(response.data.sites[i].site === 'qq'){
              this.iswetv = true
              for(let j = 0;j < response.data.eps[0].sites.length;j++){
                if(response.data.eps[0].sites[j].site === 'qq'){
                  this.wetvsrc = response.data.eps[0].sites[j].url
                }
              }
            }
            else if(response.data.sites[i].site === 'youku'){
              this.isyouku = true
              for(let j = 0;j < response.data.eps[0].sites.length;j++){
                if(response.data.eps[0].sites[j].site === 'youku'){
                  this.youkusrc = response.data.eps[0].sites[j].url
                }
              }
            }
            else if(response.data.sites[i].site === 'bilibili'){
              this.isbili = true
              for(let j = 0;j < response.data.eps[0].sites.length;j++){
                if(response.data.eps[0].sites[j].site === 'bilibili'){
                  this.bilisrc = response.data.eps[0].sites[j].url
                }
              }
            }
            else if(response.data.sites[i].site === 'acfun'){
              this.isacfun = true
              for(let j = 0;j < response.data.eps[0].sites.length;j++){
                if(response.data.eps[0].sites[j].site === 'acfun'){
                  this.acfunsrc = response.data.eps[0].sites[j].url
                }
              }
            }
          }
        },
        error => {
          this.findPlayerLoading = false
          this.findShow = false
          this.notfound = true
          console.log(error.message)
        }
      )
    },
    //侧栏css
    cellStyle(){
      return 'background-color: var(--secondary-background)'
    },
    handleTag(value){
      this.$router.push({
        path:'msearchresult',
        query:{
          tagValue:value
        }
      })
    },
    textToggle(){
      this.isTextToggle = !this.isTextToggle
      this.isTextToggle === false ? (this.textMax = 120):(this.textMax = 99999)
    },
    tagToggle(){
      this.isTagToggle = !this.isTagToggle
      this.isTagToggle === false ? (this.tagMax = 8):(this.tagMax = 99999)
    },
    chaToggle(){
      this.isChaToggle = !this.isChaToggle
      this.isChaToggle === false ? (this.chaMax = 8):(this.chaMax = 99999)
    }
  },
  computed:{
    sliceStr(){
      if(this.item.summary === '' || this.item.summary === undefined){
        return this.item.summary
      }
      else{
        if(this.item.summary.length > this.textMax){
          return this.item.summary.substring(0,this.textMax) + '...'
        }
        else{
        }
      }
      return this.item.summary
    },
    sliceTag(){
      if(this.item.tags === '' || this.item.tags === undefined){
        return this.item.tags
      }
      else{
        if(this.item.tags.length > this.tagMax){
          return this.item.tags.slice(0,this.tagMax)
        }
        else{
        }
      }
      return this.item.tags
    },
    sliceCha(){
      if(this.characters === '' || this.characters === undefined){
        return this.characters
      }
      else{
        if(this.characters.length > this.chaMax){
          return this.characters.slice(0,this.chaMax)
        }
        else{
        }
      }
      return this.characters
    },
  },
  beforeCreate(){
    if(this.$store.state.device === 'PC'){
      this.$router.push({
        path:'detail',
        query:{
          id:this.$route.query.id
        }
      })
    }
  },
  created(){
    this.isDark = JSON.parse(localStorage.getItem('isDark'))
    //剧集信息
    axios.get(`https://api.bgm.tv/v0/subjects/${this.$route.query.id}`).then(
      response => {
        this.item = response.data
        console.log(this.item)
        //过滤无效info，防止undefined
        for(let i=0;i<this.item.infobox.length;i++){
          // eslint-disable-next-line
          if(typeof(this.item.infobox[i].value) === 'object'){//别名
            this.item.infobox[i].value = this.item.name?this.item.name:'无'
          }
        }
        //tag加id
        for(let i=0;i<this.item.tags.length;i++){
          this.item.tags[i].id = nanoid(8)
        }
        //展开btn是否显示
        if(this.item.summary.length > this.textMax){
          this.textToggleBtn = true
        }
        if(this.item.tags.length > this.tagMax){
          this.tagToggleBtn = true
        }
      },
      error => {
        this.apiError = true
        this.errorMsg = error.message
        console.log(error.messgae)
      }
    )
    //角色信息
    axios.get(`https://api.bgm.tv/v0/subjects/${this.$route.query.id}/characters`).then(
      response => {
        this.characters = response.data
        this.characters = this.characters.slice(0,42)//长篇作品人物过多，限制42
        if(this.characters.length > this.chaMax){
          this.chaToggleBtn = true
        }
      },
      error => {
        console.log(error.message)
      }
    )
  }
}
</script>

<style lang="scss" scoped>
  .mdetailContainer{
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
    .mdetailContent{
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .mdetailHeader{
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        .imgContainer{
          width: 30%;
          height: 42%;
          min-width: 160px;
          min-height: 228px;
          margin-top: -2rem;
          border-radius: 0.5rem;
          background-color: var(--secondary-background);
          display: flex;
          justify-content: center;
          align-items: center;
          /deep/.el-image__inner.el-image__preview {
            border-radius: 0.5rem;
          }
        }
        .headerRight{
          width: 45%;
          margin-left: 2rem;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          .info{
            .titleCN{
              font-size: 20px;
              margin-top: 0.7rem;
              font-weight: 600;
              color: var(--pure);
            }
            .title{
              font-size: 16px;
              margin-top: 0.3rem;
              color: var(--regular-text);
            }
            .platform{
              font-size: 16px;
              margin-top: 0.3rem;
              color: var(--regular-text);
            }
          }
          .score{
            font-size: 22px;
            font-weight: 600;
            color: var(--primary-color);
          }
        }
      }
      .rating{
        width: 85%;
        border-radius: 0.75rem;
        margin-top: 2rem;
        font-size: 1rem;
        background-color: rgba(252, 252, 252, 0);
        color: var(--primary-text);
        .collection{
          font-size: 0.7rem;
        }
      }
      .player{
        width: 85%;
        padding: 20px 0;
        border-radius: 0.75rem;
        border: 1px solid #EBEEF5;
        background-color: var(--secondary-background);
        line-height: 1.5;
        margin-top: 2rem;
        // border: 1px solid #EBEEF5;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: flex-start;
        .playerTitle{
          color: #636e72;
          font-size: 0.9rem;
          margin-left: 20px;
          margin-top: 2px;
          text-align: center;
        }
        .playerResource{
          margin-left: 25px;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
        }
        .findplayer{
          border-radius:0.5rem;
          background-color:var(--secondary-background);
          margin-left: 3rem;
        }
        .notfound{
          margin-top: 0.2rem;
          font-size: 0.8rem;
          color: #636e72;

        }
      }
      .summary{
        width: 85%;
        // height: 150px;
        overflow: hidden;
        margin-top: 1.5rem;
        border-radius: 0.75rem;
        background-color: var(--secondary-background);
        line-height: 1.5;
        color: var(--primary-text);
        .Toggle{
          width: 100%;
        }
      }
      .tagContainer{
        width: 85%;
        margin-top: 2rem;
        border-radius: 0.75rem;
        // background-color: #fafafa;
        background-color: var(--secondary-background);
        .Toggle{
          width: 100%;
        }
        .tagTitle{
          display: block;
          margin-bottom: 0.6rem;
          font-size: 0.9rem;
          color: var(--primary-text);
        }
        .tag{
          margin: 0.4rem 0.6rem 0.4rem 0.2rem;
          border-radius: 0.5rem;
          background-color: var(--btn-background);
        }
        .tag:hover{
          cursor: pointer;
        }
        .tagName{
          // color: #409eff;
          color: #636e72;
          font-weight:600;
        }
        .tagCount{
          margin-left: 0.2rem;
        }
      }
      .charactersContainer{
        width: 85%;
        margin-top: 1.5rem;
        border-radius: 0.75rem;
        // background-color: #fafafa;
        background-color: var(--secondary-background);
        .charactersTitle{
          display: block;
          margin-bottom: 0.6rem;
        }
        .charactersContent{
          width: 100%;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;
        }
        .Toggle{
          width: 100%;
        }
      }
    }
  }
</style>