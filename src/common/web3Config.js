

import { updateScreen, startConnectWeb,activeScreen  } from '../main/libs/config';
import Raven from 'raven';
import store from "../renderer/store";
import * as $ from 'jquery';
import {ipcRenderer} from 'electron';

import {getAllAcounts} from '../renderer/components/DasboardComponents/WalletDashboardComponents/walletcommon';
import {web3} from '../main/libs/config';



const action = (screen) => {
    // console.log("storee Action")
    store.dispatch('addScreen', screen)
};

const actionSynpeer = (peerCount) => {
    // console.log("storee Action peercount")
    store.dispatch('addPeerCount', peerCount);
};

const actionSync = (gexpSync,isgexpSync) => {
    // console.log("storee Action")
    store.dispatch('addGexpSync', gexpSync);
    store.dispatch('addIsGexpSync', isgexpSync);
};


const syncPeers = () => {
    console.log("syncPeers Func1");
    updateScreen("cloudSync");
    action("cloudSync");
    $('.launch').show();
    var that = this;
    setInterval(function(){
        try{
            web3.eth.net.getPeerCount().then((res) => {
                // console.log("sync if true",res);
                if(res){
                    actionSynpeer(res);
                }
            });
            web3.eth.isSyncing(function(error, sync){
                if(!error) {

                    // stop all app activity

                    if(sync) {
                        // console.log("sync if true",sync);

                        actionSync(sync, true);
                        updateScreen("downloading");
                        action("downloading");
                        // show sync info
                        // console.log(sync);
                        // console.log(sync.currentBlock);
                        $('.c-block').text(sync.currentBlock);
                        $('.t-block').text(sync.highestBlock);
                        $('.pulledStates').text(sync.pulledStates);
                        $('.knownStates').text(sync.knownStates);
                        let blockPercentage =  (sync.currentBlock / sync.highestBlock ) * 100 ;
                        let chainPercentage =  (sync.pulledStates / sync.knownStates ) * 100 ;

                        $('.bar-fill').width(blockPercentage+'%');
                        $('.chain-bar-fill').width(chainPercentage+'%');
                        if(sync.currentBlock == sync.highestBlock)
                            ipcRenderer.send('launchApplication', 'Launch App');

                        if(sync.pulledStates == sync.knownStates)
                            $('.states').hide();
                        else
                            $('.states').show();

                        // re-gain app operation
                    } else {
                        actionSync(sync, false);
                        console.log("No sync Error Found",sync);
                        // run your app init function...
                    }
                }else{
                    console.log("Error in Syncing");
                }
            });
        }catch(e){
            Raven.captureException(e);
            console.log(e);
        }
    },500);

}


const connectWeb3 = () => {
    console.log('connectWeb3 func--------');
    var attempt = 0;
    var web3Connect =  setInterval(function(){
      // if(web3 == undefined) {
      //   startConnectWeb();
      //   return false;
      // }
        // Initialize web3
        try{
            startConnectWeb();
            console.log('connecting web3', web3);
            setTimeout(function(){
                console.log('connecting web3getAccounts-----', web3.eth.getAccounts());
                web3.eth.net.isListening()
                .then((res)=>{
                    console.log(res, 'attemptattemptattemptattemptconnecting web3getAccounts-----');
                    if(!res){
                        console.log('Attempt :',attempt);
                        if( attempt == 100){
                            updateScreen("connectionError");
                            action("connectionError");
                        }
                        attempt ++;

                    }else {
                        console.log("Web3 Connected ");
                        updateScreen("nodeConnected");
                        action("nodeConnected");
                        //3: Look For Peers
                        web3.eth.net.getPeerCount().then((res) => {
                            // console.log("sync if true",res);
                            if(res){
                                actionSynpeer(res);
                            }
                        });

                        clearInterval(web3Connect);
                        getAllAcounts();

                        // Syncing Peers
                        setTimeout(function(){
                            syncPeers();
                        },1000)
                    }
                })
            },2000);
        }catch(e){
            Raven.captureException(e);
            console.log(e);
        }

    },3000);  // Time interval
}



export { connectWeb3, syncPeers }
