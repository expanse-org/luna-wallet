<template>
  <div id="app">
    <router-view></router-view>
    <footer-app v-if="!archive"/>
  </div>
</template>

<script>
    import Footer from './components/DasboardComponents/Footer/Footer';
export default {
    name: 'lunawalletvuetest',
    components:{
        'footer-app': Footer,
    },
    created() {
        // console.log(this.$store,"APP");
        console.log(this.$router.history.current.path,"APP");
        if(this.$router.history.current.path === '/archiveAccounts'){
            this.archive = true;
        }
    },
    data() {
        return {
            archive: false,
        };
    },
    methods: {},
}
</script>

<style>
  @import "assets/css/style.css";
</style>
