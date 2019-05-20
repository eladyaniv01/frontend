/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Models from 'src/store/ORM/models.js'
import PageIndex from 'src/pages/Index.vue'

const localVue = base.localVue
const store = base.store

store.state['CMS'].stickyHeader = ''
store.state['CMS'].landingHeader = ''
store.state['CMS'].landingCards = []
store.state['CMS'].rightBlocks = ''
store.state['CMS'].leftBlocks = ''



describe('Index.vue desktop', () => {


    const wrapper = shallowMount(PageIndex, {
        store,
        localVue





    })
    const vm = wrapper.vm
    console.log(wrapper)
    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })

    it('methods check', () => {
        expect(typeof vm.getBody).toBe('function')




    })
    it('computes check', () => {
        expect(typeof vm.cardImgStyle).toBe('object')
        expect(typeof vm.style).toBe('object')
        expect(typeof vm.botstyle).toBe('object')



    })
    it("good response", () => {


    });

    // it("bad response", () => {
    //     $axios.get.mockImplementation(() => Promise.reject({}));
    //     // ...
    // });
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



// #######################################################################################

