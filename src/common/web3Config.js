

import { updateScreen, startConnectWeb  } from '../main/libs/config';
import Raven from 'raven';
import store from "../renderer/store";
import * as $ from 'jquery';

var web3 = startConnectWeb();

const action = (screen) => {
    // console.log("storee Action")
    store.dispatch('addScreen', screen)
};


const syncPeers = () => {
    updateScreen("cloudSync");
    action("cloudSync");
    $('.launch').show();
    setInterval(function(){
        try{
            web3.eth.isSyncing(function(error, sync){
                if(!error) {
                    // stop all app activity
                    console.log("No sync Error Found");
                    if(sync === true) {
                        // Get Syncing
                        sync = web3.eth.syncing;

                        updateScreen("downloading");
                        action("downloading");
                        $('.launch').show();
                        // we use `true`, so it stops all filters, but not the web3.eth.syncing polling
                        console.log('syncing');
                        //web3.reset(true);

                        // show sync info
                        console.log(sync);
                        console.log('sync Current block');
                        console.log(sync.currentBlock);
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

        // Initialize web3
        try{
            console.log('connecting web3', web3);
            setTimeout(function(){
                console.log('connecting web3getAccounts-----', web3.eth.getAccounts());
                web3.eth.net.isListening()
                .then((res)=>{
                    if(!res){
                        console.log('Attempt :',attempt);
                        if( attempt === 100){
                            updateScreen("connectionError");
                            action("connectionError");
                        }
                        attempt ++;

                    }else {
                        console.log("Web3 Connected ");
                        updateScreen("nodeConnected");
                        action("nodeConnected");
                        //3: Look For Peers

                        clearInterval(web3Connect);

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



export { connectWeb3 }