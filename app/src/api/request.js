// 对于axios进行二次封装
import axios from "axios";

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests其实就axios，只不过咱们可以稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现/api
    baseURL: '/api',
    // 代表请求超时的时间为5s
    timeout: 5000,
})
// 请求拦截器：在发请求之前，它可以检测到，并做一些事情
requests.interceptors.request.use((config) => {
    // config是一个配置对象，对象里面有一个属性很重要：headers请求头
    //config内主要是对请求头Header配置
    //比如添加token
    return config
})
// 响应拦截器
requests.interceptors.response((response) => {
    // 请求成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到并做一些事情
    return response.data
}, (error) => {
    // 请求失败的回调函数
    console.log("服务器相应失败" + error);
    // 这里终止Promise链
    return Promise.reject(new Error('Fail'))
})

// 对外暴露
export default requests