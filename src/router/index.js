import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Register from "@/views/Register";
import Home from "@/views/Home";
import Shoot from "@/views/Shoot";
import HomeInform from "@/views/HomeInform";
import Camera from "@/views/Camera";
import AdminDetails from "@/views/AdminDetails";

import OldManInfo from "@/views/OldManInfo";
import OldManAdd from "@/views/OldManAdd";
import OldManDetails from "@/views/OldManDetails";

import VolunteerInfo from "@/views/VolunteerInfo";
import VolunteerAdd from "@/views/VolunteerAdd";
import VolunteerDetails from "@/views/VolunteerDetails";

import WorkerInfo from "@/views/WorkerInfo";
import WorkerAdd from "@/views/WorkerAdd";
import WorkerDetails from "@/views/WorkerDetails";
import ImageDetails from "@/views/ImageDetails";

import Oldchart from "@/views/Oldchart";
import Volunteerchart from "@/views/Volunteerchart";
import Wokerchart from "@/views/Wokerchart";

import CCTV1 from "@/views/CCTV1";
import CCTV2 from "@/views/CCTV2";
import CCTV3 from "@/views/CCTV3";
import CCTV4 from "@/views/CCTV4";

import Update from "@/views/Update";
import { registerAction } from 'echarts';

// import HomePage from "@/views/HomePage";
// import Details from "@/views/Details";
// import MessageCenter from "@/views/MessageCenter";


Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'HomeInform',
        component: HomeInform
    },
    {
        path: '/Shoot/:name',
        name: 'Shoot',
        component: Shoot
    },
    {
        path: '/HomeInform',
        name: 'HomeInform',
        component: HomeInform
    },
    {
        path: '/login',
        name: 'Login',
        // component: Login,
        component: Login,
        //单个路由守卫，如果已经获取了session信息，访问登录界面就直接进入主界面
        beforeEnter: (to, from, next) => {
            if(sessionStorage.getItem("user") != null) {
                next("HomeInform")
            } else {
                next()
            }
        }
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register,
        beforeEnter: (to, from, next) => {
            if(sessionStorage.getItem("user") != null) {
                next("HomeInform")
            } else {
                next()
            }
        }
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/AdminDetails',
        name: 'AdminDetails',
        component: AdminDetails
    },
    {
        path: '/Camera/:id/:type',
        name: 'Camera',
        component: Camera
    },
    {
        path: '/OldManInfo',
        name: 'OldManInfo',
        component: OldManInfo
    },
    {
        path: '/OldManDetails/:id',
        name: 'OldManDetails',
        component: OldManDetails
    },
    {
        path: '/OldManAdd',
        name: 'OldManAdd',
        component: OldManAdd
    },

    {
        path: '/VolunteerInfo',
        name: 'VolunteerInfo',
        component: VolunteerInfo
    },
    {

        path: '/VolunteerDetails/:id',
        name: 'VolunteerDetails',
        component: VolunteerDetails
    },
    {
        path: '/VolunteerAdd',
        name: 'VolunteerAdd',
        component: VolunteerAdd
    },
    //-----------
    {
        path: '/WorkerInfo',
        name: 'WorkerInfo',
        component: WorkerInfo
    },
    {

        path: '/WorkerDetails/:id',
        name: 'WorkerDetails',
        component: WorkerDetails
    },
    {
        path: '/WorkerAdd',
        name: 'WorkerAdd',
        component: WorkerAdd
    },
    {
        path: '/ImageDetails/:id/:type',
        name: 'ImageDetails',
        component: ImageDetails
    },
    {
        path: '/Oldchart',
        name: 'Oldchart',
        component: Oldchart,
    },
    {
        path: '/Volunteerchart',
        name: 'Volunteerchart',
        component: Volunteerchart,
    },
    {
        path: '/Wokerchart',
        name: 'Wokerchart',
        component: Wokerchart,
    },
    {
        path: '/CCTV1',
        name: 'CCTV1',
        component: CCTV1,
    },
    {
        path: '/CCTV2',
        name: 'CCTV2',
        component: CCTV2,
    },
    {
        path: '/CCTV3',
        name: 'CCTV3',
        component: CCTV3,
    },
    {
        path: '/CCTV4',
        name: 'CCTV4',
        component: CCTV4,
    },
    {
        path: '/Update',
        name: 'Update',
        component: Update,
    },
    {
        path: '/screen',
        name: 'screen',
        component: screen,
    }
    // {
    //     path: '/',
    //     name: 'HomePage',
    //     component: HomePage
    // },
    // {
    //     path: '/Details',
    //     name: 'Details',
    //     component: Details
    // },
    // {
    //     path: '/MessageCenter',
    //     name: 'MessageCenter',
    //     component: MessageCenter
    // }


]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//路由全局守卫
router.beforeEach((to, from, next) => {
    if( (to.name !== 'Register' && to.name !== 'Login') && sessionStorage.getItem("user") == null) {

        // alert(to.name)
        next("Login")
    } else {
        next()
    }

});

export default router
