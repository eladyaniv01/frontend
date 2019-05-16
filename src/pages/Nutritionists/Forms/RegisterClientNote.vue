<template>
  <div class="ClientNoteForm"></div>
</template>
<script>
import { mapState } from 'vuex'

import Client from 'src/store/ORM/client.js'
import Nutritionist from 'src/store/ORM/nutritionists.js'
import * as constants from 'src/services/ServiceConstants.js'
export default {
  name: 'ClientNoteForm',

  components: {
    ModelUpdateView
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('UserModules', {
      user: state => state.user,
      userName: state => state.user.username
    }),
    nutritionist() {
      let nut = Nutritionist.query().get()
      return nut
    },
    heading() {
      return 'Account Information'
    },
    updatePath() {
      return '/nutritionist/profile/update'
    },
    getApiUrl() {
      return `${constants.APIURL}api/nutritionists/${this.nutritionist.id}/`
    },
    successPath() {
      return '/nutritionist/profile'
    }
  },
  methods: {
    registerIt() {
      this.$q.loading.show({
        delay: 200, // ms
        message: 'Processing ...'
      })
      var vm = this.form

      let formData = new FormData()
      formData.append('nutritionist', this.nutritionist.id)
      formData.append('first_name', vm.first_name)
      formData.append('last_name', vm.last_name)
      formData.append('email', vm.email)
      formData.append('identification', vm.identification)
      formData.append('height', vm.height)
      formData.append('weight', vm.weight)
      formData.append('sex', vm.sex)
      formData.append('address', vm.address)
      formData.append('phone_number', vm.phone_number)
      formData.append('dob', vm.dob)

      this.$axios
        .post('api/clients/', formData)
        .then(result => {
          this.$store.dispatch('UserModules/AddClient', result.data)
          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'Success!',
            position: 'top-right',
            icon: 'fas fa-thumbs-up',
            closeBtn: true,
            color: 'blue'
          })
          this.$store.dispatch('UserModules/FetchClients')
          this.$router.push('/nutritionist/clients')
          this.$q.loading.hide()
        })
        .catch(err => {
          this.$q.loading.hide()
          console.log(err)
          console.log(err.config)
          console.log(err.request)
          console.log(err.response)
          if (err.response) {
            let errors = prettyStringJson(err.response.data)
            for (let index in errors) {
              if (errors[index]) {
                this.$q.notify({
                  message: errors[index] + '.',
                  position: 'center',

                  color: 'negative'
                })
              }
            }
          } else {
            this.$q.notify({
              message: 'Network Error, Server might be Offline',
              position: 'center',

              color: 'negative'
            })
          }
        })
    }
  }
}
</script>
<style scoped>
</style>
 
