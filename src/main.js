import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VideoJs from 'video.js';

import axios from 'axios'
import Moment from 'moment'
import global_variable from "@/utils/global_variable";
import OSS from 'ali-oss'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts


import LeftNav from "@/components/LeftNav";
import HeadNav from "@/components/HeadNav";

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

//存常量，例如http的地址
Vue.prototype.global = global_variable
// 绑定 moment 进行时间格式化
Vue.prototype.$moment = Moment;//赋值使用

Vue.component(LeftNav.name, LeftNav)
Vue.component(HeadNav.name, HeadNav)


new Vue({
  router,
  VideoJs,
  render: h => h(App),
}).$mount('#app')
