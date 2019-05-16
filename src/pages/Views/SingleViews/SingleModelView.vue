<template>
  <div class="SingleModelView">
    <ModelCard
      :model="model"
      :userName="userName"
      :heading="heading"
      :updatePath="updatePath"
      :is_updating="false"
    />
  </div>
</template>
<script>
import ModelCard from 'src/pages/Views/SingleViews/ModelCard'
export default {
  name: 'SingleModelView',
  components: {
    ModelCard
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
    updatePath: {
      type: String,
      required: true
    }
  },

  data() {
    return {}
  }
}
</script>
<style scoped>
</style>
 
