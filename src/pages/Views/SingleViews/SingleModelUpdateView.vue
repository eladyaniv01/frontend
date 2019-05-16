<template>
  <div class="SingleModelView">
    <ModelCardForm
      :model="model"
      :userName="userName"
      :heading="heading"
      :successPath="successPath"
      :APIURL="APIURL"
    />
  </div>
</template>
<script>
import ModelCardForm from 'src/pages/Views/SingleViews/ModelCardForm'
export default {
  name: 'SingleModelUpdateView',
  components: {
    ModelCardForm
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    heading: {
      type: String,
      required: true
    },
    successPath: {
      type: String,
      required: true
    },
    APIURL: {
      type: String,
      required: false
    }
  },

  data() {
    return {}
  }
}
</script>
<style scoped>
</style>
 
