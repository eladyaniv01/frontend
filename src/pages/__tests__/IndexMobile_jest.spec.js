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

describe('Index.vue Mobile', () => {


    const wrapper = shallowMount(PageIndex, {
        store,
        localVue






    })
    const vm = wrapper.vm
    vm.$q.platform.is.desktop = !vm.$q.platform.is.desktop
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
    it('method getBody works ', () => {
        let payload = '<table class="table table-bordered">'
        expect(vm.getBody(payload)).toBe('<div class="q-markup-table q-table__container bg-blue-grey-2 shadow-5 q-table--cell-separator q-table--bordered q-table--no-wrap"><table class="q-table">')
    })


})



// #######################################################################################

