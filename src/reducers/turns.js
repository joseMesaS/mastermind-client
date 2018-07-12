import {GET_TURNS} from '../actions/games'

export default (state = null, {type, payload}) => {
    switch (type) {
    case GET_TURNS:
    console.log(payload,'payload')
        const some = {...state}
        if(payload.length>0) {
            some[payload[0].game_id] = payload
            return some
        }else {
            return state
        }
        
    default:
        return state
    }
}