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
        </tr>
      </thead>

      <tbody>
        <tr class="cursor-pointer" v-for="model in specialists" :key="model.id">
          <td>{{model.name}}</td>
          <td>{{model.email}}</td>
          <td>{{model.phone_number}}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
          <!-- @click="onRowClick(model.id)" -->
<script>
import Supplier from 'src/store/ORM/suppliers.js'
export default {
  name: 'Specialists',
  data() {
    return {}
  },
  computed: {
    specialists() {
      return Supplier.query().get()
    }
  }
}
</script>

<style scoped>
td {
  text-align: center;
}
</style>