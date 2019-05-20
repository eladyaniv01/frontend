/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'

import Box from 'src/components/Box.vue'
import Client from 'src/store/ORM/client.js'

const localVue = base.localVue
const store = base.store

describe('Box.vue', () => {




    const wrapper = shallowMount(Box, {
        store,
        localVue,
        propsData: {
            fields: ['clients', 'randomFieldName', 'created_at'],
            model: Client.find(1),
            modelName: 'clients',
            ICON: null
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
        expect(typeof vm.menuCount).toBe('function')
        expect(typeof vm.noteCount).toBe('function')
        expect(typeof vm.clientName).toBe('function')
        expect(typeof vm.nutritionistName).toBe('function')
        expect(typeof vm.getPath).toBe('function')
        expect(typeof vm.getDate).toBe('function')

    })
    it('singularize works ', () => {
        expect(vm.singularize('clients')).toBe('client')
    })
    it('singularize works ', () => {
        expect(vm.singularize('client')).toBe('client')
    })

    it('eventCount ', () => {
        expect(vm.eventCount(wrapper.props('model'))).toBe(1)
    })
    it('menuCount ', () => {
        expect(vm.menuCount(wrapper.props('model'))).toBe(1)
    })
    it('noteCount ', () => {
        expect(vm.noteCount(wrapper.props('model'))).toBe(1)
    })
    it('clientName ', () => {
        expect(vm.clientName(wrapper.props('model').id)).toBe('(1) FN_TestClient')
    })
    it('nutritionistName ', () => {
        expect(vm.nutritionistName(wrapper.props('model').nutritionist)).toBe('(1) TestNutFN')
    })



    it('sets the correct default data', () => {
        expect(typeof vm.model).toBe('object')

    })

})



// #######################################################################################

