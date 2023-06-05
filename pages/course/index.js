// pages/course/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowWeek: 1, // 当前周
    totalWeek: 20, // 周总数
    showSwitchWeek: false, // 显示选择周数弹窗
    weekDayCount: 7,
    startDate: '2023/02/20', // 开学日期
    weekIndexText: ['一','二','三','四','五','六','日'],
    nowMonth: 1, // 当前周的月份
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
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {windowWidth} = wx.getSystemInfoSync()
    this.setData({
      windowWidth
    })
    this.getWeekDates()
    this.getNowWeek()
  },

  selectWeek() {
    this.setData({
      showSwitchWeek: true
    })
  },

  switchWeek(e) {
    const week = e.currentTarget.dataset.week
    this.setData({
      nowWeek: week,
      showSwitchWeek: false
    })
    this.getWeekDates()
  },

  hideSwitchWeek() {
    this.setData({
      showSwitchWeek: false
    })
  },

  getWeekDates() {
    const startDate = new Date(this.data.startDate)
    const addTime = (this.data.nowWeek - 1) * 7 * 24 * 60 * 60 * 1000
    const firstDate = startDate.getTime() + addTime
    const { month: nowMonth } = this.getDateObject(new Date(firstDate))
    const weekCalendar = []
    for(let i = 0; i<this.data.weekDayCount;i++) {
      const date = new Date(firstDate + i * 24 * 60 * 60 * 1000)
      const { day } = this.getDateObject(date)
      weekCalendar.push(day)
    }
    this.setData({
      nowMonth,
      weekCalendar
    })
  },

  getDateObject(date = new Date()) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return {
      year,
      month,
      day
    }
  },

  getNowWeek() {
    const nowDate = new Date().getTime()
    const startDate = new Date(this.data.startDate)
    const time = nowDate - startDate
    const nowWeek = Math.ceil(time / 1000 / 60 / 60 / 24 / 7)
    this.setData({
      nowWeek
    })
    this.getWeekDates()
  }
})