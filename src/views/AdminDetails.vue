<template>
  <div id="AdminDetails">
    <el-main style="padding: 0">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="background: #669999">
        <el-breadcrumb-item :to="{path:'/'}"
                            style="padding: 10px 0 2px 10px; font-size: 1.5em;color: #FFFFFF">管理员信息
        </el-breadcrumb-item>
        <el-breadcrumb-item style="padding: 15px 0 2px 0; font-size: 1.1em">详细信息</el-breadcrumb-item>
      </el-breadcrumb>
      <div v-if="mode" class="detail-title">
        详细信息
      </div>
      <div v-else class="detail-title">
        修改密码
      </div>

      <div class="profile-container">
        <el-upload
            class="avatar-uploader"
            action=""
            :http-request="uploadImg"
            :show-file-list="false"
        >
          <el-avatar v-if="logoimage" shape="square" :size="200" :src="logoimage"></el-avatar>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="container">
        <el-form v-if="mode" ref="form" label-width="80px">

          <el-form-item label="用户名">
            <el-input v-model="userName"></el-input>
          </el-form-item>

          <el-row :gutter="10" v-if="mode">
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="REAL_NAME"></el-input>
              </el-form-item>

              <el-form-item label="性别">
                <el-radio v-model="SEX" label="男">男</el-radio>
                <el-radio v-model="SEX" label="女">女</el-radio>
              </el-form-item>

              <el-form-item label="id">
                <el-input v-model="id" disabled></el-input>
              </el-form-item>


            </el-col>

            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input v-model="EMAIL"></el-input>
              </el-form-item>

              <el-form-item label="固话">
                <el-input v-model="PHONE"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="MOBILE"></el-input>
              </el-form-item>

            </el-col>
          </el-row>
          <br>
          <el-col align="center">
            <el-form-item>
              <el-button v-if="mode" type="primary" @click="updateBlog">修改信息</el-button>
              <el-link type="primary" icon="el-icon-edit" @click="changeMode">{{ passwdText }}</el-link>
            </el-form-item>
          </el-col>
        </el-form>

        <!--          修改密码表单：-->
        <!--          <el-row :gutter="200" v-else>-->
        <el-form :model="ruleForm" status-icon :rules="rules" v-if="!mode" ref="ruleForm" label-width="150px">
          <el-row style="display: block; width: 500px">
<!--            <el-form-item label="旧密码">-->
<!--              <el-input v-model="oldPassword"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
          </el-row>

          <br>

          <el-col align="center">
            <el-form-item>
              <el-button v-if="!mode" type="primary" @click="submitForm('ruleForm')">修改密码</el-button>
              <el-link type="primary" icon="el-icon-edit" @click="changeMode">{{ passwdText }}</el-link>
            </el-form-item>
          </el-col>

        </el-form>
      </div>
    </el-main>

  </div>
</template>

<script>
import {client, getCurrentDateTime} from "@/utils/oss";

