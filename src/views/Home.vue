<template>
<div class="box">
  <HeadNav></HeadNav>
  <div class="left">
<!--    <LeftNav style="height: 100%;"></LeftNav>-->
  </div>
  <div class="right">
    <iframe
        id="iframeId" :src="url" frameborder="0" class="pc iframe"  scrolling="auto">
      Connection failed.
    </iframe>
  </div>

</div>
</template>



<script>
export default {
  name: "Home",
  data () {
    return {
      url: 'http://192.168.43.234:5000/'
    }
  },
}
</script>

<style scoped>
.box{
  width: 100%;
  height: 1080px;
  background-color: #409EFF;
  display: flex;
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
  height: 100%;
  background-color: #42b983;
  margin-right:0;
  /*z-index: 1;*/
}
.iframe {

  width: 100%;
  height: 100%;
  background: #fff;
}
</style>

<!--<template>-->
<!--  <div class="clock">-->
<!--    <div class="digit hours" v-for="(item, index) in hours">-->
<!--      <div v-for="(items, index) in item" :class="{'segment': true,'activate': items}"></div>-->
<!--    </div>-->
<!--    <div class="separator"></div>-->
<!--    <div class="digit hours" v-for="(item, index) in minute">-->
<!--      <div v-for="(items, index) in item" :class="{'segment': true,'activate': items}"></div>-->
<!--    </div>-->
<!--    <div class="separator"></div>-->
<!--    <div class="digit hours" v-for="(item, index) in second">-->
<!--      <div v-for="(items, index) in item" :class="{'segment': true,'activate': items}"></div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->


