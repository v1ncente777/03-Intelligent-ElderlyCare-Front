<template>
  <div id="WorkerAdd">

    <el-main style="padding: 0">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="background: #993333">
        <el-breadcrumb-item style="padding: 10px 0 2px 10px; font-size: 1.5em;">工作人员信息</el-breadcrumb-item>
        <el-breadcrumb-item style="padding: 15px 0 2px 0; font-size: 1.1em">录入信息</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="detail-title">
        工作人员信息录入
      </div>

      <!--      <div class="profile-container">-->
      <!--        <el-upload-->
      <!--            class="avatar-uploader"-->
      <!--            action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--            :show-file-list="false"-->
      <!--            :on-success="handleAvatarSuccess"-->
      <!--            :before-upload="beforeAvatarUpload">-->
      <!--          <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
      <!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--        </el-upload>-->
      <!--      </div>-->
      <div class="container">
        <el-form ref="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <br>

          <el-row :gutter="200">
            <el-col :span="12">
              <!--              <el-form-item label="id">-->
              <!--                <el-input v-model="id" disabled></el-input>-->
              <!--              </el-form-item>-->
              <!--              <el-form-item label="姓名" >-->
              <!--                <el-input v-model="username"></el-input>-->
              <!--              </el-form-item>-->

              <el-form-item label="性别">
                <el-radio v-model="gender" label="男">男</el-radio>
                <el-radio v-model="gender" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="phone"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="id_card"></el-input>
              </el-form-item>

            </el-col>

            <el-col :span="12">

              <!--              <el-form-item label="房间号">-->
              <!--                <el-input v-model="room_number"></el-input>-->
              <!--              </el-form-item>-->

              <el-form-item label="出生日期">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="birthday"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="入职日期">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="hire_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="离职日期">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="resign_date"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <br>
          <br>
          <el-col align="center">
            <el-form-item>
              <el-button type="primary" @click="updateBlog">录入</el-button>
            </el-form-item>
          </el-col>


        </el-form>
      </div>
    </el-main>

  </div>
</template>

<script>
export default {
  name: "WorkerAdd",
  data() {
    return {
      type: 3,
      // id: "",
      username: "",
      gender: "",
      phone: "",
      id_card: "",
      // room_number: "",
      birthday: "",
      hire_date: "",
      resign_date: ""
    };
  },

  methods: {
    updateBlog() {
      this.$http
          .post(this.global.baseURL + this.global.workerURL.add, {
            username: this.username,
            gender: this.gender,
            phone: this.phone,
            id_card: this.id_card,
            // room_number: this.room_number,
            birthday: this.birthday,
            hire_date: this.hire_date,
            resign_date: this.resign_date
          })
          .then(result => {
            // eslint-disable-next-line no-redeclare
            // var result = result.body;
            if (result.status === 200) {
              this.$message.success("添加成功！");
              this.$router.push({
                path: `/Camera/${result.data.message}/${this.type}`
              });
            } else {
              // 失败了
              this.$message.error("添加失败！");
            }
          });
    }
  }
}
</script>

<style scoped>
.el-main {
  width: 1500px;
  height: 700px;
  background-color: #E9EEF3;
  color: #333;
  /*text-align: center;*/
  line-height: 30px;
  margin-top: 50px;
  overflow-x: hidden;
  overflow-y: hidden;
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

.el-form {

}

.el-button {
  width: 100px;
  position: relative;
  right: 30px;
}

.detail-title {
  display: block;
  position: relative;
  width: 400px;
  padding-top: 70px;
  padding-bottom: 50px;
  left: 40px;
  margin: 0 auto;
  /*vertical-align: center;*/
  font-size: 40px;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

</style>
