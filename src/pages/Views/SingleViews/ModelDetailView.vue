<template>
  <div class="FieldWrapper">
    <h2 align="center"></h2>
    <SingleModelView
      :model="model"
      :userName="userName"
      :heading="heading"
      :updatePath="updatePath"
    />
  </div>
</template>

<script>
import SingleModelView from 'src/pages/Views/SingleViews/SingleModelView'

export default {
  name: 'ModelDetailView',
  props: {
    model: {
      type: Object,
      required: true
    },
    userName: {
      type: String,
      required: false
    },
    heading: {
      type: String,
      required: false
    },
    updatePath: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  components: {
    SingleModelView
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
</style>