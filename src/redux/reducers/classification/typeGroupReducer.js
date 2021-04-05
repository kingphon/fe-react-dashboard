import axios from "axios";
import { toast } from "react-toastify";

import { CONFIRM_DELETE } from "../../../commons/sweet-alert-modal";
import { ALL } from '../../../constants/entities';
import { REDUX_API_URL } from "../../../constants/redux-actions";
import {
  handleErrors,
  resetSystemErrors
} from "../rootReducer";

const prefix = "TYPE_GROUP_";
// API
const PATH_API = `${REDUX_API_URL}/type-groups`;
const createAction = action => `${prefix}${action}`;

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  modalFormSuccessMessage: "",
  openModal: false,
  filters: {
    status: ALL
  },
  typeGroupList: [
  ],
  typeGroup: {
    name: "",
    slugName: "",
    categoryId: "",
    status: "ACTIVE"
  },
  categoryList: [],
  searchKeywords: "",
  errors: {
    formErrors: {
    },
    errorMessage: ""
  }
};

const LIST_LOADING = createAction("LIST_LOADING");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const PREPARE_DATA = createAction("PREPARE_DATA");
const PREPARE_DATA_PROVINCE = createAction("PREPARE_DATA_PROVINCE");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS");
const SET_TYPE_GROUP = createAction("SET_TYPE_GROUP");
const SET_SEARCH_KEYWORDS = createAction("SET_SEARCH_KEYWORDS");
const SET_MODAL_STATUS = createAction("SET_MODAL_STATUS");
const SET_SELECTED_FILTER = createAction("SET_SELECTED_FILTER");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const UPDATE_FILTERS = createAction("UPDATE_FILTERS");
const HANDLE_ERRORS = createAction("HANDLE_ERRORS");
const SET_ERRORS = createAction("SET_ERRORS");
const SET_FORM_ERRORS = createAction("SET_FORM_ERRORS");

const listLoading = loading => ({ type: LIST_LOADING, loading });
const createButtonLoading = loading => ({
  type: CREATE_BUTTON_LOADING,
  loading
});
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading });
const prepareData = data => ({
  type: PREPARE_DATA,
  typeGroupList: data
});
const prepareDataCategory = data => ({
  type: PREPARE_DATA_PROVINCE,
  categoryList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });
const setErrors = errors => ({ type: SET_ERRORS, errors });
const setFormErrors = formErrors => ({ type: SET_FORM_ERRORS, formErrors });
const modalFormSuccessMessage = message => ({
  type: MODAL_FORM_UPDATE_SUCCESS,
  message
});

export const setTypeGroup = typeGroup => ({ type: SET_TYPE_GROUP, typeGroup });

export const setSearchKeywords = searchKeywords => ({ type: SET_SEARCH_KEYWORDS, searchKeywords });

export const setModalStatus = modalStatus => ({
  type: SET_MODAL_STATUS,
  modalStatus
});

export const setSelectedFilters = selectedFilters => ({
  type: SET_SELECTED_FILTER,
  selectedFilters
});

