import axios from "axios";

import { REDUX_API_URL } from "../../constants/redux-actions";
import { toast } from "react-toastify";
import { CONFIRM_DELETE } from "../../commons/sweet-alert-modal"
import { ALL } from '../../constants/entities'

import {
  handleErrors,
  resetSystemErrors,
  openSystemPopup
} from "./rootReducer";

const prefix = "DISTRICT_";
// API
const PATH_API = `${REDUX_API_URL}/districts`;
const createAction = action => `${prefix}${action}`;

export const initialState = {
  loading: true,
  formLoading: false,
  modalFormSuccessMessage: "",
  openModal: false,
  filters: {
    status: ALL
  },
  districtList: [
  ],
  district: {
    name: "",
    slugName: "",
    provinceId: "",
    status: "ACTIVE"
  },
  provinceList: [],
  searchKeywords: "",
  errors: {
    formErrors: {
    },
    errorMessage: ""
  }
};

const LIST_LOADING = createAction("LIST_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const PREPARE_DATA = createAction("PREPARE_DATA");
const PREPARE_DATA_PROVINCE = createAction("PREPARE_DATA_PROVINCE");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS");
const SET_DISTRICT = createAction("SET_DISTRICT");
const SET_SEARCH_KEYWORDS = createAction("SET_SEARCH_KEYWORDS");
const SET_MODAL_STATUS = createAction("SET_MODAL_STATUS");
const SET_SELECTED_FILTER = createAction("SET_SELECTED_FILTER");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const UPDATE_FILTERS = createAction("UPDATE_FILTERS");
const HANDLE_ERRORS = createAction("HANDLE_ERRORS");
const SET_ERRORS = createAction("SET_ERRORS");
const SET_FORM_ERRORS = createAction("SET_FORM_ERRORS");

const listLoading = loading => ({ type: LIST_LOADING, loading });
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading });
const prepareData = data => ({
  type: PREPARE_DATA,
  districtList: data
});
const prepareDataProvince = data => ({
  type: PREPARE_DATA_PROVINCE,
  provinceList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });
const setErrors = errors => ({ type: SET_ERRORS, errors });
const setFormErrors = formErrors => ({ type: SET_FORM_ERRORS, formErrors });
const modalFormSuccessMessage = message => ({
  type: MODAL_FORM_UPDATE_SUCCESS,
  message
});

export const setDistrict = district => ({ type: SET_DISTRICT, district });

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
export const fetchAllProvince = () => async dispatch => {

  return axios
    .get(`${REDUX_API_URL}/provinces-creation`, { timeout: 5000 })
    .then(response => dispatch(prepareDataProvince(response.data)))
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

export const doSave = district => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(formLoading(true));
  const {
    id,
    name,
    slugName,
    provinceId,
    status
  } = district;
  const params = {
    name,
    slugName,
    provinceId,
    status,
  };
  const formErrors = { }
  for (const param in district) {
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
  }
};

export const getCreateAction = () => dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(setOpenModal(true));
  dispatch(fetchAllProvince());
};

export const doFilters = filters => ({ type: UPDATE_FILTERS, filters });

export const getUpdateAction = districtId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(listLoading(true));
  dispatch(fetchAllProvince());
  axios
    .get(`${PATH_API}/${districtId}`, { timeout: 5000 })
    .then(response => {
      dispatch({
        type: SET_DISTRICT,
        district: response.data,
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = district => async dispatch => {
  const params = JSON.stringify(district);
  // console.log(params)
  axios
    .post(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("District is created successfully!!")
      dispatch(setDistrict(initialState.district));
    })
    .catch(error => {
      toast.error("error")
      dispatch(handleErrors(error, HANDLE_ERRORS))
    })
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = district => async dispatch => {
  const params = JSON.stringify(district);
  return axios
    .put(`${PATH_API}/${district.id}`, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("District is update successfully!!");
      dispatch(closeModal())
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = districtId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  dispatch(setErrors(initialState.errors));
  const params = JSON.stringify(districtId);
  CONFIRM_DELETE("Bạn sẽ không thể khôi phục lại dữ liệu").then((result) => {
    if (result.isConfirmed) {
      return !Array.isArray(districtId) ?
        axios
          .delete(`${PATH_API}/${districtId}`)
          .then(response => {
            dispatch(prepareData(response.data));
            toast.success(`Delete District #${districtId} success!!`);
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
            toast.success(`Delete District #${districtId} success!!`)
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
  // console.log(action.type)
  try {
    switch (action.type) {
      case LIST_LOADING:
        return { ...state, loading: action.loading };
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
          districtList: action.districtList,
          loading: false
        };
      case PREPARE_DATA_PROVINCE:
        console.log(action)
        return {
          ...state,
          provinceList: action.provinceList,
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      // case MODAL_FORM_GET_CREATE_ACTION:
      //   return {
      //     ...state,
      //     openModal: true,
      //     modalFormSuccessMessage: initialState.modalFormSuccessMessage
      //   };
      case SET_DISTRICT:
        return {
          ...state,
          district: action.district,
        };
      case SET_SEARCH_KEYWORDS:
        return {
          ...state,
          searchKeywords: action.searchKeywords,
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
          district: initialState.district,
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
