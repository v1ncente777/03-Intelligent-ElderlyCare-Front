<template>
  <div id="app">
    <div class="box" v-if="!(path ==='/login' || path ==='/Register' || path ==='/Login')">
      <div class="box1">
        <HeadNav></HeadNav>
      </div>
      <div class="box2">
        <LeftNav></LeftNav>
        <router-view/>
      </div>
    </div>
    <div v-if="(path ==='/login' || path ==='/Register' || path ==='/Login')">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      path: ''
    }
  },
  // 判断路由
  mounted() {
    this.path = this.$route.path;
    console.log(this.$route.path)
  },
  watch:{
    $route(to,from){
      this.path = to.path
    }
  }
}
</script>

<style>
.box{
  width: auto;
  height: auto;
}
.box1{
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  height: auto;
}
.box2{
  width: 100%;
  height: auto;
  /*background-color: #cc40ff;*/
  display: flex;
}
body{
  margin: 8px 0;
  width: 100%;
  height: auto;
  position: absolute;
  z-index: -1;
  background-size: cover;
  left: 0;
  background-color: #066d68;
}
</style>