export default {
  name: "AdminDetails",
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {

      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },


      id: "",
      userName: "",
      REAL_NAME: "",
      SEX: "",
      EMAIL: "",
      PHONE: "",
      MOBILE: "",
      logoimage: "",
      user: [],

      //1是修改信息，0是修改密码
      mode: 1,
      passwdText: "修改密码"

      // //头像路径
      // profile_photo: "https://lzh-pic.oss-cn-beijing.aliyuncs.com/images/czm/smile_10.jpg"
    };

  },
  created() {
        //从session里拿用户数据
        this.user = JSON.parse(sessionStorage.getItem("user"))

        this.id = this.user["user_id"];
        this.userName = this.user["userName"];
        this.REAL_NAME = this.user["real_name"];
        this.SEX = this.user["sex"];
        this.EMAIL = this.user["email"];
        this.PHONE = this.user["phone"];
        this.MOBILE = this.user["mobile"];
        this.logoimage = this.user["logoimage"];

    // this.$http.get(this.global.baseURL + this.global.adminURL.getOne + "/" + this.$route.params.id).then(result => {
    //   // eslint-disable-next-line no-redeclare
    //   // var result = result.body;
    //   if (result.status === 200) {
    //     // 成功了，读取单条信息
    //     this.id = result.data.data.Info.id;
    //     this.userName = result.data.data.Info.userName;
    //     this.REAL_NAME = result.data.data.Info.REAL_NAME;
    //     this.SEX = result.data.data.Info.SEX;
    //     this.EMAIL = result.data.data.Info.EMAIL;
    //     this.PHONE = result.data.data.Info.PHONE;
    //     this.MOBILE = result.data.data.Info.data.Info.MOBILE;
    //     this.logoimage = result.data.data.Info.logoimage;
    //   } else {
    //     // 失败了
    //     alert("获取数据失败！");
    //   }
    // });
  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.updatePassword();

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    updatePassword(){

      this.$http.put(this.global.baseURL + this.global.adminURL.changepasswd, {
        ID: this.id,
        Password: this.ruleForm.pass
      }).then(result=>{
        if(result.status == 200){
          console.log("修改密码")
          console.log(result)

          if(result.data.status == 0) {
            alert("修改成功！")
            this.user['password'] = this.ruleForm.pass
            sessionStorage.setItem("user",JSON.stringify(this.user))

            this.$router.push("/")
          } else{
            alert("修改失败！")
          }
        } else {
          alert("访问服务器失败！")
        }
      });

    },

    updateBlog() {
      this.$http
          .put(this.global.baseURL + this.global.adminURL.update, {
            ID: this.id,
            UserName: this.userName,
            REAL_NAME: this.REAL_NAME,
            EMAIL: this.EMAIL,
            SEX: this.SEX,
            PHONE: this.PHONE,
            MOBILE: this.MOBILE,
            logoimage: this.logoimage

          })
          .then(result => {
            // eslint-disable-next-line no-redeclare
            // var result = result.body;
            if (result.status === 200) {
              alert("修改成功！");

              this.user["userName"] = this.userName;
              this.user["real_name"] = this.REAL_NAME;
              this.user["sex"] = this.SEX;
              this.user["email"] = this.EMAIL;
              this.user["phone"] = this.PHONE;
              this.user["mobile"] = this.MOBILE;
              this.user["logoimage"] = this.logoimage;

              sessionStorage.setItem("user", JSON.stringify(this.user))

              this.$router.push("/")
            } else {
              // 失败了
              alert("修改失败！");
            }
          });
    },

    uploadImg(e) {

      let file = e.file // 文件信息
      if (!file) {
        return false
      } else if (!/\.(png|jpg)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传png或者jpg格式')
        return false
      }
      let name = 'images/profile_photo/' + getCurrentDateTime() + '.png';
      client.put(name, file)
      client.list().then(res => {
        // console.log(res)
        this.logoimage = 'https://lzh-pic.oss-cn-beijing.aliyuncs.com/' + name;
        // console.log("上传成功：" + this.profile_photo)
        this.$forceUpdate()
      })
    },

    changeMode(){
      if(this.mode == 0) {
        this.mode = 1;
        this.passwdText = "修改密码";
      } else {
        this.mode = 0;
        this.passwdText = "修改信息"
      }
    }


  }
}
</script>

<style scoped>
.el-main {
  width: 1500px;
  background-color: #E9EEF3;
  color: #333;
  /*text-align: center;*/
  line-height: 30px;
  margin-top: 50px;
}

.container {
  display: block;
  width: 600px;
  height: 700px;
  padding-top: 100px;
  margin: 0 auto;

}

.avatar-uploader {
  width: 178px;
  height: 178px;
  display: block;
  margin: 0 auto;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: grey;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 3px solid grey;
  border-radius: 20px;

}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* 
.el-form {

} */

.el-button {
  width: 100px;
  position: relative;
  right: 30px;
}

.detail-title {
  display: block;
  position: relative;
  width: 300px;
  padding-top: 70px;
  padding-bottom: 50px;
  left: 85px;
  margin: 0 auto;
  /*vertical-align: center;*/
  font-size: 40px;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  color: #ffffff !important;
}

</style>

<style scoped>
.el-avatar > img {
  position: relative;
  right: 25px;
}

</style>
