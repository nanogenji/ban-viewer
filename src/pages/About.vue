<template>
  <div class="aboutContainer">
    <div class="aboutContent">
      <el-container>
        <el-header>
          <div class="aboutHeader">
            <a>关于页面</a>
          </div>
        </el-header>
        <el-container>
          <el-main class="aboutMain">
            <div class="MainContent" shadow="never">
              <h3>关于</h3>
              <a style="letterSpacing:1px">此站点为个人演示站点，内容来自bangumi</a>
              <h4>技术支持</h4>
              <el-link type="success" style="maxWidth:80px" href='https://vuejs.org/'>Vue</el-link>
              <el-link type="primary" style="maxWidth:80px" href='https://element.faas.ele.me/'>element-ui</el-link>
              <el-link type="danger" style="maxWidth:80px" href='https://bangumi.github.io/api/'>bangumi</el-link>
              <!-- <el-link type="info" style="maxWidth:80px" href='https://axios-http.com/docs/intro/'>axios</el-link>-->
              <a style="fontSize:0.9rem;color:#263349;">and so on...</a>
              <h3>相关链接</h3>
              <el-link type="info" style="maxWidth:150px" href='https://github.com/nanogenji/'>在Github上查看该项目</el-link>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name:'About'
}
</script>

<style lang="scss" scoped>
  .aboutContainer{
    width: 75%;
    min-height: 850px;
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
    .aboutContent{
      // 减少信息显示宽度,符合阅读习惯
      width: 75%;
      min-height: 850px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      .aboutHeader{
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin-top: 3rem;
        font-size: 1.8rem;
        color: var(--primary-text);
      }
      .aboutMain{
        padding-top: 6rem;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        .MainContent{
          width: 70%;
          margin: 1.5rem 0 2rem 5rem;
          border-radius: 0.75rem;
          padding: 2rem;
          background-color: var(--secondary-background);
          border: 1px solid #EBEEF5;
          line-height: 1.8;
          display: flex;
          flex-flow: column nowrap;
          color: var(--primary-text);
        }
      }
    }
  }
</style>