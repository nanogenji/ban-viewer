<template>
  <div class="tagsContainer">
    <div class="tagsContent">
      <el-container>
        <el-header class="tagsHeader">
          热门标签
        </el-header>
        <el-container>
          <el-main class="tagsMain">
            <el-card class="tagsCard">
              <a class="TagsTitle"><i class="el-icon-collection-tag"></i> 动画标签</a>
              <el-tag class="tag" @click="handleTag($event,2)">TV</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">剧场版</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">搞笑</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">原创</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">小说改</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">漫改</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">OVA</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">校园</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">治愈</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">热血</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">科幻</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">京阿尼</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">奇幻</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">游戏改</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">童年</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">日常</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">SUNRISE</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">BONES</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">萝卜</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">吉卜力</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">音乐</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">催泪</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">JUMP</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">Type-Moon</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">ufotable</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">宫崎骏</el-tag>
              <el-tag class="tag" @click="handleTag($event,2)">今敏</el-tag>
            </el-card>
            <el-card class="tagsCard">
              <a class="TagsTitle"><i class="el-icon-collection-tag"></i> 音乐标签</a>
              <el-tag class="tag" @click="handleTag($event,3)">OST</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">ED</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">OP</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">东方</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">Vocaloid</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">中国</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">古风</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">drama</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">single</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">动画</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">梶浦由记</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">EVA</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">OPED</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">μ's</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">CLANNAD</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">电子</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">治愈</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">童年</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">Punk</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">Rock</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">久石让</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">坂本龙一</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">Billboard</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">Pop</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">Sony</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">广播剧</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">插入曲</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">key</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">神曲</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">音乐</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">专辑</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">KTV</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">摇滚</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">主题曲</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">2016</el-tag>
              <el-tag class="tag" @click="handleTag($event,3)">原声</el-tag>
            </el-card>
            <el-card class="tagsCard">
              <a class="TagsTitle"><i class="el-icon-collection-tag"></i> 漫画标签</a>
              <el-tag class="tag" @click="handleTag($event,1)">漫画</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">轻小说</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">校园</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">漫画系列</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">已完结</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">搞笑</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">奇幻</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">科幻</el-tag>
              <el-tag class="tag" @click="handleTag($event,1),1">集英社</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">奇幻</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">穿越</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">冒险</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">系列</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">校园</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">治愈</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">热血</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">单行本</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">童年</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">日常</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">中国</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">小学馆</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">悬疑</el-tag>
              <el-tag class="tag" @click="handleTag($event,1)">短篇</el-tag>
            </el-card>
            <el-card class="tagsCard">
              <a class="TagsTitle"><i class="el-icon-collection-tag"></i> 游戏标签</a>
              <el-tag class="tag" @click="handleTag($event,4)">PC</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">RPG</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">ACT</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">PSP</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">PS4</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">任天堂</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">FPS</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">Switch</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">科幻</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">热血</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">电波</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">悬疑</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">RTS</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">解谜</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">NS</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">IOS</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">3DS</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">Android</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">童年</el-tag>
              <el-tag class="tag" @click="handleTag($event,4)">GBA</el-tag>
            </el-card>
          </el-main>
          <el-aside width="320px">
            <div class="TagSearch">
              <div class="TagSearchHeader">
                <div class="TagSearchTitle">
                  <a>标签搜索</a>
                </div>
              </div>
              <el-form :model="TagForm" :rules="rules"  ref="TagForm" class="Tagform">
                <el-form-item label="分类">
                  <el-select v-model="TagForm.type">
                    <el-option label="动画" :value=2></el-option>
                    <el-option label="音乐" :value=3></el-option>
                    <el-option label="书籍" :value=1></el-option>
                    <el-option label="游戏" :value=4></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  prop="tag">
                  <el-input prefix-icon="el-icon-search" size="medium" v-model="TagForm.tag"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="medium" @click="submitForm('TagForm')">搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-aside>
        </el-container>
    </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name:'Tags',
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
        path:'searchresult',
        query:{
          tagValue:value.target.innerText,
          type
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({
          path:'searchresult',
          query:{
            tagValue:this.TagForm.tag,
            type:this.TagForm.type
          }
      })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
  .tagsContainer{
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
    .tagsContent{
      width: 75%;
      min-height: 1000px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      .tagsHeader{
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin-top: 3rem;
        font-size: 1.8rem;
        color: #344767;
      }
      .tagsMain{
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        .tagsCard{
          width: 70%;
          margin: 3rem 0 0 0;
          border-radius: 0.75rem;
          background-color: #fcfcfc;
          line-height: 1.8;
          .TagsTitle{
            display: block;
            margin-left: 1rem;
            margin-bottom: 1rem;
            color: #344767;
          }
          .tag{
            margin: 0.5rem;
          }
          .tag:hover{
            cursor: pointer;
          }
        }
      }
      .TagSearch{
        width: 80%;
        margin-top: 4rem;
        // padding: 2rem;
        border-color: #000000;
        background-color: #fcfcfc;
        border-radius: 0.5rem;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .TagSearchHeader{
          width: 100%;
          height: 50px;
          border-radius: 0.75rem 0.75rem 0 0;
          background: linear-gradient(0deg,#f3f3f3,#eeeeee);
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          .TagSearchTitle{
            margin-left: 1rem;
            font-size: 0.9rem;
            color: #344767;
          }
        }
        .Tagform{
          padding: 0.6rem 1.4rem 0.6rem 1.4rem;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
        }
      }
    }
  }
</style>