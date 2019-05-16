<template>
  <div class="ModelCard">
    <q-card>
      <q-card-section>
        <ViewTitle
          :userName="userName"
          :heading="heading"
          :updatePath="updatePath"
          :is_updating="is_updating"
        />
      </q-card-section>
      <q-separator dark inset/>
      <q-card-section>
        <ModelRenderer v-bind:model="model"/>
      </q-card-section>
    </q-card>
    <div v-if="!this.is_updating">
      <q-page-sticky
        v-once
        position="bottom-right"
        class="col-xs-12 col-sm-6 col-md-4"
        :offset="[8, 130]"
      >
        <div class="text-subtitle2" align="center">
          <q-btn
            color="blue-grey-6"
            class="shadow-4"
            push
            icon="update"
            v-bind:to="this.updatePath"
            label="Edit Info"
          />
        </div>
      </q-page-sticky>
    </div>
  </div>
</template>
<script>
import ModelRenderer from 'src/pages/Views/SingleViews/ModelRenderer'
import ViewTitle from 'src/pages/Views/ViewTitle'

export default {
  name: 'ModelCard',
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
    updatePath: {
      type: String,
      required: true
    },
    is_updating: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {}
}
</script>
<style scoped>
</style>
 
