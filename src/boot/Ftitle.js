// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.filter('title', function (value) {
    if (!value) { return '' }
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  })
}
