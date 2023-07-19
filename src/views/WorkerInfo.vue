<template>
  <div id="WorkerInfo" class="box">

    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="background: #993333;padding-bottom: 4px;margin-bottom: 30px">
        <el-breadcrumb-item :to="{path:'/WorkerInfo'}" style="padding: 10px 0 2px 10px; font-size: 1.5em;color: #d9d9d9">工作人员信息列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <!--搜索框-->
        <el-row :gutter="10">
          <el-col :span="6" class="grid">
            <el-input style="left: 10px" v-model="input" placeholder="请输入关键词"></el-input>
          </el-col>
          <el-col :span="4" class="grid">
            <el-select v-model="chosenValue" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" class="grid">
            <el-button type="success" icon="el-icon-search" @click.prevent="search()">搜索</el-button>

          </el-col>
          <el-col :span="2" class="grid" style="padding-left: 50px">
            <el-button type="info" @click="listAllInfo()">重置</el-button>
          </el-col>
        </el-row>

        <br>
        <!--表格数据及操作-->
        <!-- 加载设置 -->
        <el-table
            :cell-style="{ textAlign: 'center' }"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            align="center"
            fit
            :data="filteredList.slice((currPage-1)*pageSize,currPage*pageSize)" border style="width: 100%"
            ref="multipleTable" tooltip-effect="dark">
          <!--勾选框-->
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <!--索引-->
          <!-- <el-table-column type="index" :index="indexMethod"></el-table-column> -->
          <el-table-column prop="id" label="id" sortable></el-table-column>
          <!-- <el-table-column prop="profile_photo" label="头像">
            <template slot-scope="scope">
              <el-image
                  :src="scope.row.profile_photo"
                  @click="imginto(scope.$index, scope.row, 'employee')"></el-image>
            </template>
          </el-table-column> -->
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="id_card" width="180px" label="身份证号"></el-table-column>
<!--          <el-table-column prop="room_number" width="80px" label="房间号"></el-table-column>-->
          <el-table-column prop="birthday" label="出生日期" :formatter="dateFormat" sortable></el-table-column>
          <el-table-column prop="hire_date" label="入职日期" :formatter="dateFormat" sortable></el-table-column>
          <el-table-column prop="resign_date" label="离职日期" :formatter="dateFormat" sortable></el-table-column>

          <el-table-column label="编辑">
            <template slot-scope="scope">
              <router-link to="/WorkerDetails">
                <el-button type="primary" icon="el-icon-edit" size="mini"
                           @click.prevent="updateInfo(scope.$index, scope.row)">编辑
                </el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="删除">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click.prevent="open(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <br>
      <div class="page-block">
        <el-pagination
            layout="prev, pager, next"
            :total="filteredList.length"
            :page-size="pageSize"

            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>

    </el-main>
    <!--    </el-container>-->
    <!--  </el-container>-->

    <div class="tip">
    </div>
  </div>
</template>

<script>
export default {
name: "WorkerInfo",
  created() {
    this.listAllInfo();
  },
  data() {
    return {
      type: 3,
      //查询输入框数据
      input: '',
      list: [], // 存放列表数据
      filteredList: [], //处理过的列表数据，用于搜索

      total: 0,
      currPage: 1,  //默认第一页
      pageSize: 8, //默认展示5条数据

      options: [{
        value: 'id',
        label: 'id'
      }, {
        value: 'username',
        label: '姓名'
      }, {
        value: 'id_card',
        label: '身份证'
      },
      //   {
      //   value: 'room_number',
      //   label: '房间号'
      // },
        {
        value: 'birthday',
        label: '出生日期'
      }, {
        value: 'hire_date',
        label: '入职日期'
      }, {
        value: 'resign_date',
        label: '离职日期'
      }],
      //被选中的值
      chosenValue: 'username'

    };
  },
  methods: {

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currPage = val;
    },


    //列出数据
    listAllInfo() {
      // 由于已经导入了 Vue-resource这个包，所以 ，可以直接通过  this.$http 来发起数据请求
      this.$http.get(this.global.baseURL + this.global.workerURL.getAll).then(result => {
        // 注意： 通过 $http 获取到的数据，都在 result.body 中放着
        // eslint-disable-next-line no-redeclare
        // var result = result.body;

        if (result.status === 200) {
          // 成功了
          this.list = result.data.data.Info;
          // this.list = result.data;
          this.filteredList = this.list;
          console.log("@@@");
          console.log(result.data.data.Info);
        } else {
          // 失败了
          this.$message.error("获取数据失败！");
        }
      });
    },
    //时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "未填";
      }
      return this.$moment(date).format("YYYY-MM-DD");
    },
    //删
    deleteInfo(index, row) {
      this.$http.delete(this.global.baseURL + this.global.workerURL.delete + "/" + row.id).then(result => {
        console.log(result.data)
        if (result.status === 200) {
          // 删除成功
          this.listAllInfo();
          // alert("删除成功！");
        } else {
          this.$message.error("删除失败！");
        }
      });
    },
    //查
    search() {
      this.currPage = 1

      if (this.chosenValue === 'id')
        this.filteredList = this.list.filter(data => data['id'] == this.input)
      else
        this.filteredList = this.list.filter(data => data[this.chosenValue].includes(this.input))


      // this.$http.get(this.global.baseURL + "/data/" + this.input).then(result => {
      //   // eslint-disable-next-line no-redeclare
      //   // var result = result.body;
      //   if (result.status === 200) {
      //     this.list = [];
      //     this.list.push(result.data);
      //   } else {
      //     alert("查找失败！");
      //   }
      // });
    },
    //进入编辑界面
    updateInfo(index, row) {
      this.$router.push({
        path: `/WorkerDetails/${row.id}`
      });
    },

    //进入头像界面
    imginto(index, row, type) {
      this.$router.push({
        path: `/ImageDetails/${row.id}/${type}`,
      });
    },

    open(index, row) {
      this.$confirm('是否删除该条信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteInfo(index, row),

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }

}
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  /*background-color: #766d17;*/
  /*background: url('../assets/colorful.png');*/
  /*background-size: cover;*/
}

.el-main {
  /*width: 1600px;*/
  width: 100%;
  height: 840px;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 30px;
  margin-top: 50px;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-button {
  width: 80px;
}

.tip {
  height: auto;
  width: 100%;
  /*background-color: #ffb352;*/
  text-align: center;
  padding-top: 20px;
}
</style>
