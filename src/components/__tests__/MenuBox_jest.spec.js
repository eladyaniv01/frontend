/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Models from 'src/store/ORM/models.js'

import MenuBox from 'src/components/MenuBox.vue'


const localVue = base.localVue
const store = base.store

describe('MenuBox.vue', () => {



    const wrapper = shallowMount(MenuBox, {
        store,
        localVue,
        propsData: {
            model: Models.Event.find(1),
            fields: ['menus', 'nutritionist', 'id', 'start', 'end'],
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


    it('getPath() works ', () => {
        expect(vm.getPath(1, 'id')).toStrictEqual({ "name": "ClientDetail", params: { id: 1 } })
    })


})


// #######################################################################################

