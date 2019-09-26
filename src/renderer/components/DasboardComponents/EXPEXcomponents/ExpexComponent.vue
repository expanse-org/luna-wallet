<template>
    <div class="expex">
        <div class="top-add-dp">
            <div class="dp-section">
                <multiselect :searchable="false" name="accountCurruencies" :loading="loading" track-by="text" :allow-empty="false" label="text" :show-labels="false" placeholder="Select Address"  v-model="fromAddress" :options="optionFrom">
                    <template slot="singleLabel" slot-scope="props">
                        <img class="option__image setImg1" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                    </template>
                    <template slot="option" slot-scope="props">
                        <img class="option__image setImg1" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
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
        <router-view></router-view>
    </div>
</template>

<script>
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
                    var data = { value:val.hash ,text: val.hash + '- ('+ val.balance+' EXP )'};
                    this.optionFrom.push(data);
                    this.loading= false;
                }
            });
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
