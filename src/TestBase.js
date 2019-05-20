import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import * as All from 'quasar'
import { Loading, Notify } from 'quasar'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import Client from 'src/store/ORM/client.js'
import Menu from 'src/store/ORM/menu.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import PrivateNote from 'src/store/ORM/private_notes.js'
import Event from 'src/store/ORM/calendarevents.js'

import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import _ from 'lodash';
import axios from 'axios'

import UserModules from 'src/store/UserModules/index.js'

import CMS from 'src/store/CMS/index.js'

// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

const components = Object.keys(All).reduce((object, key) => {
    const val = All[key]
    if (val && val.component && val.component.name != null) {
        object[key] = val
    }
    return object
}, {})
const localVue = createLocalVue()
localVue.use(Quasar, { components }) // , lang: langEn
localVue.use(VueLodash, lodash)

localVue.use(Vuex)

const database = new VuexORM.Database()

database.register(Nutritionist, 'nutritionists')
database.register(Client, 'clients')
database.register(Menu, 'menus')
database.register(PrivateNote, 'private_notes')
database.register(Event, 'events')
const store = new Vuex.Store({
    modules: {
        UserModules,
        CMS

    },
    plugins: [

        VuexORM.install(database)

    ],
});
Nutritionist.create({
    data: {
        id: 1,

        first_name: 'TestNutFN',
        last_name: 'TestNutLN',
        owner: 1,
    }
})
Client.create({
    data: {
        id: 1,
        created_at: Date.now(),
        nutritionist: 1,
        first_name: "FN_TestClient",
        last_name: "LN_TestClient",
        identification: "00000000",
        dob: "14.04.1983",
        height: "167",
        weight: "67",
        sex: "M",
        address: "koresh 4",
        email: "some@email.com",
        phone_number: "5646546546",
        got_free_menu: false
    }
})
Menu.create({
    data: {
        created_at: Date.now(),
        nutritionist: 1,
        id: 1,
        client: 1,
        meals: null,

    }
})
Event.create({
    data: {
        id: 1,
        title: 'title!!!',
        start: '1',
        end: '2',
        client: 1,
        nutritionist: 1,
    }

})
PrivateNote.create({
    data: {
        id: 1,
        title: 'NOTEtitle!!!',
        client: 1,
        nutritionist: 1,
    }

})

localVue.prototype.$q.loading = Loading
localVue.prototype.$q.notify = Notify
localVue.prototype.$_ = VueLodash._
localVue.prototype.$axios = axios.create({
    baseURL: ``,
    crossDomain: true



    // ^ ^ ^ this will allow you to use this.$axios
    //       so you won't necessarily have to import axios in each vue file
})
const base = {
    localVue,
    store,
    _
}
export default base
