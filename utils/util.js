function getNowWeek(startDate, totalWeek) {
  const nowDate = new Date().getTime()
  startDate = new Date(startDate)
  const time = nowDate - startDate
  let nowWeek = Math.ceil(time / 1000 / 60 / 60 / 24 / 7)
  if (nowWeek > totalWeek) {
    nowWeek = 1
  }
  return nowWeek
}

module.exports = {
  getNowWeek
}