export const closeModal = () => ({ type: CLOSE_MODAL });
export const fetchAllCategory = () => async dispatch => {

  return axios
    .get(`${REDUX_API_URL}/categories-creation`, { timeout: 5000 })
    .then(response => dispatch(prepareDataCategory(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
};

export const fetchAll = () => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  return axios
    .get(PATH_API, { timeout: 5000 })
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export const doSave = typeGroup => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(formLoading(true));
  const {
    id,
    name,
    slugName,
    categoryId,
    status
  } = typeGroup;
  const params = {
    name,
    slugName,
    categoryId,
    status,
  };
  const formErrors = {}
  for (const param in params) {
    const element = params[param];
    if (!element) {
      formErrors[param] = "Vui lòng nhập đầy đủ thông tin"
    }
  }
  if (Object.keys(formErrors).length === 0) {
    dispatch(setFormErrors({}))
    if (!id) {
      dispatch(doCreate(params));
    } else {
      dispatch(doUpdate({ ...params, id }));
    }
  } else {
    dispatch(setFormErrors(formErrors))
    dispatch(formLoading(false));
  }
};

export const getCreateAction = () => dispatch => {
  dispatch(createButtonLoading(true));
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(setOpenModal(true));
  dispatch(fetchAllCategory());
  dispatch(createButtonLoading(false));
};

export const doFilters = filters => ({ type: UPDATE_FILTERS, filters });

export const getUpdateAction = typeGroupId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(listLoading(true));
  dispatch(fetchAllCategory());
  axios
    .get(`${PATH_API}/${typeGroupId}`, { timeout: 5000 })
    .then(response => {
      dispatch({
        type: SET_TYPE_GROUP,
        typeGroup: response.data,
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = typeGroup => async dispatch => {
  const params = JSON.stringify(typeGroup);
  axios
    .post(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("TypeGroup is created successfully!!")
      dispatch(setTypeGroup(initialState.typeGroup));
    })
    .catch(error => {
      toast.error("error")
      dispatch(handleErrors(error, HANDLE_ERRORS))
    })
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = typeGroup => async dispatch => {
  const params = JSON.stringify(typeGroup);
  return axios
    .put(`${PATH_API}/${typeGroup.id}`, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("TypeGroup is update successfully!!");
      dispatch(closeModal())
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = typeGroupId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  dispatch(setErrors(initialState.errors));
  const params = JSON.stringify(typeGroupId);
  CONFIRM_DELETE("Bạn sẽ không thể khôi phục lại dữ liệu").then((result) => {
    if (result.isConfirmed) {
      return !Array.isArray(typeGroupId) ?
        axios
          .delete(`${PATH_API}/${typeGroupId}`)
          .then(response => {
            dispatch(prepareData(response.data));
            toast.success(`Delete TypeGroup #${typeGroupId} success!!`);
          })
          .catch(errors => dispatch(handleErrors(errors, HANDLE_ERRORS)))
          .finally(() => dispatch(listLoading(false))) :
        axios
          .post(`${PATH_API}/delete-items`, params, {
            timeout: 5000,
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            dispatch(prepareData(response.data));
            toast.success(`Delete TypeGroup #${typeGroupId} success!!`)
          })
          .catch(error => {
            toast.error("error")
            dispatch(handleErrors(error, HANDLE_ERRORS))
          })
          .finally(() => dispatch(listLoading(false)));
    }
  })
};

export const setFilters = filters => ({ type: UPDATE_FILTERS, filters });

export default function (state = initialState, action) {
  try {
    switch (action.type) {
      case LIST_LOADING:
        return { ...state, loading: action.loading };
      case CREATE_BUTTON_LOADING:
        return { ...state, createButtonLoading: action.loading };
      case MODAL_FORM_UPDATE_SUCCESS:
        return { ...state, modalFormSuccessMessage: action.message };
      case OPEN_MODAL:
        return { ...state, openModal: action.openModal };
      case MODAL_FORM_LOADING:
        return {
          ...state,
          formLoading: action.loading,
          errors: action.loading ? initialState.errors : state.errors
        };
      case PREPARE_DATA:
        return {
          ...state,
          typeGroupList: action.typeGroupList,
          loading: false
        };
      case PREPARE_DATA_PROVINCE:
        return {
          ...state,
          categoryList: action.categoryList,
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      case SET_TYPE_GROUP:
        return {
          ...state,
          typeGroup: action.typeGroup,
        };
      case SET_SEARCH_KEYWORDS:
        return {
          ...state,
          searchKeywords: action.searchKeywords,
        };
      case CLOSE_MODAL:
        return {
          ...state,
          openModal: false,
          typeGroup: initialState.typeGroup,
          formLoading: initialState.formLoading,
          errors: initialState.errors
        };
      case SET_ERRORS:
        return {
          ...state,
          errors: {
            ...initialState.errors,
            ...action.errors
          }
        };
      case SET_FORM_ERRORS:
        return {
          ...state,
          errors: {
            formErrors: action.formErrors,
            ...initialState.errors.message,
          }
        };
      case HANDLE_ERRORS:
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.errors.response.data
          }
        };
      default:
        return { ...state };
    }
  } catch (error) {
    console.log(error);
  } finally {
  }

  return state;
}
