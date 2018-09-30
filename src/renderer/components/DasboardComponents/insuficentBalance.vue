<template>
    <div class="popup popup1 tab-pop md-content ">
        <a href="#" @click="hide1" class="btn-close md-close"></a>
        <div class="account-page">
            <h1>Error</h1>
            <p>Insufficient Balance To Send</p>
            <div class="buttons">
                <button @click="hide1" class="buttons ok button button--shikoba md-close">
                    <img class="button__icon" src="../../assets/img/okay.svg">
                    <span>OK</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'insufficentBalance',
        data() {
            return{
            };
        },
        created(){
        },
        methods: {
            hide1 () {
                this.$modal.hide('insufficentBal');
            },
        }
    }
</script>

<style>

</style>
