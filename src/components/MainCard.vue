<template>
  <div @click="toDetail" class="cardItem">
    <div class="imgContainer">
      <el-image
        class="itemImg"
        :src='img'
        :fit="'fill'"
      >
      <div class="alt" slot="error">
        <i class="el-icon-picture-outline"></i>
        <a style="fontSize:1rem">暂无图片</a>
      </div>
      <div class="alt" slot="placeholder">
        <i class="el-icon-loading"></i>
        <a style="fontSize:0.8rem">加载中...</a>
      </div>
      </el-image>
    </div>
    <div class="title">
      <a>{{name}}</a>
    </div>
    <div class="doing">
      <!-- 部分item没有doing属性 -->
      <a v-if="collection.doing!==0">{{collection.doing}}人在看</a>
      <a v-else>暂时没人在看哦</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainCard',
  data(){
    return{
      metaData:[]
    }
  },
  props:{
    id:Number,
    name:String,
    img:String,
    collection:Object,
  },
  methods:{
    toDetail(){
      this.$router.push({
        path:'detail',
        query:{
          id:this.id
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
  .cardItem{
    width: 250px;
    height: 400px;
    margin-left: 3rem;
    margin-right: 3rem;
    margin-top: 4rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    // background-color: #ff0000;
    border-radius: 0.5rem;
    cursor: pointer;
    .imgContainer{
      width: 250px;
      height: 352px;
      border-radius: 0.5rem;
      box-shadow: 0 25px 20px -21px rgba(0, 0, 0 ,0.5);
      transition: .2s ease-out;
      .itemImg{
        width: 100%;
        height: 352px;
        border-radius: 0.5rem;
        background-color: #f5f4f4;
        overflow: hidden;
        display: flex;
        justify-content:space-around;
        .alt{
          height: 30px;
          display: flex;
          flex-flow: column nowrap;
          justify-content:flex-start;
          align-items: center;
          margin: auto 0;
          font-size: 1.8rem;
          color: #909399;
        }
      }
    }
    .imgContainer:hover{
      transform: perspective(999px) rotateX(7deg) translate3d(0,-14px,15px);
    }
    .title{
      height: 11%;
      display: flex;
      align-items: center;
      margin-top: 1rem;
      margin-left: 0.6rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: #344767;
    }
    .doing{
      margin-left: 0.6rem;
      margin-top: 0.7rem;
      font-size: 0.8rem;
      color: #7b809a;
    }
  }
</style>
