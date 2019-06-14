// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.filter('pb', function (value) {
    if (!value) { return '' }
    value = value.toString().toLowerCase()
    // alert(value)
    if (value == 'false' || value == 'no') {

      return "✘"
    }
    return "✔"
  })
}
