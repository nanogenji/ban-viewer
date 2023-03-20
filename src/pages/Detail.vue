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
            <el-card class="charactersContainer">
              <a class="charactersTitle">角色介绍</a>
              <!-- 部分作品未收录角色信息 -->
              <div v-if='characters.length>0' class="charactersContent">
                <!-- cv信息可能不全 -->
                <CharacterCard v-for='character in characters' :key='character.id'
                  :id='character.id'
                  :actor="character.actors[0]?character.actors[0].name:''"
                  :actorId='character.actors[0]?character.actors[0].id:0'
                  :img='character.images.grid'
                  :name='character.name'
                  :relation='character.relation'
                />
              </div>
              <div v-else class="charactersContent">
                暂无相关角色信息
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
import { nanoid } from 'nanoid'
import axios from 'axios'
export default {
  name:'Detail',
  data(){
    return {
      item:[],
      characters:[],
      infoList:[],
      apiError:false,
      errorMsg:''
    }
  },
  components:{
    CharacterCard
  },
  methods:{
    //侧栏css
    cellStyle(){
      return 'background-color: #fcfcfc;'
    },
    handleTag(value){
      console.log(value)
      this.$router.push({
        path:'searchresult',
        query:{
          tagValue:value
        }
      })
    }
  },
  created(){
    //剧集信息
    axios.get(`https://api.bgm.tv/v0/subjects/${this.$route.query.id}`).then(//不用跨域http://localhost:8080/api/v0/subjects/${this.$route.query.id}
      response => {
        console.log(response)
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
        this.characters = this.characters.slice(0,41)//长篇作品人物过多，限制41
        console.log(this.characters)
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
      .infoTable{
        width: 250px;
        min-width: 100px;
        margin-left: 6rem;
        margin-top: 2rem;
      }
      /deep/.infoTable{
        background-color: #fcfcfc;
      }
    }
    .detailMain{
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
      }
      .summary{
        width: 70%;
        margin: 1.5rem 0 2rem 5rem;
        border-radius: 0.75rem;
        background-color: #fcfcfc;
        line-height: 1.8;
      }
      .tagContainer{
        width: 70%;
        margin: 0 0 3rem 5rem;
        border-radius: 0.75rem;
        background-color: #fafafa;
        .tagTitle{
          display: block;
          margin-bottom: 0.6rem;
        }
        .tag{
          margin: 0.4rem 0.6rem 0.4rem 0.2rem;
        }
        .tag:hover{
          cursor: pointer;
        }
        .tagName{
          color: #409eff;
        }
        .tagCount{
          margin-left: 0.2rem;
        }
      }
      .charactersContainer{
        width: 70%;
        margin: 0 0 3rem 5rem;
        border-radius: 0.75rem;
        background-color: #fafafa;
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
      }
    }
  }
</style>