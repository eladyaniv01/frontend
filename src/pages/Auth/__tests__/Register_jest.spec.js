/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import * as All from 'quasar'
import Vuex from 'vuex'
import UserModules from 'src/store/UserModules/index.js'
import CMS from 'src/store/CMS/index.js'

import * as constants from 'src/services/ServiceConstants'
import axios from 'axios'

// app ext
import { QFlashcard, QFlashcardSection } from '@quasar/quasar-app-extension-qflashcard'
import { Loading, Notify } from 'quasar'

import VuexORM from '@vuex-orm/core'
import Client from 'src/store/ORM/client.js'
import Menu from 'src/store/ORM/menu.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import PrivateNote from 'src/store/ORM/private_notes.js'
import Event from 'src/store/ORM/calendarevents.js'
import PageRegister from 'src/pages/Auth/Register.vue'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import _ from 'lodash';


// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

const components = Object.keys(All).reduce((object, key) => {
    const val = All[key]
    if (val && val.component && val.component.name != null) {
        object[key] = val
    }
    return object
}, {})

describe('Register.vue desktop', () => {
    const localVue = createLocalVue()

    //ext
    // localVue.component("q-flashcard", { QFlashcard })



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
    localVue.prototype.$store = store
    // from boot
    localVue.prototype.$axios = axios.create({
        baseURL: `${constants.APIURL}`,
        crossDomain: true
    })
    localVue.filter('title', function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    })
    localVue.prototype.$q.loading = Loading
    localVue.prototype.$q.notify = Notify
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

    let url = ''
    let data = ''

    const mockHttp = {
        get: (_url, _data) => {
            return new Promise((resolve, reject) => {
                url = _url
                data = _data
                resolve()
            })
        },
        post: (_url, _data) => {
            return new Promise((resolve, reject) => {
                url = _url
                data = _data
                resolve()
            })
        }
    }

    const wrapper = shallowMount(PageRegister, {
        store,
        localVue,
        mocks: {
            $axios: mockHttp

        }






    })
    const vm = wrapper.vm
    wrapper.setData({
        form: {
            username: '',
            password: '',
            email: ''
        }
    })


    console.log(wrapper)
    let username = wrapper.find('#username')
    console.log('USERNAME ', username)
    console.log('VALUE ', username.value)
    username.value = "Alice"
    username.trigger('input')
    console.log('after trigger VALUE ', username.value)
    // lets find it again

    let after = wrapper.find('#username')
    console.log(after)
    console.log(after.value)
    let password = wrapper.find('#password')
    let email = wrapper.find('#email')
    password.value = 12345
    password.trigger('input')
    email.value = "e@e.com"
    email.trigger('input')

    let button = wrapper.find('#button')
    button.trigger("submit.prevent")
    // wrapper.find("[data-form.password]").setValue("12345")
    // wrapper.find("[data-form.email]").setValue("e@e.com")
    // wrapper.find("form").trigger("submit.prevent")

    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })

    it('methods check', () => {
        expect(typeof vm.registerIt).toBe('function')




    })
    it('method registerIt() ', () => {
        console.log(vm.registerIt())
    })
    it('check localStorage', () => {
        console.log(localStorage)
    })



})



// #######################################################################################

