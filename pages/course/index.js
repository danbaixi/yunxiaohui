// pages/course/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [
      {
        name: '网络工程',
        week: 2,
        section: 1,
        sectionCount: 1,
        address: '博雅楼302',
        color: '#D06969'
      },
      {
        name: '大学体育1',
        week: 2,
        section: 3,
        sectionCount: 2,
        address: '篮球场',
        color: '#86D069'
      },
      {
        name: '马克思列宁主义很长的名字我也不知道怎么办',
        week: 3,
        section: 5,
        sectionCount: 4,
        address: '信达楼392',
        color: '#AE69D0'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {windowWidth} = wx.getSystemInfoSync()
    this.setData({
      windowWidth
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})