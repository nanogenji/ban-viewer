<template>
  <div class="tagsContainer">
    <div class="tagsContent">
      <el-card class="tagsCard">
        <a class="TagsTitle"><i class="el-icon-collection-tag"></i> 动画标签</a>
        <el-tag class="tag" v-hammer:tap="(evnet)=> handleTag(evnet,2)">TV</el-tag>
        <el-tag class="tag" v-hammer:tap="(evnet)=> handleTag(evnet,2)">剧场版</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">搞笑</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">原创</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">小说改</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">漫改</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">OVA</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">校园</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">治愈</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">热血</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">科幻</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">京阿尼</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">奇幻</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">游戏改</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">童年</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">日常</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">SUNRISE</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">BONES</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">萝卜</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">吉卜力</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">音乐</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">催泪</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">JUMP</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">Type-Moon</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">ufotable</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">宫崎骏</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,2)">今敏</el-tag>
      </el-card>
      <el-card class="tagsCard">
        <a class="TagsTitle"><i class="el-icon-collection-tag"></i> 音乐标签</a>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">OST</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">ED</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">OP</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">东方</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">Vocaloid</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">中国</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">古风</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">drama</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">single</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">动画</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">梶浦由记</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">EVA</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">OPED</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">μ's</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">CLANNAD</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">电子</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">治愈</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">童年</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">Punk</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">Rock</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">久石让</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">坂本龙一</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">Billboard</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">Pop</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">Sony</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">广播剧</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">插入曲</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">key</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">神曲</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">音乐</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">专辑</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">KTV</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">摇滚</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">主题曲</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">2016</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,3)">原声</el-tag>
      </el-card>
      <el-card class="tagsCard">
        <a class="TagsTitle"><i class="el-icon-collection-tag"></i> 漫画标签</a>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">漫画</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">轻小说</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">校园</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">漫画系列</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">已完结</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">搞笑</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">奇幻</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">科幻</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">集英社</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">奇幻</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">穿越</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">冒险</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">系列</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">校园</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">治愈</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">热血</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">单行本</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">童年</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">日常</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">中国</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">小学馆</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">悬疑</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,1)">短篇</el-tag>
      </el-card>
      <el-card class="tagsCard">
        <a class="TagsTitle"><i class="el-icon-collection-tag"></i> 游戏标签</a>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">PC</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">RPG</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">ACT</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">PSP</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">PS4</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">任天堂</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">FPS</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">Switch</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">科幻</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">热血</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">电波</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">悬疑</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">RTS</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">解谜</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">NS</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">IOS</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">3DS</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">Android</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">童年</el-tag>
        <el-tag class="tag" v-hammer:tap="(event)=> handleTag(event,4)">GBA</el-tag>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name:'mTags',
  data(){
    return{
      TagForm: {
        type: 2,
        tag: ''
      },
      rules: {
        tag: [
          { required: true, message: '搜索标签不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  methods:{
    handleTag(value,type) {
      this.$router.push({
        path:'msearchresult',
        query:{
          tagValue:value.target.innerText,
          type
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .tagsContainer{
    width: 100%;
    min-height: 700px;
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
    .tagsContent{
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .tagsCard{
        width: 90%;
        margin: 3rem 0 0 0;
        border-radius: 0.75rem;
        background-color: var(--secondary-background);
        line-height: 1.8;
        .TagsTitle{
          display: block;
          margin-left: 1rem;
          margin-bottom: 1rem;
          color: var(--primary-text);
        }
        .tag{
          margin: 0.5rem;
          border-radius: 0.5rem;
          background-color: var(--btn-background);
          color: #636e72;
        }
        .tag:hover{
          cursor: pointer;
        }
      }
    }
  }
</style>