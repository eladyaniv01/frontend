import Vue from 'vue'
import Vuex from 'vuex'

import UserModules from './UserModules/index.js'

import CMS from './CMS/index.js'
import createPersistedState from 'vuex-persistedstate'
// import calendar from './calendar'
import scroller from './scroller'
import common from './common'

// ORM
import VuexORM from '@vuex-orm/core'
import Client from 'src/store/ORM/client.js'
import Menu from 'src/store/ORM/menu.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import PrivateNote from 'src/store/ORM/private_notes.js'
import Event from 'src/store/ORM/calendarevents.js'



Vue.use(Vuex)
const database = new VuexORM.Database()

database.register(Nutritionist, 'nutritionists')
database.register(Client, 'clients')
database.register(Menu, 'menus')
database.register(PrivateNote, 'private_notes')
database.register(Event, 'events')



/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
  modules: {
    UserModules,
    CMS,
    // calendar,
    common,
    scroller
  },
  plugins: [

    VuexORM.install(database),
    createPersistedState()
  ],
});


export default store








