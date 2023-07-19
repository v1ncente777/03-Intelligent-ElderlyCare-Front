<template>
  <div class="box">
    <div class="right">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="padding: 10px 0 2px 10px; font-size: 1.5em;">数据统计</el-breadcrumb-item>
        <el-breadcrumb-item  style="padding: 15px 0 2px 0; font-size: 1.1em; color: white">老年人报表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="videos">
        <el-main class="show">
          <div id="echart1" ref="first"></div>
        </el-main>
        <el-aside class="infom"></el-aside>
      </div>
      <div class="tip">
      </div>

    </div>
  </div>
</template>



<script>
export default {
  name: "Oldchart",
  data () {
    return {
      chartInstance:null,
      xData:['60','60-70','70-80','80-90','90'], //X轴数据
      yData:['10','54','20','13','5'], //Y轴数据
      title:'老年人各年龄段分布', //(string)图表标题
      xName:'年龄段', //(string)X轴标题
      yName:'人数', //(string)Y轴标题
      series_data:[], //柱状图的纵坐标数据
    }
  },
  created() {
    // this.init_chart();
    // this.chartInstance.showLoading();
    // this.getData();
    // // this.init_color();
    // this.update_chart();
    // window.addEventListener('resize', this.resizeHandler)
    //
    // window.addEventListener("resize",function() {
    //   this.$refs.first.chartInstance.resize();
    // });
  },
  mounted() {
    this.init_chart();
    this.chartInstance.showLoading();
    this.getData();
    // this.init_color();
    // this.update_chart();
    window.addEventListener('resize', this.resizeHandler)

    window.addEventListener("resize",function() {
      this.$refs.first.chartInstance.resize();
    });
  },
  beforeDestroy() { // 清理工作 避免内存泄漏
    // 销毁监听事件
    window.removeEventListener('resize', this.resizeHandler)
    // 销毁 Echarts 实例
    this.chartInstance.dispose()
  },
  methods: {
    resizeHandler() {
      this.chartInstance.resize()
    },
    init_chart() {
      let _this=this;
      _this.chartInstance = this.$echarts.init(document.getElementById("echart1"),null,{renderer:'svg'});
    },
    getData() {
      // this.series_data = [2,0,2,0,0]
      this.$http.get(this.global.baseURL + '/back/oldrecord',{

      }).then(res=>{
        console.log(res)
        if(res.data.data!==''&&res.data.message==='获取成功'){
          this.series_data.push(res.data.data['<60'])
          this.series_data.push(res.data.data['60-70'])
          this.series_data.push(res.data.data['70-80'])
          this.series_data.push(res.data.data['80-90'])
          this.series_data.push(res.data.data['>90'])
          console.log(this.series_data)
          this.update_chart()
        }
      })
    },
    update_chart(){
      console.log(this.series_data)
      let _this = this;
      _this.chartInstance.hideLoading();
      const option={
        tooltip:{
          trigger:'item',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox:{
          feature:{
            // saveAsImage:{
            //   type:'svg',
            //   pixelRatio:10,
            //   excludeComponents:['toolbox','dataZoom'],
            // },
          }
        },
        grid: {

        },
        title:{
          text:_this.title,
          x:'center'
        },
        xAxis: {
          name:_this.xName,
          type: 'category',
          data: _this.xData,
          axisLabel:{
            type: 'shadow',
            interval:0,
            rotate:0,
            inside:false,
            textStyle:{
              fontSize:10
            }
          }
        },
        yAxis: {
          name:_this.yName,
          scale:true,
          type: 'value',
          min: 0,
          max: 15,
          interval: 3,
          axisLabel: {
            formatter: '{value} 人'
          }
        },
        // series: _this.series_data,
        series:[{
          data: _this.series_data,
          type: 'bar',
        }],
        legend:{
          orient:'vertical',
          x:'right',
          y:'center'
        },
      }
      _this.chartInstance.setOption(option);
    },
  },

}
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
  background-color: #226e90;
  display: flex;
  /*background: url('../assets/color.png');*/
  background-size: cover;
}
.right{
  width: 100%;
  height: 660px;
  margin: 53px 0 0 0;
}
.videos{
  width: 100%;
  height: auto;
  display: flex;
}
.show{
  width: 70%;
  height: 629px;
  background-color: #e8e8e8;
}
.infom{
  height: 630px;
  width: auto;
  /*background-color: #ffb352;*/
  text-align: center;
  padding: 20px;
  background: url('../assets/Oldchart.png');
  background-size: cover;
}
.tip{
  height: auto;
  width: 100%;
  /*background-color: #ffb352;*/
  text-align: center;
  padding-top: 20px;
}
#echart1 {
  /*height: 432px;*/
  /*width: 768px;*/
  height: 90%;
  width: 80%;
  background: #ffffff;
  margin: 10px auto;
}
</style>

<style>
span.el-breadcrumb__inner {
  color: #ffffff;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
   color: #ffffff!important;
  cursor: text;
}
</style>

