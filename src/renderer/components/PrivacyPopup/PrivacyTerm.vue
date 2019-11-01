<template>
    <div class="popup popup1 md-content ">
        <div class="account-page privacypopup">
            <h1>Terms and Condition</h1>
            <h2 class="bluetext">Terms Of Service</h2>
            <div class="alignLeft">
                <p>This Terms of Service Agreement ( "Terms" or "Agreement" ) is a contract between you ( "User" , "you" or "your" ) and Expanse Tech (together with its subsidiaries
                    and affiliates, "Expanse", "we", "us" or "our"), operators of the EXPEX digital asset platform (" EXPEX" or " DEX", currently available at expex.io as an integrated
                    component of luna wallet) that applies to your:
                </p>
                <ul>
                    <li>Use of EXPEX to buy or sell digital assets;</li>
                    <li>creation of a non-hosted software wallet for digital assets via Luna Wallet; or</li>
                    <li>use of any other services offered by us (together, the "Services" ).</li>
                </ul>
                <p >Please read this document carefully. It contains very important information about the terms of our services. By using our Services, you accept and are bound by the terms below.</p>
                <p >THIS AGREEMENT CONTAINS A BINDING ARBITRATION CLAUSE AND CLASS ACTION WAIVER THAT IMPACT YOUR RIGHTS ABOUT HOW TO RESOLVE DISPUTES. PLEASE READ IT CAREFULLY.</p>
                <p >THE SERVICES ARE NOT BEING OFFERED TO PERSONS WHO ARE LOCATED OR HAVE THEIR PLACE OF RESIDENCE IN ANY RESTRICTED JURISDICTIONS, AS DEFINED IN SECTION 7.</p>
                <p >Subject to these Terms, Expanse grants you a limited, non-exclusive, non-sublicensable and fully revocable license to access and use the Services during the time that you are in compliance with these Terms.</p>
                <h3>1. Description of Services</h3>
                <p>EXPEX provides its users a platform to buy and sell digital assets on expanse network. Users will not be required to perform any deposit function on the EXPEX smart contract, instead there will be an allowance function which will give
                    EXPEX contract permission to make order transactions and exchange on behalf of user. Once allowance value is set the user can place order and once the order is matched the transfer will take place. Users can use EXPEX for trade of assets on expanse
                    network specifically ERC-20 tokens on expanse blockchain; via our smart contract. We do not support conversion of digital assets to fiat currencies or vice versa. We also currently do not allow for assets trade of other token types and of other networks
                    but plan to do so in the future on which account this document will be updated to reflect our services and privacy policy.</p>

                <p>We do not charge any transaction/trade fees from traders and the only fees being paid by the users is the gas which is required for the network transaction on expanse blockchain.</p>
                <p>EXPEX is a non-custodial platform which is evident from the fact that EXPEX has been integrated into the luna wallet which allows users to trade using their expanse wallet which is owned by the user themselves as they hold private keys of these accounts and also
                    because of there being no “deposit” function. Hence custody of user’s digital assets is maintained by them at all times.</p>

                <p>Luna wallet allows for software wallet creation for holding EXP and other tokens on Expanse Network. This service has been previously active prior to the current update which now includes EXPEX as part of Luna.</p>
                <h3>2. Account Registration</h3>
                <p>No additional account registration is required other than the luna wallet account creation which is a soft wallet and allows for complete control of the wallet by user. No personal information collection is done during this account creations and account holders remain anonymous on EXPEX.
                    However for use of our trading service you agree that you have read, understood and accepted all the terms and conditions contained contained in this Agreement as well as our Privacy Policy. You also represent that you have the legal authority to accept these Terms on behalf of yourself and
                    any party you represent in connection with your use of the Services. If you are an individual who is entering into these Terms on behalf of an entity, you represent and warrant that you have the power to bind that entity, and you hereby agree on that entity’s behalf to be bound by these Terms,
                    with the terms "you", and "your" applying to you, that entity, and other users accessing the Services on behalf of that entity.</p>

                <h3>3. Security of your Account and Wallet</h3>
                <p>We are not an insured financial institution. As a result, unlike funds held in most banks or credit unions, amounts displayed through the Services are not insured against loss.</p>
                <p>Furthermore, EXPEX is a non-custodial platform. As such, we do not know nor have access to the private keys to the digital asset wallets you use in connection with the Services. Therefore, you are exclusively responsible for maintaining the confidentiality and security of your Accounts or devices
                    you use to access the Services. You are also responsible for maintaining the security of the digital asset wallets you utilize in connection with the Services, and for ensuring that no unauthorized person has access to your wallet files, its private keys, or any device that you utilize in connection with the Services.</p>
                <p>We will not be liable for any loss or damage arising from your failure to protect your Account or your digital asset wallets.</p>

                <h3>4. Trading Terms</h3>
                <p>We provide Users with a platform that allows orders they enter to be connected with the orders of other Users. Orders may be partially filled or may be filled by a number of orders, depending on the trading activity at the time an order is placed.</p>
                <p>A transaction on EXPEX may fail for several reasons, including without limitation a change in prices, order availability, or technical difficulties experienced by us or Nodes. We make no representation or warrant that any transaction will be executed fully, or at all. We are, under no circumstances, liable for any loss or injury
                    suffered by a failure of a transaction to complete properly or in a timely manner, including dispatching to the Expanse blockchain. Further, we are in no way responsible for notifying you of a transaction failure, although you are able to see any such failures on EXPEX. You have full responsibility to determine and inquire into the failure of any transaction which you initiate.</p>
            </div>
             <div class="buttons">
                <button @click="acceptPolicy" class="buttons ok button button--shikoba md-close">
                    <img class="button__icon" src="../../assets/img/okay.svg">
                    <span>Accept</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PrivacyTerm',
        data() {
            return{
            };
        },
        created(){
        },
        methods: {
            hide() {
                this.$modal.hide('privacyModal');
            },
            acceptPolicy(){
                localStorage.setItem('TOS_check', 'true');
                this.$modal.hide('privacyModal');
            }
        }
    }
</script>


<style>
    @import "../../../../static/modalcomponent.css";
</style>
