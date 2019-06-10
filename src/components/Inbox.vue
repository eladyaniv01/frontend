<template>
  <div id="Messages" class="q-pa-md row justify-center">
    <div v-for="m in msgs" :key="m.id" style="width: 100%; max-width: 400px">
      <q-chat-message>
        <!-- <q-icon name="email"></q-icon> -->
      </q-chat-message>
      <q-chat-message
        :name="getsender(m)"
        :class="cls(m)"
        :bg-color="bg(m)"
        :text="[m.body]"
        :sent="sent(m)"
        :stamp="date(m)"
      />
    </div>
  </div>
</template>

<script>
var moment = require('moment')
import { mapGetters, mapActions, mapState } from 'vuex'
import Models from 'src/store/ORM/models.js'
export default {
  name: 'Messages',
  components: {},
  data() {
    return {}
  },
  methods: {
    getsender(m) {
      let nut = Models.Nutritionist.query().get()[0]
      if (nut.id == m.sender) {
        return 'Me'
      }
      return m.sender_name
    },
    date(m) {
      let humandate = moment(Date.parse(m.created_at)).calendar()
      return humandate
    },
    bg(m) {
      let nut = Models.Nutritionist.query().get()[0]
      if (nut.id == m.sender) {
        return 'green-1'
      }
      return 'yellow-4'
    },
    cls(m) {
      let nut = Models.Nutritionist.query().get()[0]
      if (nut.id == m.sender) {
        return 'bg-green-1'
      }
      return 'bg-yellow-4'
    },
    sent(m) {
      let nut = Models.Nutritionist.query().get()[0]
      if (nut.id == m.sender) {
        return true
      }
      return false
    }
  },
  computed: {
    msgs() {
      let msgs = Models.InternalMessage.query().get()

      return msgs
    }
  }
}
</script>

<style lang="scss" scoped>
</style>