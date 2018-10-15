<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
    name: 'lunawalletvuetest',
    created() {
        // console.log(this.$store,"APP");

        this.$store.dispatch('addScreen', 'config')
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
