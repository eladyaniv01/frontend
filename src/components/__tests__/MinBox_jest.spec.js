/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Models from 'src/store/ORM/models.js'
import MinBox from 'src/components/MinBox.vue'

const localVue = base.localVue
const store = base.store




describe('MinBox.vue', () => {


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

