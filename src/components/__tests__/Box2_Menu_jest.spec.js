/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import * as All from 'quasar'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import Client from 'src/store/ORM/client.js'
import Menu from 'src/store/ORM/menu.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import PrivateNote from 'src/store/ORM/private_notes.js'
import Event from 'src/store/ORM/calendarevents.js'
import Box from 'src/components/Box.vue'
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

describe('with singular client,  with menus as model', () => {
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
    const wrapper = shallowMount(Box, {
        store,
        localVue,
        propsData: {
            fields: ['id', 'client', 'clients', 'randomFieldName', 'created_at'],
            model: Menu.find(1),
            modelName: 'menus',
            ICON: null
        },
        provide: {
            name() {
                return 'fooValues'
            }
        }





    })
    const vm = wrapper.vm
    console.log(wrapper)
    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })

    it('methods check', () => {
        expect(typeof vm.singularize).toBe('function')
        expect(typeof vm.eventCount).toBe('function')

        expect(typeof vm.clientName).toBe('function')
        expect(typeof vm.nutritionistName).toBe('function')
        expect(typeof vm.getPath).toBe('function')
        expect(typeof vm.getDate).toBe('function')

    })
    it('singularize works ', () => {
        expect(vm.singularize('menus')).toBe('menu')
    })
    it('singularize works ', () => {
        expect(vm.singularize('menu')).toBe('menu')
    })


    it('eventCount works ', () => {
        // console.log('MODEL = ', wrapper.props('model'))
        // expect(vm.eventCount(wrapper.props('model'))).toBe(0)
    })



    // it('clientName works ', () => {
    //     expect(vm.clientName(1)).toBe('')
    // })


    // it('accesses the shallowMount', () => {
    //     expect(vm.$el.textContent).toContain('rocket muffin')
    //     expect(wrapper.text()).toContain('rocket muffin') // easier
    //     expect(wrapper.find('p').text()).toContain('rocket muffin')
    // })

    it('sets the correct default data', () => {
        expect(typeof vm.model).toBe('object')

    })

    // it('correctly a model is passed in', () => {
    //     const button = wrapper.find('button')
    //     button.trigger('click')
    //     expect(vm.counter).toBe(1)
    // })

    it('formats a date without throwing exception', () => {
        // test will automatically fail if an exception is thrown
        // MMMM and MMM require that a language is 'installed' in Quasar
        let formattedString = date.formatDate(Date.now(), 'YYYY MMMM MMM DD')
        console.log('formattedString', formattedString)
    })
    // it('Box has start', () => {
    //     const button = wrapper.find('button')
    //     console.log(button)
    //     // button.trigger('click')
    //     // expect(vm.counter).toBe(1)
    // })
})



// #######################################################################################

