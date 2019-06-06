<template>
  <div class="RegisterClient">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <q-stepper
          v-model="step"
          header-nav
          ref="stepper"
          class="text-weight-medium bg-blue-1"
          animated
        >
          <q-step
            :name="1"
            title="Generic Client Details"
            icon="settings"
            :done="done1"
            :error="step < 2"
          >
            <q-toolbar class="bg-secondary text-white shadow-2">
              <br>

              <q-toolbar-title>
                <div class="text-h6" align="center">Add a New Client</div>
              </q-toolbar-title>
            </q-toolbar>
            <q-card dark bordered class="my-card">
              <q-card-section>
                <div class="text-h6 absolute-center">{{username|title}}</div>
              </q-card-section>
              <q-separator color="white"/>
              <q-card-section>
                <q-input
                  filled
                  v-model="form.email"
                  label="E-Mail"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                >
                  <template v-slot:prepend>
                    <q-icon name="email"/>
                  </template>
                </q-input>
                <q-input
                  filled
                  v-model="form.first_name"
                  label="First Name"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                />
                <q-input
                  filled
                  v-model="form.last_name"
                  label="Last Name"
                  hint="Middle name should be included here"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                />
                <q-input
                  filled
                  v-model="form.identification"
                  label="Identification"
                  mask="#########"
                  fill-mask
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                />
                <q-input
                  filled
                  v-model="form.dob"
                  label="Date Of Birth"
                  mask="##/##/####"
                  fill-mask
                  hint="DD/MM/YYYY"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                />
                <q-input
                  filled
                  v-model="form.address"
                  label="Address"
                  hint="Only Country at this point"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                />
                <q-input
                  filled
                  v-model="form.phone_number"
                  label="Phone Number"
                  hint="(000)-00-000000"
                  mask="(###)-##-######"
                  fill-mask
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                />
                <q-select
                  filled
                  color="grey-7"
                  v-model="form.sex"
                  :options="[
                       'M' ,
                         'F'
                        ]"
                  label="Gender"
                  hint
                >
                  <template v-slot:prepend>
                    <q-icon name="fas fa-transgender"/>
                  </template>
                </q-select>
              </q-card-section>
              <div class="self-center full-width no-outline" tabindex="110"></div>
            </q-card>
            <q-stepper-navigation>
              <q-btn @click="() => { done1 = true; step = 2 }" color="secondary" label="Continue"/>
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Medical"
            caption="Optional, only if there are medical anomalies"
            icon="fas fa-notes-medical"
            :done="done2"
          >
            <q-toolbar class="bg-secondary text-white shadow-2">
              <br>

              <q-toolbar-title>
                <div class="text-h6" align="center">Medical Information</div>
              </q-toolbar-title>
            </q-toolbar>
            <q-card dark bordered class="my-card">
              <q-card-section>
                <div class="text-h6 absolute-center">{{username|title}}</div>
              </q-card-section>
              <q-separator color="white"/>
              <q-card-section>
                <q-input
                  filled
                  v-model="form.height"
                  label="Height"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                >
                  <template v-slot:prepend>
                    <q-icon name="fas fa-arrows-alt-v"/>
                  </template>
                </q-input>
                <q-input
                  filled
                  v-model="form.weight"
                  label="Weight"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                >
                  <template v-slot:prepend>
                    <q-icon name="fas fa-weight-hanging"/>
                  </template>
                </q-input>
              </q-card-section>
              <div class="self-center full-width no-outline" tabindex="110"></div>
            </q-card>
            <q-stepper-navigation>
              <q-btn color="secondary" @click="done2 = true; step=3" label="Finish"/>

              <q-btn flat @click="step = 1" color="secondary" label="Back" class="q-ml-sm"/>
            </q-stepper-navigation>
          </q-step>
          <q-step :name="3" title="Review and Submit" icon="submit" :done="done3">
            <q-btn class="absolute-center" color="secondary" @click="registerIt()">Submit</q-btn>
          </q-step>
        </q-stepper>
      </div>
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
import Models from 'src/store/ORM/models.js'

export default {
  name: 'ClientRegister',
  data() {
    return {
      selected: '',
      step: 1,
      done1: false,
      done2: false,
      done3: false,

      form: {
        first_name: '',
        last_name: '',
        identification: '',
        dob: '',
        height: '',
        weight: '',
        sex: '',
        address: '',
        email: '',
        phone_number: ''
      }
    }
  },
  computed: {
    ...mapState('UserModules', {
      user: state => state.user,
      username: state => state.user.username,
      nutritionist: state => state.user.nutritionist
    })
  },
  validations: {
    form: {
      username: { required },
      email: { required, email }
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
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
tab {
  background-color: red;
}
</style>
 