<!--<script>-->
<!--export default {-->
<!--  name: "Home",-->
<!--  data () {-->
<!--    return {-->
<!--      hours: [],-->
<!--      minute: [],-->
<!--      second: [],-->
<!--      numList: [ // 数字对应的显示-->
<!--        [0,1,2,3,4,5],-->
<!--        [1,2],-->
<!--        [0,1,3,4,6],-->
<!--        [0,1,2,3,6],-->
<!--        [1,2,5,6],-->
<!--        [0,2,3,5,6],-->
<!--        [0,2,3,4,5,6],-->
<!--        [0,1,2],-->
<!--        [0,1,2,3,4,5,6],-->
<!--        [0,1,2,5,6]-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.clockData();-->
<!--    setInterval(() => {-->
<!--      this.clockData();-->
<!--    }, 1000);-->
<!--  },-->
<!--  methods: {-->
<!--    clockDisplay(arr, num) {-->
<!--      arr.forEach((el_i, i) => {-->
<!--        el_i.forEach((el_j, j) => {-->
<!--          this.numList[String(num)[i]].forEach((el_k, k) => {-->
<!--            if (el_k === j) {-->
<!--              el_i[j] = true;-->
<!--            }-->
<!--          })-->
<!--        })-->
<!--      })-->
<!--      return arr-->
<!--    },-->
<!--    clockData() {-->
<!--      const p = s => {return s < 10 ? '0' + s: s;} // 时间不足10位补0-->
<!--      const myDate     = new Date()-->
<!--      const getHours   = p(myDate.getHours());   // 时-->
<!--      const getMinutes = p(myDate.getMinutes()) // 分-->
<!--      const getSeconds = p(myDate.getSeconds()) // 秒-->
<!--      const arrs  = Array.from(new Array(2),() => new Array(7).fill(0))-->
<!--      this.hours  = this.clockDisplay(JSON.parse(JSON.stringify(arrs)), getHours)-->
<!--      this.minute = this.clockDisplay(JSON.parse(JSON.stringify(arrs)), getMinutes)-->
<!--      this.second = this.clockDisplay(JSON.parse(JSON.stringify(arrs)), getSeconds)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang='scss' scoped>-->
<!--.clock {-->
<!--  height:140px;-->
<!--  background:#000;-->
<!--  position:absolute;-->
<!--  top:50%;-->
<!--  left:50%;-->
<!-- //width:900px;-->
<!--  margin-left:-450px;-->
<!--  margin-top:-100px;-->
<!--  text-align:center;-->
<!--.intervalPoint{-->
<!--  display: inline-block;-->
<!--  height: 100px;-->
<!--.separator {-->
<!--  width:20px;-->
<!--  height:20px;-->
<!--  background:#00DCFF;-->
<!--  border-radius:50%;-->
<!--  display:block;-->
<!--  position:relative;-->
<!--  margin-bottom: 20px;-->
<!--}-->
<!--}-->
<!--.digit {-->
<!--  width:80px;-->
<!--  height:140px;-->
<!--  margin:0 0px;-->
<!--  position:relative;-->
<!--  display:inline-block;-->
<!--.segment {-->
<!--  background:#00DCFF;-->
<!--  border-radius:5px;-->
<!--  position:absolute;-->
<!--  opacity:0.15;-->
<!--  transition:opacity 0.2s;-->
<!--  -webkit-transition:opacity 0.2s;-->
<!--  -ms-transition:opacity 0.2s;-->
<!--  -moz-transition:opacity 0.2s;-->
<!--  -o-transition:opacity 0.2s;-->
<!--}-->
<!--.segment.on, .separator {-->
<!--  opacity:1;-->
<!--  box-shadow:0 0 50px rgba(255,0,0,0.7);-->
<!--  transition:opacity 0s;-->
<!--  -webkit-transition:opacity 0s;-->
<!--  -ms-transition:opacity 0s;-->
<!--  -moz-transition:opacity 0s;-->
<!--  -o-transition:opacity 0s;-->
<!--}-->
<!--.segment:nth-child(1) {-->
<!--  top:10px;-->
<!--  left:16px;-->
<!--  right:16px;-->
<!--  height:10px;-->
<!--}-->
<!--.segment:nth-child(2) {-->
<!--  top:20px;-->
<!--  right:10px;-->
<!--  width:10px;-->
<!--  height:75px;-->
<!--  height:calc(50% - 20px);-->
<!--}-->
<!--.segment:nth-child(3) {-->
<!--  bottom:20px;-->
<!--  right:10px;-->
<!--  width:10px;-->
<!--  height:75px;-->
<!--  height:calc(50% - 20px);-->
<!--}-->
<!--.segment:nth-child(4) {-->
<!--  bottom:10px;-->
<!--  right:16px;-->
<!--  height:10px;-->
<!--  left:16px;-->
<!--}-->
<!--.segment:nth-child(5) {-->
<!--  bottom:20px;-->
<!--  left:10px;-->
<!--  width:10px;-->
<!--  height:75px;-->
<!--  height:calc(50% - 20px);-->
<!--}-->
<!--.segment:nth-child(6) {-->
<!--  top:20px;-->
<!--  left:10px;-->
<!--  width:10px;-->
<!--  height:75px;-->
<!--  height:calc(50% - 20px);-->
<!--}-->
<!--.segment:nth-child(7) {-->
<!--  bottom:95px;-->
<!--  bottom:calc(50% - 5px);-->
<!--  right:19px;-->
<!--  left:19px;-->
<!--  height:10px;-->
<!--}-->
<!--}-->
<!--.systemTime-main{-->
<!--  display: inline-block;-->
<!--.systemTime-title{-->
<!--  background-color: rgb(255, 166, 75);-->
<!--  font-size: 30px;-->
<!--  width: 200px;-->
<!--  text-align: center;-->
<!--  margin-left: calc(50% - 100px);-->
<!--}-->
<!--.systemTime-date{-->
<!--.date-numble{-->
<!--  width: 60px;-->
<!--  height: 100px;-->
<!--  margin-right: -10px;-->
<!--  display: inline-block;-->
<!--  position: relative;-->
<!--.segment {-->
<!--  background:#00DCFF;-->
<!--  border-radius:5px;-->
<!--  position:absolute;-->
<!--  opacity:0.15;-->
<!--  transition:opacity 0.2s;-->
<!--  -webkit-transition:opacity 0.2s;-->
<!--  -ms-transition:opacity 0.2s;-->
<!--  -moz-transition:opacity 0.2s;-->
<!--  -o-transition:opacity 0.2s;-->
<!--}-->
<!--.segment.on, .separator {-->
<!--  opacity:1;-->
<!--  box-shadow:0 0 50px rgba(255,0,0,0.7);-->
<!--  transition:opacity 0s;-->
<!--  -webkit-transition:opacity 0s;-->
<!--  -ms-transition:opacity 0s;-->
<!--  -moz-transition:opacity 0s;-->
<!--  -o-transition:opacity 0s;-->
<!--}-->
<!--.segment:nth-child(1) {-->
<!--  top:10px;-->
<!--  left:16px;-->
<!--  right:16px;-->
<!--  height:10px;-->
<!--}-->
<!--.segment:nth-child(2) {-->
<!--  top:20px;-->
<!--  right:10px;-->
<!--  width:10px;-->
<!--  height:75px;-->
<!--  height:calc(50% - 20px);-->
<!--}-->
<!--.segment:nth-child(3) {-->
<!--  bottom:20px;-->
<!--  right:10px;-->
<!--  width:10px;-->
<!--  height:75px;-->
<!--  height:calc(50% - 20px);-->
<!--}-->
<!--.segment:nth-child(4) {-->
<!--  bottom:10px;-->
<!--  right:16px;-->
<!--  height:10px;-->
<!--  left:16px;-->
<!--}-->
<!--.segment:nth-child(5) {-->
<!--  bottom:20px;-->
<!--  left:10px;-->
<!--  width:10px;-->
<!--  height:75px;-->
<!--  height:calc(50% - 20px);-->
<!--}-->
<!--.segment:nth-child(6) {-->
<!--  top:20px;-->
<!--  left:10px;-->
<!--  width:10px;-->
<!--  height:75px;-->
<!--  height:calc(50% - 20px);-->
<!--}-->
<!--.segment:nth-child(7) {-->
<!--  bottom:95px;-->
<!--  bottom:calc(50% - 5px);-->
<!--  right:19px;-->
<!--  left:19px;-->
<!--  height:10px;-->
<!--}-->
<!--}-->
<!--}-->
<!--}-->
<!--}-->
<!--</style>-->






