import axios from "axios";
import { toast } from "react-toastify";

import { CONFIRM_DELETE } from "../../../commons/sweet-alert-modal";
import { ACTIVE, ALL, HIDDEN } from '../../../constants/entities';
import { REDUX_API_URL } from "../../../constants/redux-actions";
import { makeSlug } from "../../../commons/utils";

const prefix = "WARD_";
// API
const PATH_API = `${REDUX_API_URL}/wards`;
const createAction = action => `${prefix}${action}`;

const defaultValues = {
  id: null,
  name: "",
  customizeSlug: false,
  slugName: "",
  status: true,
  provinceId: "",
  districtId: ""
}

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  openModal: false,
  filters: {
    status: ALL
  },
  wardList: [
  ],
  ward: defaultValues,
  provinceList: [],
  districtList: [],
  searchKeywords: "",
};

const LIST_LOADING = createAction("LIST_LOADING");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const PREPARE_DATA = createAction("PREPARE_DATA");
const PREPARE_DATA_PROVINCE = createAction("PREPARE_DATA_PROVINCE");
const PREPARE_DATA_DISTRICT = createAction("PREPARE_DATA_DISTRICT");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const SET_WARD = createAction("SET_WARD");
const SET_DEFAULT_WARD = createAction("SET_DEFAULT_WARD");
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
  wardList: data
});
const prepareDataProvince = data => ({
  type: PREPARE_DATA_PROVINCE,
  provinceList: data
});

export const prepareDataDistrict = data => ({
  type: PREPARE_DATA_DISTRICT,
  districtList: data
});

const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });

export const setWard = ward => ({ type: SET_WARD, ward });

export const setDefaultWard = ward => ({ type: SET_DEFAULT_WARD, ward });

export const setSearchKeywords = searchKeywords => ({ type: SET_SEARCH_KEYWORDS, searchKeywords });

export const closeModal = () => ({ type: CLOSE_MODAL });
export const fetchAllProvince = () => async dispatch => {
  return axios
    .get(`${REDUX_API_URL}/provinces-creation`, { timeout: 5000 })
    .then(response => dispatch(prepareDataProvince(response.data)))
    .catch(error => toast.error(error))
};

export const fetchAllDistrict = (provinceId) => async dispatch => {
  return axios
    .get(`${REDUX_API_URL}/districts-creation/${provinceId}`, { timeout: 5000 })
    .then(response => dispatch(prepareDataDistrict(response.data)))
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

export const doSave = ward => async dispatch => {
  dispatch(formLoading(true));
  console.log(ward)
  const {
    id,
    name,
    slugName,
    districtId,
    customizeSlug,
    status
  } = ward;
  const params = {
    name,
    slugName: customizeSlug ? slugName : makeSlug(name),
    districtId: districtId.value,
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

export const getUpdateAction = wardId => async dispatch => {
  dispatch(listLoading(true));
  dispatch(fetchAllProvince());
  axios
  .get(`${PATH_API}/${wardId}`, { timeout: 5000 })
  .then(response => {
      dispatch(fetchAllDistrict(response.data.provinceId));
      dispatch({
        type: SET_WARD,
        ward: response.data,
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => toast.error(error))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = ward => async dispatch => {
  const params = JSON.stringify(ward);
  axios
    .post(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("Ward is created successfully!!")
      dispatch(setWard(initialState.ward));
    })
    .catch(error => {
      toast.error("error")
      toast.error(error)
    })
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = ward => async dispatch => {
  const params = JSON.stringify(ward);
  return axios
    .put(`${PATH_API}/${ward.id}`, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("Ward is update successfully!!");
      dispatch(closeModal())
    })
    .catch(error => toast.error(error))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = wardId => async dispatch => {
  dispatch(listLoading(true));
  const params = JSON.stringify(wardId);
  CONFIRM_DELETE("Bạn sẽ không thể khôi phục lại dữ liệu").then((result) => {
    if (result.isConfirmed) {
      return !Array.isArray(wardId) ?
        axios
          .delete(`${PATH_API}/${wardId}`)
          .then(response => {
            dispatch(prepareData(response.data));
            toast.success(`Delete Ward #${wardId} success!!`);
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
            toast.success(`Delete Ward #${wardId} success!!`)
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
          wardList: action.wardList,
          loading: false
        };
      case PREPARE_DATA_PROVINCE:
        return {
          ...state,
          provinceList: action.provinceList,
        };
      case PREPARE_DATA_DISTRICT:
        return {
          ...state,
          districtList: action.districtList,
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      case SET_WARD:
        return {
          ...state,
          ward: {
            ...action.ward,
            status: action.ward.status === ACTIVE ? true : false,
            customizeSlug: false,
            provinceId: state.provinceList.find(option => option.value === action.ward.provinceId),
            districtId: state.districtList.find(option => option.value === action.ward.districtId)
          },
        };
      case SET_DEFAULT_WARD:
        return {
          ...state,
          ward: action.ward,
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
          ward: defaultValues,
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
