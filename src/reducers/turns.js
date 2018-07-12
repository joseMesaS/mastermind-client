import {GET_TURNS} from '../actions/games'

export default (state = null, {type, payload}) => {
    switch (type) {
    case GET_TURNS:
        return payload
    default:
        return state
    }
}