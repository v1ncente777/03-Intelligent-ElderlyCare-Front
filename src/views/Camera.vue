<template>
  <div id="Camera">
<!--    <iframe-->
<!--        id="iframeId" :src="url" frameborder="0" class="pc iframe"  scrolling="auto">-->
<!--    </iframe>-->
    <div class="pic">
      <img src="../assets/collectingFace.png">
    </div>
    <div class="title">
      <span>
        正在录入人像信息<br>
        请在管理员及摄像头语言提示下正确录入<br>
        录入结束后跳转至信息界面查看<br>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: "Camera",
  data(){
    return {
      url: '',
      urls: [],
    }
  },

  created() {
    this.$http.get(this.global.baseURL + '/back/service_num',{

    }).then(res=>{
      console.log(res.data)
      if (res.data>0){
        this.$http.get(this.global.baseURL + '/back/service',{

        }).then(res=>{
          console.log(res.data)
          if(res.data!==''){
            console.log(res.data['lzh'])
            this.urls = res.data
            this.$http({
              method: 'post',
              url: this.global.baseURL + '/back/startCollectingFaces',
              data: {
                'id': this.$route.params.id,//用户
                'type': this.$route.params.type,//摄像头类型:1.oldpeople,2.employee,3.volunteer
                'url': res.data['lzh'],//摄像头选择
              }
            }).then(res=>{
              console.log(res)
              // this.url = this.urls[0] + 'collecting_faces_image'
            })
          }
        })
      }else{
        alert('摄像头占用')
      }
    })
  }
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
