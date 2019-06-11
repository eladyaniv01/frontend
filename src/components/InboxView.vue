<template>
  <div id="Messages" class="q-pa-md row justify-center">
    <!-- {{getName(m)}} -->
    <table style="width: 100%; max-width: 400px">
      <tr>
        <th>Name</th>
        <th>#</th>
      </tr>
      <tr v-for="(count,m) in inboxList" :key="m.id">
        <td>{{m}}</td>
        <td>{{count}}</td>
      </tr>
    </table>

    <!-- inbox view by 2nd party(other person messaging) -->
  </div>
</template>

<script>
var moment = require('moment')
import { mapGetters, mapActions, mapState } from 'vuex'
import Models from 'src/store/ORM/models.js'
export default {
  name: 'InboxView',
  props: ['msgs'],
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
    },
    getName(m) {
      console.log(m)
      let msg = Models.InternalMessage.query()
        .where('sender', 20)
        .get()
      console.log(msg)
      return msg.sender_name
    }
  },
  computed: {
    // msgs() {
    //   let msgs = Models.InternalMessage.query().get()

    //   return msgs
    // },
    inboxList() {
      let arr = []
      let arr2 = []
      // arr.person, arr.person.count
      // console.log(_.countBy(this.msgs, 'getter'))
      // console.log(_.countBy(this.msgs, 'sender'))
      // console.log(_.sortBy(this.msgs, ['getter', 'sender']))
      // let sorted = _.countBy(this.msgs, 'sender')

      // for (let i in sorted) {
      //   console.log('i ', i)
      //   console.log('sorted[i] ', sorted[i])
      //   let smsg = Models.InternalMessage.query()
      //     .where('sender', sorted[i])
      //     .get()
      //   console.log(
      //     `SMSG = Models.InternalMessage.query().where('sender', '${i}').get()`,
      //     smsg
      //   )
      // let gmsg = Models.InternalMessage.query().where('getter', i).get()
      let tmsg = this.msgs
      for (let i in tmsg) {
        let obj = {
          sender: tmsg[i].sender_name
        }
        arr.push(obj)
        arr2.push(tmsg[i].sender_name)
      }
      let sorted = _.countBy(arr, 'sender')
      console.log(arr)
      console.log(sorted)

      var c = arr2.map(function(e, i) {
        return [e, sorted[i]]
      })
      return sorted
      // for (let i in msgs) {
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>