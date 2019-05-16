// import something here
import Vue from 'vue'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(VueLodash, lodash)
}
