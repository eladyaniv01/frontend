/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Models from 'src/store/ORM/models.js'
import Event from 'src/store/ORM/calendarevents.js'

import EventBox from 'src/components/EventBox.vue'



const localVue = base.localVue
const store = base.store

describe('EventBox.vue ...', () => {

    const wrapper = shallowMount(EventBox, {
        store,
        localVue,
        propsData: {
            model: Models.Event.find(1),
            fields: ['client', 'nutritionist', 'id', 'start', 'end']
        }






    })
    const vm = wrapper.vm
    console.log(wrapper)

    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })
    it('computes check', () => {
        expect(typeof vm.sortedFields).toBe('object')
        expect(typeof vm.clientId).toBe('function')





    })
    it('methods check', () => {
        expect(typeof vm.singularize).toBe('function')
        expect(typeof vm.eventCount).toBe('function')
        expect(typeof vm.menuCount).toBe('function')
        expect(typeof vm.clientName).toBe('function')
        expect(typeof vm.nutritionistName).toBe('function')
        expect(typeof vm.getPath).toBe('function')
        expect(typeof vm.getDate).toBe('function')

    })

    // it('clientId() works ', () => {
    //     expect(vm.clientId(Models.Event.find(1))).toBe('1')
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


// #######################################################################################

