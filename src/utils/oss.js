//配置连接oss
let OSS = require('ali-oss')
export let client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI5t7F4EknEEwsvX7vTt3d',
    accessKeySecret: 'GDiOCB362FNZZHa1EqUPVaF42I5dEg',
    bucket: 'lzh-pic'
})

//单独标记每个文件
export function getCurrentDateTime(){
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1<10?"0"+new Date().getMonth()+1:new Date().getMonth()+1;
    const date =  new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate();
    const hh = new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours();
    const mm = new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes();
    const ss = new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds();
    const dateTime = year + month + date + hh + mm + ss ;
    return dateTime;
}

