<template>
  <div class="q-pa-md row justify-center">
    <div class="col-auto">
      <!-- <section class="section">
        <div class="container">
          <FormBuilder formmethod="makeUserSignInForm"></FormBuilder>
        </div>
      </section>-->
      <q-card dark bordered class="bg-grey-5 my-card">
        <div class="text-h4 text-amber-8 bg-grey-7 shadow-7 text-center">I am a</div>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-5"
          active-bg-color="grey-6"
          indicator-color="amber-1"
          align="justify"
          narrow-indicator
        >
          <q-tab class="text-amber-1" name="nutritionist" label="Nutritionist"/>
          <q-tab class="text-amber-1" name="supplier" label="Supplier"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels class="bg-grey-5" v-model="tab" animated>
          <q-tab-panel name="nutritionist">
            <q-card-section>
              <q-toolbar class="text-white">
                <q-toolbar-title class="text-center">
                  <q-btn
                    class="bg-grey-6"
                    glossy
                    outline
                    rounded
                    color="amber-1"
                    icon="face"
                    to="/register"
                    label="Create a New account"
                  />
                </q-toolbar-title>
              </q-toolbar>
              <q-separator color="white"/>
            </q-card-section>
            <form>
              <q-card-section>
                <q-input
                  v-model="form.username"
                  @blur="$v.form.username.$touch"
                  @keyup.enter="logItIn()"
                  :error="$v.form.username.$error"
                  label="User Name"
                  :rules="[val => !!val || 'Field is required']"
                  lazy-rules
                  autocomplete="username"
                />

                <q-input
                  counter
                  v-model="form.password"
                  type="password"
                  @blur="$v.form.password.$touch"
                  @keyup.enter="logItIn()"
                  :error="$v.form.password.$error"
                  label="Password"
                  :rules="[val => !!val || 'Field is required']"
                  lazy-rules
                  autocomplete="current-password"
                ></q-input>
              </q-card-section>
            </form>
            <q-toolbar class="bg-grey-5 text-white shadow-2">
              <br>

              <q-toolbar-title>
                <q-btn color="primary" @click="logItIn()">Submit</q-btn>
              </q-toolbar-title>
            </q-toolbar>
          </q-tab-panel>

          <q-tab-panel name="supplier">
            <div class="text-h6">Contact us at {{brandEmail}}</div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
import Nutritionist from 'src/store/ORM/nutritionists.js'
import Client from 'src/store/ORM/client.js'
import Message from 'src/store/ORM/messages.js'
import Menu from 'src/store/ORM/menu.js'
import Supplier from 'src/store/ORM/suppliers.js'
// import FormBuilder from 'src/components/Form/FormBuilder.vue'
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
  name: 'PageLogin',
  components: {
    // FormBuilder
  },
  data() {
    return {
      brandEmail: 'email@email.com',
      tab: 'nutritionist',
      errors: [],
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: mapState(['user']),
  validations: {
    form: {
      username: { required },
      password: { required }
    }
  },
  methods: {
    logItIn() {
      this.$q.loading.show({
        delay: 200, // ms
        message: 'Processing ...'
      })

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$store.dispatch('UserModules/UpdateUser', null)
      this.$store.dispatch('UserModules/UpdateToken', null)

      this.$store.dispatch('UserModules/DoLogin')
      this.$axios
        .post('api/auth/login', this.form)
        .then(result => {
          this.$store.dispatch('UserModules/UpdateUser', result.data)

          // console.log(
          //   Message.Create({ data: result.data.user.nutritionist.messages })
          // )
          try {
            Supplier.create({ data: result.data.user.nutritionist.suppliers })
          } catch (err) {
            console.log(err.message)
          }
          // try {
          //   Message.create({ data: result.data.user.nutritionist.messages })
          // } catch (err) {
          //   console.log(err.message)
          // }
          // console.log('messages')
          // console.log(result.data.user.nutritionist.messages)
          // INIT THE CLIENT SET BELONGING TO THE NUTRITIONIST
          Client.create({
            data: result.data.user.nutritionist.clients,
            insert: ['tests']
          })
          // INIT THE NUTRITIONIST
          Nutritionist.create({
            data: result.data.user.nutritionist,
            insert: ['clients', 'messages']
          })

          this.$store.dispatch('UserModules/UpdateToken', result.data.token)
          this.$store.dispatch('UserModules/FetchToken')

          this.$store.dispatch('UserModules/StopLogin')
          this.$q.loading.hide()
          this.$q.notify({
            classes: 'text-bold text-h6',
            message: 'You are now Logged in!',
            position: 'right',
            icon: 'fas fa-thumbs-up',

            type: 'info'
          })
          // this.$axios.defaults.headers.common['Access-Control-Allow-Headers'] =
          //   '*'
          this.$router.push('/')
        })
        .catch(err => {
          this.$q.loading.hide()
          if (err.response) {
            let errors = prettyStringJson(err.response.data)
            for (let index in errors) {
              if (i === 4) {
                break
              }
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

 
