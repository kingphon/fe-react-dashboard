import axios from '../axios'
import { REDUX_API_URL } from '../../constants/redux-actions'
import { ACTIVE } from '../../constants/entites';
import { handleErrors, resetSystemErrors, openSystemPopup } from './rootReducer';

const prefix = 'USER_GROUP_'
// API
const PATH_API = `user/group`
// Create Action
const createAction = action => `${prefix}${action}`

const LIST_LOADING = createAction("LIST_LOADING")
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING")
const OPEN_MODAL = createAction("OPEN_MODAL")
const PREPARE_DATA = createAction("PREPARE_DATA")
const UPDATE_FILTERS = createAction("UPDATE_FILTERS")
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING")
const MODAL_FORM_GET_CREATE_ACTION = createAction("MODAL_FORM_GET_CREATE_ACTION")
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS")
const SET_USER_GROUP = createAction("SET_USER_GROUP")
const CLOSE_MODAL = createAction("CLOSE_MODAL")
const HANDLE_ERRORS = createAction("HANDLE_ERRORS")
const SET_ERRORS = createAction("SET_ERRORS")

export const initialState = {
    loading: true,
    createButtonLoading: false,
    modalFormSuccessMessage: '',
    filters: {},
    multipleExecuteLoading: false,
    formLoading: false,
    openModal: false,
    userGroupList: [],
    userGroup: {
        status: ACTIVE
    },
    errors: {
        formErrors: {},
        errorMessage: ''
    }
}

const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal })
const listLoading = loading => ({ type: LIST_LOADING, loading })
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading })
const createButtonLoading = loading => ({ type: CREATE_BUTTON_LOADING, loading })
const prepareData = data => ({ type: PREPARE_DATA, userGroupList: data })
const modalFormSuccessMessage = message => ({ type: MODAL_FORM_UPDATE_SUCCESS, message })
const setErrors = errors => ({ type: SET_ERRORS, errors })

export const fetchAll = () => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(listLoading(true))
    return axios.get(PATH_API)
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

export const doSave = userGroup => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(modalFormSuccessMessage(""))
    dispatch(formLoading(true))
    const { userGroupId, name, userGroupFeatures , status } = userGroup
    const params = { name, userGroupFeatures, status }
    if (!userGroupId) {
        dispatch(doCreate(params))
    } else {
        dispatch(doUpdate({ ...params, userGroupId }))
    }
}

export const getCreateAction = () => dispatch => {
    dispatch(resetSystemErrors())
    dispatch(modalFormSuccessMessage(""))
    dispatch(createButtonLoading(true))
    return axios.get(`${PATH_API}/create`)
    .then(response => {
        dispatch({ type: MODAL_FORM_GET_CREATE_ACTION, featureList: response.data })
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(createButtonLoading(false)))
}

export const getUpdateAction = userGroupId => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(modalFormSuccessMessage(""))
    dispatch(listLoading(true))
    return axios.get(`${PATH_API}/${userGroupId}`).then(response => {
        dispatch(setUserGroup(response.data))
        dispatch(setOpenModal(true))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

export const setUserGroup = userGroup => ({ type: SET_USER_GROUP, userGroup})

export const doDelete = userGroupId => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(listLoading(true))
    dispatch(setErrors(initialState.errors))
    return axios.delete(`${PATH_API}/${userGroupId}`)
        .then(response => {
            dispatch(prepareData(response.data))
            dispatch(openSystemPopup(true, `Delete User Group #${userGroupId} success!!`))
        })
        .catch(errors => dispatch(handleErrors(errors, HANDLE_ERRORS)))
        .finally(() => dispatch(listLoading(false)))
}

const doCreate = userGroup => async dispatch => {
    const params = JSON.stringify(userGroup)
    axios.post(PATH_API, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        dispatch(prepareData(response.data))
        dispatch(setUserGroup({
            ...initialState.userGroup,
            userGroupFeatures: userGroup.userGroupFeatures.map(item => 
                ({ 
                    ...item,
                    read: false, create: false, update: false, delete: false 
                })
            )
        }))
        dispatch(modalFormSuccessMessage("User Group is created successfully!!"))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)))
}

const doUpdate = userGroup => async dispatch => {
    const params = JSON.stringify(userGroup)
    return axios.patch(PATH_API, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        dispatch(prepareData(response.data))
        dispatch(setUserGroup(userGroup))
        dispatch(modalFormSuccessMessage("User Group is update successfully!!"))
    })
    .catch(error => {
        dispatch(handleErrors(error, HANDLE_ERRORS))
        dispatch(setUserGroup(initialState.userGroup))
    })
    .finally(() => dispatch(formLoading(false)))
}

export const setFilters = filters => ({ type: UPDATE_FILTERS, filters })
export const closeModal = () => ({ type: CLOSE_MODAL })

export default function(state = initialState, action) {
    console.log(action.type, action)
    try {
        switch (action.type) {
            case LIST_LOADING: return { ...state, loading: action.loading }
            case CREATE_BUTTON_LOADING: return { ...state, createButtonLoading: action.loading }
            case OPEN_MODAL: return { ...state, openModal: action.openModal }
            case UPDATE_FILTERS: return { ...state, filters: action.filters }
            case MODAL_FORM_UPDATE_SUCCESS: return { ...state, modalFormSuccessMessage: action.message }
            case SET_ERRORS: return {
                ...state, 
                errors: {
                    ...initialState.errors,
                    ...action.errors
                }
            }
            case MODAL_FORM_LOADING: return {
                ...state,
                formLoading: action.loading,
                errors: action.loading ? initialState.errors : state.errors
            }
            case PREPARE_DATA: return {
                ...state,
                userGroupList: action.userGroupList,
                loading: false,
                reload: false
            }
            case MODAL_FORM_GET_CREATE_ACTION: return {
                ...state,
                openModal: true,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage,
                userGroup: {
                    ...initialState.userGroup,
                    userGroupFeatures: Object.keys(action.featureList).map(key => 
                        ({ 
                            featureId: key, 
                            featureName: action.featureList[key], 
                            read: false, create: false, update: false, delete: false 
                        })
                    )
                }
            }
            case SET_USER_GROUP: return {
                ...state,
                userGroup: action.userGroup,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage
            }
            case CLOSE_MODAL: return {
                ...state,
                openModal: false,
                listLoading: false,
                userGroup: initialState.userGroup,
                formLoading: initialState.formLoading,
                errors: initialState.errors,
            }
            case HANDLE_ERRORS: return {
                ...state,
                errors: {
                    ...state.errors,
                    ...action.errors.response.data
                }
            }
            default: return { ...state }
        }
    } catch (error) {
        console.log(error)
    } finally {
        
    }

    return state;
}