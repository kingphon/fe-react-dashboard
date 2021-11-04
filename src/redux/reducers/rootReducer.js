import axios from 'axios'
import cookie from 'js-cookie'
import { toast } from "react-toastify";
import { REDUX_API_URL } from "../../constants/redux-actions";
import moment from 'moment'

import { USER_TOKEN } from '../../constants';

const defaultValues = {
  phone: "",
  password: ""
}


export const initialState = {
  formLoading: false,
  loginForm: defaultValues,
  profile: {},
  provinceList: [],
  districtList: [],
  wardList: [],
}
const PATH_API_LOGIN = 'http://localhost:5000/user/authenticate'
const PATH_API_LOGOUT = 'http://localhost:5000/user/logout'
const createAction = action => `SYSTEM_${action}`

const PREPARE_DATA_PROVINCE = createAction("PREPARE_DATA_PROVINCE");
const PREPARE_DATA_DISTRICT = createAction("PREPARE_DATA_DISTRICT");
const PREPARE_DATA_WARD = createAction("PREPARE_DATA_WARD");
const SET_LOGIN_FORM = createAction("SET_LOGIN_FORM")
const SET_PROFILE = createAction("SET_PROFILE")
const SET_FORM_LOADING = createAction("SET_FORM_LOADING")

export const reload = pageName => ({ type: `${pageName}_RELOAD` })

const prepareDataProvince = data => ({
  type: PREPARE_DATA_PROVINCE,
  provinceList: data
});

const prepareDataDistrict = data => ({
  type: PREPARE_DATA_DISTRICT,
  districtList: data
});

const prepareDataWard = data => ({
  type: PREPARE_DATA_WARD,
  wardList: data
});


export const setLoginForm = loginForm => ({ type: SET_LOGIN_FORM, loginForm })

export const setProfile = data => ({ type: SET_PROFILE, data })

const setFormLoading = loading => ({ type: SET_FORM_LOADING, loading })

export const fetchAllProvince = () => async dispatch => {
  return axios
    .get(`${REDUX_API_URL}/location/provinces-creation`, { timeout: 5000 })
    .then(response => dispatch(prepareDataProvince(response.data)))
    .catch(error => toast.error(error))
};

export const fetchAllDistrict = (provinceId) => async dispatch => {
  return axios
    .get(`${REDUX_API_URL}/location/districts-creation/${provinceId}`, { timeout: 5000 })
    .then(response => dispatch(prepareDataDistrict(response.data)))
    .catch(error => toast.error(error))
};

export const fetchAllWard = (districtId) => async dispatch => {
  return axios
    .get(`${REDUX_API_URL}/location/wards-creation/${districtId}`, { timeout: 5000 })
    .then(response => dispatch(prepareDataWard(response.data)))
    .catch(error => toast.error(error))
};

export const getProfile = () => async dispatch => {
  dispatch(fetchAllProvince())
  return axios
    .get(`${REDUX_API_URL}/user/profile`, { timeout: 5000 })
    .then(response => {
      dispatch(setProfile(response.data))
      dispatch(fetchAllDistrict(response.data.province.provinceId))
      dispatch(fetchAllWard(response.data.district.districtId))
    })
    .catch(error => toast.error(error))
}

export const changeAvatar = (avatar) => async dispatch => {
  const params = JSON.stringify(avatar);
  return axios
    .post(`${REDUX_API_URL}/profile/avatar`, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(setProfile(response.data[0]))
      toast.success('Changed Avatar')
    })
    .catch(error => toast.error(error.response.data.message))
}

export const changePassword = (passwords) => async dispatch => {
  const params = JSON.stringify(passwords);
  return axios
    .post(`${REDUX_API_URL}/profile/password`, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(setProfile(response.data[0]))
      toast.success('Changed Password')
    })
    .catch(error => toast.error(error.response.data.message))
}

export const doLogin = (params, callback) => dispatch => {
  dispatch(setFormLoading(true))
  console.log(params)

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
  return axios.get(PATH_API_LOGOUT, {
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
      case PREPARE_DATA_PROVINCE:
        return {
          ...state,
          provinceList: action.provinceList,
        };
      case PREPARE_DATA_DISTRICT:
        return {
          ...state,
          districtList: action.districtList,
          profile: {
            ...state.profile,
            districtId: action.districtList.find(option => option.value === state.profile.districtId),
          }
        };
      case PREPARE_DATA_WARD:
        return {
          ...state,
          wardList: action.wardList,
          profile: {
            ...state.profile,
            wardId: action.wardList.find(option => option.value === state.profile.wardId),
          }
        };
      case SET_PROFILE: {
        return {
          ...state,
          profile: {
            ...action.data.profile,
            createDate: moment(new Date(action.data.profile.createDate)).format('YYYY-MM-DD hh:mm:ss'),
            updateDate: moment(new Date(action.data.profile.updateDate)).format('YYYY-MM-DD hh:mm:ss'),
            provinceName: action.data.province.provinceName,
            districtName: action.data.district.districtName,
            wardName: action.data.ward.wardName,
            provinceId: state.provinceList.find(option => option.value === action.data.province.provinceId),
            districtId: action.data.district.districtId,
            wardId: action.data.ward.wardId,
          }
        }
      }
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