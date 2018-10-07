<template>
        <router-view></router-view>
</template>

<script>
    import { ExpApi} from '../../main/libs/config';

    export default {
        name: 'MainApp',
        created(){
            ExpApi();
        },
        data() {
            return {
            };
        },
        methods: {
        }
    }
</script>

<style>
    @import "../assets/css/style.css";
</style>
