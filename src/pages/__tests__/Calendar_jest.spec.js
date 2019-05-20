/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Models from 'src/store/ORM/models.js'
import Calendar from 'src/pages/Calendar.vue'

const localVue = base.localVue
const store = base.store





describe('Calendar.vue', () => {


    const wrapper = shallowMount(Calendar, {
        store,
        localVue






    })
    let form = {
        start: '2019-05-10 06:30',
        end: '2019-05-10 06:30',
        client: 1,
        nutritionist: '',
        title: '',
        content: '',
        contentFull: '',
        accept: false
    }
    wrapper.setData({ form: form })
    const vm = wrapper.vm
    console.log(wrapper)
    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })

    it('methods check', () => {
        expect(typeof vm.getClient).toBe('function')
        expect(typeof vm.add).toBe('function')
        expect(typeof vm.onEventClick).toBe('function')




    })
    it('computes check', () => {
        expect(typeof vm.events).toBe('object')
        expect(typeof vm.clients).toBe('object')

        expect(typeof vm.selectedDate).toBe('object')



    })

    it('getClient works ', () => {
        expect(vm.getClient(Models.Event.find(1))).toBe('1 FN_TestClient')
    })
    it('add Event method works ', () => {
        console.log(vm.add(form))
    })
    it('Edit Event method works ', () => {
        // console.log(vm.onEventClick(Event.find(1)), this)
    })


})



// #######################################################################################

