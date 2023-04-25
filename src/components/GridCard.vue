<template>
  <div class="gridContainer" @click="toDetail">
    <el-image
      class="gridImg"
      :src="img"
      fit="cover">
      <div slot="error" class="imageSlot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div class="gridCover">
      <div class="titleContainer">
        <a class="title">{{name_cn?name_cn:name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'GridCard',
  props:{
    id:Number,
    img:String,
    name:String,
    name_cn:String,
    relation:String
  },
  methods:{
    toDetail(){
      this.$router.push({
        path:'detail',
        query:{
          id:this.id
        }
      })
      location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
  .gridContainer{
    position: relative;
    width: 100px;
    height: 120px;
    // background-color: #000000;
    margin: 0 10px;
    .gridImg{
      width: 100px;
      height: 100px;
      border-radius: 0.5rem;
      display: flex;
      justify-content:space-around;
      align-items: center;
      background-color: #f5f7fa;
      .imageSlot{
        height: 20px;
        .el-icon-picture-outline{
          color: #909399;
          font-size: 1.7rem;
        }
      }
    }
    .gridCover{
      top: 0;
      width: 100px;
      height: 100px;
      position: absolute;
      // background-color: #000000;
      border-radius: 0.5rem;
      opacity: 0;
      transition: all 0.3s;
      display: flex;
      flex-flow: column-reverse nowrap;
      align-items: center;
      background-image: linear-gradient(transparent 20%,rgba(0,0,0,0.1) 40%,rgba(0,0,0,0.4) 60%,rgba(0,0,0,0.6) 80%);
      .titleContainer{
        width: 90px;
        height: 38px;
        display: flex;
        flex-flow: column-reverse nowrap;
        .title{
          margin-bottom: 4px;
          font-size: 0.8rem;
          // display: block;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .gridCover:hover{
        cursor: pointer;
        transition: all 0.3s;
        width: 100px;
        height: 100px;
        opacity: 1;
    }
  }
</style>