/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Box from 'src/components/Box.vue'
import Menu from 'src/store/ORM/menu.js'

const localVue = base.localVue
const store = base.store
describe('with singular client,  with menus as model', () => {

    const wrapper = shallowMount(Box, {
        store,
        localVue,
        propsData: {
            fields: ['id', 'client', 'clients', 'randomFieldName', 'created_at'],
            model: Menu.find(1),
            modelName: 'menus',
            ICON: null
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

    it('methods check', () => {
        expect(typeof vm.singularize).toBe('function')
        expect(typeof vm.eventCount).toBe('function')

        expect(typeof vm.clientName).toBe('function')
        expect(typeof vm.nutritionistName).toBe('function')
        expect(typeof vm.getPath).toBe('function')
        expect(typeof vm.getDate).toBe('function')

    })
    it('singularize works ', () => {
        expect(vm.singularize('menus')).toBe('menu')
    })
    it('singularize works ', () => {
        expect(vm.singularize('menu')).toBe('menu')
    })


    it('eventCount works ', () => {
        // console.log('MODEL = ', wrapper.props('model'))
        // expect(vm.eventCount(wrapper.props('model'))).toBe(0)
    })



    // it('clientName works ', () => {
    //     expect(vm.clientName(1)).toBe('')
    // })


    // it('accesses the shallowMount', () => {
    //     expect(vm.$el.textContent).toContain('rocket muffin')
    //     expect(wrapper.text()).toContain('rocket muffin') // easier
    //     expect(wrapper.find('p').text()).toContain('rocket muffin')
    // })

    it('sets the correct default data', () => {
        expect(typeof vm.model).toBe('object')

    })

    // it('correctly a model is passed in', () => {
    //     const button = wrapper.find('button')
    //     button.trigger('click')
    //     expect(vm.counter).toBe(1)
    // })


    // it('Box has start', () => {
    //     const button = wrapper.find('button')
    //     console.log(button)
    //     // button.trigger('click')
    //     // expect(vm.counter).toBe(1)
    // })
})



// #######################################################################################

