

import {ipcRenderer} from 'electron';
import store from "../../store";
import {db} from '../../../../lowdbFunc';


export const callgexplog = ()  => {
    ipcRenderer.on('gexpLogs', (event, res) => {
        console.log(res, 'expresssss')
        store.dispatch('addGexpLog', res);
    });
}


