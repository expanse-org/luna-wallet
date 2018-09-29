
var tokens_list_hash, updated_tokens_list_hash, tokens;
import {getRandomColor} from '../../AccountsData/commonFunc'
import {db} from '../../../../../lowdbFunc'
import store from "../../../../renderer/store";
import object_hash from 'object-hash';

const listTokens = () => {
    tokens = db.get('tokens').value();
    store.dispatch('addTokenList', tokens);
    console.log(tokens,"listTokensJS");
    tokens_list_hash = object_hash(tokens);
    if (tokens_list_hash == updated_tokens_list_hash) {
        return false;
    } else {
        // First Clear Previous Listed Tokens
        updated_tokens_list_hash = tokens_list_hash;
        return tokens_list_hash;
    }
    return tokens_list_hash;
};

export  {listTokens, updated_tokens_list_hash, tokens_list_hash, tokens};