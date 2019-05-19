<template>
  <div class="ProfileFormCard">
    <br>
    <q-card dark bordered class="bg-grey-5 my-card">
      <q-card-section>
        <div v-for="(value, key, index) in form" :key="index">
          <q-input
            filled
            v-model="form.key"
            hint="Only Country at this point"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Required']"
          />
          {{value}}
        </div>
      </q-card-section>
    </q-card>
    {{form}}
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
import { constants } from 'fs'

export default {
  name: 'ProfileFormCard',
  props: {
    form: {
      type: Object,
      required: true
    }
  },

  data() {
    return {}
  },
  computed: {
    sex() {
      if (this.form.sex === 'M') {
        return 'Male'
      }
      if (this.form.sex === 'F') {
        return 'Female'
      }
      return '?'
    }
  },
  validations: {
    form: {
      email: { required, email }
    }
  },

  methods: {
    /* istanbul ignore next */
    async registerIt() {
      var vm = this.form

      let pk = this.$store.state['UserModules'].user.id || 'pk'

      var email_ = this.$store.state['UserModules'].nutritionist.email

      let formData = new FormData()
      formData.append('owner_id', pk)
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

      try {
        await this.$store.dispatch('UserModules/DoRegister')
        let { data } = await axios.put(
          `http://127.0.0.1:8000/api/nutritionists/${vm.id}/`,
          formData
        )
        this.$store.dispatch('UserModules/UpdateNutritionist', data)
        this.$store.dispatch('UserModules/StopRegister')
        this.$router.push('/nutritionist/profile')
      } catch (error) {}
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
 


