<template>
  <v-app>
    <c-header />
    <c-side-bar></c-side-bar>
    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-main>
    <c-footer></c-footer>
    <c-alert></c-alert>
    <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialogbottom-transition">
      <search />
    </v-dialog> -->
    <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialogbottom-transition">
        <component :is="currentComponent"></component>
      </v-dialog>
    </keep-alive>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CHeader from './components/CHeader';
import CFooter from './components/CFooter';
import CSideBar from './components/CSideBar';
import CAlert from './components/CAlert';
import Search from './views/Search';                   
import Cart from './views/Cart';                   
import Login from './views/Login';
import Register from './views/Register';

export default {
  name: 'App',

  components: {
    CHeader,
    CFooter,
    CSideBar,
    CAlert,
    Search,
    Login,
    Register,
    Cart
  },
  methods: {
    ...mapActions({
      setStatusDialog : 'dialog/setStatus',
    }),
  },
  computed: {
    ...mapGetters({
      statusDialog : 'dialog/status',
      currentComponent : 'dialog/component'
    }),
    dialog: {
      get(){
        return this.statusDialog
      },
      set(value){
        this.setStatusDialog(value)
      }
    }
  }
};
</script>
<style>
    .v-toolbar{
      flex: 0 !important;
    }
    .v-application .py-3{
      text-align: center !important;
    }
    .v-card__text{
      text-align: center !important;
    }
</style>
