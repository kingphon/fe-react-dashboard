import axios from 'axios'
import cookie from 'js-cookie'
import { toast } from "react-toastify";

import { USER_TOKEN, USER_AUTH } from '../../constants';

const defaultValues = {
  phone: "",
  password: ""
}

export const initialState = {
  formLoading: false,
  loginForm: defaultValues,
  // userAuth: {}
}

const PATH_API_LOGIN = 'http://localhost:5000/authenticate'
const PATH_API_LOGOUT = 'http://localhost:5000/logout'
const createAction = action => `SYSTEM_${action}`

export const reload = pageName => ({ type: `${pageName}_RELOAD` })

const SET_LOGIN_FORM = createAction("SET_LOGIN_FORM")

export const setLoginForm = loginForm => ({ type: SET_LOGIN_FORM, loginForm })

const SET_FORM_LOADING = createAction("SET_FORM_LOADING")

const setFormLoading = loading => ({ type: SET_FORM_LOADING, loading })

// const SET_USER_AUTH = createAction("SET_USER_AUTH")
// export const setUserAuth = userAuth => ({ type: SET_USER_AUTH, userAuth })

export const doLogin = (params, callback) => dispatch => {
  dispatch(setFormLoading(true))
  const {
    phone,
    password
  } = params;

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
      toast.error(error.response.data.message)
    })
    .finally(() => dispatch(setFormLoading(false)))

}

export const doLogout = callback => dispatch => {
  return axios.post(PATH_API_LOGOUT, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(() => {
      cookie.remove(USER_TOKEN)
      setLoginForm(defaultValues)
      callback()
    })
    .catch(error =>
      toast.error(error))
    .finally(() => dispatch(setFormLoading(false)))
}

export default function (state = initialState, action) {
  try {
    switch (action.type) {
      case SET_FORM_LOADING: return {
        ...state,
        formLoading: action.loading
      }
      // case SET_USER_AUTH: return {
      //     ...state,
      //     userAuth: action.userAuth
      // }
      case SET_LOGIN_FORM: return {
        ...state,
        loginForm: action.loginForm
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