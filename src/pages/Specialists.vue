<template>
  <div>
    <!-- {{specialists}} -->
    <!-- <div v-for="item in specialists" :key="item.id"></div> -->
    <q-markup-table class="q-ma-sm">
      <thead>
        <tr class="bg-green-1">
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Information</th>
        </tr>
      </thead>
      <!-- {{suppliercms}} -->
      <tbody>
        <tr v-for="model in suppliercms" :key="model.id">
          <!-- {{model}} -->
          <td>{{model.name}}</td>
          <td>{{model.email}}</td>
          <td>{{model.phone_number}}</td>
          <td v-html="model.info"/>
          <!-- <td>{{model.phone_number}}</td> -->
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
          <!-- @click="onRowClick(model.id)" -->
<script>
// import Supplier from 'src/store/ORM/suppliers.js'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'Specialists',
  data() {
    return {}
  },
  computed: {
    ...mapState('CMS', {
      suppliercms: state => state.suppliercms
    })

    // specialists() {
    //   return Supplier.query().get()
    // }
  }
}
</script>

<style scoped>
td {
  text-align: center;
}
</style>