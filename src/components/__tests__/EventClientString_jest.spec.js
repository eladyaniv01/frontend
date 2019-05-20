/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Models from 'src/store/ORM/models.js'
import Event from 'src/components/Event.vue'

import EventBox from 'src/components/EventBox.vue'



const localVue = base.localVue
const store = base.store

Models.Client.insert({
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


describe('Event.vue', () => {


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



    })
    it('hide  ()', () => {
        vm.hide
    })
    it('onclick ok  ()', () => {
        vm.onOKClick
    })

})


// #######################################################################################

