/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Models from 'src/store/ORM/models.js'
import Event from 'src/components/Event.vue'

const localVue = base.localVue
const store = base.store





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
})


// #######################################################################################

