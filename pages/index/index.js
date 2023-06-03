const app = getApp()
Page({
  data: {
    navList: [
      {
        title: '查课表',
        icon: '/asset/imgs/course.png',
        path: '/pages/course/index'
      },
      {
        title: '查成绩',
        icon: '/asset/imgs/score.png',
        path: '/pages/score/index'
      },
      {
        title: '查考勤',
        icon: '/asset/imgs/attendance.png',
        path: '/pages/attendance/index'
      },
      {
        title: '校历',
        icon: '/asset/imgs/calendar.png',
        path: '/pages/calendar/index'
      },
    ]
  },
  onLoad() {

  },

  nav(e) {
    const index = e.currentTarget.dataset.index
    const path = this.data.navList[index].path
    wx.navigateTo({
      url: path,
    })
  }
})
