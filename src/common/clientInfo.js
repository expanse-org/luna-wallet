
import updatedClientBinaries from '../../clientBinaries.json';
import {prod_app_directory, production} from '../main/libs/config';
import os from 'os';
import {remote} from 'electron';
import Raven from 'raven';

const getClientInfo = () => {
    try{
        let osType = os.type();
        let arch  = os.arch();
        let upPlatForms = updatedClientBinaries.clients.Gexp.platforms;
        let bin_path;
        let app_path;
        let userPath = remote.app.getPath('home');
        let appDataPath = remote.app.getPath('appData');
        // console.log(prod_app_directory,"prod_app_directory");
        switch (osType) {
            case "Linux":
                app_path = "~/.config/"+prod_app_directory;
                if(arch == 'ia32'){
                    let data =({
                        'url' : upPlatForms.linux.ia32.download.url,
                        'dirPath' : 'binaries/gexp-linux-386/',
                        'appPath':app_path ,
                        'keyStore' : userPath += '/.expanse/keystore/',
                        'gexpFile' :"gexp"
                    });
                    return data;
                }else if(arch == 'x64'){
                    let data =({
                        'url' : upPlatForms.linux.x64.download.url ,
                        'dirPath' : 'binaries/gexp-linux-amd64/',
                        'appPath':app_path ,
                        'keyStore' : userPath += '/.expanse/keystore',
                        'gexpFile' :"gexp"
                    });
                    return data;
                }
                break;
            case "Darwin":
                app_path = "~/Library/Application Support/"+prod_app_directory;
                if(arch == 'ia32'){
                    let data =({
                        'url' : upPlatForms.mac.ia32.download.url,
                        'dirPath' : 'binaries/gexp-darwin-386',
                        'appPath' : app_path,
                        'keyStore' : userPath += '/Library/Expanse/keystore',
                        'gexpFile' :"gexp"
                    });
                    return data;
                }else if(arch == 'x64'){
                    let data = ({
                        'url' : upPlatForms.mac.x64.download.url,
                        'dirPath' : 'binaries/gexp-darwin-amd64',
                        'appPath':app_path ,
                        'keyStore' : userPath += '/Library/Expanse/keystore',
                        'gexpFile' :"gexp"
                    });
                    return data;
                }
                break;
            case "Windows_NT":
                app_path = "~/AppData/Roaming/"+prod_app_directory;
                if(arch == 'x32'){
                    let data = ({
                        'url' : upPlatForms.win.ia32.download.url,
                        'dirPath' : 'binaries/gexp-windows-386',
                        'appPath':app_path ,
                        'keyStore':`${appDataPath}\\Expanse\\keystore`,
                        'gexpFile' :"gexp.exe"
                    });
                    return data;
                }else if(arch = 'x64'){
                    let data = ({
                        'url' : upPlatForms.win.x64.download.url,
                        'dirPath' : 'binaries/gexp-windows-amd64',
                        'appPath':app_path ,
                        'keyStore':`${appDataPath}\\Expanse\\keystore`,
                        'gexpFile' :"gexp.exe"
                    });
                    return data;
                }
                break;
            default:
                console.log('Default called');
                console.log("ERROR: No System Prefrences Found");

        }
    }catch(e){
        Raven.captureException(e);
        console.log(e);
    }
}

export { getClientInfo }