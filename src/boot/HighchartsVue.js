// import something here
import HighchartsVue from 'highcharts-vue'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(HighchartsVue, { tagName: 'charts' })
}
