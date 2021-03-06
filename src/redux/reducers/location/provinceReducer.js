import axios from "axios";
import { toast } from "react-toastify";

import { CONFIRM_DELETE } from "../../../commons/sweet-alert-modal";
import { ALL, ACTIVE, HIDDEN } from "../../../constants/entities";
import { REDUX_API_URL } from "../../../constants/redux-actions";
import { makeSlug } from "../../../commons/utils";

const prefix = "PROVINCE_";
// API
const PATH_API = `${REDUX_API_URL}/location/provinces`;
const createAction = (action) => `${prefix}${action}`;

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  openModal: false,
  filters: {
    status: ALL,
  },
  provinceList: [],
  province: {
    id: null,
    name: "",
    customizeSlug: false,
    slugName: "",
    status: true,
  },
  searchKeywords: "",
};

const LIST_LOADING = createAction("LIST_LOADING");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const PREPARE_DATA = createAction("PREPARE_DATA");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const SET_PROVINCE = createAction("SET_PROVINCE");
const SET_DEFAULT_PROVINCE = createAction("SET_DEFAULT_PROVINCE");
const SET_SEARCH_KEYWORDS = createAction("SET_SEARCH_KEYWORDS");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const UPDATE_FILTERS = createAction("UPDATE_FILTERS");

const listLoading = (loading) => ({ type: LIST_LOADING, loading });
const createButtonLoading = (loading) => ({
  type: CREATE_BUTTON_LOADING,
  loading,
});
const formLoading = (loading) => ({ type: MODAL_FORM_LOADING, loading });
const prepareData = (data) => ({
  type: PREPARE_DATA,
  provinceList: data,
});
const setOpenModal = (openModal) => ({ type: OPEN_MODAL, openModal });

export const setProvince = (province) => ({ type: SET_PROVINCE, province });

export const setDefaultProvince = () => ({ type: SET_DEFAULT_PROVINCE });

export const setSearchKeywords = (searchKeywords) => ({
  type: SET_SEARCH_KEYWORDS,
  searchKeywords,
});

export const closeModal = () => ({ type: CLOSE_MODAL });

export const fetchAll = () => async (dispatch) => {
  dispatch(listLoading(true));
  return axios
    .get(PATH_API, { timeout: 5000 })
    .then((response) => dispatch(prepareData(response.data)))
    .catch((error) => toast.error(error.response.data.message))
    .finally(() => dispatch(listLoading(false)));
};

export const doSave = (province) => async (dispatch) => {
  dispatch(formLoading(true));
  const { id, name, slugName, customizeSlug, status } = province;
  const params = {
    name,
    slugName: customizeSlug ? slugName : makeSlug(name),
    status: status ? ACTIVE : HIDDEN,
  };
  console.log(makeSlug(name));
  if (!id) {
    dispatch(doCreate(params));
  } else {
    dispatch(doUpdate({ ...params, id }));
  }
};

export const getCreateAction = () => (dispatch) => {
  dispatch(createButtonLoading(true));
  dispatch(setOpenModal(true));
  dispatch(createButtonLoading(false));
};

export const doFilters = (filters) => ({ type: UPDATE_FILTERS, filters });

export const getUpdateAction = (provinceId) => async (dispatch) => {
  dispatch(listLoading(true));
  axios
    .get(`${PATH_API}/${provinceId}`, { timeout: 5000 })
    .then((response) => {
      dispatch({
        type: SET_PROVINCE,
        province: response.data,
      });
      dispatch(setOpenModal(true));
    })
    .catch((error) => toast.error(error.response.data.message))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = (province) => async (dispatch) => {
  console.log(province);
  const params = JSON.stringify(province);
  axios
    .post(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(prepareData(response.data));
      toast.success("Province is created successfully!!");
      dispatch(setDefaultProvince());
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    })
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = (province) => async (dispatch) => {
  const params = JSON.stringify(province);
  return axios
    .put(`${PATH_API}/${province.id}`, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      dispatch(prepareData(response.data));
      toast.success("Province is update successfully!!");
      dispatch(setDefaultProvince());
      dispatch(closeModal());
    })
    .catch((error) => toast.error(error.response.data.message))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = (provinceId) => async (dispatch) => {
  dispatch(listLoading(true));
  const params = JSON.stringify(provinceId);
  CONFIRM_DELETE("B???n s??? kh??ng th??? kh??i ph???c l???i d??? li???u").then((result) => {
    if (result.isConfirmed) {
      return !Array.isArray(provinceId)
        ? axios
            .delete(`${PATH_API}/${provinceId}`)
            .then((response) => {
              console.log(response);
              dispatch(prepareData(response.data));
              toast.success(`Delete Province success!!`);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            })
            .finally(() => dispatch(listLoading(false)))
        : axios
            .post(`${PATH_API}/delete-items`, params, {
              timeout: 5000,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              dispatch(prepareData(response.data));
              toast.success(`Delete Provinces success!!`);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            })
            .finally(() => dispatch(listLoading(false)));
    }
  });
};

export const setFilters = (filters) => ({ type: UPDATE_FILTERS, filters });

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
          provinceList: action.provinceList,
          loading: false,
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters,
        };
      case SET_PROVINCE:
        return {
          ...state,
          province: {
            ...action.province,
            status: action.province.status === ACTIVE ? true : false,
            customizeSlug: false,
          },
        };
      case SET_DEFAULT_PROVINCE:
        return {
          ...state,
          province: {
            id: null,
            name: "",
            customizeSlug: false,
            slugName: "",
            status: true,
          },
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
          province: {
            id: null,
            name: "",
            customizeSlug: false,
            slugName: "",
            status: true,
          },
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
