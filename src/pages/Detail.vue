<template>
  <div class="detailContainer">
    <div class="detailContent">
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
      <el-container v-else>
        <!-- marginTop写法 -->
        <el-header :style="{marginTop:'2rem'}"><a class="title">{{item.name_cn?item.name_cn:item.name}}</a></el-header> <!-- 部分作品中文名为空 -->
        <el-container>
          <el-aside width='350px' class="detailAside">
            <div class="platform">
              <a>{{item.platform}}</a>
            </div>
            <!-- 图 -->
            <div class="block imgContainer">
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
            <div class="player" style="padding:10px" shadow="never">
              <a class="playerTitle">播放源:</a>
              <el-button class="findplayer" round plain size="mini" :loading="findPlayerLoading" v-show="findShow" @click="findPlayer">查找播放源</el-button>
              <div class="playerResource" v-show="!findShow">
                <a v-show="isbili" :href="bilisrc" style="marginRight:0.3rem">
                  <img src='../assets/bilibili.svg'>
                </a>
                <a v-show="isacfun" :href="acfunsrc" style="marginRight:0.3rem">
                  <img src='../assets/acfun.svg'>
                </a>
                <a v-show="iswetv" :href="wetvsrc" style="marginRight:0.3rem">
                  <img src='../assets/wetv.svg'>
                </a>
                <a v-show="isiqiyi" :href="iqiyisrc" style="marginRight:0.3rem">
                  <img src='../assets/iqiyi.svg'>
                </a>
                <a v-show="isyouku" :href="youkusrc" style="marginRight:0.3rem">
                  <img src='../assets/youku.svg'>
                </a>
              </div>
              <div class="notfound" v-show="notfound"><a>未找到播放源</a></div>
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

          <el-main class="detailMain">
            <!-- 评分 -->
            <el-card class="rating" shadow="never">
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
                <a style='marginRight:0.6rem'>{{item.rating.total}}评分</a>
                <a style='marginRight:0.6rem'>{{item.collection.wish}}想看</a>
                <a style='marginRight:0.6rem'>{{item.collection.collect}}看过</a>
                <a style='marginRight:0.6rem'>{{item.collection.doing}}在看</a>
                <a style='marginRight:0.6rem'>{{item.collection.on_hold}}搁置</a>
                <a style='marginRight:0.6rem'>{{item.collection.dropped}}抛弃</a>
              </div>
            </el-card>
            <el-card class="box-card summary" shadow="never">
              <a v-if="item.summary" style="padding:1rem 1.1rem 1rem 1.1rem;display:block;">{{item.summary}}</a>
              <a v-else>暂无剧集简介...</a>
            </el-card>
            <!-- Tags -->
            <el-card class="tagContainer">
              <a class="tagTitle" v-if="item.tags.length > 0">大家把{{item.name_cn?item.name_cn:item.name}}标注为：</a>
              <a class="tagTitle" v-else>该作品还没有标签</a>
              <el-tag class="tag" v-for='tag in item.tags' :key="tag.id" type="info" @click="handleTag(tag.name)">
                <a class="tagName">{{tag.name}}</a>
                <a class="tagCount">{{tag.count}}</a>
                </el-tag>
            </el-card>
            <!-- character -->
            <el-card class="charactersContainer">
              <a class="charactersTitle">角色介绍</a>
              <div class="loading" style="min-height:100px" v-if="this.isChaLoading" v-loading='this.isChaLoading' element-loading-text="正在加载中...请稍候"></div>
              <!-- 部分作品未收录角色信息 -->
              <div v-else-if='sliceCha.length>0' class="charactersContent">
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
            <!-- person -->
            <el-card class="charactersContainer">
              <a class="charactersTitle">制作成员</a>
              <div class="loading" style="min-height:100px" v-if="this.isPersonLoading" v-loading='this.isPersonLoading' element-loading-text="正在加载中...请稍候"></div>
              <div v-else-if='persons.length>0' class="charactersContent">
                <PersonCard v-for='person in slicePerson' :key='person.id'
                  :id='person.id'
                  :img='person.images.grid'
                  :name='person.name'
                  :relation='person.relation'
                />
                <el-button size="mini" type="text" @click="personToggle" class="Toggle" v-if="personToggleBtn">
                  {{ isPersonToggle?'收起':'展开' }}
                  <i class="el-icon--right " :class="isPersonToggle?'el-icon-arrow-up':'el-icon-arrow-down' " />
                </el-button>
              </div>
              <div v-else class="charactersContent">
                暂无制作成员信息
              </div>
            </el-card>
            <!-- relation -->
            <el-card class="relationsContainer">
              <a class="relationsTitle">相关条目</a>
              <div class="loading" style="min-height:100px" v-if="this.isRelationLoading" v-loading='this.isRelationLoading' element-loading-text="正在加载中...请稍候"></div>
              <div v-else-if='relations.length>0' class="relationsContent">
                <GridCard v-for='relation in sliceRelation' :key='relation.id'
                  :id='relation.id'
                  :img='relation.images.grid'
                  :name='relation.name'
                  :name_cn='relation.name_cn'
                  :relation='relation.relation'
                />
                <el-button size="mini" type="text" @click="relationToggle" class="Toggle" v-if="relationToggleBtn">
                  {{isRelationToggle?'收起':'展开'}}
                  <i class="el-icon--right" :class="isChaToggle?'el-icon-arrow-up':'el-icon-arrow-down' " />
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
import CharacterCard from '../components/CharacterCard'
import PersonCard from '../components/PersonCard'
import GridCard from '../components/GridCard'
import { nanoid } from 'nanoid'
import axios from 'axios'
export default {
  name:'Detail',
  data(){
    return {
      item:[],
      characters:[],
      persons:[],
      relations:[],
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
      isChaLoading:true,
      isPersonLoading:true,
      isRelationLoading:true,
      isChaToggle:false,
      chaToggleBtn:false,
      chaMax:15,
      isRelationToggle:false,
      relationToggleBtn:false,
      relationMax:16,
      isPersonToggle:false,
      personToggleBtn:false,
      personMax:15,
    }
  },
  components:{
    CharacterCard,
    PersonCard,
    GridCard
  },
  methods:{
    findPlayer(){
      this.findPlayerLoading = true
      // let catalog = this.item.id/1000
      // console.log(catalog)
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
        path:'searchresult',
        query:{
          tagValue:value
        }
      })
    },
    chaToggle(){
      this.isChaToggle = !this.isChaToggle
      this.isChaToggle === false ? this.chaMax = 15 : this.chaMax = 99999
    },
    personToggle(){
      this.isPersonToggle = !this.isPersonToggle
      this.isPersonToggle === false ? this.personMax = 15 : this.personMax = 99999
    },
    relationToggle(){
      this.isRelationToggle = !this.isRelationToggle
      this.isRelationToggle === false ? this.relationMax = 16 : this.relationMax = 99999
    }
  },
  computed:{
    sliceCha(){
      if(this.characters === '' || this.characters === undefined){
        return this.characters
      }
      else if(this.characters.length > this.chaMax){
        return this.characters.slice(0,this.chaMax)
      }
      return this.characters
    },
    slicePerson(){
      if(this.persons === '' || this.persons === undefined){
        return this.persons
      }
      else if(this.persons.length > this.personMax){
        return this.persons.slice(0,this.personMax)
      }
      return this.persons
    },
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
        path:'mdetail',
        query:{
          id:this.$route.query.id
        }
      })
    }
  },
  created(){
    this.isDark = JSON.parse(localStorage.getItem('isDark'))
    //剧集信息
    axios.get(`https://api.bgm.tv/v0/subjects/${this.$route.query.id}`).then(//不用跨域http://localhost:8080/api/v0/subjects/${this.$route.query.id}
      response => {
        this.item = response.data
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
        // this.characters = this.characters.slice(0,41)//长篇作品人物过多，限制41
        this.isChaLoading = false
        if(this.characters.length > this.chaMax){
          this.chaToggleBtn = true
        }
      },
      error => {
        console.log(error.message)
      }
    )
    //staff
    axios.get(`https://api.bgm.tv/v0/subjects/${this.$route.query.id}/persons`).then(
      response => {
        this.persons = response.data.slice(0,150)
        this.isPersonLoading = false
        if(this.persons.length > this.personMax){
          this.personToggleBtn = true
        }
      },
      error => {
        console.log(error.message)
      }
    )
    //关联条目
    axios.get(`https://api.bgm.tv/v0/subjects/${this.$route.query.id}/subjects`).then(
      response => {
        this.relations = response.data
        this.isRelationLoading = false
        if(this.relations.length > this.relationMax){
          this.relationToggleBtn = true
        }
      },
      error => {
        console.log(error.message)
      }
    )
  }
}
</script>

