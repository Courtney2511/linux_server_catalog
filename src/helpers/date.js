import moment from 'moment'

function formatUnixShortDate(date) {
  return moment.unix(date).format("MMM D, YYYY")
}

module.exports = {
  formatUnixShortDate,
}
