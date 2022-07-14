import { USER_UPDATE_PROFILE} from "../actions/actionType"

// import * as actionTypes from '../actions/actionType';
const initialState = {
    [USER_UPDATE_PROFILE]: [],
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case USER_UPDATE_PROFILE:
            return Object.assign({}, state, {
                [USER_UPDATE_PROFILE]: action[USER_UPDATE_PROFILE]
            })
      

        default:

            return state;
    }
}

export default reducer;
