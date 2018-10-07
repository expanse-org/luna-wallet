import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home'
import SplashScreen from '../components/SplashScreen/SplashScreen'
import ArchiveMain from '../components/ArchiveMainComponent/ArchiveMain'
import AddAccount from '../components/AccountsData/AddAccount'
import CreateAccount from '../components/AccountsData/CreateAccount'
import Dashboard from '../components/DasboardComponents/Dashboard'
import WalletDashboard from '../components/DasboardComponents/WalletDashboardComponents/WalletDashboard'
import TransferFunds from '../components/DasboardComponents/TransferFundsComponents/TransferFunds'
import Token from '../components/DasboardComponents/TokensComponents/Token'
import Contracts from '../components/DasboardComponents/ContractsComponents/Contracts'
import WatchContract from '../components/DasboardComponents/ContractsComponents/WatchContract'
import DeployContract from '../components/DasboardComponents/ContractsComponents/DeployContract'
import CurrencyConverter from '../components/DasboardComponents/CurrencyConveter/CurrencyConverter'
import AddToken from '../components/DasboardComponents/TokensComponents/AddToken'
import EXPWalletAdd from '../components/EXPWalletAddress/EXPWalletAdd'
import ViewAccount from '../components/DasboardComponents/WalletDashboardComponents/ViewAccount/ViewAccount'
import ContractDetails from '../components/DasboardComponents/ContractsComponents/ContractDetails'
import Transactiondetail from '../components/DasboardComponents/WalletDashboardComponents/Transactiondetail'
import SplashApp from '../views/SplashApp'
import MainApp from '../views/MainApp'
import AccountApp from '../views/AccountApp'
import gexpLogs from '../components/gexpLogs/gexpLogs'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/archiveAccounts',
            name: 'ArchiveMain',
            component: ArchiveMain,
        },{
            path: '/gexpLogs',
            name: 'GexpLogs',
            component: gexpLogs,
        }
        ,{
            path: '/',
            name: 'SplashApp',
            component: SplashApp,
            children: [
                {
                    path: '/',
                    name: 'SplashScreen',
                    component: SplashScreen,
                },
            ]
        },
        {
            path: '/accounts',
            name: 'AccountApp',
            component: AccountApp,
            children: [
                {
                    path: '/addaccount',
                    name: 'addaccount',
                    component: AddAccount
                },
                {
                    path: '/createaccount',
                    name: 'createaccount',
                    component: CreateAccount
                },
            ]
        },
        {
            path: '/dashboard',
            name: 'MainApp',
            component: MainApp,
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                    children: [
                        {
                            path: '/walletdashboard',
                            name: 'WalletDashboard',
                            component: WalletDashboard
                        },
                        {
                            path: '/transferfunds',
                            name: 'TransferFunds',
                            component: TransferFunds
                        },
                        {
                            path: '/expwalletaddress',
                            name: 'EXPWalletAdd',
                            component: EXPWalletAdd
                        },
                        {
                            path: '/token',
                            name: 'Token',
                            component: Token
                        },
                        {
                            path: '/contracts',
                            name: 'Contracts',
                            component: Contracts
                        },
                        {
                            path: '/watchcontracts',
                            name: 'WatchContract',
                            component: WatchContract
                        },
                        {
                            path: '/deploycontracts',
                            name: 'DeployContract',
                            component: DeployContract
                        },
                        {
                            path: '/currencyconverter',
                            name: 'CurrencyConverter',
                            component: CurrencyConverter
                        },
                        {
                            path: '/watchToken',
                            name: 'watchToken',
                            component: AddToken
                        },
                        {
                            path: '/accountdetails',
                            name: 'accountdetails',
                            component: ViewAccount
                        },
                        {
                            path: '/contractdetails',
                            name: 'contractdetails',
                            component: ContractDetails
                        },
                        {
                            path: '/transactiondetails',
                            name: 'transactiondetails',
                            component: Transactiondetail
                        }
                    ]
                },
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
