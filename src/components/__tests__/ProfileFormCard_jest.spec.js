/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import base from 'src/TestBase'
import Models from 'src/store/ORM/models.js'
import ProfileFormCard from 'src/components/Form/ProfileFormCard.vue'

const localVue = base.localVue
const store = base.store




describe('ProfileFormCard.vue', () => {

    const wrapper = shallowMount(ProfileFormCard, {
        store,
        localVue,







    })
    let form = {
        start: '2019-05-10 06:30',
        end: '2019-05-10 06:30',
        client: '1 FN_TestClient LN_TestClient',
        nutritionist: '',
        title: '',
        content: '',
        contentFull: '',
        accept: false,
        sex: 'gfghfg'
    }
    wrapper.setData({ form: form })
    const vm = wrapper.vm
    console.log(wrapper)
    it('passes the sanity check and creates a wrapper', () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })
    it('computes check', () => {
        expect(typeof vm.sex).toBe('string')






    })
    it('methods check', () => {
        expect(typeof vm.registerIt).toBe('function')

    })
    it('sex  works ', () => {
        vm.form.sex = 'jksdhkfsdj'
        expect(vm.sex).toBe('?')

        vm.form.sex = 'M'
        expect(vm.sex).toBe('Male')

        vm.form.sex = 'F'
        expect(vm.sex).toBe('Female')
    })



})


// #######################################################################################

