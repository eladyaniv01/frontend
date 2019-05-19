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
import Event from 'src/components/Event.vue'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import _ from 'lodash';
import {

    ClosePopup
} from 'quasar'

// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

const components = Object.keys(All).reduce((object, key) => {
    const val = All[key]
    if (val && val.component && val.component.name != null) {
        object[key] = val
    }
    return object
}, {})

describe('Event.vue', () => {
    const localVue = createLocalVue()
    localVue.use(Quasar, {
        components, directives: {
            ClosePopup
        }
    }) // , lang: langEn
    localVue.use(VueLodash, lodash)

    localVue.use(Vuex)
    localVue.prototype.$q = { notify: All.Notify }
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
            client: '1 FN_TestClient LN_TestClient',
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
    const MODEL = Client.find(1)


    const wrapper = shallowMount(Event, {
        store,
        localVue,
        propsData: {
            event: Models.Event.find(1)
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

    // it('notify check', () => {
    //     $q.notify({
    //         classes: 'text-bold text-h6',
    //         message: 'Success!',
    //         position: 'right',
    //         icon: 'fas fa-thumbs-up',

    //         type: 'info'
    //     })






    // })
    it('computes check', () => {
        expect(typeof vm.clients).toBe('object')
        expect(typeof vm.client).toBe('object')





    })

    it('methods check', () => {
        expect(typeof vm.del).toBe('function')
        expect(typeof vm.save).toBe('function')
        expect(typeof vm.show).toBe('function')
        expect(typeof vm.hide).toBe('function')
        expect(typeof vm.onDialogHide).toBe('function')
        expect(typeof vm.onOKClick).toBe('function')
        expect(typeof vm.onCancelClick).toBe('function')


        // })
        // it('singularize works ', () => {
        //     expect(vm.singularize('clients')).toBe('client')
        // })
        // it('singularize works ', () => {
        //     expect(vm.singularize('client')).toBe('client')
        // })

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
    it('hide  ()', () => {
        vm.hide
    })
    it('onclick ok  ()', () => {
        vm.onOKClick
    })
    // it('del  ()', () => {
    //     let event = _.defaultsDeep(Models.Event.find(1))
    //     // let event = Object.assign({}, ev)
    //     console.log(typeof event)
    //     console.log(Object.entries(event))
    //     console.log(Object.values(event))
    //     console.log('EVENT = ', event)
    //     console.log(vm.del(event))
    // })
})


// #######################################################################################

