<template>
   <div>
     <router-view></router-view>
       <modal class="modal" name="versionupdate">
           <div class="update-content">
               <div @click="hide" class="cancel">
                   <svg xmlns="http://www.w3.org/2000/svg" width="11.438" height="11.438" viewBox="0 0 11.438 11.438">
                       <path class="close" d="M428.293,11.707l1.414-1.414,10,10-1.414,1.414Zm10-1.414,1.414,1.414-10,10-1.414-1.414Z" transform="translate(-428.281 -10.281)"/>
                   </svg>
               </div>
               <img class="logo-luna" src="../assets/img/logo-luna.png" alt="Logo"/>
               <h1>New Expanse Wallet version available</h1>
               <h2><span>Version: </span>v{{versionUpdateApp}}</h2>
               <button @click="handleUpdate('https://github.com/expanse-org/luna-wallet/releases')" class="button--moema">Download New Version</button>
           </div>
       </modal>
   </div>
</template>

<script>
    import WalletInfo from '../components/DasboardComponents/WalletDashboardComponents/ViewAccount/WalletInfo';
    import clientBinaries from '../../../clientBinaries.json';
    import {production, ExpApi} from '../../main/libs/config';
    import {getClientInfo } from '../../common/clientInfo';
    import { startingGexp ,downloadGexp  } from '../../common/gexpfunc';
    import { updateScreen, activeScreen  } from '../../main/libs/config';
    import os from 'os';
    import shell from 'shelljs';
    import fs from 'fs';
    import {exec} from 'child_process';
    import got from 'got';
    import _ from 'underscore';
    import Raven from 'raven';
    import {version} from '../../../package.json';
    import  * as child_process from 'child_process';

    const clientBinariesGexp = clientBinaries.clients.Gexp;
    const localGethVersion = clientBinariesGexp.version;
    const platForms = clientBinariesGexp.platforms;
    let newClinetBinaries = clientBinaries;
    var versionUpdate = false;


    export default {
        name: 'lunawalletvuetest',
        created(){
            this.chekAppInfo();
            ExpApi();
        },
        data() {
            return {
                activeScreen,
                versionUpdateApp: ''
            };
        },
        components: {
            'walletInfo': WalletInfo,
        },
        methods: {
            show () {
                this.$modal.show('versionupdate');
            },
            hide () {
                this.$modal.hide('versionupdate');
            },
            action(screen){
                // console.log("storee Action")
                this.$store.dispatch('addScreen', screen)
            },
            chekAppInfo() {
                try{
                    const clientInfo = getClientInfo();
                    // console.log(clientInfo);
                    let gexpPath ;
                    if(production){
                        shell.cd(clientInfo.appPath);
                        gexpPath = clientInfo.dirPath;
                    }
                    else
                    {
                        gexpPath = clientInfo.dirPath;
                    }

                    var gexpPath_dir = gexpPath+'/'+clientInfo.gexpFile;
                    console.log(gexpPath_dir,"gexpPath_dir");
                    if (!fs.existsSync(gexpPath_dir)){
                        console.log('downloading Gexp!');
                        // Download Latest Gexp and extract
                        downloadGexp();
                    }else{
                        let cmd;
                        let versionUpdate = false;
                        let that= this;
                        if(os.type == 'Windows_NT')
                            cmd = 'ping www.google.com';
                        else
                            cmd = 'ping -c 1 www.google.com';

                        var child = exec(cmd, function(er, stdout, stderr){
                            if(er !== null){
                                console.log("error founds");
                                startingGexp();
                                return false;
                            }

                            console.log("check for updated gexp");
                            // Check For Gexp Latest Version
                            got('https://github.com/expanse-org/go-expanse/releases/latest', {
                                json: true
                            })
                                .then(response => {
                                    let latestGethVersion = response.body.tag_name;
                                    newClinetBinaries.clients.Gexp.version = latestGethVersion;
                                    // console.log(latestGethVersion, "ulatestGethVersionrl1---------------------------");
                                    // console.log(response.body.tag_name, "urresponsel1---------------------------");
                                    if(response.body.tag_name !== localGethVersion){
                                        versionUpdate = true;
                                        console.log('update binaries files');
                                        // For each platform/arch in clientBinaries.json
                                        _.keys(platForms).forEach(platform => {
                                            _.keys(platForms[platform]).forEach(arch => {
                                                // Update URL
                                                let url = platForms[platform][arch].download.url;
                                                // console.log(url, url.substring(url.indexOf("/v")+1, url.indexOf("/ge")), "url1---------------------------");
                                                url = url.replace(url.substring(url.indexOf("/v")+1, url.indexOf("/ge")),`${latestGethVersion}`);
                                                // console.log(url, "url2----------------------");
                                                platForms[platform][arch].download.url = url;

                                                // Update bin name (path in archive)
                                                let bin = platForms[platform][arch].download.bin;
                                                // console.log(bin, "bin1-----------------");
                                                bin = bin.replace(bin.substring(bin.indexOf("-v")+1, bin.indexOf("/ge")),`${latestGethVersion}`);
                                                // console.log(bin, "bin2-----------------");
                                                platForms[platform][arch].download.bin = bin;

                                                // Update expected sanity-command version output
                                                platForms[platform][
                                                    arch
                                                    ].commands.sanity.output[1] = String(latestGethVersion);
                                            }); // Each end
                                        })  // Each ended
                                    }else{
                                        // Node up to date
                                        updateScreen("nodeUpToDate");
                                        that.action("nodeUpToDate");
                                        // console.log("updateScreen", activeScreen);
                                    } // if ended -- if(response.body.tag_name !== localGethVersion)

                                }).then(res => {
                                console.log("versionUpdate", versionUpdate);
                                if (versionUpdate === true) {
                                    // console.log(shell.ls(''),"shellls in writeFile clientBinaries");
                                    fs.writeFile(
                                        './clientBinaries.json',
                                        JSON.stringify(newClinetBinaries, null, 4), (error) => {
                                            if(error)
                                                console.log("Error updating Binaries:", error);
                                        }
                                    );
                                    // Download Latest Gexp
                                    setTimeout(function(){
                                        downloadGexp();
                                    },1000)
                                }else{
                                    // Start Gexp Application
                                    startingGexp();
                                }
                            });
                            got('https://github.com/expanse-org/luna-wallet/releases/latest', {
                                json: true
                            }).then(response => {
                                console.log(response, "response")
                                console.log(response.body.tag_name, "response.body.tag_name")
                                if(response.body.tag_name !== version){
                                    that.versionUpdateApp = response.body.tag_name;
                                    that.show();
                                }
                            });
                        });

                    } // Else Ended  -- if (!fs.existsSync(gexpDir))
                }catch(e){
                    Raven.captureException(e);
                    console.log(e);
                }
            },
            handleUpdate(url){
                console.log(url);
                if(os.type() == 'Windows_NT') {
                    child_process.execSync('start '+url)
                }
                if(os.type() == 'Linux') {
                    child_process.execSync('xdg-open '+url)
                }
                if(os.type() == 'Darwin') {
                    child_process.execSync('open '+url)
                }
                this.hide();
            }
        }
    }
</script>

<style>
        @import "../../../static/modalcomponent.css";
</style>
