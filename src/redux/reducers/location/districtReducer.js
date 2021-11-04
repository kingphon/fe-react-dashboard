import axios from "axios";
import { toast } from "react-toastify";

import { CONFIRM_DELETE } from "../../../commons/sweet-alert-modal";
import { ACTIVE, ALL, HIDDEN } from '../../../constants/entities';
import { REDUX_API_URL } from "../../../constants/redux-actions";
import { makeSlug } from "../../../commons/utils";

const prefix = "DISTRICT_";
// API
const PATH_API = `${REDUX_API_URL}/location/districts`;
const createAction = action => `${prefix}${action}`;

const defaultValues = {
  id: null,
  name: "",
  customizeSlug: false,
  slugName: "",
  status: true,
  provinceId: ""
}

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  openModal: false,
  filters: {
    status: ALL
  },
  districtList: [
  ],
  district: defaultValues,
  inputValue: "",
  provinceList: [],
  searchKeywords: "",
};

const LIST_LOADING = createAction("LIST_LOADING");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const PREPARE_DATA = createAction("PREPARE_DATA");
const PREPARE_DATA_PROVINCE = createAction("PREPARE_DATA_PROVINCE");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const SET_DISTRICT = createAction("SET_DISTRICT");
const SET_DEFAULT_DISTRICT = createAction("SET_DEFAULT_DISTRICT");
const SET_SEARCH_KEYWORDS = createAction("SET_SEARCH_KEYWORDS");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const UPDATE_FILTERS = createAction("UPDATE_FILTERS");

const listLoading = loading => ({ type: LIST_LOADING, loading });
const createButtonLoading = loading => ({
  type: CREATE_BUTTON_LOADING,
  loading
});
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

export const setDistrict = district => ({ type: SET_DISTRICT, district });

export const setDefaultDistrict = district => ({ type: SET_DEFAULT_DISTRICT, district });

export const setSearchKeywords = searchKeywords => ({ type: SET_SEARCH_KEYWORDS, searchKeywords });

export const closeModal = () => ({ type: CLOSE_MODAL });

export const fetchAllProvince = () => async dispatch => {

  return axios
    .get(`${REDUX_API_URL}/location/provinces-creation`, { timeout: 5000 })
    .then(response => dispatch(prepareDataProvince(response.data)))
    .catch(error => toast.error(error))
};

export const fetchAll = () => async dispatch => {
  dispatch(listLoading(true));
  return axios
    .get(PATH_API, { timeout: 5000 })
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => toast.error(error))
    .finally(() => dispatch(listLoading(false)));
};

export const doSave = district => async dispatch => {
  dispatch(formLoading(true));
  const {
    id,
    name,
    slugName,
    provinceId,
    customizeSlug,
    status
  } = district;

  const params = {
    name,
    slugName: customizeSlug ? slugName : makeSlug(name),
    provinceId: provinceId.value,
    status: status ? ACTIVE : HIDDEN,
  };
  if (!id) {
    dispatch(doCreate(params));
  } else {
    dispatch(doUpdate({ ...params, id }));
  }
};

export const getCreateAction = () => dispatch => {
  dispatch(createButtonLoading(true));
  dispatch(setOpenModal(true));
  dispatch(fetchAllProvince());
  dispatch(createButtonLoading(false));
};

export const doFilters = filters => ({ type: UPDATE_FILTERS, filters });

export const getUpdateAction = districtId => async dispatch => {
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
    .catch(error => toast.error(error))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = district => async dispatch => {
  const params = JSON.stringify(district);
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
      dispatch(setDefaultDistrict(initialState.district));
    })
    .catch(error => {
      toast.error(error)
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
    .catch(error => toast.error(error))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = districtId => async dispatch => {
  dispatch(listLoading(true));
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
          .catch(error => toast.error(error))
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
            toast.error(error)
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
      case OPEN_MODAL:
        return { ...state, openModal: action.openModal };
      case MODAL_FORM_LOADING:
        return {
          ...state,
          formLoading: action.loading,
        };
      case PREPARE_DATA:
        return {
          ...state,
          districtList: action.districtList,
          loading: false
        };
      case PREPARE_DATA_PROVINCE:
        return {
          ...state,
          provinceList: action.provinceList,
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      case SET_DISTRICT:
        return {
          ...state,
          district: {
            ...action.district,
            status: action.district.status === ACTIVE ? true : false,
            customizeSlug: false,
            provinceId: state.provinceList.find(option => option.value === action.district.provinceId)
          },
        };
      case SET_DEFAULT_DISTRICT:
        return {
          ...state,
          district: action.district,
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
          district: defaultValues,
          formLoading: initialState.formLoading,
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
