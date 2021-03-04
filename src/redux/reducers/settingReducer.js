import axios from '../axios'
import { handleErrors, resetSystemErrors } from './rootReducer';

export const initialState = {
    formLoading: false,
    userProfileForm: {},
    changePasswordForm: {},
    formSuccessMessage: '',
    errors: {
        formErrors: {},
        errorMessage: ''
    }
}

const PATH_API_USER = 'user'
const PATH_API_PROVINCE = 'api/province'
const createAction = action => `SETTING_${action}`

const HANDLE_ERRORS = createAction("HANDLE_ERRORS")

const RESET_SETTING_FORM = createAction("RESET_SETTING_FORM")
export const resetSettingForm = () => ({ type: RESET_SETTING_FORM })

const SET_USER_PROFILE_FORM = createAction("SET_USER_PROFILE_FORM")
export const setUserProfileForm = userProfileForm => ({ type: SET_USER_PROFILE_FORM, userProfileForm })

const SET_CHANGE_PASSWORD_FORM = createAction("SET_CHANGE_PASSWORD_FORM")
export const setChangePasswordForm = changePasswordForm => ({ type: SET_CHANGE_PASSWORD_FORM, changePasswordForm })

const SET_FORM_LOADING = createAction("SET_FORM_LOADING")
const setFormLoading = loading => ({ type: SET_FORM_LOADING, loading })

const SET_INIT_USER_PROFILE = createAction("SET_INIT_USER_PROFILE")
const setInitUserProfile = ({ userProfile, provinceList, districtList, wardList }) => ({
    type: SET_INIT_USER_PROFILE,
    userProfile,
    provinceList,
    districtList,
    wardList
})
export const getUserProfile = () => dispatch => {
    dispatch(setFormLoading(true))
    dispatch(modalFormSuccessMessage(""))
    dispatch(resetSystemErrors())
    return axios.get(`${PATH_API_USER}/profile`)
    .then(response => {
        dispatch(setInitUserProfile(response.data))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(setFormLoading(false)))
}

const SET_DISTRICT_LIST = createAction("SET_DISTRICT_LIST")
const setDistrictList = (districtList, provinceId) => ({
    type: SET_DISTRICT_LIST,
    districtList,
    provinceId
})
export const getDistrictList = provinceId => dispatch => {
    dispatch(setFormLoading(true))
    return axios.get(`${PATH_API_PROVINCE}/${provinceId}`)
    .then(response => {
        dispatch(setDistrictList(response.data, provinceId))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(setFormLoading(false)))
}

const SET_WARD_LIST = createAction("SET_WARD_LIST")
const setWardList = (wardList, provinceId, districtId) => ({
    type: SET_WARD_LIST,
    wardList,
    provinceId,
    districtId
})
export const getWardList = (provinceId, districtId) => dispatch => {
    dispatch(setFormLoading(true))
    return axios.get(`${PATH_API_PROVINCE}/${provinceId}/${districtId}`)
    .then(response => {
        dispatch(setWardList(response.data, provinceId, districtId))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(setFormLoading(false)))
}

const MODAL_FORM_SUCCESS_MESSAGE = createAction("MODAL_FORM_SUCCESS_MESSAGE")
const modalFormSuccessMessage = message => ({ type: MODAL_FORM_SUCCESS_MESSAGE, message })
export const doUpdateProfile = userProfileForm => dispatch => {
    const {
        firstName,
        middleName,
        lastName,
        avatar,
        email,
        province,
        district,
        ward,
        address
    } = userProfileForm
    let params = {
        firstName,
        middleName,
        lastName,
        avatar,
        email,
        provinceId: province.provinceId,
        districtId: district.districtId,
        wardId: ward.wardId,
        address
    }
    dispatch(setFormLoading(true))
    dispatch(modalFormSuccessMessage(""))
    dispatch(resetSystemErrors())
    return axios.patch(`${PATH_API_USER}/profile`, params, {
        'Content-Type': 'application/json'
    })
    .then(() => {
        dispatch(modalFormSuccessMessage("Update successfully!!"))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(setFormLoading(false)))
}

export const doChangePassword = (changePasswordForm, callback) => dispatch => {
    const {
        oldPassword,
        newPassword,
        confirmPassword
    } = changePasswordForm
    let params = {
        oldPassword,
        newPassword,
        confirmPassword
    }
    dispatch(setFormLoading(true))
    dispatch(modalFormSuccessMessage(""))
    dispatch(resetSystemErrors())
    return axios.patch(`${PATH_API_USER}/change-password`, params, {
        'Content-Type': 'application/json'
    })
    .then(() => {
        dispatch(modalFormSuccessMessage("Update successfully!!"))
        callback()
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(setFormLoading(false)))
}

export default function(state = initialState, action) {
    try {
        switch (action.type) {
            case SET_FORM_LOADING: return {
                ...state,
                formLoading: action.loading
            }
            case HANDLE_ERRORS: return {
                ...state,
                errors: {
                    ...initialState.errors,
                    formErrors: action.formErrors
                }
            }
            case RESET_SETTING_FORM: return {
                ...initialState
            }
            case MODAL_FORM_SUCCESS_MESSAGE: return {
                ...state,
                formSuccessMessage: action.message
            }
            case SET_INIT_USER_PROFILE: {
                let userProfileForm = action.userProfile
                const provinceListObject = action.provinceList
                const districtListObject = action.districtList
                const wardListObject = action.wardList
                userProfileForm.province = {
                    provinceId: userProfileForm.provinceId,
                    name: provinceListObject[userProfileForm.provinceId]
                }
                userProfileForm.district = {
                    districtId: userProfileForm.districtId,
                    name: districtListObject[userProfileForm.districtId],
                    provinceId: userProfileForm.provinceId
                }
                userProfileForm.ward = {
                    wardId: userProfileForm.wardId,
                    name: wardListObject[userProfileForm.wardId],
                    provinceId: userProfileForm.provinceId,
                    districtId: userProfileForm.districtId
                }
                return {
                    ...state,
                    userProfileForm,
                    provinceList: Object.keys(provinceListObject).map(provinceId => (
                        {
                            provinceId,
                            name: provinceListObject[provinceId]
                        }
                    )),
                    districtList: Object.keys(districtListObject).map(districtId => (
                        {
                            districtId,
                            name: districtListObject[districtId],
                            provinceId: userProfileForm.provinceId
                        }
                    )),
                    wardList: Object.keys(wardListObject).map(wardId => (
                        {
                            wardId,
                            name: wardListObject[wardId],
                            provinceId: userProfileForm.provinceId,
                            districtId: userProfileForm.districtId
                        }
                    ))
                }
            }
            case SET_DISTRICT_LIST: return {
                ...state,
                userProfileForm: {
                    ...state.userProfileForm,
                    district: {},
                    ward: {}
                },
                districtList: Object.keys(action.districtList).map(districtId => (
                    {
                        districtId,
                        name: action.districtList[districtId],
                        provinceId: action.provinceId
                    }
                ))
            }
            case SET_WARD_LIST: return {
                ...state,
                userProfileForm: {
                    ...state.userProfileForm,
                    ward: {}
                },
                wardList: Object.keys(action.wardList).map(wardId => (
                    {
                        wardId,
                        name: action.wardList[wardId],
                        provinceId: action.provinceId,
                        districtId: action.districtId
                    }
                ))
            }
            case SET_USER_PROFILE_FORM: return {
                ...state,
                userProfileForm: action.userProfileForm
            }
            case SET_CHANGE_PASSWORD_FORM: return {
                ...state,
                changePasswordForm: action.changePasswordForm
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