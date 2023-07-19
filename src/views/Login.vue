<template>
  <div id="zong">
    <div id="backimg"></div>
    <div class="card">
      <div class="box11">
        登录
      </div>
      <hr>
      <div class="box21">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" id="block" :label-position="labelPosition" >
          <el-form-item label="账号" prop="UserName" id="ei">
            <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.UserName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="Password" id="eis">
            <el-input prefix-icon="el-icon-key" type="password" v-model="ruleForm.Password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-row :gutter="20">
          <div class="butbox">
            <el-col :span="8" :offset="8"><el-button type="primary" @click="submitForm('ruleForm')">登录</el-button></el-col>
            <el-col :span="8"><el-button @click="resetForm('ruleForm')">重置</el-button></el-col>
          </div>
        </el-row>
        <div class="box31" style="align-self: center;">
          没有账号，点击 <router-link id="Register" to="/Register">注册</router-link>
          <!--        &nbsp;-->
        </div>
      </div>
    </div>
    <!--
    http://10.13.1.7:8081/login
    -->
  </div>
</template>

<script>
// import Vue from 'vue'
// import {Input,Button,Divider} from 'element-ui'
// import axios from 'axios'
// import * as qs from 'qs'
// Vue.use(Input)
// Vue.use(Button)
//
// Vue.use(Divider)

import axios from "axios";

export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){9,16}$/.test(value)) {
          callback(new Error('请输入10-16位英文字母、数字或者符号(除空格)，且字母、数字和标点符号至少包含两种'))

        }
        callback();
      }
    };

    return {
      labelPosition:'right',
      userToken: '',
      ruleForm: {
        Password: '',
        UserName: '',
      },
      zhud:false,
      loading:false,
      rules: {
        Password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {

    getUser(){
      // sessionStorage.setItem("user", JSON.stringify(null))
      // this.$router.replace("/")
      axios.post(this.global.baseURL + this.global.loginRegisterURL.login, {
        UserName: this.ruleForm.UserName,
        Password: this.ruleForm.Password
      }).then(res => {
        if(res.status == 200){
          console.log("登录信息：")
          console.log(res)
          if(res.data.status == 0){
            this.$message.success("登录成功")
            sessionStorage.setItem("user", JSON.stringify(res.data.data.user))
            this.$router.replace("/")

            // var user = JSON.parse(sessionStorage.getItem("user"))
            // console.log(user)


          } else {
            this.$message.error("登录失败！")
          }



        }else {
          this.$message.error("连接服务器失败")
        }

      })


    },
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.getUser();

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },


    resetForm(formName) {
      // this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
#zong{
  width: 100%;
  height: 710px;
  position: absolute;
  background-color: rgba(201, 230, 37, 0.2);
}
#backimg {
  background: url('../assets/login.png');
  /*background-color: rgba(255, 255, 255, 0.2);*/
  width: 100%;
  height: 100%;
  /*position: absolute;*/
  /*z-index: -1;*/
  background-size: cover;
  top: 0;
  left: 0;
}
.box11{
  width: 100%;
  height: 30%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #ececec;
}
.box21{
  width: 100%;
  height: 70%;
}
.butbox{
  width: 100%;
  height: 50%;
}
.box31{
  padding-right: 1rem;
  text-align: right;
  color: #ececec;
}
#Register{
  color: #409EFF;
}
a{
  text-decoraction: none;
}
.router-link-active {
  text-decoration: none;
}
.card{
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  width:30%;
  height:70%;
  margin:auto;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius:40px;
}
#block{
  text-align:center;
  height: 50%;
}

.box21 .el-form-item__label{
  color: #ececec!important;
}

#ei{
  margin: 5% 15% 10% 5%;
}
#eis{
  margin: 10% 15% 10% 5%;
}
#but{
  margin: 15% 25% 10% 5%!important;
}
</style>
<style>

.box21 .el-form-item__label{
  color: #ececec !important;
}
</style>
