
var tokens_list_hash, updated_tokens_list_hash, tokens;
import {getRandomColor} from '../../AccountsData/commonFunc'
import {db} from '../../../../../lowdbFunc'
import store from "../../../../renderer/store";
import object_hash from 'object-hash';

const listTokens = () => {
    tokens = db.get('tokens').value();
    tokens_list_hash = object_hash(tokens);
    console.log(updated_tokens_list_hash, "else");
    if (tokens_list_hash == updated_tokens_list_hash) {
        return false;
    } else {
        // First Clear Previous Listed Tokens
        updated_tokens_list_hash = tokens_list_hash;
        console.log(updated_tokens_list_hash, "else");
        if(updated_tokens_list_hash){
        }
        return updated_tokens_list_hash;
    }
    return tokens_list_hash;
};

export  {listTokens, updated_tokens_list_hash, tokens_list_hash, tokens};
