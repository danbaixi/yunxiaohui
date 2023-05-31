// 创建请求
export default function createRequest(options) {
  // 返回一个Promise对象
  return new Promise((resolve) => {
    const token = wx.getStorageSync('token')
    // 未登录状态，跳转到登录页面
    if (options.needLogin !== false && !token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/index',
        })
      }, 1000);
      return
    }
    // 构建请求url
    // 这里暂时配置本地环境域名
    // 等我们把环境配置讲了，再进一步优化
    const baseUrl = "http://localhost:3000"
    const url = `${baseUrl}${options.url}`
    // 构建请求header，把token放到header
    const header = {
      token
    }
    // 设置showLoading
    // 因为showLoading要配合hideLoading使用，因此需要记录这个变量
    let showLoading = false
    if (options.loading !== false) {
      showLoading = true
      wx.showLoading({
        title: '正在加载',
        mask: true
      })
    }

    // 发送请求
    wx.request({
      url,
      method: options.method || 'GET',
      timeout: options.timeout || 20000,
      header,
      data: options.data || {},
      success(res) {
        res = res.data
        switch(res.code) {
          // 请求没问题
          case 0:
            return resolve(res)
          // 异常信息
          case -1:
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
            break;
          // 登录已失效，需要重新登录
          case 403:
            wx.showToast({
              title: '登录已失效，请重新登录',
              icon: 'none'
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/index',
              })
            }, 1000);
            break;
          // 其他异常
          default:
            wx.showToast({
              title: '服务开小差啦！',
              icon: 'none'
            })
            break
        }
      },
      fail() {
        wx.showToast({
          title: '服务开小差啦！',
        })
      },
      complete() {
        // 如果有loading，就隐藏
        if (showLoading) {
          wx.hideLoading()
        }
      }
    })
  })
}