
<template>
  <div class="ViewTitle">
    <q-toolbar class="bg-primary text-white shadow-2">
      <br>

      <q-toolbar-title>
        <div class="text-bold" align="center">
          {{_.capitalize(_.lowerCase(this.userName))}}
          <br>
          {{this.heading}}
        </div>
        <q-separator dark inset/>
        <br>
        <!-- will display an update button link , if we got here without updating -->
      </q-toolbar-title>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  name: 'ViewTitle',

  props: {
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
      required: false
    },
    is_updating: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style  scoped>
</style>