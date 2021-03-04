import { REDUX_API_URL } from '../../constants/redux-actions'
import axios from 'axios'
import { ACTIVE } from '../../constants/entites';
import { handleErrors, resetSystemErrors } from './rootReducer';

const prefix = 'POST_'

export const initialState = {
    loading: true,
    reload: false,
    formSuccessMessage: '',
    filters: {
        search: '',
        status: '',
        sort: 'createDate,DESC'
    },
    multipleExecuteLoading: false,
    formLoading: false,
    openModal: false,
    postList: [],
    postTypeList: [],
    tagList: [],
    post: {
        status: ACTIVE
    },
    errors: {
        formErrors: {},
        errorMessage: ''
    }
}

const createAction = action => `${prefix}${action}`

const LIST_LOADING = createAction("LIST_LOADING")
const RELOAD = createAction("RELOAD")
const PREPARE_DATA = createAction("PREPARE_DATA")
const INIT_FORM = createAction("INIT_FORM")
const UPDATE_FILTERS = createAction("UPDATE_FILTERS")
const SET_CHECKED_ITEMS = createAction("SET_CHECKED_ITEMS")
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING")
const MODAL_FORM_GET_CREATE_ACTION = createAction("MODAL_FORM_GET_CREATE_ACTION")
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS")
const SET_POST = createAction("SET_POST")
const CLOSE_MODAL = createAction("CLOSE_MODAL")
const MULTIPLE_EXECUTE_LOADING = createAction("MULTIPLE_EXECUTE_LOADING")
const HANDLE_ERRORS = createAction("HANDLE_ERRORS")
const SET_ERRORS = createAction("SET_ERRORS")

// API
const PATH_API = `${REDUX_API_URL}/post`

const listLoading = loading => ({ type: LIST_LOADING, loading })
// const setErrors = errors => ({ type: SET_ERRORS, errors })
const prepareData = data => ({
    type: PREPARE_DATA,
    postList: data
})
const setErrors = errors => ({ type: SET_ERRORS, errors })
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading })
const setInitForm = ({ postTypeList, tagList }) => ({ type: INIT_FORM, postTypeList, tagList })

const setMultipleExecuteLoading = loading => ({ type: MULTIPLE_EXECUTE_LOADING, loading })

const modalFormSuccessMessage = message => ({ type: MODAL_FORM_UPDATE_SUCCESS, message })

export const setPost = post => ({ type: SET_POST, post })

export const closeModal = () => ({ type: CLOSE_MODAL })

export const doMultipleExecute = (listId, status) => async dispatch =>{
    const params = { listId, status }
    dispatch(resetSystemErrors())
    dispatch(setMultipleExecuteLoading(true))
    return axios.post(`${PATH_API}/execute`, params, {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(_ => dispatch(setCheckedItems([])))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(setMultipleExecuteLoading(false)))
}

export const fetchAll = () => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(listLoading(true))
    return axios.get(PATH_API, { timeout: 5000 })
        .then(response => dispatch(prepareData(response.data)))
        .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
        .finally(_ => dispatch(listLoading(false)))
}

export const doSave = post => async dispatch => {
    console.log(post)
    dispatch(resetSystemErrors())
    dispatch(formLoading(true))
    dispatch(modalFormSuccessMessage(""))
    dispatch(setErrors(initialState.errors))
    const { postId, name, slugName, image, description, postType, content, status } = post
    const tags = post.tags ? post.tags.map(tag => tag.name) : []
    const publishDate = post.publishDate ? post.publishDate.getTime() : undefined
    const postTypeId = postType.postTypeId
    if (!postTypeId) {
        dispatch(setErrors({ postTypeId: 'Post type is not empty' }))
        return;
    }
    const postParams = { 
        name,
        slugName,
        image,
        description,
        content,
        tags,
        publishDate,
        postTypeId,
        status
    }
    return !postId ?
        dispatch(doCreate(postParams)) :
        dispatch(doUpdate({ ...postParams, postId }))
}

export const getCreateAction = () => ({ type: MODAL_FORM_GET_CREATE_ACTION })

export const initForm = () => dispatch => {
    dispatch(resetSystemErrors())
    dispatch(modalFormSuccessMessage(""))
    dispatch(formLoading(true))
    return axios.get(`${PATH_API}/create`, { timeout: 5000 })
    .then(response => {
        dispatch(setInitForm(response.data))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)))
}

export const getUpdateAction = postId => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(listLoading(true))
    return axios.get(`${PATH_API}/${postId}`, {
        timeout: 5000
    }).then(response => dispatch(setPost(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

const doCreate = post => async dispatch => {
    const params = JSON.stringify(post)
    axios.post(`${PATH_API}`, params, {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        dispatch(prepareData(response.data))
        dispatch(modalFormSuccessMessage("Post is created success!!"))
        dispatch(setPost(initialState.post))
    })
    .catch(error =>dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(formLoading(false)))
}

const doUpdate = post => async dispatch => {
    const params = JSON.stringify(post)
    return axios.post(`${PATH_API}`, params, { 
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        dispatch(prepareData(response.data))
        dispatch(modalFormSuccessMessage("Post is update success!!"))
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(formLoading(false)))
}

export const setFilters = filters => ({ type: UPDATE_FILTERS, filters })
export const setCheckedItems = checkedItems => ({ type: SET_CHECKED_ITEMS, checkedItems })

export default function(state = initialState, action) {
    console.log(action.tags)
    try {
        switch (action.type) {
            case LIST_LOADING: return {
                ...state,
                loading: action.loading
            }
            case SET_ERRORS: return {
                ...state,
                errors: {
                    ...initialState.errors,
                    ...action.errors
                }
            }
            case INIT_FORM: return {
                ...state,
                postTypeList: action.postTypeList,
                tagList: action.tagList
            }
            case RELOAD: return {
                ...state,
                reload: true
            }
            case MODAL_FORM_LOADING: return {
                ...state,
                formLoading: action.loading
            }
            case MULTIPLE_EXECUTE_LOADING: return {
                ...state,
                multipleExecuteLoading: action.loading
            }
            case PREPARE_DATA: return {
                ...state,
                postList: action.postList,
                loading: false,
                reload: false
            }
            case UPDATE_FILTERS: return {
                ...state,
                filters: action.filters
            }
            case SET_CHECKED_ITEMS: return {
                ...state,
                checkedItems: action.checkedItems
            }
            case MODAL_FORM_GET_CREATE_ACTION: return {
                ...state,
                post: initialState.post,
                openModal: true,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage
            }
            case MODAL_FORM_UPDATE_SUCCESS: return {
                ...state,
                modalFormSuccessMessage: action.message
            }
            case SET_POST: return {
                ...state,
                post: action.post
            }
            case CLOSE_MODAL: return {
                ...state,
                openModal: false,
                listLoading: false,
                post: initialState.post,
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
            default: return {
                ...state
            }
        }
    } catch (error) {
        console.log(error)
    } finally {
        
    }

    return state;
}