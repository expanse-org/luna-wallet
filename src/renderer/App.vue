<template>
  <div id="app">
    <router-view></router-view>
    <footer-app />
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

    },
    data() {
        return {
        };
    },
    methods: {},
}
</script>

<style>
  @import "assets/css/style.css";
</style>
