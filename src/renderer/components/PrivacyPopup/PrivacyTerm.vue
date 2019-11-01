<template>
    <div class="popup popup1 md-content privacymodal ">
        <div class="account-page privacypopup">
            <h1>Terms and Condition</h1>
            <div @scroll="onScroll" class="contentTab" id="scrollTOSdiv">
                <h2 class="bluetext">Terms Of Service</h2>
                <div class="alignLeft">
                    <p>This Terms of Service Agreement ( "Terms" or "Agreement" ) is a contract between you ( "User" , "you" or "your" ) and Expanse Tech (together with its subsidiaries
                        and affiliates, "Expanse", "we", "us" or "our"), operators of the EXPEX digital asset platform (" EXPEX" or " DEX", currently available at expex.io as an integrated
                        component of luna wallet) that applies to your:
                    </p>
                    <div class="marginleftul">
                        <ul>
                            <li>Use of EXPEX to buy or sell digital assets;</li>
                            <li>creation of a non-hosted software wallet for digital assets via Luna Wallet; or</li>
                            <li>use of any other services offered by us (together, the "Services" ).</li>
                        </ul>
                    </div>
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

                    <p>The digital assets that are available for purchase through the Services may be subject to high or low transaction volume, liquidity issues, and volatility for potentially extended periods. WE MAY ALSO DELIST AN ASSET FROM TRADING ON EXPEX AT ANY TIME, FOR ANY REASON, WITHOUT PRIOR NOTICE. You acknowledge that while we are using commercially reasonable methods to provide trading availability
                        and pricing data to you through our Services, we do not guarantee that the Services will be consistently available. You agree that you assume all risks and potential losses associated with digital assets being delisted, price fluctuations, or differences in actual versus indicated prices.</p>

                    <p>We operate as a platform provider and generally do not act as principal or counterparty with respect to trades entered into on the platform. Notwithstanding the foregoing, (i) we may act as a counterparty for limited trades made for the purpose of liquidating fees collected on User trades, and (ii) our affiliates or partners may execute trades on the platform.</p>

                    <h3>5. Restricted Activities</h3>
                    <p>In connection with your use of the Services, you will not:</p>
                    <div class="marginleftul">
                        <ul>
                            <li>violate or assist any party in violating any law, statute, ordinance, regulation or any rule of any self-regulatory or similar organization of which you are or are required to be a member through your use of the Services;</li>
                            <li>engage in any trading activity which, in our sole discretion, amounts to or may amount to market abuse including without limitation pumping and dumping, entering fictitious transactions or wash trading,</li>
                            <li>front running, bear raiding or engaging in disorderly market conduct;</li>
                            <li>infringe upon our or any third party’s copyright, patent, trademark, or other intellectual property rights;</li>
                            <li>take any action that imposes an unreasonable or disproportionately large load on our infrastructure or that of our Nodes, or detrimentally interfere with, intercept, or expropriate any system, data or information;</li>
                            <li>transmit or upload any material to the Site or to Nodes that contains viruses, Trojan horses, worms, or any other harmful or deleterious programs;</li>
                            <li>otherwise attempt to gain unauthorized access to or use of the Site, the API, other Accounts, Nodes, or computer systems connected to the Site; or</li>
                            <li>engage in any behavior which violates this Agreement or is otherwise deemed unacceptable by us in our sole discretion.</li>
                        </ul>
                    </div>
                    <h3>6. Restricted Jurisdictions</h3>
                    <p>The Services are not subject to any restrictions of jurisdictions due to the user’s anonymity in trading and the complete control of the wallet by the user. We cannot impose such restrictions on the user due to the decentralized nature of our system and services.</p>

                    <h3>7. Risk Disclosures</h3>
                    <p>Trading digital assets is risky and you should never trade more than they can afford to lose. The following list of risks associated with digital assets and the Services is not exhaustive.</p>
                    <p class="italictext">Risks of trading in digital assets</p>
                    <p>Digital asset prices are highly volatile and trading in digital assets is extremely risky. In addition, factors beyond our control may affect market liquidity for a particular digital asset, such as regulatory activity, market manipulation, the acts or omissions of the issuer of the digital asset, or unexplainable price volatility.
                        We may also determine it is in the best interest of Users to suspend trading in a digital asset for these reasons. By using the Services, you accept the risk of trading digital assets. In entering into any transactions, you represent that you have been, are, and will be solely responsible for making your own independent appraisal into the risks of the transaction and the underlying digital asset.</p>
                    <p>Our listing of a digital asset does not indicate approval or disapproval of the digital asset’s merits as an investment or a technology. We give no warranty as to the suitability of the digital asset traded under this Agreement and assume no fiduciary duty in our relations with you. You must conduct your own due diligence when determining whether to buy or sell a particular digital asset. If you choose wisely,
                        we will not share in any portion of your gains. Likewise, if you choose poorly, we will not bear any portion of your losses.</p>
                    <p class="italictext">No brokerage transactions or provision of investment advice</p>
                    <p>We provide an execution-only service. We do not broker transactions on your behalf, advise on the merits of any particular digital assets, transactions, or associated risks, or provide any other financial, investment or legal advice in connection with the Services. To the extent that we do provide trading data, post market commentary, articles, or make social media posts, the act of doing so is incidental
                        to your relationship with us and such information may not be considered as investment or financial advice and should not be construed as such. ANY DECISION TO BUY OR SELL DIGITAL ASSETS IS SOLELY THE USER’S DECISION AND WE WILL NOT BE LIABLE FOR ANY CONSEQUENT LOSS.</p>
                    <p class="italictext">No promise of liquidity</p>
                    <p>The ability for you to buy or sell digital assets on EXPEX is contingent on there being a counterparty willing to buy or sell the same digital asset. We make no promises as to the timing or availability of buying or selling digital assets on the Site. We reserve the right to change, suspend, or discontinue any aspect of the Services at any time and in any jurisdiction, without notice and without liability.
                        This includes, without limitation, the absolute discretion to list and de-list digital assets available for trading at any time. We are not required to provide advance notice of delisting.</p>
                    <p>You acknowledge and agree that digital assets and/or features available in one jurisdiction may not be available for trading or to access, as applicable, in another.</p>
                    <p class="italictext">No guarantee of continuous access to Services</p>
                    <p>We do not guarantee continuous, uninterrupted or secure access to any part of the Services, and operation of our site may be interfered with by numerous factors outside of our control, including regulatory reasons and issues with the Expanse network. We will make reasonable efforts to ensure that transactions are processed in a timely manner, but we make no representations or warranties regarding the amount of time needed to complete transactions.</p>
                    <h3>8. Taxes</h3>
                    <p>It is your responsibility to determine what, if any, taxes apply to the payments you make or receive, and to collect, report, and remit the correct tax to the appropriate tax authority. We will make any tax withholdings or filings that we are required by law to make, but we are not responsible for determining whether taxes apply to your transaction, or for collecting, reporting, or remitting any taxes arising from any transaction.
                        We encourage you to speak with your personal tax advisor regarding the tax implications of your use of the Services.</p>
                    <h3>9. Indemnification and Release</h3>
                    <p>Expanse and its subsidiaries, parents, affiliates, service providers, and each of their respective officers, directors, agents, joint venturers, employees or representatives (collectively, the "Released Parties"), are not liable for any damages that may arise out of or in connection with your use of the Services. This includes, but is not limited to, claims, applications, injuries, delays, direct loss, loss of business or profits, business interruption costs,
                        loss of goodwill or business profits, loss of cryptocurrency or digital assets, damage caused by your computer, computer software, systems and programs, and the data thereon or any other direct or indirect, consequential and incidental damages. In addition, the Released Parties are not liable for any losses incurred, either directly or indirectly through your use of the Site or any of its functions and features (collectively, all of the foregoing items shall
                        be referred to herein as "losses"). The Released Parties are hereby released by you from liability for any and all losses. These limitations of liability apply whether the liability or losses are based on negligence, contract, tort, or any other basis, even if the Released Parties had been advised or should have known of the possibility of such losses.
                    </p>
                    <p>You agree to indemnify and hold the Released Parties harmless from any claims or losses (including attorneys’ fees and any losses, fines, fees, or penalties imposed by any regulatory authority) arising out of your breach of this Agreement, or your violation of any law or regulation.</p>
                    <p>If you have a dispute with one or more Users, Nodes, issuers of digital assets listed on EXPEX or other third parties, you release the Released Parties from any and all claims, demands, and damages (actual and consequential) of every kind and nature arising out of or in any way connected with such disputes.</p>
                    <h3>10. LIMITATION OF LIABILITY; NO WARRANTY</h3>
                    <p>YOU EXPRESSLY UNDERSTAND AND AGREE THAT THE RELEASED PARTIES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY DAMAGES, OR DAMAGES FOR LOSS OF PROFITS INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES (EVEN IF SUCH RELEASED PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, RESULTING FROM:</p>
                    <p>(I) THE USE OR THE INABILITY TO USE THE SERVICES;</p>
                    <p>(II) THE COST OF PROCUREMENT OF SUBSTITUTE SERVICES RESULTING FROM ANY DATA, INFORMATION, OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE SERVICES;</p>
                    <p>(III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; OR </p>
                    <p>(IV) ANY OTHER MATTER RELATING TO THE SERVICES.</p>
                    <p>IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SERVICES OR WITH THIS AGREEMENT, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF THE SERVICES AND CLOSE YOUR ACCOUNT. THE SERVICES ARE PROVIDED "AS IS" AND WITHOUT ANY REPRESENTATION OR WARRANTY, WHETHER EXPRESS OR IMPLIED. THE RELEASED PARTIES SPECIFICALLY DISCLAIM ANY IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. THE RELEASED PARTIES MAKE NO WARRANTY THAT</p>
                    <p>(I) THE SERVICES WILL MEET YOUR REQUIREMENTS,</p>
                    <p>(II) THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR</p>
                    <p>(III) THE QUALITY OF ANY DIGITAL ASSETS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU WILL MEET YOUR EXPECTATIONS.</p>
                    <h3>11. Governing Law; Venue and Arbitration</h3>
                    <p>You agree to arbitrate any dispute arising from these Terms or your use of the Services. Arbitration prevents you from suing in court or from having a jury trial. You agree to notify each other in writing of any dispute within sixty days of when it arises.</p>
                    <p>In addition, you agree:</p>
                    <div class="marginleftul">
                        <ul>
                            <li>To attempt informal resolution prior to any demand for arbitration;</li>
                            <li>That any arbitration will occur in the United States;</li>
                            <li>That any arbitration will be conducted confidentially by a single arbitrator, selected by a third-party arbitration forum;</li>
                            <li>That the state and federal courts in the United States have exclusive jurisdiction over any appeals of an arbitration award and over any suit between the parties not subject to arbitration;</li>
                            <li>That the arbitrator has the authority to grant any remedy that would otherwise be available in court; and</li>
                            <li>That the parties shall split the costs and expenses of any arbitration and bear their own legal costs and expenses.</li>
                        </ul>
                    </div>
                    <p>Any dispute between the parties will be governed by these Terms and the laws of the State of Delaware, without giving effect to any conflict of laws principles that may provide for the application of the law of another jurisdiction.</p>
                    <p>You will only be permitted to pursue claims against us on an individual basis, not as a plaintiff or class member in any class or representative action or proceeding, and you will only be permitted to seek relief (including monetary, injunctive, and declaratory relief) on an individual basis.</p>

                    <h3>13. Miscellaneous</h3>
                    <h4>a. Headings</h4>
                    <p>The heading and explanatory text are for reference purposes only and in no way define, limit, construe, or describe the scope or extent of such section.</p>
                    <h4>b. Force Majeure</h4>
                    <p>We shall have no liability for any failure or delay resulting from any abnormal or unforeseeable circumstances outside our reasonable control, the consequences of which would have been unavoidable despite all efforts to the contrary, including without limitation governmental action or acts of terrorism, war, earthquake, fire, flood, or other acts of God, labor conditions, delays or failures caused by problems with another system or network, mechanical breakdown or
                        data-processing failures or where we are bound by other legal obligations.</p>
                    <h4>c. Amendments</h4>
                    <p>We may amend any portion of this Agreement at any time by posting the revised version of this Agreement with an updated revision date. The changes will become effective, and shall be deemed accepted by you, the first time you use the Services after the initial posting of the revised Agreement and shall apply on a going-forward basis with respect to transactions initiated after the posting date.</p>
                    <h4>d. Survival</h4>
                    <p>Upon termination of this Agreement for any other reason, all rights and obligations of the parties that by their nature are continuing will survive such termination.</p>

                    <h4>e. Waiver and Conflict</h4>
                    <p>The failure of Expanse to exercise or enforce any right or provision of the Agreement shall not constitute a waiver of such right or provision. If any provision of this Agreement shall be adjudged by any court of competent jurisdiction to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that this Agreement shall otherwise remain in full force and effect and remain enforceable between the parties.</p>
                    <h4>f. Third Party Rights</h4>
                    <p>This Agreement is not intended and shall not be construed to create any rights or remedies in any parties other than you and us and any affiliates which each shall be a third party beneficiary of this Agreement, and no other person shall assert any rights as a third party beneficiary hereunder.</p>
                    <p>If you have any questions about these Terms, please contact us at support@EXPEX.io.</p>


                </div>
                <h2 class="bluetext">Privacy Policy</h2>
                <div class="alignLeft">
                    <p>Expanse Tech doesn’t collect personal information from any service we provide in Luna wallet and EXPEX. All wallet account created are in complete control of the users and anonymous which is why we are unaware of user identities and other personal information. We may however collect specific information regarding wallet address in our observation of the network and its monitoring.</p>
                    <p>We may revise or amend our privacy policy to reflect changes made in our services with future versions, any changes in laws regarding provided services and technological advancements. This Privacy Policy does not cover the practices of entities we don’t own or control, or people we don’t manage.</p>

                    <h3>1. Who we are</h3>
                    <p>Our Privacy Policy applies to Luna Wallet, EXPEX and all the services we offer, but excludes any products applications or services that have separate privacy policies which do not incorporate this Privacy Policy. For the purposes of data protection laws of the United States (“US”) and the European Union (“EU”) (“Data Protection Laws”), Expanse is not a data controller (i.e., the company who is responsible for, and controls the processing of your personal data).</p>
                    <h3>2. Information we collect and for what purpose</h3>
                    <p>We do not collect any personal information at any level of our applications. The decentralized nature of the system allows us to monitor traffic of all wallet addresses without knowing user identity and allows us to collect statistical data for research purposes if required but as such we have not collected data for such purposes.</p>
                    <div class="marginleftul">
                        <ul>
                            <li>Information Automatically Collected – We may collect and review blockchain analytics information relating to blockchain addresses you provide and your interaction with the Expanse network.</li>
                            <li>Do Not Track – our Site does not respond to Do Not Track signals communicated by your browser.</li>
                        </ul>
                    </div>

                    <h3>3. How we use your public address information if provided.</h3>
                    <p>To the extent permissible under Data Protection Laws, we use wallet public address information if provided by any user incase of queries:</p>
                    <div class="marginleftul">
                        <ul>
                            <li>Provide any information or services that you have requested or ordered;</li>
                            <li>Provide, maintain, protect and improve our system;</li>
                            <li>Manage, monitor, and administer your use of the system and provide an enhanced, personal, user experience;</li>
                            <li>Manage our relationship with you (for example, customer services and technical support activities);</li>
                            <li>Undertake internal testing of our Site or systems to test and improve their security and performance (in these circumstances, we would de-identify any information used for such testing purposes);</li>
                            <li>Provide you with any information that we are required to send you to comply with our regulatory or legal obligations;</li>
                            <li>Detect, prevent, investigate or remediate, crime, illegal or prohibited activities or to otherwise protect our legal rights (including liaison with regulators and law enforcement agencies for these purposes);</li>
                            <li>Monitor, carry out statistical analysis and benchmarking (provided that in such circumstances it is on an aggregated basis which will not be linked back to you or any living individual).</li>
                        </ul>
                    </div>
                    <h3>4. Changes to our privacy policy</h3>
                    <p>We may change our Privacy Policy from time to time. We will update this Privacy Policy on our website, so please try to read it when you visit the website (the ‘last modified’ reference tells you when we last updated our Privacy Policy).</p>
                    <h3>5. Further Information</h3>
                    <p>If you have any queries about how we treat your information, the contents of this notice, your rights under local law, how to update your records or how to obtain a copy of the information that we hold about you, please email us at support@EXPEX.io, subject line: “Data protection officer” in the subject header.</p>

                    <p></p>

                </div>
            </div>
             <div class="buttons">
                <button :disabled="btndisable" @click="acceptPolicy" :class="'buttons ok button button--shikoba md-close'+ disableClass">
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
                btndisable: true,
                disableClass: ' disablebtn',
            };
        },
        created(){

        },
        methods: {
            onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
                if (scrollTop + clientHeight >= scrollHeight) {
                    this.btndisable = false;
                    this.disableClass = '';
                }
            },
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
