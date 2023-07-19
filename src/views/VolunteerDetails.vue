<template>
  <div id="VolunteerDetails">
    <el-main style="padding: 0">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="background: #CC9999">
        <el-breadcrumb-item :to="{path:'/VolunteerInfo'}" style="padding: 10px 0 2px 10px; font-size: 1.5em;color: #d9d9d9">义工信息列表</el-breadcrumb-item>
        <el-breadcrumb-item  style="padding: 15px 0 2px 0; font-size: 1.1em">详细信息</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="detail-title">
        详细信息
      </div>

      <div class="profile-container">
        <div class="avatar-uploader" @click="imginto">
          <el-avatar v-if="profile_photo" shape="square" :size="200" :src="profile_photo"></el-avatar>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </div>
      <div class="container">
        <el-form ref="form" label-width="80px">

          <el-row :gutter="200">
            <el-col :span="12">
              <el-form-item label="姓名" >
                <el-input v-model="name"></el-input>
              </el-form-item>

              <el-form-item label="id">
                <el-input v-model="id" disabled></el-input>
              </el-form-item>

              <el-form-item label="性别">
                <el-radio v-model="gender" label="男">男</el-radio>
                <el-radio v-model="gender" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="phone"></el-input>
              </el-form-item>

            </el-col>

            <el-col :span="12">

              <el-form-item label="身份证号">
                <el-input v-model="id_card"></el-input>
              </el-form-item>

              <el-form-item label="出生日期">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="birthday"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="访问日期">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="checkin_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="离开日期">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="checkout_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-col align="center">
            <el-form-item>
              <el-button type="primary" @click="updateBlog">立即修改</el-button>
            </el-form-item>
          </el-col>


        </el-form>
      </div>
    </el-main>



  </div>
</template>

<script>
import { client } from '@/utils/oss'
import { getCurrentDateTime } from '@/utils/oss'

export default {
  name: "VolunteerDetails",
  data() {
    return {
      id: "",
      name: "",
      gender: "",
      phone: "",
      id_card: "",
      // room_number: "",
      birthday: "",
      checkin_date: "",
      checkout_date: "",
      profile_photo: "",

      type: 'volunteer'
       };
  },
  created() {
    this.$http.get( this.global.baseURL + this.global.volunteerURL.getOne + "/" + this.$route.params.id).then(result => {
      // eslint-disable-next-line no-redeclare
      // var result = result.body;
      if (result.status === 200) {
        // 成功了，读取单条信息
        this.id = result.data.data.Info.id;
        this.name = result.data.data.Info.name;
        this.gender = result.data.data.Info.gender;
        this.phone = result.data.data.Info.phone;
        this.id_card = result.data.data.Info.id_card;
        // this.room_number = result.data.data.Info.room_number;
        this.birthday = result.data.data.Info.birthday;
        this.checkin_date = result.data.data.Info.checkin_date;
        this.checkout_date = result.data.data.Info.checkout_date;
        this.profile_photo = result.data.data.Info.profile_photo;
      } else {
        // 失败了
        this.$message.error("获取数据失败！");
      }
    });
  },
  methods: {
    updateBlog() {
      this.$http
          .put(this.global.baseURL + this.global.volunteerURL.update + "/" + this.id, {
            id: this.id,
            name: this.name,
            gender: this.gender,
            phone: this.phone,
            id_card: this.id_card,
            // room_number: this.room_number,
            birthday: this.birthday,
            checkin_date: this.checkin_date,
            checkout_date: this.checkout_date,
            profile_photo: this.profile_photo
          })
          .then(result => {
            // eslint-disable-next-line no-redeclare
            // var result = result.body;
            console.log("更新义工信息：")
            console.log(result)

            if (result.status === 200) {
              if(result.data.status == 0){
                this.$message.success("修改成功！");
                this.$router.push("/VolunteerInfo")
              } else {
                this.$message.error(result.data.message)
              }

            } else {
              // 失败了
              this.$message.error("连接错误");
            }
          });
    },

    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // }

    uploadImg (e) {

      let file = e.file // 文件信息
      if (!file) {
        return false
      } else if (!/\.(png|jpg)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传png或者jpg格式')
        return false
      }
      let name = 'images/profile_photo/'+getCurrentDateTime() +'.png';
      client.put(name, file)
      client.list().then(res => {
        // console.log(res)
        this.profile_photo='https://lzh-pic.oss-cn-beijing.aliyuncs.com/'+name;
        // console.log("上传成功：" + this.profile_photo)
        this.$forceUpdate()
      })
    },
    imginto(){
      this.$router.push({
        path: `/ImageDetails/${this.id}/${this.type}`,
      })
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
  width: 800px;
  height: 700px;
  padding-top: 100px;
  margin: 0 auto;

}

.avatar-uploader {
  width: 178px;
  height: 178px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
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

.el-form{

}
.el-button{
  width: 100px;
  position: relative;
  right: 30px;
}

.detail-title{
  display: block;
  position: relative;
  width: 300px;
  padding-top: 70px;
  padding-bottom: 50px;
  left: 70px;
  margin: 0 auto;
  /*vertical-align: center;*/
  font-size: 40px;
  font-weight: bold;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

</style>

<style scoped>
.el-avatar>img {
  position: relative;
  right: 25px;
}
</style>
