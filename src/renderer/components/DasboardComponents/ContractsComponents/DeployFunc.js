var contracts;
import {db} from '../../../../../lowdbFunc'

const listContracts = () => {
    contracts = db.get('contracts').value();
    console.log(contracts)
    return contracts;
};

export  {listContracts, contracts};
