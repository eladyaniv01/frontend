<template>
  <div id="BaseHeader">
    <!-- Second row of header is a QTabs -->
    <q-tabs align="right">
      <q-route-tab icon="home" to="/home" label="Home"/>
      <q-route-tab v-model="user" v-if="loggedin" @click="logItOut()" label="LogOut"/>
      <q-route-tab v-else slot="title" icon="login" to="/login" replace label="Login"/>

      <q-btn-dropdown push color="primary" label="Account" align="right">
        <q-list link>
          <q-item clickable v-close-popup to="/nutritionist/profile">
            <q-item-section avatar>
              <q-avatar icon="fas fa-id-card-alt" color="primary" text-color="white"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Account Settings</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber"/>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup to="/nutritionist/clients">
            <q-item-section avatar>
              <q-avatar icon="far fa-handshake" color="primary" text-color="white"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Your Clients</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber"/>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup to="/nutritionist/clients/add">
            <q-item-section avatar>
              <q-avatar icon="folder" color="primary" text-color="white"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Add a new Client</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber"/>
            </q-item-section>
          </q-item>

          <q-separator/>
          <q-item-label header>Personal</q-item-label>
          <q-item>
            <q-item-section avatar>
              <q-avatar icon="airport_shuttle" color="primary" text-color="white"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Vacation</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-tabs>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'BaseHeader',
  data() {
    return {
      someText: '',
      count: 0
    }
  },
  watch: {
    user(newVal, oldVal) {
      console.log(`User has changed - old value ${oldVal}, new value ${newVal}`)
    }
  },
  computed: {
    ...mapState({
      user: state => state['UserModules'].user,
      msg: state => state['UserModules'].msg,
      loggedin: state => state['UserModules'].loggedin
    }),
    ...mapGetters({
      status: ['UserModules/loginStatus']
    })
  },
  methods: {
    updateUser() {
      this.user = localStorage.getItem('user')
    },
    updateCounter() {
      this.count++
    },
    logItOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$store.dispatch('UserModules/UpdateUser', null)
      this.$store.dispatch('UserModules/UpdateToken', null)

      this.$router.push('/home')
    }
  }
}
</script>

<style>
</style>
