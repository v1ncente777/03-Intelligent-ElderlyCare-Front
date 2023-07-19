<template>
  <div id="Camera">
    <div class="pic">
      <img src="../assets/collectingFace.png">
    </div>
    <div class="title">
      <span>
        正在更新模型<br>
        请等待更新完毕后再使用当前摄像头<br>
        避免摄像头出现异常<br>
        若要使用<br>
        请调用其余摄像头<br>
        或等待更新完毕<br>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: "Update",
  data(){
    return {

    }
  },
}
</script>

<style scoped>
#Camera{
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
}
.pic{
  width: 55%;
  height: 660px;
  margin: 53px 0 0 0;
}
.title{
  width: 45%;
  height: 660px;
  margin: 53px 0 0 0;
  /*line-height:60px;*/
  display: flex;
  align-items: center;
  background-color: #ffffff;
}
span{
  margin: 0 auto;
  color: #409EFF;
  font-size: 1.5em;
}
</style>
