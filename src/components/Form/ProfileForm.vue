<template>
  <div class="Form">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-3">
        <ProfileFormCard v-bind:form="this.form"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileFormCard from 'src/components/Form/ProfileFormCard'
export default {
  name: 'ProfileForm',
  components: {
    ProfileFormCard
  },
  /* istanbul ignore next */
  data() {
    return {
      form: {
        first_name: this.$store.state['UserModules'].nutritionist.first_name,
        last_name: this.$store.state['UserModules'].nutritionist.last_name,
        identification: this.$store.state['UserModules'].nutritionist
          .identification,
        sex: this.$store.state['UserModules'].nutritionist.sex,
        address: this.$store.state['UserModules'].nutritionist.address,
        phone_number: this.$store.state['UserModules'].nutritionist
          .phone_number,
        dob: this.$store.state['UserModules'].nutritionist.dob,
        email: this.$store.state['UserModules'].nutritionist.email,
        id: this.$store.state['UserModules'].nutritionist.id
      }
    }
  }
}
</script>

<style scoped>
</style>