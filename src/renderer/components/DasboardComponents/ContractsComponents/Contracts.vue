<template>
    <div class="contract tabcontent" id="contracts">
        <div class="content">
            <div class="heading">
                <label>Contracts</label>
            </div>
            <div class="custom-tokens">
                <div class="head">
                    <label>CUSTOM CONTRACTS</label>
                    <p>To watch and interact with a contract already deployed on the blockchain,
                        <br> you need to know its address and the description of its interface in JSON format.</p>
                </div>
                <div class="buttons">
                    <button type="button" @click="openwatchContract" class="primery add_token_popup button button--wapasha button--round-s md-trigger " data-modal="watch-contract">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path id="Forma_1" data-name="Forma 1" class="plus" d="M10,20A10,10,0,1,1,20,10,10,10,0,0,1,10,20ZM10,5.095c-4.315,0-7.687,4.231-7.829,4.412a0.8,0.8,0,0,0,0,.988C2.313,10.674,5.685,14.9,10,14.9s7.687-4.229,7.829-4.409a0.8,0.8,0,0,0,0-.988C17.688,9.326,14.316,5.095,10,5.095ZM10,13.3c-2.747,0-5.178-2.275-6.137-3.3C4.822,8.97,7.254,6.694,10,6.694S15.18,8.972,16.138,10C15.183,11.03,12.758,13.3,10,13.3Zm0-5.7A2.4,2.4,0,1,0,12.4,10,2.4,2.4,0,0,0,10,7.6Z"
                            />
                        </svg>
                        <span>Watch Contract</span>
                    </button>
                    <button type="button" @click="opendeployContract" class="action add_token_popup button button--wapasha button--round-s md-trigger" data-modal="deploy-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                            <path d="M22.000,14.000 L14.000,14.000 L14.000,22.000 L8.000,22.000 L8.000,14.000 L-0.000,14.000 L-0.000,8.000 L8.000,8.000 L8.000,-0.000 L14.000,-0.000 L14.000,8.000 L22.000,8.000 L22.000,14.000 Z"
                                  class="plus" />
                        </svg>
                        <span>Deploy New Contract</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="dashboard costum-account">
            <div class="content costum-account">
                <div class="accounts">
                    <div class="top">
                        <label>Contracts</label>
                    </div>
                    <div class="bottom contracts_list_js">
                    </div>
                    <div class="contractinfo">
                        <label>Most exchanges don't support receiving exp from a contract wallet yet. Be sure to move
                            the money to an account address first!</label>
                <!--   <button>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px"
                                viewBox="0 0 45 52" style="enable-background:new 0 0 45 52;" xml:space="preserve">
                                <path class="show" d="M44,52H12c-0.6,0-1-0.4-1-1V41H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h32c0.6,0,1,0.4,1,1v10h10c0.6,0,1,0.4,1,1
                                v39C45,51.6,44.6,52,44,52z M32,2H2v37h9v-3h2v3h19V13h-3v-2h3V2z M43,13h-9v27c0,0.6-0.4,1-1,1H13v9h30V13z M22,11h5v2h-5V11z
                                M16,11h4v2h-4V11z M13,14h-2v-3h3v2h-1V14z M13,20h-2v-3h2V20z M13,27h-2v-4h2V27z M13,33h-2v-4h2V33z"
                                />
                            </svg>
                            Show Contract Info
                        </button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Contracts',
        created(){
        },
        methods: {
            openwatchContract(){
                this.$router.push({
                    path: '/watchcontracts'
                });
            },
            opendeployContract(){
                this.$router.push({
                    path: '/deploycontracts'
                });
            },
        }
    }
</script>

<style>

</style>
