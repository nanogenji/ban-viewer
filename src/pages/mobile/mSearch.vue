<template>
  <div class="mSearchContainer">
    <div class="mSearchContent">
      <div class="title"><a>搜索</a></div>
      <el-form :model="TagForm" ref="TagForm" class="Tagform">
        <el-form-item>
          <el-select v-model="TagForm.type" :popper-append-to-body="false" class="type"><!-- popper-append-to-body="false"解决样式穿透不生效 -->
            <el-option label="动画" :value=2></el-option>
            <el-option label="音乐" :value=3></el-option>
            <el-option label="书籍" :value=1></el-option>
            <el-option label="游戏" :value=4></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="datePicker">
          <el-date-picker
            v-model="TagForm.datePickStart"
            type="date"
            placeholder="起始日期"
            value-format="yyyy-MM-dd"
            size="small">
          </el-date-picker>
          <el-date-picker
            v-model="TagForm.datePickEnd"
            type="date"
            placeholder="终止日期"
            value-format="yyyy-MM-dd"
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item  prop="tag">
          <el-input prefix-icon="el-icon-search" size="medium" v-model="TagForm.tag"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submitBtn" type="primary" size="medium" v-hammer:tap="(event)=> submitForm('TagForm')">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'mSearch',
    data(){
    return{
      TagForm: {
        type: 2,
        tag: '',
        datePickStart:'',
        datePickEnd:'',
      },
    }
  },
  methods:{
    submitForm(formName) {
      var dateStart = '';
      var dateEnd = '';
      var flag = true;
      //日期格式统一
      if(this.TagForm.datePickStart && this.TagForm.datePickEnd){//防止未选择时null发到后台
        if(this.TagForm.datePickStart.substr(0,2) === '>=' && this.TagForm.datePickEnd.substr(0,1) === '<'){//防止重复添加
          dateStart = this.TagForm.datePickStart
          dateEnd = this.TagForm.datePickEnd
        }
        else{//初次点击
          this.TagForm.datePickStart = '>=' + this.TagForm.datePickStart
          this.TagForm.datePickEnd = '<' + this.TagForm.datePickEnd
          dateStart = this.TagForm.datePickStart
          dateEnd = this.TagForm.datePickEnd
        }
      }
      else if(this.TagForm.datePickStart || this.TagForm.datePickEnd){
        this.$message({
          message: '请正确选择起始日期哦',
          type: 'warning'
        });
        flag = false
      }
      else{
        dateStart = this.TagForm.datePickStart
        dateEnd = this.TagForm.datePickEnd
      }
      this.$refs[formName].validate((valid) => {
        if (valid && flag) {
          this.$router.push({
          path:'msearchresult',
          query:{
            tagValue:this.TagForm.tag,
            type:this.TagForm.type,
            dateStart,
            dateEnd
          }
      })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .mSearchContainer{
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
    .mSearchContent{
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .title{
        font-size: 1.2rem;
        margin: 2rem;
        font-weight: 600;
      }
      .Tagform{
        width: 70%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        .type{
          /deep/.el-input__inner{
            background-color: var(--regular-background);
            border: none;
            border-radius: 0.5rem;
          }
        }
        .datePicker{
          height: 150px;
          margin-top: 1rem;
          margin-left: 2.5rem;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          /deep/.el-input__inner{
            background-color: var(--regular-background);
            border: none;
          }
        }
      }
      /deep/.el-input__inner{
        background-color: var(--regular-background);
        border-radius: 30px;
      }
    }
  }
</style>