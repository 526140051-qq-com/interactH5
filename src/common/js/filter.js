import moment from 'moment'

let formatDate = (value, fmt) => {
  return moment(value).format(fmt || 'YYYY-MM-DD')
}
export {
  formatDate
}
