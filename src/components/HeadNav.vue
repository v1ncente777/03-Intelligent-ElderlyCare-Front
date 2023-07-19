<template>
  <div class="headNav">
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#066d68"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-container style="cursor: pointer" @click="$router.push('/')">
        智慧养老系统
      </el-container>
      <el-submenu index="1">
        <template slot="title">
          <!-- 头像 -->
          <el-avatar :size="small" :src="this.user['logoimage']"></el-avatar>
          {{ user['userName'] }}
        </template>
        <el-menu-item @click="$router.push('/AdminDetails')">修改</el-menu-item>
        <el-menu-item @click="msg_exit()">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "HeadNav",
  data() {
    return {
      activeIndex: '1',
      user: JSON.parse(sessionStorage.getItem("user"))
    };
  },
  destroyed() {
    this.user = JSON.parse(sessionStorage.getItem("user"))
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    exit(){
      sessionStorage.clear()
      router.push("/Login")
    },

    msg_exit() {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.exit(),

            this.$message({
              type: 'success',
              message: '已退出'
            });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },

  }
}
</script>

<style scoped>
.headNav{
  width: auto;
  height: auto;
}
</style>

<style>
.el-menu-item{
  margin: 0 auto;
}
.el-menu--horizontal {
  border-right: none;
  display: flex;
  flex-wrap: wrap;
}
.el-menu--horizontal>.el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  border-bottom: 2px solid transparent;
  color: #909399;
}
.el-menu--horizontal>.el-submenu {
  float: right;
}
.el-container {
  padding: 0 2%;
  display: flex;
  color: white;
  /*实现垂直居中*/
  align-items: center;
  /*justify-content: center;*/
  text-align: justify;
  /*font-family: "Yu Gothic UI Semibold";*/
  font-size: 1.3em;
}
.el-menu.el-menu--horizontal {
  border-bottom: solid 1px #545c64;
}
</style>
