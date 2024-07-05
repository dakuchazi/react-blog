import axios from "axios";

const instance = axios.create({
  baseURL: "/",
  validateStatus: function (status) {
    return status < 500; //这个不写的话  默认只有200-299的状态码才会resolve，其余的都会reject
  },
  timeout: 3000,
});

//请求拦截器
instance.interceptors.request.use(function (request) {
  console.log("===拦截器request===", request);
  return request;
});

//响应拦截器
instance.interceptors.response.use((response) => {
  console.log("===拦截器response===", response);
  if (response.data.code === "200") {
  }
  if (response.data.code === 401) {
  }
  if (response.data.code === 400 || response.data.code === 403) {
  }
  return response.data;
});

export default instance;
