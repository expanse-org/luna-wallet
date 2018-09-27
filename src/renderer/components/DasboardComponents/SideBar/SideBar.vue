<template>
    <div class="menu-drawer">
        <button type="button" class="open-btn">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="89px"
                    viewBox="0 0 25 89" v-bind:style="{enableBackground:'new 0 0 25 89'}" xml:space="preserve">
                    <path class="st0" d="M0,0l25,20v49L0,89V0z"></path>
                    <path class="st1" d="M17,46.6V54l0,0L6,44.6L17,35l0,0V46.6z"></path>
                </svg>
        </button>
        <button class="logo" type="button">
            <img src="../../../assets/img/logo-luna1.png" alt="logo" v-bind:style="{width:'61px'}">
        </button>
        <ul>
            <li :class="walletTab" @click="mainMenu($event, 'wallet')">
                <button class="btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="33px" height="33px"
                            viewBox="0 0 53 54" v-bind:style="{enableBackground:'new 0 0 53 54'}" xml:space="preserve">
                            <path class="icon" d="M53,25.2h-2.6V13.2c0-2.8-2.3-5.2-5.1-5.2h-3.5l-3.6-6.5c-0.8-1.5-2.7-2-4.2-1.2c0,0,0,0,0,0L20.4,8.1H5.1C2.3,8.1,0,10.4,0,13.2v35.6C0,51.7,2.3,54,5.1,54h40.2c2.8,0,5.1-2.3,5.1-5.2V38.4H53V25.2L53,25.2zM45.3,10.1c1.6,0,2.9,1.2,3,2.8h-3.9L43,10.1H45.3z M35.1,2.2c0.5-0.3,1.1-0.1,1.4,0.4l5.7,10.3H16L35.1,2.2z M48.4,48.8c0,1.7-1.4,3.1-3.1,3.1H5.1c-1.7,0-3.1-1.4-3.1-3.1V13.2c0-1.7,1.4-3.1,3.1-3.1h11.6l-4.9,2.8h-6c-0.6,0-1,0.5-1,1s0.5,1,1,1h42.6v10.2h-7.5c-3.5,0-6.3,2.9-6.3,6.4V32c0,3.5,2.8,6.4,6.3,6.4h7.5L48.4,48.8L48.4,48.8L48.4,48.8z M50.9,36.3H40.9c-2.4,0-4.3-1.9-4.3-4.3v-0.4c0-2.4,1.9-4.3,4.3-4.3h10.1V36.3z M44,31.8c0,1.3-1,2.3-2.3,2.2s-2.3-1-2.2-2.3c0-1.2,1-2.2,2.3-2.2    C43,29.6,44,30.6,44,31.8C44,31.8,44,31.8,44,31.8z"></path>
                        </svg>
                    <span>WALLETS</span>
                </button>
            </li>
            <li :class="transferfundTab" data-account="0" @click="mainMenu($event, 'transferfund')">
                <button class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="38"
                         height="35" viewBox="0 0 38 35">
                        <path d="M37.808,0.139 C37.639,-0.008 37.398,-0.043 37.194,0.052 L0.329,17.098 C0.131,17.189 0.003,17.386 0.000,17.604 C-0.002,17.822 0.122,18.022 0.318,18.118 L10.751,23.213 C10.942,23.307 11.170,23.285 11.341,23.158 L21.485,15.614 L13.522,23.765 C13.408,23.881 13.350,24.041 13.363,24.202 L14.155,34.478 C14.173,34.706 14.326,34.900 14.544,34.972 C14.603,34.991 14.663,35.000 14.722,35.000 C14.884,35.000 15.042,34.931 15.152,34.804 L20.689,28.418 L27.534,31.673 C27.683,31.744 27.855,31.747 28.006,31.682 C28.157,31.616 28.272,31.489 28.321,31.333 L37.975,0.734 C38.043,0.520 37.977,0.287 37.808,0.139 Z"
                              class="icon"></path>
                    </svg>
                    <span>SEND</span>
                </button>
            </li>
            <li class="md-trigger" data-modal="modal-1">
                <button class="btn" name="expwallet"  @click="show"  >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="35px"
                            height="35px" viewBox="0 0 35 35" v-bind:style="{enableBackground:'new 0 0 35 35'}" xml:space="preserve">
                            <path class="icon" d="M17.5,35C7.8,35,0,27.2,0,17.5S7.8,0,17.5,0S35,7.8,35,17.5S27.2,35,17.5,35z M17.5,3.5c-7.7,0-14,6.3-14,14s6.3,14,14,14s14-6.3,14-14S25.2,3.5,17.5,3.5z M17.7,24.3l0-1L17.7,24.3L6.4,15.8l1.2-1.6l10.3,7.5l10-7.7l1.2,1.7L17.7,24.3z"></path>
                        </svg>
                    <span>RECEIVE</span>
                </button>
            </li>

            <li :class="tokenTab" @click="mainMenu($event, 'token')">
                <button class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="555" height="555" viewBox="0 0 555 555">
                        <path id="Rounded_Rectangle_3" data-name="Rounded Rectangle 3"  d="M177.293,546.928l-47.762-47.762A54.33,54.33,0,0,0,57,426.639L8.072,377.707a27.571,27.571,0,0,1,0-38.991L338.716,8.072a27.571,27.571,0,0,1,38.991,0l48.2,48.2a54.33,54.33,0,0,0,74,74l47.028,47.027a27.571,27.571,0,0,1,0,38.991L216.284,546.928A27.571,27.571,0,0,1,177.293,546.928Zm279.566-317a11.029,11.029,0,0,0,0-15.6L340.665,98.142a11.028,11.028,0,0,0-15.6,0L96.192,327.019a11.028,11.028,0,0,0,0,15.6L212.385,458.808a11.028,11.028,0,0,0,15.6,0ZM217.064,441.652L113.348,337.936a5.515,5.515,0,0,1,0-7.8l216.01-216.01a5.513,5.513,0,0,1,7.8,0L440.872,217.844a5.513,5.513,0,0,1,0,7.8l-216.01,216.01A5.515,5.515,0,0,1,217.064,441.652Z"></path>
                    </svg>
                    <span>Tokens</span>
                </button>
            </li>
            <li :class="contractsTab" @click="mainMenu($event, 'contracts')">
                <button class="btn">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="34px"
                            height="39px" viewBox="0 0 45 52" v-bind:style="{enableBackground:'new 0 0 45 52'}" xml:space="preserve">
                            <path id="Rounded_Rectangle_1_copy_1_" class="icon" d="M44,52H12c-0.6,0-1-0.4-1-1V41H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h32
                            c0.6,0,1,0.4,1,1v10h10c0.6,0,1,0.4,1,1v39C45,51.6,44.6,52,44,52z M32,2H2v37h9v-3h2v3h19V13h-3v-2h3V2z M43,13h-9v27
                            c0,0.6-0.4,1-1,1H13v9h30V13z M22,11h5v2h-5V11z M16,11h4v2h-4V11z M13,14h-2v-3h3v2h-1V14z M13,20h-2v-3h2V20z M13,27h-2v-4h2V27z
                             M13,33h-2v-4h2V33z"></path>
                        </svg>
                    <span>CONTRACTS</span>
                </button>
            </li>

            <li :class="currencyTab" @click="mainMenu($event, 'currencyconverter')">
                <button class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="35"
                         height="35" viewBox="0 0 35 35">
                        <path d="M22.076,34.270 L12.274,31.521 L7.214,32.087 L7.214,35.000 L-0.000,35.000 L-0.000,20.896 L6.120,20.896 L15.969,19.370 L25.551,21.767 L25.551,24.748 L33.842,22.740 L35.000,27.154 L22.076,34.270 ZM5.133,32.321 L5.133,22.975 L2.081,22.975 L2.081,32.921 L5.133,32.921 L5.133,32.321 ZM32.346,25.241 L24.510,27.140 L17.148,25.346 L17.641,23.326 L23.470,24.746 L23.470,23.390 L15.872,21.489 L7.214,22.831 L7.214,29.995 L12.445,29.409 L21.818,32.037 L32.575,26.115 L32.346,25.241 ZM20.988,18.130 C15.984,18.130 11.913,14.063 11.913,9.065 C11.913,4.066 15.984,0.000 20.988,0.000 C25.991,0.000 30.062,4.066 30.062,9.065 C30.062,14.063 25.991,18.130 20.988,18.130 ZM20.988,2.079 C17.131,2.079 13.994,5.213 13.994,9.065 C13.994,12.917 17.131,16.050 20.988,16.050 C24.844,16.050 27.981,12.917 27.981,9.065 C27.981,5.213 24.844,2.079 20.988,2.079 ZM22.377,6.191 C22.281,6.127 22.163,6.073 22.028,6.028 L22.028,8.112 C23.768,8.422 24.810,9.536 24.810,11.174 C24.810,12.811 23.768,13.926 22.028,14.235 L22.028,15.069 L19.947,15.069 L19.947,14.235 C18.207,13.926 17.165,12.811 17.165,11.174 L19.247,11.174 C19.247,11.641 19.425,11.823 19.598,11.939 C19.694,12.002 19.812,12.057 19.947,12.101 L19.947,10.017 C18.207,9.708 17.166,8.593 17.166,6.956 C17.166,5.319 18.207,4.204 19.947,3.895 L19.947,3.061 L22.028,3.061 L22.028,3.895 C23.768,4.204 24.810,5.319 24.810,6.956 L22.728,6.956 C22.728,6.488 22.550,6.307 22.377,6.191 ZM19.947,6.028 C19.812,6.073 19.694,6.127 19.598,6.191 C19.425,6.307 19.247,6.488 19.247,6.956 C19.247,7.424 19.425,7.605 19.598,7.721 C19.694,7.785 19.812,7.839 19.947,7.884 L19.947,6.028 ZM22.028,12.101 C22.163,12.057 22.281,12.003 22.377,11.939 C22.550,11.823 22.728,11.641 22.728,11.174 C22.728,10.706 22.550,10.524 22.377,10.409 C22.281,10.345 22.163,10.290 22.028,10.246 L22.028,12.101 Z"
                              class="icon"></path>
                    </svg>
                    <span>PARTICIPATE IN A TOKEN SALE</span>
                </button>
            </li>
            <!-- <li class="tablinks" @click="mainMenu($event, 'accountDetail')">
          <button class="btn" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="35" height="35" viewBox="0 0 35 35">
                      <path d="M22.076,34.270 L12.274,31.521 L7.214,32.087 L7.214,35.000 L-0.000,35.000 L-0.000,20.896 L6.120,20.896 L15.969,19.370 L25.551,21.767 L25.551,24.748 L33.842,22.740 L35.000,27.154 L22.076,34.270 ZM5.133,32.321 L5.133,22.975 L2.081,22.975 L2.081,32.921 L5.133,32.921 L5.133,32.321 ZM32.346,25.241 L24.510,27.140 L17.148,25.346 L17.641,23.326 L23.470,24.746 L23.470,23.390 L15.872,21.489 L7.214,22.831 L7.214,29.995 L12.445,29.409 L21.818,32.037 L32.575,26.115 L32.346,25.241 ZM20.988,18.130 C15.984,18.130 11.913,14.063 11.913,9.065 C11.913,4.066 15.984,0.000 20.988,0.000 C25.991,0.000 30.062,4.066 30.062,9.065 C30.062,14.063 25.991,18.130 20.988,18.130 ZM20.988,2.079 C17.131,2.079 13.994,5.213 13.994,9.065 C13.994,12.917 17.131,16.050 20.988,16.050 C24.844,16.050 27.981,12.917 27.981,9.065 C27.981,5.213 24.844,2.079 20.988,2.079 ZM22.377,6.191 C22.281,6.127 22.163,6.073 22.028,6.028 L22.028,8.112 C23.768,8.422 24.810,9.536 24.810,11.174 C24.810,12.811 23.768,13.926 22.028,14.235 L22.028,15.069 L19.947,15.069 L19.947,14.235 C18.207,13.926 17.165,12.811 17.165,11.174 L19.247,11.174 C19.247,11.641 19.425,11.823 19.598,11.939 C19.694,12.002 19.812,12.057 19.947,12.101 L19.947,10.017 C18.207,9.708 17.166,8.593 17.166,6.956 C17.166,5.319 18.207,4.204 19.947,3.895 L19.947,3.061 L22.028,3.061 L22.028,3.895 C23.768,4.204 24.810,5.319 24.810,6.956 L22.728,6.956 C22.728,6.488 22.550,6.307 22.377,6.191 ZM19.947,6.028 C19.812,6.073 19.694,6.127 19.598,6.191 C19.425,6.307 19.247,6.488 19.247,6.956 C19.247,7.424 19.425,7.605 19.598,7.721 C19.694,7.785 19.812,7.839 19.947,7.884 L19.947,6.028 ZM22.028,12.101 C22.163,12.057 22.281,12.003 22.377,11.939 C22.550,11.823 22.728,11.641 22.728,11.174 C22.728,10.706 22.550,10.524 22.377,10.409 C22.281,10.345 22.163,10.290 22.028,10.246 L22.028,12.101 Z" class="icon"></path>
                      </svg>
              <span>Account Details</span>
          </button>
      </li>
            <li>
                <button class="btn" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="19"
                        height="18" viewBox="0 0 19 18">
                        <path d="M9.916,18.000 C7.987,18.000 6.144,17.408 4.587,16.289 C4.408,16.161 4.360,15.918 4.476,15.732 L5.938,13.381 C6.000,13.282 6.100,13.213 6.215,13.191 C6.330,13.168 6.449,13.194 6.544,13.262 C7.455,13.917 8.532,14.262 9.660,14.262 C12.589,14.262 14.972,11.902 14.972,9.000 C14.972,6.098 12.589,3.738 9.660,3.738 C8.532,3.738 7.455,4.083 6.544,4.738 C6.449,4.806 6.330,4.832 6.215,4.809 C6.100,4.787 6.000,4.718 5.938,4.619 L4.476,2.268 C4.360,2.082 4.408,1.839 4.587,1.711 C6.144,0.592 7.987,-0.000 9.916,-0.000 C14.925,-0.000 19.000,4.037 19.000,9.000 C19.000,13.963 14.925,18.000 9.916,18.000 ZM5.783,5.625 C5.856,5.760 5.848,5.925 5.762,6.053 L4.773,7.523 L10.759,7.523 C11.581,7.523 12.249,8.186 12.249,9.000 C12.249,9.814 11.581,10.477 10.759,10.477 L4.773,10.477 L5.762,11.947 C5.848,12.075 5.856,12.240 5.783,12.375 C5.710,12.511 5.567,12.596 5.411,12.596 L2.560,12.596 C2.419,12.596 2.287,12.526 2.209,12.410 L0.070,9.231 C-0.024,9.091 -0.024,8.909 0.070,8.768 L2.209,5.590 C2.287,5.474 2.419,5.404 2.560,5.404 L5.411,5.404 C5.567,5.404 5.710,5.489 5.783,5.625 Z"
                            class="icon"></path>
                    </svg>
                    <span>JONE SMITH</span>
                </button>
            </li>-->

        </ul>

        <modal class="modal" name="expwallet">
            <EXPWalletAdd></EXPWalletAdd>
        </modal>
    </div>
