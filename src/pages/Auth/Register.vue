<template>
  <div class="PageRegister q-pa-md row justify-center">
    <div class="col-auto">
      <q-card dark bordered class="bg-grey-5 my-card">
        <q-card-section>
          <q-toolbar class="bg-primary text-white shadow-2">
            <br>

            <q-toolbar-title>
              <p class="bg-primary text-amber-1">Register a New Account or</p>
              <q-btn glossy outline rounded color="amber-1" icon="face" to="/login" label="Login"/>
            </q-toolbar-title>
          </q-toolbar>
          <q-separator color="white"/>
        </q-card-section>
        <q-card-section>
          <q-input
            id="username"
            filled
            @keyup.enter="registerIt()"
            v-model="form.username"
            label="UserName"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Required']"
          />
          <q-input
            id="password"
            filled
            @keyup.enter="registerIt()"
            v-model="form.password"
            type="password"
            label="Password"
            hint="no restrictions on password right now"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Required']"
          />
          <q-input
            id="email"
            filled
            @keyup.enter="registerIt()"
            v-model="form.email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Required']"
          />
        </q-card-section>
        <q-toolbar class="bg-grey-5 text-white shadow-2">
          <br>

          <q-toolbar-title>
            <q-btn id="button" class="absolute-center" color="primary" @click="registerIt()">Submit</q-btn>
          </q-toolbar-title>
        </q-toolbar>
      </q-card>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import {
  myRep,
  sentenceCase,
  doNotify,
  prettyStringJson
} from 'src/utils/stringutils.js'
import axios from 'axios'

export default {
  name: 'PageRegister',
  data() {
    return {
      errors: [],
      form: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  computed: {},
  validations: {
    form: {
      username: { required },
      password: { required },
      email: { required, email }
    }
  },
  created() {
    localStorage.clear()
  },
  methods: {
    registerIt() {
      localStorage.clear()
      this.$q.loading.show({
        delay: 200, // ms
        message: 'Processing ...'
      })
      var vm = this.form

      let formData = new FormData()

      formData.append('username', vm.username)
      formData.append('password', vm.password)
      formData.append('email', vm.email)

      this.$store.dispatch('UserModules/DoRegister')
      this.$axios
        .post('api/auth/register', formData)
        .then(result => {
          console.log('RESULT ', result)
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('user', result.data.user.username)
          localStorage.setItem('email', result.data.user.email)
          this.$store.dispatch('UserModules/UpdateUser', result.data)

          this.$store.dispatch('UserModules/UpdateToken', result.data.token)
          this.$store.dispatch('UserModules/StopRegister')
          // need to add a method here that will retrieve the information that is get by login (clients etc)

          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'Success!',
            position: 'right',
            icon: 'fas fa-thumbs-up',

            type: 'info'
          })
          this.$q.loading.hide()
          this.$router.push('/nutritionist/profile')
        })
        .catch(err => {
          this.$q.loading.hide()
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
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
 
