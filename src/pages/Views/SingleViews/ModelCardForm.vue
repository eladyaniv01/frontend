<template>
  <div class="ModelCardForm">
    <q-card dark bordered>
      <q-card-section>
        <ViewTitle :userName="userName" :heading="heading" :is_updating="is_updating"/>
      </q-card-section>
      <q-separator dark inset/>
      <q-card-section>
        <ModelRenderer
          v-bind:model="model"
          :is_updating="is_updating"
          :successPath="successPath"
          :APIURL="APIURL"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import ModelRenderer from 'src/pages/Views/SingleViews/ModelRenderer'
import ViewTitle from 'src/pages/Views/ViewTitle'

export default {
  name: 'ModelCardForm',
  components: {
    ModelRenderer,
    ViewTitle
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
    return {
      is_updating: true
    }
  },
  computed: {}
}
</script>
<style scoped>
</style>
 
