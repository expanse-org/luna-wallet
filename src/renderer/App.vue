<template>
  <div id="app">
    <router-view></router-view>
    <footer-app v-if="!archive" />
  </div>
</template>

<script>
    import {ipcRenderer} from 'electron';
    import Footer from './components/DasboardComponents/Footer/Footer';
export default {
    name: 'lunawalletvuetest',
    components:{
        'footer-app': Footer,
    },
    watch: {
      cronMessage() {
        this.cronToast =  this.$store.state.cronToast;
        console.log(this.cronToast, "cronToast cronToast");
        return this.cronToast;
      }
    },
    created() {
      console.log(this.cronMessage, "cronmessagesss");
        // console.log(this.$store,"APP");
        console.log(this.$router.history.current.path,"APP");
        if(this.$router.history.current.path === '/archiveAccounts'){
            this.archive = true;
        }
    },
    data() {
        return {
          archive: false,
          cronToast: '',
        };
    },
    methods: {},
}
</script>

<style>
  @import "assets/css/style.css";
</style>
<style lang="sass">
  @import "assets/scss/NewStyle.scss";
</style>
