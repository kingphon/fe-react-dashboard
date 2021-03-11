import axios from "axios";
import { REDUX_API_URL } from "../../constants/redux-actions";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {
  handleErrors,
  resetSystemErrors,
  openSystemPopup
} from "./rootReducer";

const prefix = "PROVINCE_";
// API
const PATH_API = `${REDUX_API_URL}/provinces`;
const createAction = action => `${prefix}${action}`;
const MySwal = withReactContent(Swal)

export const initialState = {
  loading: true,
  formLoading: false,
  modalFormSuccessMessage: "",
  openModal: false,
  provinceList: [
  ],
  province: {
  },
  clearSelected: true,
  errors: {
    formErrors: {},
    errorMessage: ""
  }
};

const LIST_LOADING = createAction("LIST_LOADING");
const CLEAR_SELECTED = createAction("CLEAR_SELECTED");
const OPEN_MODAL = createAction("OPEN_MODAL");
const PREPARE_DATA = createAction("PREPARE_DATA");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS");
const SET_PROVINCE = createAction("SET_PROVINCE");
const SET_MODAL_STATUS = createAction("SET_MODAL_STATUS");
const SET_SELECTED_FILTER = createAction("SET_SELECTED_FILTER");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const SET_UPDATE_PROVINCE_MODAL = createAction("SET_UPDATE_PROVINCE_MODAL");
const HANDLE_ERRORS = createAction("HANDLE_ERRORS");
const SET_ERRORS = createAction("SET_ERRORS");

const listLoading = loading => ({ type: LIST_LOADING, loading });
const clearSelected = clearSelected => ({ type: CLEAR_SELECTED, clearSelected });
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading });
const prepareData = data => ({
  type: PREPARE_DATA,
  provinceList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });
const setErrors = errors => ({ type: SET_ERRORS, errors });
const modalFormSuccessMessage = message => ({
  type: MODAL_FORM_UPDATE_SUCCESS,
  message
});

export const setProvince = province => ({ type: SET_PROVINCE, province });

export const setModalStatus = modalStatus => ({
  type: SET_MODAL_STATUS,
  modalStatus
});

export const setSelectedFilters = selectedFilters => ({
  type: SET_SELECTED_FILTER,
  selectedFilters
});

export const closeModal = () => ({ type: CLOSE_MODAL });

export const fetchAll = () => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  return axios
    .get(PATH_API, { timeout: 5000 })
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export const doSave = province => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(formLoading(true));
  const {
    id,
    name,
    slugName
  } = province;
  const params = {
    name,
    slugName
  };
  if (!id) {
    dispatch(doCreate(params));
  } else {
    dispatch(doUpdate({ ...params, id }));
  }
};

export const getCreateAction = () => dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(setOpenModal(true))
};

// export const doFilters = filters => ({ type: UPDATE_FILTERS, filters });

export const getUpdateAction = provinceId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(listLoading(true));
  axios
    .get(`${PATH_API}/${provinceId}`, { timeout: 5000 })
    .then(response => {
      dispatch({
        type: SET_PROVINCE,
        province: response.data,
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = province => async dispatch => {
  const params = JSON.stringify(province);
  axios
    .post(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("Province is created successfully!!")
      dispatch(setProvince(initialState.province));
    })
    .catch(error => {
      toast.error("error")
      dispatch(handleErrors(error, HANDLE_ERRORS))
    })
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = province => async dispatch => {
  const params = JSON.stringify(province);
  return axios
    .put(`${PATH_API}/${province.id}`, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("Province is update successfully!!");
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = provinceId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  dispatch(setErrors(initialState.errors));
  const params = JSON.stringify(provinceId);
  MySwal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      return !Array.isArray(provinceId) ?
        axios
          .delete(`${PATH_API}/${provinceId}`)
          .then(response => {
            dispatch(prepareData(response.data));

            toast.success(`Delete Province #${provinceId} success!!`);
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
            toast.success(`Delete Province #${provinceId} success!!`)
          })
          .catch(error => {
            toast.error("error")
            dispatch(handleErrors(error, HANDLE_ERRORS))
          })
          .finally(() => dispatch(listLoading(false)));
    }
  })
};

// export const setFilters = filters => ({ type: UPDATE_FILTERS, filters });

export default function (state = initialState, action) {
  // console.log(action.type)
  try {
    switch (action.type) {
      case LIST_LOADING:
        return { ...state, loading: action.loading };
      case CLEAR_SELECTED:
        return { ...state, clearSelected: action.clearSelected };
      // case RELOAD:
      //   return { ...state, reload: true };
      case MODAL_FORM_UPDATE_SUCCESS:
        return { ...state, modalFormSuccessMessage: action.message };
      case OPEN_MODAL:
        return { ...state, openModal: action.openModal };
      // case MODAL_FORM_LOADING:
      //   return {
      //     ...state,
      //     formLoading: action.loading,
      //     errors: action.loading ? initialState.errors : state.errors
      //   };
      case PREPARE_DATA:
        return {
          ...state,
          provinceList: action.provinceList,
          loading: false
        };
      // case UPDATE_FILTERS:
      //   return {
      //     ...state,
      //     filters: action.filters
      //   };
      // case MODAL_FORM_GET_CREATE_ACTION:
      //   return {
      //     ...state,
      //     openModal: true,
      //     modalFormSuccessMessage: initialState.modalFormSuccessMessage
      //   };
      case SET_PROVINCE:
        return {
          ...state,
          province: action.province,
        };
      // case SET_MODAL_STATUS:
      //   return {
      //     ...state,
      //     modalStatus: action.modalStatus,
      //     modalFormSuccessMessage: initialState.modalFormSuccessMessage
      //   };
      case CLOSE_MODAL:
        return {
          ...state,
          openModal: false,
          province: initialState.province,
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
