import { HANDLE_SYSTEM_ERROR } from '../../constants/redux-actions'
import axios from 'axios'
import cookie from 'js-cookie'
import { toast } from "react-toastify";
import { USER_TOKEN, USER_AUTH } from '../../constants';

export const initialState = {
  formLoading: false,
  loginForm: {},
  userAuth: {},
  systemErrors: {
    message: '',
    detail: ''
  },
  errors: {
    formErrors: {},
    errorMessage: ''
  },
  systemPopup: {
    open: false,
    type: 'success',
    message: ''
  }
}

const PATH_API_LOGIN = 'http://localhost:5000/authenticate'
const PATH_API_LOGOUT = 'http://localhost:5000/logout'
const createAction = action => `SYSTEM_${action}`

const SYSTEM_ERROR_MESSAGE = 'The system has an undefined error, please try again later.'

const RESET_SYSTEM_ERRORS = 'RESET_SYSTEM_ERRORS'
const SET_SYSTEM_POPUP = 'SET_SYSTEM_POPUP'

export const reload = pageName => ({ type: `${pageName}_RELOAD` })

const SET_LOGIN_FORM = createAction("SET_LOGIN_FORM")
const SET_FORM_ERRORS = createAction("SET_FORM_ERRORS");

export const setLoginForm = loginForm => ({ type: SET_LOGIN_FORM, loginForm })

const SET_FORM_LOADING = createAction("SET_FORM_LOADING")
const setFormLoading = loading => ({ type: SET_FORM_LOADING, loading })

// const SET_USER_AUTH = createAction("SET_USER_AUTH")
// export const setUserAuth = userAuth => ({ type: SET_USER_AUTH, userAuth })

const HANDLE_FORM_ERRORS = createAction("HANDLE_FORM_ERRORS")

const setFormErrors = formErrors => ({ type: SET_FORM_ERRORS, formErrors });

export const doLogin = (params, callback) => dispatch => {
  dispatch(setFormLoading(true))
  const {
    phone,
    password
  } = params;
  const checkParams = {
    phone,
    password
  };
  const formErrors = {}
  for (const param in checkParams) {
    const element = checkParams[param];
    if (!element) {
      formErrors[param] = "Vui lòng nhập đầy đủ thông tin"
    }
  }
  if (Object.keys(formErrors).length === 0) {
    dispatch(setFormErrors({}))
    return axios.post(PATH_API_LOGIN, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        cookie.set(USER_TOKEN, response.data.token)
        callback()
      })
      .catch(error => {
        // !response.data.message &&
        toast.error("Đã xảy ra lỗi!!")
        // toast.error(response.data.message)
        dispatch(handleErrors(error, HANDLE_FORM_ERRORS))
      })
      .finally(() => dispatch(setFormLoading(false)))
  } else {
    dispatch(setFormErrors(formErrors))
    dispatch(setFormLoading(false));
  }
}

export const doLogout = callback => dispatch => {
  return axios.post(PATH_API_LOGOUT, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(() => {
      cookie.remove(USER_TOKEN)
      setLoginForm({})
      callback()
    })
    .catch(error =>
      toast.error("Đã xảy ra lỗi!!"))
    .finally(() => dispatch(setFormLoading(false)))
}

export const handleErrors = (errors = {}, pageErrorHandle) => {
  console.log(errors)
  if (errors.response) {
    if (errors.response.data && errors.response.data.formErrors) {
      return ({ type: pageErrorHandle, ...errors.response.data })
    }
  }
  return ({ type: HANDLE_SYSTEM_ERROR })
}

export const openSystemPopup = (open, message, typePopup = 'success') => {
  return ({ type: SET_SYSTEM_POPUP, open, message, typePopup })
}

export const resetSystemErrors = () => ({ type: RESET_SYSTEM_ERRORS })

export default function (state = initialState, action) {
  try {
    switch (action.type) {
      case SET_FORM_LOADING: return {
        ...state,
        formLoading: action.loading
      }
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
      // case SET_USER_AUTH: return {
      //     ...state,
      //     userAuth: action.userAuth
      // }
      case SET_LOGIN_FORM: return {
        ...state,
        loginForm: action.loginForm
      }
      case SET_FORM_ERRORS:
        return {
          ...state,
          errors: {
            formErrors: action.formErrors,
            ...initialState.errors.message,
          }
        };
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