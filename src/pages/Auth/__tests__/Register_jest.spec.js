
/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Models from 'src/store/ORM/models.js'
import Event from 'src/components/Event.vue'
import PageRegister from 'src/pages/Auth/Register.vue'
const localVue = base.localVue
const store = base.store




describe('Register.vue desktop', () => {

    const wrapper = shallowMount(PageRegister, {
        store,
        localVue







    })
    const vm = wrapper.vm
    wrapper.setData({
        form: {
            username: '',
            password: '',
            email: ''
        }
    })


    console.log(wrapper)
    let username = wrapper.find('#username')
    console.log('USERNAME ', username)
    console.log('VALUE ', username.value)
    username.value = "Alice"
    username.trigger('input')
    console.log('after trigger VALUE ', username.value)
    // lets find it again

    let after = wrapper.find('#username')
    console.log(after)
    console.log(after.value)
    let password = wrapper.find('#password')
    let email = wrapper.find('#email')
    password.value = 12345
    password.trigger('input')
    email.value = "e@e.com"
    email.trigger('input')

    let button = wrapper.find('#button')
    button.trigger("submit.prevent")
    // wrapper.find("[data-form.password]").setValue("12345")
    // wrapper.find("[data-form.email]").setValue("e@e.com")
    // wrapper.find("form").trigger("submit.prevent")

    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })

    it('methods check', () => {
        expect(typeof vm.registerIt).toBe('function')




    })
    it('method registerIt() ', () => {
        console.log(vm.registerIt())
    })
    it('check localStorage', () => {
        console.log(localStorage)
    })



})



// #######################################################################################


