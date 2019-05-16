<template>
  <div id="ProfileNut">
    <ModelDetailView
      :model="nutritionist"
      :userName="userName"
      :heading="heading"
      :updatePath="updatePath"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'

import ModelDetailView from 'src/pages/Views/SingleViews/ModelDetailView'
export default {
  name: 'ProfileNut',

  components: {
    ModelDetailView
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
    }
  }
}
</script>
<style scoped>
</style>
 
