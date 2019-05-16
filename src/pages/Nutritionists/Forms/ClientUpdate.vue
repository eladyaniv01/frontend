<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <div class="EditView">
      <ModelUpdateView
        :model="this.Client"
        :userName="userName"
        :heading="heading"
        :successPath="successPath"
        :APIURL="getApiUrl"
      />
    </div>
  </q-dialog>
</template>
<script>
import { mapState } from 'vuex'

import ModelUpdateView from 'src/pages/Views/SingleViews/ModelUpdateView'
import * as constants from 'src/services/ServiceConstants.js'
export default {
  name: 'UpdateNut',

  components: {
    ModelUpdateView
  },
  data() {
    return {}
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      var vm = this.form

      this.$emit('ok', { vm })
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      console.log('im from event')
      this.hide()
    }
  },
  computed: {
    ...mapState('UserModules', {
      user: state => state.user,
      userName: state => state.user.username,
      nutritionist: state => state.user.nutritionist,
      clients: state => state.user.nutritionist.clients
    }),

    Client() {
      var integer = parseInt(this.$route.params['id'], 10)
      var key = _.findKey(this.clients, { id: integer })
      return this.clients[key]
    },
    heading() {
      return 'Client Update Form'
    },
    successPath() {
      var integer = parseInt(this.$route.params['id'], 10)
      return `/nutritionist/clients/${integer}`
    },
    getApiUrl() {
      var integer = parseInt(this.$route.params['id'], 10)
      return `${constants.APIURL}api/clients/${integer}/`
    }
  }
}
</script>
<style scoped>
</style>
 
