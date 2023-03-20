<template>
  <div class="searchCardContainer">
    <el-container>
      <el-aside width='120px' class="searchResAside">
        <div class="imgContainer">
          <el-image
            class="img"
            style="width: 90px; height: 125px"
            :src="img"
            :preview-src-list="[img]"
            :fit="'fill'">
          </el-image>
        </div>
      </el-aside>
      <el-main class="searchResMain">
        <div class="MainHeader">
          <div class="titleContainer" @click="toDetail">
            <a class="titleCN">{{nameCN.length?nameCN:name}}</a>
            <a v-if="nameCN.length < 10" class="title">{{name}}</a>
          </div>
          <el-tag
            :type="'warning'"
            effect="light">
          <a>{{rank?'排名 '+rank:'暂无排名'}}</a>
          </el-tag>
        </div>
        <div class="date">
          <a>放映时间：{{date}}</a>
        </div>
        <div class="tags">
          <el-tag v-for="tag in itemtags" :key="tag.id" class="tag" type="info" effect="plain" size="small" @click="handleTag(tag.name)">{{tag.name}}</el-tag>
        </div>
        <div class="score">
          <el-rate
            v-model="itemScore"
            disabled
            show-score
            text-color="#ff9900"
            :max='Number(10)'
            :score-template="itemScore.toString()">
          </el-rate>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name:'SearchCard',
  data(){
    return{
      itemtags:[],
      searchdata:{
        "keyword": "string",
        "sort": "rank",
        "filter": {
          "type": [
            2
          ],
          "tag": [
            's'
          ],
        }
      }
    }
  },
  props:{
    id:Number,
    date:String,
    img:String,
    name:String,
    nameCN:String,
    rank:Number,
    score:Number,
    tags:Array,
    type:Number
  },
  computed:{
    // itemScore(){
    //   return this.score?this.score:0;
    // }
    itemScore:{
      get(){
        return this.score?this.score:0
      },
      set(v){
        return v
      }
    }
  },
  methods:{
    toDetail(){
      this.$router.push({
        path:'detail',
        query:{
          id:this.id
        }
      })
    },
    handleTag(value){
      this.searchdata.filter.tag[0] = value
      if(this.$route.path !== '/searchresult'){
        this.$router.push({
        path:'searchresult',
        query:{
          tagValue:value,
          type:this.type
        }
      })
      }
      else{
        // this.$bus.$emit('sendTag',this.searchdata.filter.tag[0])
        this.$store.dispatch('getTag',this.searchdata.filter.tag[0])
      }
    }
  },
  created(){
    this.itemtags = this.tags.slice(0,7)
  }
}
</script>

<style lang="scss" scoped>
  .searchCardContainer{
    width: 90%;
    height: 150px;
    border-radius: 0.75rem;
    margin-bottom: 3rem;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    .searchResAside{
      height: 150px;
      .imgContainer{
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        .img{
          border-radius: 0.5rem;
        }
      }
    }
    .searchResMain{
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      .MainHeader{
        height: 30px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        .titleContainer{
          max-width: 90%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          font-size: 0.9rem;
          .titleCN{
            color: rgb(96, 129, 201);
          }
          .title{
            margin-left: 2rem;
            color: #bdbdbd;
          }
        }
        .titleContainer:hover{
          cursor: pointer;
        }
      }
      .date{
        height: 30px;
        font-size: 0.9rem;
      }
      .tags{
        height: 25px;
        margin-bottom: 0.5rem;
        overflow: hidden;
        .tag{
          margin-right: 0.6rem;
          margin-bottom: 0.1rem;
        }
        .tag:hover{
          cursor: pointer;
        }
      }
      .score{
        height: 30px;
      }
    }
  }
</style>>