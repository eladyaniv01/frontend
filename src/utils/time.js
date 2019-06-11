var moment = require('moment')
import Models from 'src/store/ORM/models.js'
export const padTime = (val) => {
  val = Math.floor(val)
  if (val < 10) {
    return '0' + val
  }
  return val + ''
}

export function newEventCount() {
  // int time interval (days) for a week it will be 7
  let now = moment(new Date())

  let count = 0

  let total = Models.Event.query().get()
  for (let i in total) {
    let ca = moment(Date.parse(total[i].start))
    // if (now.diff(ca, 'days') <= 7) {
    if (!now.isAfter(ca)) {
      // console.log(now.diff(ca, 'days', false))
      count += 1
    }
  }
  if (!count) {
    return null
  }
  return count
}
