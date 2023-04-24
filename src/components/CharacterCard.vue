<template>
  <div class="chaContainer">
    <el-avatar class="chaAva" shape="square" :size="'large'" :src="img" :fit="'cover'"></el-avatar>
    <div class="Info">
      <div class="chaInfo">
        <a class="chaKey">{{relation}}</a>
        <a class="chaValue active" @click="toCharacter">{{name}}</a>
      </div>
      <div class="actorInfo">
        <a class="chaKey">配音</a>
        <a v-if='actor' class="chaValue active" @click="toPerson">{{actor}}</a>
        <a v-else class="chaValue">暂无信息</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'CharacterCard',
  // data(){
  //   return{
  //     isDark:false
  //   }
  // },
  props:{
    id:Number,
    actorId:Number,
    actor:String,
    img:String,
    name:String,
    relation:String
  },
  methods:{
    toCharacter(){
      if(this.$store.state.device === 'Mobile'){
        this.$router.push({
          path:'mcharacter',
          query:{
            id:this.id
          }
        })
      }
      else{
        this.$router.push({
          path:'character',
          query:{
            id:this.id
          }
        })
      }

    },
    toPerson(){
      if(this.actorId){
        if(this.$store.state.device === 'Mobile'){
          this.$router.push({
            path:'mperson',
            query:{
              actorId:this.actorId
            }
          })
        }
        else{
          this.$router.push({
            path:'person',
            query:{
              actorId:this.actorId
            }
          })
        }

      }
    }
  },
  // watch:{
  //   '$store.state.isDark':{
  //     handler:function(newValue){
  //       this.isDark = newValue
  //     }
  //   }
  // }
}
</script>

<style scoped lang='scss'>
.chaContainer{
  width: 155px;
  height: 50px;
  margin: 1rem 0 1rem 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  // justify-content: space-around;
  //样式穿透，使头像填充整个容器
  /deep/.chaAva>img{
    display: block;
    // height: 100%;
    width: 100%;
}
  .Info{
    margin-left: 0.5rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    .chaKey{
      color: #999999;
      font-size: 0.6rem;
    }
    .chaValue{
      margin-left: 0.3rem;
      color: #666666;
      font-size: 0.6rem;
    }
    .active:hover{
      cursor: pointer;
    }
  }
}
@media screen and(max-width: 420px){
  .chaContainer{
  width: 120px;
  }
}
</style>>