//全局变量
// const baseURL = "http://localhost:3000"
const baseURL = "http://192.168.31.55:9000"

const loginRegisterURL = {
    login: "/back/login",
    register: "/back/register"
}

//老人接口路径
const oldManURL = {
    // add: "/data",
    // delete: "/data",
    // update: "/data",
    // getAll: "/getalloldmaninfo",
    // getOne: "/data"
    add: "/back/addoldmaninfo",
    delete: "/back/deleteoldmaninfo",
    update: "/back/updateoldmaninfo",
    getAll: "/back/getalloldmaninfo",
    getOne: "/back/getoldmaninfo"
}

const volunteerURL = {
    // add: "/data",
    // delete: "/data",
    // update: "/data",
    // getAll: "/getallvolunteerinfo",
    // getOne: "/getallvolunteerinfo"
    add: "/back/addvolunteerinfo",
    delete: "/back/deletevolunteerinfo",
    update: "/back/updatevolunteerinfo",
    getAll: "/back/getallvolunteerinfo",
    getOne: "/back/getvolunteerinfo"
}

const workerURL = {
    // add: "/data",
    // delete: "/data",
    // update: "/data",
    // getAll: "/getallemployeeinfo",
    // getOne: "/data"
    add: "/back/addemployeeinfo",
    delete: "/back/deleteemployeeinfo",
    update: "/back/updateemployeeinfo",
    getAll: "/back/getallemployeeinfo",
    getOne: "/back/getemployeeinfo"
}


const adminURL = {
    update: "/back/updateadmininfo",
    changepasswd: "/back/updateadminpassword"

}

export default {
    baseURL,
    oldManURL,
    volunteerURL,
    workerURL,
    adminURL,
    loginRegisterURL
}

