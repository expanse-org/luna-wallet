<template>
    <div class="userInfo">
        <div class="curve"></div>
        <div class="left">
            <!-- <div class="qrCode" id="qrCode1"> -->
            <canvas id="qrCode1"></canvas>

            <!-- </div> -->
            <div class="info main-account">
                <h1 class="m_name">Main account (BASE)</h1>
                <label class="balance">00.000</label>
                <!-- <span class="currency-sign">Exp</span> -->
                <div class=" copy accoundID wd300">
                    <label class="main-account-hash">0X</label>
                    <div class="tooltip3 copytext" data-val=".main-account-hash-input">
                        <img src="../../../assets/img/copy.svg" />
                        <span class="tooltiptext2">Copied</span>
                    </div>
                    <input type="hidden" class="main-account-hash-input" />

                </div>
                <div class="btns">
                    <button class="button action button--shikoba md-trigger openAddAccountModal" @click="show" data-modal="modal-3">
                        <img class="button__icon" src="../../../assets/img/addaccount.svg" />
                        <span>Add Account</span>
                    </button>
                    <button class="button primery button--shikoba account1 a1 main_view_account" data-val="0xd416db48cce26ad2dff060d90ef45db8a67aa3ac"
                            @click="mainMenu()">
                        <img class="button__icon" src="../../../assets/img/viewaccount.svg" />
                        <span>View Account</span>
                    </button>
                </div>
            </div>
        </div>
        <modal class="modal" name="openAddAccountModal">
            <addAccount-app/>
        </modal>
    </div>
</template>

<script>
    import AddAccount from './AddAccount';
    export default {
        name: 'Accounts',
        components:{
            'addAccount-app': AddAccount,
        },
        created(){
        },
        methods: {
            mainMenu(){
                this.$router.push({
                    path: '/accountdetails',
                    query: { accountDetail: '0xd416db48cce26ad2dff060d90ef45db8a67aa3ac' }
                });
            },
            show () {
                this.$modal.show('openAddAccountModal');
            },
            hide () {
                this.$modal.hide('openAddAccountModal');
            }
        }
    }
</script>

<style>
    .modal .v--modal {
        top: 20% !important;;
        left: 25% !important;;
        max-width: 630px !important;
        min-width: 320px !important;
        height: auto !important;
        position: fixed !important;
        border-radius: 10px !important;
        box-sizing: border-box !important;
        border-radius: 10px !important;
        width: 80vw !important;
        padding:0 !important;
        z-index: 2000;
    }

    .modal .v--modal .popup {
        width: 91% !important;
    }

</style>
