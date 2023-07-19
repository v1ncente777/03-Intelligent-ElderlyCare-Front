<template>
<!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--    <el-radio-button :label="!isCollapse">展开</el-radio-button>-->
<!--  </el-radio-group>-->
  <div class="navMenu">
<!--    <el-menu default-active="1-4-1"-->
    <el-menu :default-active="activeIndex"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#066d68"
             text-color="#fff"
             active-text-color="#ffd04b"  
             router>
      <div class="bb">
        <el-button class="eb" v-show="isCollapse" size="mini" type="primary" icon="el-icon-d-arrow-right" @click="click" circle></el-button>
        <el-button class="eb"  v-show="!isCollapse" size="mini" type="primary" icon="el-icon-d-arrow-left" @click="click" round></el-button>
      </div>

      <el-menu-item index="/HomeInform">
        <i class="el-icon-house"></i>
        <template #title>首页</template>
      </el-menu-item>

      <el-submenu index="2">
        <template #title>
          <i class="el-icon-user"></i>
          <span>老人信息</span>
        </template>
        <el-menu-item index="/OldManInfo">信息列表</el-menu-item>
        <el-menu-item index="/OldManAdd">录入信息</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template #title>
          <i class="el-icon-user"></i>
          <span>义工信息</span>
        </template>
        <el-menu-item index="/VolunteerInfo">信息列表</el-menu-item>
        <el-menu-item index="/VolunteerAdd">录入信息</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template #title>
          <i class="el-icon-user"></i>
          <span>工作人员信息</span>
        </template>
        <el-menu-item index="/WorkerInfo">信息列表</el-menu-item>
        <el-menu-item index="/WorkerAdd">录入信息</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template #title>
          <i class="el-icon-data-analysis"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="/Oldchart">老年人报表</el-menu-item>
        <el-menu-item index="/Volunteerchart">义工报表</el-menu-item>
        <el-menu-item index="/Wokerchart">工作人员报表</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template #title>
          <i class="el-icon-video-camera"></i>
          <span>监控管理</span>
        </template>
        <el-menu-item index="/CCTV1">交互检测</el-menu-item>
        <el-menu-item index="/CCTV2">陌生人检测</el-menu-item>
        <el-menu-item index="/CCTV3">跌倒检测</el-menu-item>
        <el-menu-item index="/CCTV4">入侵检测</el-menu-item>
      </el-submenu>

      
      <!-- <el-menu-item index="/screen">截图管理</el-menu-item> -->

    </el-menu>
  </div>

</template>

<script>
export default {
  name: "LeftNav",
  data() {
    return {
      isCollapse: false
    };
  },
  computed:{
    activeIndex(){
      return this.$route.path.replace('/','')
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    click(){
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.navMenu{
  width: auto;
  height: 100%;
}
.bb{
  width: auto;
  height: auto;
  /*background-color: black;*/
  padding: 5px 20px 5px;
  margin: 55px 0 0 0;
}
.eb{
  margin: 0 auto!important;
  color: #FFF;
  background-color: #ffd04b;
  border-color: #ffd04b;
}
.eb:focus, .eb:hover {
  color: #ffd04b;
  border-color: #ffb352;
  background-color: #ffb352;
}
</style>

<style>
.el-menu--collapse{
  /*min-width: 64px;*/
  /*max-width: 200px;*/
  /*height: 100%;*/
  /*border-right-width: 0;*/
}
.el-menu-vertical-demo{
  min-width: 64px;
  max-width: 200px;
  height: 100%;
  border-right-width: 0;
}
.el-submenu .el-menu-item {
  min-width: 108px;
}
.el-button{
  width: 100%;
  margin: 0 auto;
}
.el-button.is-circle {
  width: auto;
}
.el-menu {
  /*min-width: 64px;*/
  /*max-width: 200px;*/
  /*height: 100%;*/
  /*border-right-width: 0;*/
  border-width: 0;
}
/*.el-button--primary :hover{*/
/*  color: #FFF;*/
/*  background-color: #ffd04b;*/
/*  border-color: #ffd04b;*/
/*}*/
/*.el-button--primary{*/
/*  color: #FFF;*/
/*  background-color: #ffd04b;*/
/*  border-color: #ffd04b;*/
/*  !*color: #409EFF;*!*/
/*}*/
/*.el-button:focus, .el-button:hover {*/
/*  !*color: #409EFF;*!*/
/*  !*border-color: #c6e2ff;*!*/
/*  !*background-color: #ecf5ff;*!*/
/*  color: #ffd04b;*/
/*  border-color: #d28900;*/
/*  background-color: #d28900;*/
/*}*/
</style>
