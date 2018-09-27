<template>
    <div class="contract tabcontent" id="tokens">
        <div class="content">
            <div class="heading">
                <label>Tokens</label>
            </div>
            <div class="custom-tokens">
                <div class="head">
                    <label>CUSTOM TOKENS</label>
                    <p>Tokens are currencies and other fungibles built on the Expanse platform. In order for accounts
                        to watch for<br> tokens and send them, you have to add their address to this list. You can create your
                        own token by simply <br> modifying this example of a custom token contract or learning more about Expanse Tokens.</p>
                </div>
                <div class="buttons">
                    <button type="button" name="watchtoken" @click="handleWatchToken" class="primery add_token_popup button button--wapasha button--round-s md-trigger " data-modal="modal-2">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="22"
                             height="22" viewBox="0 0 22 22">
                            <path d="M22.000,14.000 L14.000,14.000 L14.000,22.000 L8.000,22.000 L8.000,14.000 L-0.000,14.000 L-0.000,8.000 L8.000,8.000 L8.000,-0.000 L14.000,-0.000 L14.000,8.000 L22.000,8.000 L22.000,14.000 Z" class="plus" />
                        </svg>
                        <span>WATCH TOKEN</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="dashboard costum-account">
            <div class="content costum-account">
                <div class="accounts">
                    <div class="top">
                        <label>Tokens</label>
                    </div>
                    <div class="bottom tokens_list_js">
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
        <modal class="modal" name="watchtoken">
            <AddToken></AddToken>
        </modal>
    </div>
</template>

<script>
    import classie from '../../../assets/js/classie.js';
    import AddToken from './AddToken';
    export default {
        name: 'token',
        components: {
            AddToken: AddToken
        },
        created(){
        },
        methods: {
            show () {
                this.$modal.show('watchtoken');
            },
            hide () {
                this.$modal.hide('watchtoken');
            },
            handleWatchToken(){
                this.show();
                var overlay = document.querySelector( '.md-overlay' );

                [].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

                    var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
                        close = modal.querySelector( '.md-close' );

                    function removeModal( hasPerspective ) {
                        classie.remove( modal, 'md-show' );

                        if( hasPerspective ) {
                            classie.remove( document.documentElement, 'md-perspective' );
                        }
                    }

                    function removeModalHandler() {
                        removeModal( classie.has( el, 'md-setperspective' ) );
                    }

                    el.addEventListener( 'click', function( ev ) {
                        classie.add( modal, 'md-show' );
                        overlay.removeEventListener( 'click', removeModalHandler );
                        overlay.addEventListener( 'click', removeModalHandler );

                        if( classie.has( el, 'md-setperspective' ) ) {
                            setTimeout( function() {
                                classie.add( document.documentElement, 'md-perspective' );
                            }, 25 );
                        }
                    });

                    close.addEventListener( 'click', function( ev ) {
                        ev.stopPropagation();
                        removeModalHandler();
                    });

                } );
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
