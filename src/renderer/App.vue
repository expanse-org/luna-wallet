<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import clientBinaries from '../common/clientBinaries.json';
  import {production} from '../main/libs/config';
  import {getClientInfo } from '../common/clientInfo';
  import { startingGexp ,downloadGexp  } from '../common/gexpfunc';
  import { updateScreen, activeScreen  } from '../main/libs/config';
  import os from 'os';
  import shell from 'shelljs';
  import fs from 'fs';
  import {exec} from 'child_process';
  import got from 'got';
  import _ from 'underscore';
  import Raven from 'raven';
  const clientBinariesGexp = clientBinaries.clients.Gexp;
  const localGethVersion = clientBinariesGexp.version;
  const platForms = clientBinariesGexp.platforms;
  let newClinetBinaries = clientBinaries;
  var versionUpdate = false;


  export default {
    name: 'lunawalletvuetest',
    created(){
        this.chekAppInfo();
    },
    data() {
        return {
            activeScreen,
        };
    },
    methods: {
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
                if(os.type === 'Windows_NT')
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
                            if(response.body.tag_name !== localGethVersion){
                                versionUpdate = true;
                                console.log('update binaries files');
                                // For each platform/arch in clientBinaries.json
                                _.keys(platForms).forEach(platform => {
                                    _.keys(platForms[platform]).forEach(arch => {
                                        // Update URL
                                        let url = platForms[platform][arch].download.url;
                                        url = url.replace(/v[0-9].[0-9].[0-9][0-9][0-9]/,`${latestGethVersion}`);
                                        platForms[platform][arch].download.url = url;

                                        // Update bin name (path in archive)
                                        let bin = platForms[platform][arch].download.bin;
                                        bin = bin.replace(/v[0-9].[0-9].[0-9][0-9][0-9]/,`${latestGethVersion}`);
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
                                './src/common/clientBinaries.json',
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
                });

            } // Else Ended  -- if (!fs.existsSync(gexpDir))
          }catch(e){
              Raven.captureException(e);
              console.log(e);
          }
      },

    }
  }
</script>

<style>
  @import "assets/css/style.css";
</style>