<style scoped lang='scss'>
  .detailContainer{
    width: 75%;
    min-height: 1000px;
    min-width: 900px;
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
    .detailContent{
      // 减少信息显示宽度,符合阅读习惯
      width: 80%;
      min-height: 1000px;
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
    }
    .detailAside{
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
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
      .player{
        width: 250px;
        margin: 1.5rem 0 0rem 6rem;
        padding: 10px;
        border-radius: 0.75rem;
        background-color: var(--secondary-background);
        line-height: 1.8;
        // border: 1px solid #EBEEF5;
        display: flex;
        justify-content: flex-start;
        .playerTitle{
          color: #636e72;
          font-size: 0.9rem;
          margin-left: 10px;
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
      .infoTable{
        width: 250px;
        min-width: 100px;
        margin-left: 6rem;
        margin-top: 2rem;
      }
      /deep/.infoTable{
        background-color: var(--secondary-background);
      }
    }
    .detailMain{
      min-width: 600px;
      padding-top: 2rem;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      .rating{
        width: 70%;
        font-size: 1.3rem;
        margin-left: 5rem;
        border-radius: 0.75rem;
        background-color: rgba(252, 252, 252, 0);
        color: var(--primary-text);
        .collection{
          // background-color: #000000;
          // display: flex;
          // justify-content:space-between;
          margin-top: 0.5rem;
          color: #636e72;
          font-size: 0.6rem;
        }
      }
      .summary{
        width: 70%;
        margin: 1.5rem 0 2rem 5rem;
        border-radius: 0.75rem;
        background-color: var(--secondary-background);
        line-height: 1.8;
        color: var(--primary-text);
      }
      .tagContainer{
        width: 70%;
        margin: 0 0 3rem 5rem;
        border-radius: 0.75rem;
        // background-color: #fafafa;
        background-color: var(--secondary-background);
        .tagTitle{
          display: block;
          margin-bottom: 0.6rem;
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
        width: 70%;
        margin: 0 0 3rem 5rem;
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
          justify-content: flex-start;
        }
        .Toggle{
          width: 100%;
        }
      }
      .relationsContainer{
        width: 70%;
        margin: 0 0 3rem 5rem;
        border-radius: 0.75rem;
        // background-color: #fafafa;
        background-color: var(--secondary-background);
        .relationsTitle{
          display: block;
          margin-bottom: 0.6rem;
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