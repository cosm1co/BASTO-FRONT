import axios from 'axios';
import {
    GET_ALL_BOVINES,
    CREATE_BOVINE,
    UPDATE_BOVINE,
    DELETE_BOVINE,
    CLEAR_DATA,
    BASE_URL,
    ERROR_BOVINE,
    SELECT_PAGE
} from './actiontype'

// Get all Bovines
export function getAllBovines(SENASA_ID, potrero, device) {
    return async function(dispatch){
        try {
            // console.log(bovine)
            // console.log(SENASA_ID)
            const bovines = await axios.get(`${BASE_URL}/bovine/allbovines${SENASA_ID ? `?SENASA_ID=${SENASA_ID}` : ''}${potrero 
                                                                                                                                ? SENASA_ID 
                                                                                                                                    ? `&potrero=${potrero}` 
                                                                                                                                    : `?potrero=${potrero}` 
                                                                                                                                : ''}${device 
                                                                                                                                            ? SENASA_ID || potrero
                                                                                                                                                ? `&device=${device}` 
                                                                                                                                                : `?device=${device}` 
                                                                                                                                            : ''}`)
            return dispatch ({ type: GET_ALL_BOVINES, payload: bovines.data})
        } catch (error) {
            return dispatch({ type: ERROR_BOVINE, payload: error.response.data})
        }
    }
}

// Create Bovines
export function createBovine(input) {
    return async function(dispatch){
        try {
            const bovine = await axios.post(`${BASE_URL}/bovine/add`, input)
            return dispatch({ type: CREATE_BOVINE, payload: bovine.data})
        } catch (error) {
            return dispatch({ type: ERROR_BOVINE, payload: error.response.data})
        }
    }
}

// Update Bovines
export function editBovine(id, input) {
    return async function(dispatch){
        try {
            const bovine = await axios.put(`${BASE_URL}/bovine/update/${id}`, input)
            return dispatch({ type: UPDATE_BOVINE, payload: bovine.data})
        } catch (error) {
            return dispatch({ type: ERROR_BOVINE, payload: error.response.data})
        }
    }
}

// Clear Errors and Success Messages update Project and create Project
export function clearData() {
    return {
      type: CLEAR_DATA
    }
  };

// Delete Bovines
export function deleteBovine(id) {
    return async function(dispatch){
        try {
            const bovine = await axios.delete(`${BASE_URL}/bovine/delete/${id}`)
            return dispatch({ type: DELETE_BOVINE, payload: bovine.data})
        } catch (error) {
            return dispatch({ type: ERROR_BOVINE, payload: error.response.data});
        }
    }
}

// Pagination
export function selectPage(payload) {
    return {
      type: SELECT_PAGE,
      payload,
    };
  }

