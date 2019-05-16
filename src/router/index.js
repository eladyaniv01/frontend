import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store'
import {
  Loading,

  // optional!, for example below
  // with custom spinner
  QSpinnerGears
} from 'quasar'
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
function parseBool(type) {
  return typeof type == 'string' ? JSON.parse(type) : type
}
export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })



  Router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    store.dispatch('UserModules/FetchToken')
    Loading.show({
      spinner: QSpinnerGears,
      // other props
    })
    if (
      to.path != '/login' &&
      to.path != '/register' &&
      !store.state['UserModules'].token
    ) {

      next('/login')
      Loading.hide()
    } else {

      next()
    }
  })

  Router.afterEach((to, from) => {
    Loading.hide()
  })

  return Router
}
