<template>
  <div id="zong">
    <div id="backimg"></div>
    <div class="card">
      <div class="box12">
        注册
      </div>
      <hr>
      <div class="box22">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" id="block" :label-position="labelPosition" >
          <el-form-item label="用户名" prop="Username" id="e">
            <el-input prefix-icon="el-icon-user-solid"  v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="Realname" id="es">
            <el-input prefix-icon="el-icon-user-solid"  v-model="ruleForm.realname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail" id="ei">
            <el-input prefix-icon="el-icon-s-promotion"  v-model="ruleForm.mail"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" id="eisss">
            <el-input prefix-icon="el-icon-phone"  v-model.number="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass" id="eis">
            <el-input prefix-icon="el-icon-key" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" id="eiss">
            <el-input prefix-icon="el-icon-key" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <div id="eisssss">
              <el-col :span="4" :offset="2"><span>性别</span></el-col>
              <el-col :span="18" ><el-radio-group style="padding-right: 35%" v-model="ruleForm.sex">
<!--                <el-col :span="4" :offset="4"><el-radio label="man">男</el-radio></el-col>-->
<!--                <el-col :span="4" :offset="4"><el-radio label="woman">女</el-radio></el-col>-->
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group></el-col>
            </div>
            <div class="box32">
        已有账号，点击 <router-link id="Register" to="/login">登录</router-link>
      </div>
          </el-row>

          <el-row :gutter="20">
            <div class="butbox">
              <el-col :span="8" :offset="8"><el-button type="primary" @click="submitForm('ruleForm')">注册</el-button></el-col>
              <el-col :span="8"><el-button @click="resetForm('ruleForm')">重置</el-button></el-col>
            </div>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

const TIME_COUNT = 60 // 设置一个全局的倒计时的时间
export default {
  name: 'Register',
  data() {
    var checkMail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){10,16}$/.test(value)) {
          callback(new Error('请输入10-16位英文字母、数字或者符号(除空格)，且字母、数字和标点符号至少包含两种'))

        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
      if (!value) {
        return callback(new Error('号码不能为空'));
      }
      setTimeout(() => {
        if (regMobile.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的号码格式'))
        }
      }, 100)
    };

    return {
      labelPosition:'right',
      ruleForm: {
        username: '',
        realname:'',
        sex:'',
        pass: '',
        checkPass: '',
        mail: '',
        phone: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        mail: [
          { validator: checkMail, trigger: 'blur' }
        ],
        phone: [
          { validator:checkPhone, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    getCode () {
      // let _this = this
      // if (this.ruleForm.mail === '') {
      //   _this.$message.error('请先输入邮箱再点击获取验证码')
      // } else {
      //   axios({
      //     method: 'post',
      //     url: this.Host.BASE_URL  + 'sendCheckCode',
      //     data: {
      //       'email': this.ruleForm.mail
      //     }
      //   }).then(res=>{
      //     sessionStorage.setItem('checkCode', md5(res.data))  // 这里我没用redis做缓存，用的浏览器sessionStorage+md5加密存下来的
      //     // console.log(res)
      //   })
      //   // 验证码倒计时
      //   if (!this.timer) {
      //     this.count = TIME_COUNT
      //     this.show = false
      //     this.timer = setInterval(() => {
      //       if (this.count > 0 && this.count <= TIME_COUNT) {
      //         this.count--
      //       } else {
      //         this.show = true
      //         clearInterval(this.timer)
      //         this.timer = null
      //       }
      //     }, 1000)
      //   }
      // }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
              this.$http({
                method: 'post',
                url: this.global.baseURL + '/back/register',
                data: {
                  'UserName':this.ruleForm.username,
                  'Password':this.ruleForm.pass,
                  'REAL_NAME':this.ruleForm.realname,
                  'SEX':this.ruleForm.sex,
                  'EMAIL':this.ruleForm.mail,
                  'PHONE':'N/A',
                  'MOBILE':this.ruleForm.phone
                }
              }).then(res=>{
                console.log(res)
                if(res.data.status == '0'){
                  this.$router.replace("/login");
                  this.$message.success('注册成功');
                }
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
#zong{
  width: 100%;
  height: 710px;
  position: absolute;
  /*background-color: rgba(255, 255, 255, 0.2);*/
}
#backimg {
  background: url('../assets/login.png');
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  background-size: cover;
  top: 0;
  left: 0;
}
.box12{
  width: 100%;
  height: 10%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #ececec;
}
.box22{
  width: 100%;
  height: 90%;
  color: #ececec;
}
.box32{
  padding-right: 1rem;
  text-align: right;
  color: #ececec;
}
.butbox{
  width: 100%;
  height: 50%;
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
  height:95%;
  margin:auto;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius:40px;
}
#block{
  text-align:center;
  height: 50%;
}

#e{
  margin: 2% 15% 4% 5%;
}
#es{
  margin: 7% 15% 4% 5%;
}
#ei{
  margin: 7% 15% 4% 5%;
}
/*#ei{*/
/*  margin: 2% 15% 5% 5%;*/
/*}*/
#eis{
  margin: 7% 15% 4% 5%;
}
#eiss{
  margin: 7% 15% 4% 5%;
}
#eisss{
  margin: 7% 15% 2% 5%;
}
#eisssss{
  width: 100%;
  height: auto;
  margin: 0 15% 10% 5%;
}

#but{
  margin: 5% 25% 12% 5%!important;
}
</style>
<style>
/*element.style {*/
/*  padding-left: 0;*/
/*  padding-right: 35%;*/
/*}*/
.box22 .el-form-item__label{
  color: #ececec !important;
}
</style>
