<template>
  <v-app>
    <c-header></c-header>
    <c-side-bar></c-side-bar>
    <v-main>
      <!-- <HelloWorld/> -->
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-main>
    <c-footer></c-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import CHeader from './components/CHeader';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    CHeader
  },

  data: () => ({
    //
  }),
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
