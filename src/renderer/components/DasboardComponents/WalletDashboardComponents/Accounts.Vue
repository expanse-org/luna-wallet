<template>
    <div class="userInfo">
        <div class="curve"></div>
        <div class="left">
            <!-- <div class="qrCode" id="qrCode1"> -->
            <canvas id="qrCode1"></canvas>
            <!-- <svg
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px" y="0px" width="136px" height="136px" viewBox="0 0 136 136" style="enable-background:new 0 0 136 136;"
                      xml:space="preserve">
                      <path class="qr" d="M130,136v-6h6v6H130z M126,126h-5v9h-14v-5h10v-4h-10v-10h-4v10h-5v5h5v4h-9v-14h4v-5h-4v5h-5v-14h5v-9h-5v-5
                      h-5v-4h5v-5h5v5h13v4h10v-4h-5v-6h5v-3h4v3h6v6h4v9h4v9h-4v-4h-5v5h-5v4h-4v13h4v-9h5v-8h5v13h5v5H126z M112,98H98v14h14V98z
                      M121,102h5V89h-5V102z M108,108h-6v-6h6V108z M126,80v-5h9v14h-4v-9H126z M131,61h4v10h-4V61z M126,56h5v5h-5V56z M131,47h-5v5h-4
                      v-6h4v-4h9v10h-4V47z M131,33h-28V1h32v32H131z M131,5h-23v23h23V5z M126,24h-14V10h14V24z M121,37v10h-4V37H121z M108,66h4v4h-4V66
                      z M70,65h-4v-4h4V65z M61,47h-4v-4h4V47z M108,47h-5v-9h9v14h9v14h5v4h-5v4h-9v-3h5V56h-5v5h-5v4h-4v-4h-9v5h4v5h10v3h-1v1h5v5h-5v4
                      h-9v-4h5v-6h-5v5h-4v-5h-6v10h-3v-5h-5v19h4v4H74v10h-4v-5h-5v5h5v9h5v6h-5v4h-5v-5h-4v9H43v-4h-5v-10h4v-14h6v-4h17v-1h1v-3H55v-6
                      h-4v5h-3v-5h-5v-5h-5v-4h9v5h5v-5h-4v-4h4V70h4v10h5V66h5v5h4v4h15v-4h-1v-1h-4v-4h4v-5h9v-4h-5v-6h6V38h-5v-5h5v-5h4v23h10V47z
                      M61,107h-9v5h5v5h-9v5h-6v3h6v6h8v-10h5V107z M75,79h-5v1h-5v4h6v5h4V79z M75,93h-9v-4h-4v4h4v5h9V93z M84,28h-4v5h-5V19h5v5h4v-5
                      h5v14h-5V28z M84,38v9h-4v-5h-5v-4h5v-5h4V38z M75,52v-5h5v5H75z M80,66h-5V56h5V66z M80,135H70v-4h10V135z M71,56v-4h4v4H71z
                      M70,33h5v4h-5v10h-4v-5h-5v-4h-5V24h5v9h5V23h-5V5h5v10h9v4h-5V33z M51,19h5v5h-5V19z M94,14h-5v-4h5V5h-5V1h9v13H94z M84,10V5h5v5
                      H84z M84,14v4h-4v-4h-5v-4h9V14z M71,5V1h9v4h-5v5h-4V5z M52,10v5h-4v-5h-5V0h4v5h5V10z M52,1h4v4h-4V1z M38,15h4v4h-4V15z M38,43h3
                      v-1h2v-5h-5V24h9v4h-5v5h5v5h4v27h-8v-4h-5v-5h-4v-4h4V43z M42,57h5v-6h-5V57z M51,29v4h-4v-4H51z M34,65v-4h4v4H34z M0,0h34v34H0V0
                      z M5,29h24V5H5V29z M10,10h15v15H10V10z M5,38h9v9H5V38z M28,42v5h-8v5h-5v-5h4v-5H28z M29,38h4v4h-4V38z M33,51h-4v-4h4V51z M5,56
                      h28v5h-5v5H15v-5h-5v4H1V52h4V56z M10,79H5v5H1v-9h9V79z M14,70h14v5H14V70z M29,66h4v4h-4V66z M33,79h-4v-4h4V79z M37,70h10v11h-5
                      v-6h-5V70z M10,80h4v4h5v-4h5v4h9v5h-4v5h4v-5h5v5h4v4h5v5h-9v-5H19v-4h5v-5H14v9h-4v-4H1v-5h9V80z M37,80v4h-4v-4H37z M33,107v28H1
                      v-32h32V107z M28,108H6v22h22V108z M24,126H10v-14h14V126z M80,108h4v14h5v9h-5v-5h-4V108z"/>
                      </svg> -->

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
