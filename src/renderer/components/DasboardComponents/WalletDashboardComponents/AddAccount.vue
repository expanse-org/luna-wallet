<template>
    <div class="popup tab-pop md-content ">
        <a href="#" @click="hide" class="btn-close md-close"></a>
        <div class="account-page">
            <form id="create_Account">
                <h1>Add Account</h1>
                <div class="tab-modal">
                    <button :class="createAcclass" @click="accounts($event, 'create-new-account')">
                        <span>Create New Account</span>
                    </button>
                    <button :class="importAcclass" @click="accounts($event, 'import-account')">
                        <span>Import Account</span>
                    </button>
                    <button :class="createHDAcclass" @click="accounts($event, 'create-HD-account')">
                        <span>Create HD Wallet</span>
                    </button>
                </div>
                <div v-if="createAcc">
                    <createAccount />
                </div>
                <div v-if="importAcc">
                    <importAccount />
                </div>
                <div v-if="createHDAcc">
                    <createHDWallet />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import CreateAccount from './AccountComponents/CreateAccount';
    import CreateHDWallet from './AccountComponents/CreateHDWallet';
    import ImportAccount from './AccountComponents/ImportAccount';
    export default {
        name: 'AddAccount-page',
        components:{
            'createAccount': CreateAccount,
            'createHDWallet': CreateHDWallet,
            'importAccount': ImportAccount,
        },
        data(){
            return {
                createAcc: true,
                importAcc: false,
                createHDAcc: false,
                createAcclass: 'tablinks active',
                importAcclass: 'tablinks',
                createHDAcclass: 'tablinks',
            };
        },
        created(){
        },
        methods: {
            hide () {
                this.$modal.hide('openAddAccountModal');
            },
            accounts(e, tab){
                e.preventDefault();
                console.log(tab);
                this.createAcclass = 'tablinks';
                this.importAcclass = 'tablinks';
                this.createHDAcclass = 'tablinks';
                switch(tab) {
                    case 'create-new-account':
                        this.createAcc = true;
                        this.importAcc = false;
                        this.createHDAcc = false;
                        this.createAcclass = 'tablinks active';
                    break;
                    case 'import-account':
                        this.createAcc = false;
                        this.importAcc = true;
                        this.createHDAcc = false;
                        this.importAcclass = 'tablinks active';
                    break;
                    case 'create-HD-account':
                        this.createAcc = false;
                        this.importAcc = false;
                        this.createHDAcc = true;
                        this.createHDAcclass = 'tablinks active';
                    break;
                }
            }

        }
    }
</script>

<style>

</style>
