<template>
  <div class="RegisterNut">
    <ModelUpdateView
      :model="nutritionist"
      :userName="userName"
      :heading="heading"
      :APIURL="getApiUrl"
      :successPath="successPath"
    />
  </div>
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
  computed: {
    ...mapState('UserModules', {
      user: state => state.user,
      userName: state => state.user.username,
      nutritionist: state => state.user.nutritionist
    }),
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
  }
}
</script>
<style scoped>
</style>
 
