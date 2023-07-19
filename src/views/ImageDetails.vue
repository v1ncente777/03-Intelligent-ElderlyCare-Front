<template>
  <div class="box">
    <div class="right">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/OldManInfo'}" style="padding: 10px 0 2px 10px; font-size: 1.5em;">信息管理</el-breadcrumb-item>
        <el-breadcrumb-item  style="padding: 15px 0 2px 0; font-size: 1.1em">头像管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="videos">
        <el-row class="d">
          <el-col class="c" :span="8" v-for="o in url" :key="o" >
            <el-card :body-style="{ padding: '0px' }">
<!--              <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"-->
<!--                        class="image"-->
<!--                        preview-src-list="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-image>-->
              <el-image :src="o"
                        class="image"
                        :preview-src-list="srcList"></el-image>
              <div style="padding: 14px;">
<!--                <span>好吃的汉堡</span>-->
                <div class="bottom">
<!--                  <time class="time">{{ currentDate }}</time>-->
                  <el-button type="text" class="button" @click="set(o)">设为头像</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="tip">
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "ImageDetails",
  data () {
    return {
      url: [],
      srcList: [],
      currentDate: new Date()
    };
  },
  created() {
    console.log('@#!@#@!$#')
    console.log(this.$route.params.type)
    this.$http({
      method: 'post',
      url: this.global.baseURL + '/back/getPic',
      data: {
        'name': this.$route.params.id,//id
        'type': this.$route.params.type,//角色类型
      }
    }).then(res=> {
      // console.log(res.data.data.pic)
      this.url = res.data.data.pic
      this.srcList = res.data.data.pic
    })
  },
  methods:{
    setHead1(o){
      this.$http({
        method: 'post',
        url: this.global.baseURL + '/back/setoldertag',
        data: {
          'id': this.$route.params.id,
          'profile_photo': o,
        }
      }).then(res=> {
        console.log(res)
      })
    },
    setHead2(o){
      this.$http({
        method: 'post',
        url: this.global.baseURL + '/back/setemployeetag',
        data: {
          'id': this.$route.params.id,
          'profile_photo': o,
        }
      }).then(res=> {
        console.log(res)
      })
    },
    setHead3(o){
      this.$http({
        method: 'post',
        url: this.global.baseURL + '/back/setvolunteertag',
        data: {
          'id': this.$route.params.id,
          'profile_photo': o,
        }
      }).then(res=> {
        console.log(res)
      })
    },
    set(o){
      console.log('@@@@')
      console.log(this.$route.params.type)
      if(this.$route.params.type === 'oldpeople'){
        this.setHead1(o)
      }else if(this.$route.params.type === 'employee'){
        this.setHead2(o)
      }else if(this.$route.params.type === 'volunteer'){
        this.setHead3(o)
      }
      alert('更改成功')
    }
  }
}
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
  background-color: #766d17;
  display: flex;
  /*background: url('../assets/colorful.png');*/
  background-size: cover;
}
.left{
  /*min-width: 64px;*/
  /*max-width: 200px;*/
  /*height: 100%;*/
  /*background-color: antiquewhite;*/
  /*margin-left:0;*/
}
.right{
  /*min-width: 100%;*/
  /*max-width: 100%;*/
  width: 100%;
  height: 660px;
  /*background-color: #42b983;*/
  /*margin-right:0;*/
  margin: 53px 0 0 0;
  /*z-index: 1;*/
}
.iframe {
  width: 100%;
  height: 99%;
  background: #fff;
}
.videos{
  width: 100%;
  height: auto;
  /*display: flex;*/
  /*padding-left: 40px;*/
}
.d{
  width: 100%;
  height: auto;
  overflow: hidden;
  /*padding: 10px 80px;*/
  display: flex;
  flex-wrap: wrap;
  background: #ececec;
}
img{
  width: 100%;
  height: 90%;
}
.c{
  margin-right: 20px;
  margin-bottom: 40px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
.show{
  width: 70%;
  height: 629px;
  background-color: #5e5e5e;
}
.infom{
  height: 630px;
  width: auto;
  /*background-color: #ffb352;*/
  text-align: center;
  padding: 20px;
  /*background: url('../assets/CCTV1.png');*/
  background-size: cover;

}
.message{
  background-color: rgba(0,0,0,0.3);
  width: 100%;
  height: 100%;
}
.tip{
  height: auto;
  width: 100%;
  /*background-color: #ffb352;*/
  text-align: center;
  padding-top: 20px;
}
.cards{
  width: 90%;
  height: auto;
  background-color: white;
  border-radius: 10px;
  border: 1px solid white;
  margin: 10px auto;
}
</style>

<style>
span.el-breadcrumb__inner {
  color: #ffffff;
}
.el-col-8 {
  width: 17% !important;
}
</style>

