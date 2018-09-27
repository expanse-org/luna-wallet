<template>
    <div class="participate tabcontent" id="participate">
        <div class="content">
            <div class="saleDetails">
                <webview src="https://changelly.com/widget/v1?auth=email&from=BTC&to=EXP&merchant_id=1fa97b20d6b6&address=&amount=0.01&ref_id=1fa97b20d6b6&color=357757"
                        width="100%" height="650" class="changelly" scrolling="no" style="overflow-y: hidden; border: none">
                    Can't load widget </webview>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Currency_Converter',
        created(){
        },
        methods: {
        }
    }
</script>

<style>
    webview {
        height: 650px!important;
    }
</style>
