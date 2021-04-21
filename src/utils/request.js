import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { Toast, Dialog } from 'vant'
import store from '@/store'
import { localToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = localToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log(JSON.stringify(response))
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
			// eslint-disable-next-line no-mixed-spaces-and-tabs
    	Toast({
				position: 'top',
        message: res.msg || 'Error',
        type: 'fail',
        duration: 2 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 10401 || res.code === 10403 || res.code === 50014) {
				Dialog.confirm({
          title: '已退出登录',
          message: '当前用户已退出登录, 是否跳转到登录页, 或点击取消停留在本界面.'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err111' + error) // for debug
		Toast({
			position: 'top',
			message: error.toString().replace('Error:', ''),
      type: 'fail'
    })
    return Promise.reject(error)
  }
)

export default service