</template>

<script>
    import EXPWalletAdd from '../../EXPWalletAddress/EXPWalletAdd'
    export default {
        name: 'SideBar-page',
        components: {
            'EXPWalletAdd': EXPWalletAdd
        },
        data() {
            return {
                walletTab: 'tablinks',
                transferfundTab: 'tablinks ',
                expwalletTab: 'tablinks ',
                tokenTab: 'tablinks ',
                contractsTab: 'tablinks ',
                currencyTab: 'tablinks ',
            };
        },
        created(){
            this.update();
            console.log(this.$router.history.current.path)
            switch (this.$router.history.current.path){
                case '/walletdashboard':
                    this.$router.push({
                        path: '/walletdashboard'
                    });
                    this.walletTab = 'tablinks active';
                    break;
                case '/transferfunds':
                    this.$router.push({
                        path: '/transferfunds'
                    });
                    this.transferfundTab = 'tablinks active';
                    break;
                case '/expwalletaddress':
                    this.$router.push({
                        path: '/expwalletaddress'
                    });
                    this.expwalletTab = 'tablinks active';
                    break;
                case '/token':
                    this.$router.push({
                        path: '/token'
                    });
                    this.tokenTab = 'tablinks active';
                    break;
                case '/contracts':
                    this.$router.push({
                        path: '/contracts'
                    });
                    this.contractsTab = 'tablinks active';
                    break;
                case '/currencyconverter':
                    this.$router.push({
                        path: '/currencyconverter'
                    });
                    this.currencyTab = 'tablinks active';
                    break;
            }

        },
        methods: {
            show () {
                this.$modal.show('expwallet');
            },
            hide () {
                this.$modal.hide('expwallet');
            },
            update(){
                console.log("update");
                this.walletTab= 'tablinks';
                this.transferfundTab= 'tablinks';
                this.expwalletTab= 'tablinks';
                this.tokenTab= 'tablinks';
                this.contractsTab= 'tablinks';
                this.currencyTab= 'tablinks';
            },
            mainMenu(e, tab){
                this.update();
                console.log("dsasda",tab)
                switch (tab){
                    case 'wallet':
                        this.$router.push({
                            path: '/walletdashboard'
                        });
                        this.walletTab = 'tablinks active';
                        break;
                    case 'transferfund':
                        this.$router.push({
                            path: '/transferfunds'
                        });
                        this.transferfundTab = 'tablinks active';
                        break;
                    case 'expwallet':
                        this.$router.push({
                            path: '/expwalletaddress'
                        });
                        this.expwalletTab = 'tablinks active';
                        break;
                    case 'token':
                        this.$router.push({
                            path: '/token'
                        });
                        this.tokenTab = 'tablinks active';
                        break;
                    case 'contracts':
                        this.$router.push({
                            path: '/contracts'
                        });
                        this.contractsTab = 'tablinks active';
                        break;
                    case 'currencyconverter':
                        this.$router.push({
                            path: '/currencyconverter'
                        });
                        this.currencyTab = 'tablinks active';
                        break;
                }

            },

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