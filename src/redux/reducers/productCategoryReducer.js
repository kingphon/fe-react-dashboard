import { REDUX_API_URL } from '../../constants/redux-actions'
import axios from 'axios'
import { ACTIVE } from '../../constants/entites';
import { handleErrors, resetSystemErrors } from './rootReducer';

// API
const URL_PATH = `${REDUX_API_URL}/product/category`

const prefix = 'PRODUCT_CATEGORY_'

export const initialState = {
    loading: true,
    reload: false,
    modalFormSuccessMessage: '',
    filters: {
        search: '',
        status: '',
        sort: 'createDate,DESC'
    },
    multipleExecuteLoading: false,
    formLoading: false,
    openModal: false,
    productCategoryList: [],
    checkedItems: [],
    totalPages: 0,
    page: 1,
    productCategory: {
        status: ACTIVE
    },
    errors: {
        name: ''
    }
}

const createAction = action => `${prefix}${action}`

const LIST_LOADING = createAction("LIST_LOADING")
const RELOAD = createAction("RELOAD")
const PREPARE_DATA = createAction("PREPARE_DATA")
const UPDATE_FILTERS = createAction("UPDATE_FILTERS")
const SET_CHECKED_ITEMS = createAction("SET_CHECKED_ITEMS")
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING")
const MODAL_FORM_GET_CREATE_ACTION = createAction("MODAL_FORM_GET_CREATE_ACTION")
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS")
const SET_PRODUCT_CATEGORY = createAction("SET_PRODUCT_CATEGORY")
const CLOSE_MODAL = createAction("CLOSE_MODAL")
const MULTIPLE_EXECUTE_LOADING = createAction("MULTIPLE_EXECUTE_LOADING")
const HANDLE_ERRORS = createAction("HANDLE_ERRORS")

const listLoading = loading => ({ type: LIST_LOADING, loading })
const prepareData = ({ listData: productCategoryList, totalPage, pageSize, page }) => ({
    type: PREPARE_DATA,
    productCategoryList,
    totalPage,
    pageSize,
    page
})
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading })

const setMultipleExecuteLoading = loading => ({ type: MULTIPLE_EXECUTE_LOADING, loading })

const setProductCategory = (productCategory, openModal) => ({ type: SET_PRODUCT_CATEGORY, productCategory, openModal})

const modalFormSuccessMessage = message => ({ type: MODAL_FORM_UPDATE_SUCCESS, message })

const doCreate = productCategory => async dispatch => {
    const params = JSON.stringify(productCategory)
    axios.post(`${URL_PATH}/create`, params, {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(_ => dispatch(modalFormSuccessMessage("Product Category is created successfully!!")))
    .catch(error =>dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(formLoading(false)))
}

const doUpdate = productCategory => async dispatch => {
    const params = JSON.stringify(productCategory)
    return axios.post(
        `${URL_PATH}/${productCategory.productCategoryId}/update`, params, { 
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(_ => dispatch(modalFormSuccessMessage("Product Category is update successfully!!")))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(formLoading(false)))
}

const updateFilters = filters => ({ type: UPDATE_FILTERS, filters })

export const doMultipleExecute = (listId, status) => async dispatch =>{
    const params = { listId, status }
    dispatch(resetSystemErrors())
    dispatch(setMultipleExecuteLoading(true))
    return axios.post(`${URL_PATH}/execute`, params, {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(_ => dispatch(setCheckedItems([])))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(setMultipleExecuteLoading(false)))
}

export const fetchWithPaginationAndFilter = (filters, page) => async dispatch => {
    // console.log(filters, page)
    dispatch(resetSystemErrors())
    dispatch(listLoading(true))
    return axios.get(`${URL_PATH}?search=${filters.search}&status=${filters.status}&`
            + `sort=${filters.sort}&page=${page}`,
        { timeout: 5000 }
    )
    .then(response => dispatch(prepareData(response.data, filters)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

export const doSave = productCategory => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(formLoading(true))
    const { productCategoryId, name, slugName, status } = productCategory

    if (!productCategoryId) {
        dispatch(doCreate({ name, slugName, status }))
    } else {
        dispatch(doUpdate({ productCategoryId, name, slugName, status }))
    }
}

export const getCreateAction = () => ({ type: MODAL_FORM_GET_CREATE_ACTION })
export const getUpdateAction = productCategoryId => async dispatch => {
    dispatch(resetSystemErrors())
    dispatch(listLoading(true))
    return axios.get(`${URL_PATH}/${productCategoryId}`, {
        timeout: 5000
    }).then(response => dispatch(setProductCategory(response.data, true)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(_ => dispatch(listLoading(false)))
}

export const setFilters = filters => async dispatch => {
    dispatch(updateFilters(filters))
    dispatch(fetchWithPaginationAndFilter(filters, 1))
}

export const closeModal = () => ({ type: CLOSE_MODAL })

export const setCheckedItems = checkedItems => ({ type: SET_CHECKED_ITEMS, checkedItems })

export default function(state = initialState, action) {
    // console.log(action.type)
    try {
        switch (action.type) {
            case LIST_LOADING: return {
                ...state,
                loading: action.loading
            }
            case RELOAD: return {
                ...state,
                reload: true
            }
            case MODAL_FORM_LOADING: return {
                ...state,
                formLoading: action.loading,
                errors: action.loading ? initialState.errors : state.errors
            }
            case MULTIPLE_EXECUTE_LOADING: return {
                ...state,
                multipleExecuteLoading: action.loading
            }
            case PREPARE_DATA: return {
                ...state,
                productCategoryList: action.productCategoryList,
                totalPages: action.totalPage,
                page: action.page,
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
                productCategory: initialState.productCategory,
                openModal: true,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage
            }
            case MODAL_FORM_UPDATE_SUCCESS: return {
                ...state,
                modalFormSuccessMessage: action.message
            }
            case SET_PRODUCT_CATEGORY: return {
                ...state,
                productCategory: action.productCategory,
                openModal: action.openModal,
                modalFormSuccessMessage: initialState.modalFormSuccessMessage
            }
            case CLOSE_MODAL: return {
                ...state,
                openModal: false,
                listLoading: false,
                productCategory: initialState.productCategory,
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