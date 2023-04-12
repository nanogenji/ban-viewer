<template>
  <div class="agreementContainer">
    <div class="agreementContent">
      <div class="agreementHeader">
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
      </div>
      <h2 class="agreementTitle">社区指导原则</h2>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="encourage">鼓励</span>
        </div>
        <div>
          <ol class="rules">
            <li>鼓励分享、互助和开放；</li>
            <li>鼓励宽容和理性地对待不同的看法、喜好和意见；</li>
            <li>鼓励尊重他人的隐私和个人空间；</li>
            <li>鼓励转载注明原作者及来源；</li>
            <li>鼓励精彩原创内容；</li>
            <li>鼓励明确、及时的资源分享和点评；</li>
            <li>鼓励有始有终的自发福利活动。</li>
          </ol>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="warn">不提倡</span>
        </div>
        <div>
          <ol class="rules">
            <li>针对种族、国家、民族、宗教、性别、年龄、地缘、性取向、生理特征的歧视和仇恨言论；</li>
            <li>不雅词句、人身攻击、故意骚扰和恶意使用；</li>
            <li>色情、激进时政、意识形态方面的话题；</li>
            <li>使用妨碍视觉与心灵的文字；</li>
            <li>不提倡情绪激动而心灵枯槁的内容；</li>
            <li>不提倡转载过期变质内容；</li>
            <li>不提倡不知所谓的长篇大论；</li>
            <li>不提倡调查贴、投票贴、签名贴。</li>
          </ol>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="danger">禁止</span>
        </div>
        <div>
          <a class="suggest">以下行为视情况直接删除、锁定或删除ID、批量删除而不予通知；</a>
          <ol class="rules">
            <li>违反中国或 BanViewer 成员所在地法律法规的行为和内容（政策法规）；</li>
            <li>威胁他人或 BanViewer 成员自身的人身安全、法律安全的行为；</li>
            <li>对网站的运营安全有潜在威胁的内容。</li>
          </ol>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name:'Agreement',
  methods:{
    goBack(){
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .agreementContainer{
    width: 75%;
    min-height: 1000px;
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
    .agreementContent{
      // 减少信息显示宽度,符合阅读习惯
      width: 80%;
      min-height: 1000px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      .agreementHeader{
        width: 90%;
        height: 100px;
        display: flex;
        align-items: center;
        color: var(--primary-text);
      }
      .agreementTitle{
        color: var(--primary-text);
      }
      .box-card{
        width: 50%;
        border-radius: 0.75rem;
        margin: 2rem 0 2rem 0;
        background-color: var(--secondary-background);
        .rules{
          line-height: 2rem;
          color: var(--primary-text);
        }
        .encourage{
          font-size: 1.1rem;
          color: #67C23A;
        }
        .warn{
          font-size: 1.1rem;
          color: #E6A23C;
        }
        .danger{
          font-size: 1.1rem;
          color: #F56C6C;
        }
        .suggest{
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          margin-left: 24px;
          color: var(--pure);
        }
      }
    }
  }
</style>