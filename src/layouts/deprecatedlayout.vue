<template>
  <q-layout view="hHr LpR lFf">
    <!-- Header -->
    <q-layout-header>
      <!-- First row of header is a QToolbar -->
      <q-toolbar color="primary" animated class="q-py-none">
        <!-- showLeft is a model attached to left side drawer below -->
        <q-btn flat round @click="showLeft = !showLeft" icon="menu" glossy/>
        <q-toolbar-title>
          <span v-if="user" slot="subtitle">
            Logged in as
            <b>{{user.username|title}}</b>
          </span>
          <q-btn v-if="loggedin" flat round dense icon="mail">
            <q-chip floating color="green">{{devnum}}</q-chip>
          </q-btn>
          <q-btn v-if="loggedin" flat round dense icon="alarm">
            <q-chip floating color="red">{{devnum2}}</q-chip>
          </q-btn>
        </q-toolbar-title>
        <q-btn-dropdown push color="primary" label="Account">
          <q-list link>
            <q-item v-close-overlay to="/nutritionist/profile">
              <q-item-side icon="fas fa-id-card-alt" inverted color="primary"/>
              <q-item-main>
                <q-item-tile label>Account Settings</q-item-tile>
                <q-item-tile sublabel>Last Updated February 22, 2016</q-item-tile>
              </q-item-main>
              <q-item-side right icon="info" color="amber"/>
            </q-item>
            <q-item v-close-overlay to="/nutritionist/clients">
              <q-item-side icon="far fa-handshake" inverted color="primary"/>
              <q-item-main>
                <q-item-tile label>Your Clients</q-item-tile>
                <q-item-tile sublabel>Last Updated February 22, 2016</q-item-tile>
              </q-item-main>
              <q-item-side right icon="info" color="amber"/>
            </q-item>
            <q-item v-close-overlay to="/nutritionist/clients/add">
              <q-item-side icon="folder" inverted color="primary"/>
              <q-item-main>
                <q-item-tile label>Add a new Client</q-item-tile>
              </q-item-main>
              <q-item-side right icon="info" color="amber"/>
            </q-item>
            <q-item-separator inset/>
            <q-list-header inset>Files</q-list-header>
            <q-item v-close-overlay @click.native="handlerFunction">
              <q-item-side icon="airport_shuttle" inverted color="secondary"/>
              <q-item-main>
                <q-item-tile label>Vacation</q-item-tile>
                <q-item-tile sublabel>February 22, 2016</q-item-tile>
              </q-item-main>
              <q-item-side right icon="info" color="amber"/>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <BaseHeader/>

        <!-- <q-btn flat round dense @click="showRight = !showRight" icon="menu"/> -->
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer side="left" v-model="showLeft">
      <LeftSideDrawer/>
    </q-layout-drawer>
    <!-- Right Side Panel -->
    <!-- <q-layout-drawer side="right" v-model="showRight">Right Side of Layout</q-layout-drawer>   -->
    <!-- <q-layout-drawer side="right" v-model="showRight">
      <RightSideDrawer/>
    </q-layout-drawer>-->
    <!-- sub-routes get injected here: -->
    <q-page-container>
      <router-view/>
      <NotificationContainer/>
    </q-page-container>

    <!-- Footer -->

    <q-layout-footer class="shadow-2">
      <q-toolbar-title align="right">
        CopyWrite
        <span v-html="company_name"></span>
        <q-icon name="copyright"/>
      </q-toolbar-title>
    </q-layout-footer>
  </q-layout>
</template>
<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import { openURL } from 'quasar'
import LeftSideDrawer from './LeftSideDrawer'
import RightSideDrawer from './RightSideDrawer'
import BaseHeader from './BaseHeader'
import NotificationContainer from '../components/NotificationContainer'
export default {
  name: 'MyLayout',

  props: {},

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      company_name: '<span style="color:red">NutritionistHub</span>',
      showLeft: {
        type: Boolean,
        default: false
      },
      showRight: {
        type: Boolean,
        default: false
      },
      showLeft: false,
      showRight: false
    }
  },
  computed: {
    ...mapState({
      user: state => state['UserModules'].user,
      msg: state => state['UserModules'].msg,
      loggedin: state => state['UserModules'].loggedin
    }),
    devnum: function() {
      var min = 0
      var max = 5
      var random = Math.floor(Math.random() * (+max - +min)) + +min
      return random
    },
    devnum2: function() {
      var min = 0
      var max = 2
      var random = Math.floor(Math.random() * (+max - +min)) + +min
      return random
    }
  },
  components: {
    LeftSideDrawer,
    BaseHeader,
    RightSideDrawer,
    NotificationContainer
  },
  methods: {
    openURL,
    logit(event) {
      console.log(event)
    }
  }
}
</script>
<style>
</style>
