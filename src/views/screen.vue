<template>
  <div class="box">
    <div class="right">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="padding: 10px 0 2px 10px; font-size: 1.5em;">首页</el-breadcrumb-item>
        <el-breadcrumb-item  style="padding: 15px 0 2px 0; font-size: 1.1em">管理员信息</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="videos">
        <el-main class="show">
          <div class="basic">
            <div class="card11">
              <el-col :span="4" :offset="1">
                <div class="demo-basic--circle" style="margin-top: 5%">
                  <div class="block" style="width: 100%;height: 100%;"><el-avatar :size="66" :src="user['logoimage']"></el-avatar></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="sub-title" style="vertical-align: middle">
                  <h2>{{ user['userName'] }}</h2>
                </div>
              </el-col>
              <el-col :span="2" :offset="6">
                <el-button style="margin-top: 30%; margin-left: 200%;color: #6e55e0" icon="el-icon-edit" type="text" @click="$router.push('/AdminDetails')" >修改</el-button>

              </el-col>
            </div>
            <div class="card12">
              <el-row :gutter="20" style="padding-top: 10px">
                <el-col :span="14" style="padding-left: 8%"><div class="grid-content bg-purple" style="display: flex;align-items: center;">
                  <i class="el-icon-user"></i>
                  <h3>&nbsp;姓名:&nbsp;</h3>
                  <span>{{ user['real_name'] }}</span>
                </div></el-col>
                <el-col :span="10"><div class="grid-content bg-purple" style="display: flex;align-items: center;">
                  <i class="el-icon-female"></i>
                  <i class="el-icon-male"></i>
                  <h3>&nbsp;性别:&nbsp;</h3>
                  <span>{{ user['sex'] }}</span>
                </div></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24" style="padding-left: 8%"><div class="grid-content bg-purple" style="display: flex;align-items: center;">
                  <i class="el-icon-position"></i>
                  <h3>&nbsp;邮箱:&nbsp;</h3>
                  <span>{{ user['email'] }}</span>
                </div></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24" style="padding-left: 8%"><div class="grid-content bg-purple" style="display: flex;align-items: center;">
                  <i class="el-icon-phone-outline"></i>
                  <h3>&nbsp;手机:&nbsp;</h3>
                  <span>{{ user['mobile'] }}</span>
                </div></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24" style="padding-left: 8%"><div class="grid-content bg-purple" style="display: flex;align-items: center;">
                  <i class="el-icon-phone-outline"></i>
                  <h3>&nbsp;固话:&nbsp;</h3>
                  <span>{{ user['phone'] }}</span>
                </div></el-col>
              </el-row>
            </div>
          </div>

          <!-- 滚动栏标签 -->
          <!-- <div class="psw">
              <el-carousel trigger="click" height="350px">
                <el-carousel-item v-for="item in urls" :key="item">
                  <img style="width: 100%;height: auto;margin-top: 0" :src="item">
                </el-carousel-item>
              </el-carousel>
          </div> -->
        </el-main>
        <el-main class="infom">
          <div class="card1" @click="imginto('fall')">
            <!-- <img src="../assets/diedao.png"> -->
            <div style="padding-top: 10%; font-weight:bold;">
              <span class="card-text" style="color: white">跌倒检测</span>
            </div>
          </div>
          <div class="card2" @click="imginto('activity')">
            <!-- <img src="../assets/jiaotan.png"> -->
            <div style="padding-top: 10%; font-weight:bold;">
              <span class="card-text" style="color: white">交互检测</span>
            </div>
          </div>
          <div class="card3" @click="imginto('fence')">
            <!-- <img src="../assets/moshengrenruqin.png"> -->
            <div style="padding-top: 10%; font-weight:bold;">
              <span class="card-text" style="color: white">入侵检测</span>
            </div>
          </div>
          <div class="card4" @click="imginto('strangers')">
            <!-- <img src="../assets/shequjingqing_moshengrenyichangzengjia.png"> -->
            <div style="padding-top: 10%; font-weight:bold;">
              <span class="card-text" style="color: white">陌生人检测</span>
            </div>
          </div>
          <div class="card5" @click="imginto('smile')">
            <!-- <img src="../assets/zu1783.png"> -->
            <div style="padding-top: 10%; font-weight:bold;">
              <span class="card-text" style="color: white">表情检测</span>
            </div>
          </div>
        </el-main>

      </div>
      <div class="tip">
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "HomeInform",

  data () {
    return {
      url: 'http://192.168.43.234:5000/',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
      user: [],

      //滚动栏数据
      // urls: [
      //   require('../assets/carousel1.png'),
      //   require('../assets/carousel2.png'),
      //   require('../assets/carousel3.png'),
      //   require('../assets/carousel4.png'),
      // ],
    }
  },
  created() {

    if(sessionStorage.getItem("user") != null)
    //获取登录的用户信息
    this.user = JSON.parse(sessionStorage.getItem("user"))

  },
  methods:{
    //进入截图界面
    imginto(name) {
      console.log('dsad')
      this.$router.push({
        path: `/Shoot/${name}`
      });
    },

    //进入修改界面
    goDetail(){
      this.$router.push({
        path: `/AdminDetails`
      });
    },
  },
}
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
  /*background-color: #766d17;*/
  display: flex;
}
.right{
  width: 100%;
  height: 660px;
  background-color: #41296f;
  /*margin-right:0;*/
  margin: 53px 0 0 0;
  /*z-index: 1;*/
}
.videos{
  display: flex;
  width: 100%;
  height: 100%;
}
.show{
  flex: 2;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
}
.infom{
  flex: 1;
  flex-grow: 1;
  /* display: flex; */
  height: 100%;
  width: 50%;
  background-color: #ffffff;
  text-align: center;
  padding: 20px;
  /*background: url('../assets/CCTV1.png');*/
  /*background-size: cover;*/
}
.basic{
  width: 100%;
  height: 100%;
  background-color:#79ccfcad;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
}

