<template>
    <div class="expex">
        <div class="top-add-dp">
            <div class="dp-section">
                <multiselect :searchable="false" name="accountCurruencies" :loading="loading" track-by="text" :allow-empty="false" label="text" :show-labels="false" placeholder="Select Wallet Address"  v-model="fromAddress" :options="optionFrom">
                    <template slot="singleLabel" slot-scope="props">
                        <svg class="svg-1 setImg1" v-bind:style="{fill:props.option.color}"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" xml:space="preserve">
                            <circle class="st012" cx="21.5" cy="21.5" r="21.5"/>
                            <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>
                            <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>
                            <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>
                            <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>
                            <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>
                            <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>
                        </svg><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                    </template>
                    <template slot="option" slot-scope="props">
                        <svg class="svg-1 setImg1" v-bind:style="{fill:props.option.color}"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" xml:space="preserve">
                            <circle class="st012" cx="21.5" cy="21.5" r="21.5"/>
                            <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>
                            <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>
                            <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>
                            <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>
                            <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>
                            <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>
                        </svg><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                    </template>
                </multiselect>
            </div>
        </div>
        <div>
            <div class="top-tab-bar">
                <div @click="handleTab('market')" :class="marketTab">
                    <h1 class="tab-label">Markets</h1>
                    <img v-if="marketTab === 'tab-head active'" class="tab-down" src="../../../assets/img/Polygon7.png"/>
                    <img v-if="marketTab === 'tab-head'" class="tab-left" src="../../../assets/img/Polygon8.png"/>
                </div>
                <div @click="handleTab('myorders')" :class="myOrderTab">
                    <h1 class="tab-label">My Orders</h1>
                    <img v-if="myOrderTab === 'tab-head active'" class="tab-down" src="../../../assets/img/Polygon7.png"/>
                    <img v-if="myOrderTab === 'tab-head'" class="tab-left" src="../../../assets/img/Polygon8.png"/>
                </div>
                <div @click="handleTab('tradehistory')" :class="tradeHistoryTab">
                    <h1 class="tab-label">Trade History</h1>
                    <img v-if="tradeHistoryTab === 'tab-head active'" class="tab-down" src="../../../assets/img/Polygon7.png"/>
                    <img v-if="tradeHistoryTab === 'tab-head'" class="tab-left" src="../../../assets/img/Polygon8.png"/>
                </div>
                <div @click="handleTab('marketconverter')" :class="currencyTab">
                    <h1 class="tab-label">Currency Converter</h1>
                    <img v-if="currencyTab === 'tab-head active'" class="tab-down" src="../../../assets/img/Polygon7.png"/>
                    <img v-if="currencyTab === 'tab-head'" class="tab-left" src="../../../assets/img/Polygon8.png"/>
                </div>
            </div>
            <div class="tab-bottom-bar"></div>
        </div>
        <router-view :fromAddress="fromAddress"></router-view>
    </div>
</template>

<script>
    import {getRandomColor} from '../../AccountsData/commonFunc';
    import Multiselect from 'vue-multiselect'
    export default {
        name: 'Expex-component',
        data() {
            return {
                marketTab: 'tab-head',
                myOrderTab: 'tab-head',
                tradeHistoryTab: 'tab-head',
                currencyTab: 'tab-head',
                loading: false,
                fromAddress: '',
                optionFrom: [],
                accountsArray: [],
                getRandomColor,
            };
        },
        components:{
            'multiselect': Multiselect,
        },
        computed: {
            accounts() {
                this.accountsArray = this.$store.state.allAccounts;
                return this.accountsArray;
            },
        },
        created(){
            switch (this.$router.history.current.path){
                case '/market':
                    this.$router.push({
                        path: '/market'
                    });
                    this.marketTab = 'tab-head active';
                    break;
                case '/myorders':
                    this.$router.push({
                        path: '/myorders'
                    });
                    this.myOrderTab = 'tab-head active';
                    break;
                case '/tradehistory':
                    this.$router.push({
                        path: '/tradehistory'
                    });
                    this.tradeHistoryTab = 'tab-head active';
                    break;
                case '/marketconverter':
                    this.$router.push({
                        path: '/marketconverter'
                    });
                    this.currencyTab = 'tab-head active';
                    break;
            }

            this.accounts && this.accounts.map((val) => {
                // console.log(val);
                if(val.balance > 0){
                    if(val.tokens) {
                        val.token_icons.map((acc_token) => {
                            if (acc_token.token_symbol === 'WEXP') {
                                var data = { value:val.hash ,text: val.hash + '- ('+ parseFloat(val.balance).toFixed(5)+' EXP )'+ '- ('+ parseFloat(acc_token.balance).toFixed(5)+' WEXP )', color: getRandomColor()};
                                this.optionFrom.push(data);
                                this.loading= false;
                            }
                        });
                        let obj = val.token_icons.find(o => o.token_symbol === 'WEXP');
                        if(!obj){
                            var data = { value:val.hash ,text: val.hash + '- ('+ parseFloat(val.balance).toFixed(5)+' EXP )'+ '- (0 WEXP )', color: getRandomColor()};
                            this.optionFrom.push(data);
                            this.loading= false;
                        }
                    } else {
                        var data = { value:val.hash ,text: val.hash + '- ('+ parseFloat(val.balance).toFixed(5)+' EXP )'+ '- (0 WEXP )', color: getRandomColor()};
                        this.optionFrom.push(data);
                        this.loading= false;
                    }
                }
            });
            if(this.optionFrom) {
                this.fromAddress = { value:this.optionFrom[0].value ,text: this.optionFrom[0].text, color: this.optionFrom[0].color};
            }
        },
        methods: {
            handleTab(tab) {
                this.marketTab = 'tab-head';
                this.myOrderTab = 'tab-head';
                this.tradeHistoryTab = 'tab-head';
                this.currencyTab = 'tab-head';
                switch (tab){
                    case 'market':
                        this.$router.push({
                            path: '/market'
                        });
                        this.marketTab = 'tab-head active';
                        break;
                    case 'myorders':
                        this.$router.push({
                            path: '/myorders'
                        });
                        this.myOrderTab = 'tab-head active';
                        break;
                    case 'tradehistory':
                        this.$router.push({
                            path: '/tradehistory'
                        });
                        this.tradeHistoryTab = 'tab-head active';
                        break;
                    case 'marketconverter':
                        this.$router.push({
                            path: '/marketconverter'
                        });
                        this.currencyTab = 'tab-head active';
                        break;
                }
            }
        }
    }
</script>

<style>

</style>
