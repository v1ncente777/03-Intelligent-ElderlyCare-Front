<template>
  <div class="box">
    <div class="right">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="padding: 10px 0 2px 10px; font-size: 1.5em;">数据统计</el-breadcrumb-item>
        <el-breadcrumb-item  style="padding: 15px 0 2px 0; font-size: 1.1em; color: white">工作人员报表</el-breadcrumb-item>
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
  name: "Wokerchart",
  data () {
    return {
      chartInstance:null,
      xData:['3月','4月','5月','6月','7月'], //X轴数据
      yData:['10','54','20','13','5'], //Y轴数据
      title:'工作人员信息', //(string)图表标题
      xName:'月份', //(string)X轴标题
      yName:'人数', //(string)Y轴标题
      series_data1:[],
      series_data2:[],//柱状图的纵坐标数据
    }
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
      this.$http.get(this.global.baseURL + '/back/employeerecord',{

      }).then(res=>{
        console.log(res)
        if(res.data.data!==''&&res.data.message==='获取成功'){
          var a =res.data.data['3'].split(',')
          var b =res.data.data['4'].split(',')
          var c =res.data.data['5'].split(',')
          var d =res.data.data['6'].split(',')
          var e =res.data.data['7'].split(',')
          this.series_data1.push(a[0])
          this.series_data1.push(b[0])
          this.series_data1.push(c[0])
          this.series_data1.push(d[0])
          this.series_data1.push(e[0])
          this.series_data2.push(a[1])
          this.series_data2.push(b[1])
          this.series_data2.push(c[1])
          this.series_data2.push(d[1])
          this.series_data2.push(e[1])
          console.log(this.series_data1)
          console.log(this.series_data2)
          this.update_chart()
        }
      })
    },
    update_chart(){
      let _this = this;
      _this.chartInstance.hideLoading();
      const option={
        tooltip:{
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['入院人数','离院人数']
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
          max: 10,
          interval: 2,
          axisLabel: {
            formatter: '{value} 人'
          }
        },
        // series: _this.series_data,
        series:[
          {
            name: '离院人数',
            type: 'line',
            stack: '人数',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: _this.series_data1,
          },
          {
            name: '入院人数',
            type: 'line',
            stack: '人数',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: _this.series_data2,
          },
        ],
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
  height: 90%;
  width: 80%;
  background: #ffffff;
  margin: 10px auto;
}
</style>

<style>

</style>

