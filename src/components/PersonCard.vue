<template>
  <div class="personContainer">
    <el-image class="personAva" shape="square" :size="'large'" :src="img" :fit="'contain'" :preview-src-list="[img]">
      <div slot="error" class="imageSlot">
        <i class="el-icon-user"></i>
      </div>
    </el-image>
    <div class="Info">
      <div class="personInfo">
        <a class="personKey">名称</a>
        <a class="personValue active" @click="toPerson">{{name}}</a>
      </div>
      <div class="actorInfo">
        <a class="personKey">职责</a>
        <a v-if='relation' class="personValue">{{relation}}</a>
        <a v-else class="personValue">暂无信息</a>
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
    img:String,
    name:String,
    relation:String
  },
  methods:{
    toPerson(){
      if(this.$store.state.device === 'Mobile'){
        this.$router.push({
          path:'mperson',
          query:{
            actorId:this.id
          }
        })
      }
      else{
        this.$router.push({
          path:'person',
          query:{
            actorId:this.id
          }
        })
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
.personContainer{
  width: 155px;
  height: 50px;
  margin: 1rem 0 1rem 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  // justify-content: space-around;
  //样式穿透，使头像填充整个容器
  .personAva{
    width: 40px;
    height: 40px;
    display: flex;
    justify-content:space-around;
    align-items: center;
    .imageSlot{
      height: 20px;
      color: #909399;
      .el-icon-user{
      font-size: 1.5rem;
      }
    }
  }
//   /deep/.personAva>img{
//     display: block;
//     // height: 100%;
//     width: 100%;
// }
  .Info{
    margin-left: 0.5rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    .personInfo{
      width: 110px;
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .personKey{
      color: #999999;
      font-size: 0.6rem;
    }
    .personValue{
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
  .personContainer{
  width: 120px;
  }
}
</style>>