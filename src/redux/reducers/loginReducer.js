import { REDUX_API_URL } from '../../constants/redux-actions'
import { HANDLE_SYSTEM_ERROR } from '../../constants/redux-actions'
import axios from 'axios';
import cookie from 'js-cookie'

const prefix = 'LOGIN_SCREEN_'
const PATH_API = `${REDUX_API_URL}/user`

const initialState = {
    errors: {
        formErrors: {},
        errorMessage: ''
    }
}

const createAction = action => `${prefix}${action}`

const LIST_LOADING = createAction("LIST_LOADING")
export const doLogin = (username, password) => dispatch => {
    const params = { username, password }
    return axios.post(`${PATH_API}/login`, params, {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // dispatch(setCheckedItems([]))
        cookie.set("USER_TOKEN", response.data.token)
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(setMultipleExecuteLoading(false)))
}

const RESET_SYSTEM_ERRORS = 'RESET_SYSTEM_ERRORS'
const SET_SYSTEM_POPUP = 'SET_SYSTEM_POPUP'

export const reload = pageName => ({ type: `${pageName}_RELOAD` })

export const handleErrors = (errors = {}, pageErrorAction) => {
    if (errors.response) {
        if (errors.response.data) {
            return ({ type: pageErrorAction, errors })
        }
    }
    return ({ type: HANDLE_SYSTEM_ERROR })
}

export const openSystemPopup = (open, message, typePopup = 'success') => {
    return ({ type: SET_SYSTEM_POPUP, open, message, typePopup })
}

export const resetSystemErrors = () => ({ type: RESET_SYSTEM_ERRORS })

export default function(state = initialState, action) {
    try {
        switch (action.type) {
            case HANDLE_SYSTEM_ERROR: return {
                ...state,
                systemErrors: {
                    message: SYSTEM_ERROR_MESSAGE,
                    detail: action.detail
                }
            }
            case RESET_SYSTEM_ERRORS: return {
                ...state,
                systemErrors: initialState.systemErrors
            }
            case SET_SYSTEM_POPUP: return {
                ...state,
                systemPopup: {
                    open: action.open,
                    type: action.typePopup,
                    message: action.message
                }
            }
            default: return {
                ...state
            }
        }
    } catch (error) {
        console.log(error)
    }

    return state;
}