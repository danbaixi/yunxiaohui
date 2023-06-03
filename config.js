
let env = "develop"

// 防止我们在上传代码的时候，没有将env改成production
const envVersion = wx.getAccountInfoSync().miniProgram.envVersion
if (envVersion === "release" && env !== "production") {
  env = "production"
}

export default {
  env,
  baseUrl: {
    develop: 'http://localhost:3000', 
    production: 'http://api.xxx.com',
  }
}