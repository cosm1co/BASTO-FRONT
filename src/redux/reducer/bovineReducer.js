import {
    GET_ALL_BOVINES,
    CREATE_BOVINE,
    UPDATE_BOVINE,
    DELETE_BOVINE,
    ERROR_BOVINE,
    CLEAR_DATA,
    SELECT_PAGE,
} from '../actions/actiontype'

const initialState = {
    allBovines: [],
    bovine: {},
    errorsBovine: '',
    updateBovine: '',
    page: 1,
}

const bovinesReducer = function(state = initialState, {type, payload}) {
    switch(type) {
        
        case GET_ALL_BOVINES:
            return {
                ...state,
                allBovines: payload,
                updateBovine: '',
            }
        case CREATE_BOVINE:
            return {
                ...state,
                bovine: payload
            }
        case UPDATE_BOVINE:
            return {
                ...state,
                bovine: payload,
            }
        case DELETE_BOVINE:
            return {
                ...state,
                updateBovine: payload.msg
            }
        case ERROR_BOVINE:
            return {
                ...state,
                errorsBovine: payload,
            }
        case CLEAR_DATA:
            return {
                ...state,
                errorsBovine: '',
                updateBovine: '',
                bovine:''
            }
        case SELECT_PAGE:
                return { ...state, page: payload };
        default:
            return state;
    }
}

export default bovinesReducer;