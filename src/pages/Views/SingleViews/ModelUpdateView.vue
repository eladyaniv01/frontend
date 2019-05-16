
<template>
  <div class="FieldWrapper">
    <h2 align="center"></h2>
    <SingleModelUpdateView
      :model="model"
      :userName="userName"
      :heading="heading"
      :successPath="successPath"
      :APIURL="APIURL"
    />
  </div>
</template>

<script>
import SingleModelUpdateView from 'src/pages/Views/SingleViews/SingleModelUpdateView'

export default {
  name: 'ModelUpdateView',
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
  },
  components: {
    SingleModelUpdateView
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
</style>