/* 滚动栏样式 */
/* .psw{
  width: 50%;
  height: 100%;
  margin-left: 10px;
  background-color: burlywood;
} */

.card-text {
  color: white;
  font-size: 16px; /* 初始字体大小 */
}

.card-text:hover {
  font-size: 40px; /* 放大后的字体大小 */
}

.card11{
  width: 100%;
  height: 20%;
}
.card12{
  width: 100%;
  height: 80%;
  background-color: #c6f7d1;
  border-radius: 0 0 10px 10px;
}
.card1{
  width: 66%;
  height: 15%;
  margin: 0 5px;
  margin-top: 25px;
  margin-left: -20px;
  background-color: #3d3d3d;
  border: 1px solid #ffffff;
  border-radius: 30px;
  cursor: pointer;
}
.card1:hover{
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}
.card2{
  width: 66%;
  height: 15%;
  margin: 0 5px;
  margin-top: 25px;
  margin-left: -20px;
  background-color: #3d3d3d;
  border: 1px solid #ffffff;
  border-radius: 30px;
  cursor: pointer;
}
.card2:hover{
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}
.card3{
  width: 66%;
  height: 15%;
  margin: 0 5px;
  margin-top: 25px;
  margin-left: -20px;
  background-color: #3d3d3d;
  border: 1px solid #ffffff;
  border-radius: 30px;
  cursor: pointer;
}
.card3:hover{
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}
.card4{
  width: 66%;
  height: 15%;
  margin: 0 5px;
  margin-top: 25px;
  margin-left: -20px;
  background-color: #3d3d3d;
  border: 1px solid #ffffff;
  border-radius: 30px;
  cursor: pointer;
}
.card4:hover{
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}
.card5{
  width: 66%;
  height: 15%;
  margin: 0 5px;
  margin-top: 25px;
  margin-left: -20px;
  background-color: #3d3d3d;
  border: 1px solid #ffffff;
  border-radius: 30px;
  cursor: pointer;
}
.card5:hover{
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}
.tip{
  height: auto;
  width: 100%;
  /*background-color: #ffb352;*/
  text-align: center;
  padding-top: 20px;
}
.el-main img{
  width: 50%;
  height: auto;
  margin-top: 10%;
}

</style>

<style>
span.el-breadcrumb__inner {
  color: #ffffff;
}
/*.el-carousel__item, .el-carousel__mask {*/
/*  height: 100%;*/
/*  top: 0!important;*/
/*  bottom: 30px;*/
/*  left: 0;*/
/*  position: absolute;*/
/*}*/

</style>

