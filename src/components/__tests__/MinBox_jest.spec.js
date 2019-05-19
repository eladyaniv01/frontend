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
import Models from 'src/store/ORM/models.js'
import MinBox from 'src/components/MinBox.vue'
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

describe('MinBox.vue', () => {

    const localVue = createLocalVue()
    localVue.use(Quasar, { components }) // , lang: langEn
    localVue.use(VueLodash, lodash)

    localVue.use(Vuex)

    const database = new VuexORM.Database()

    database.register(Nutritionist, 'nutritionists')
    database.register(Client, 'clients')
    database.register(Menu, 'menus')
    database.register(PrivateNote, 'private_notes')
    database.register(Models.Event, 'events')
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
    Models.Event.create({
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



    const wrapper = shallowMount(MinBox, {
        store,
        localVue,
        propsData: {
            model: Models.Event.find(1),
            fields: ['menus', 'nutritionist', 'id', 'start', 'end', 'clients'],
            modelName: 'menus'
        }






    })
    const vm = wrapper.vm
    console.log(wrapper)

    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })
    it('computes check', () => {
        expect(typeof vm.sortedFields).toBe('object')
        // 





    })
    it('methods check', () => {
        expect(typeof vm.clientId).toBe('function')
        expect(typeof vm.singularize).toBe('function')
        expect(typeof vm.eventCount).toBe('function')
        expect(typeof vm.menuCount).toBe('function')
        expect(typeof vm.clientName).toBe('function')
        expect(typeof vm.nutritionistName).toBe('function')
        expect(typeof vm.getPath).toBe('function')
        expect(typeof vm.getDate).toBe('function')

    })

    // it('clientId() works ', () => {
    //     expect(vm.clientId(1)).toBe(1)
    // })
    it('getPath() works ', () => {
        expect(vm.getPath(1, 'id')).toStrictEqual({ "name": "ClientDetail", params: { id: 1 } })
    })
    it('singularize works ', () => {
        expect(vm.singularize('client')).toBe('client')
    })

    // it('eventCount ', () => {
    //     expect(vm.eventCount(wrapper.props('model'))).toBe(1)
    // })
    // it('menuCount ', () => {
    //     expect(vm.menuCount(wrapper.props('model'))).toBe(1)
    // })
    // it('noteCount ', () => {
    //     expect(vm.noteCount(wrapper.props('model'))).toBe(1)
    // })
    // it('clientName ', () => {
    //     expect(vm.clientName(wrapper.props('model').id)).toBe('(1) FN_TestClient')
    // })
    // it('nutritionistName ', () => {
    //     expect(vm.nutritionistName(wrapper.props('model').nutritionist)).toBe('(1) TestNutFN')
    // })



    // it('sets the correct default data', () => {
    //     expect(typeof vm.model).toBe('object')

    // })

})


// #######################################################################################

