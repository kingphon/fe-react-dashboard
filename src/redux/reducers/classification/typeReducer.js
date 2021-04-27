import axios from "axios";
import { toast } from "react-toastify";

import { CONFIRM_DELETE } from "../../../commons/sweet-alert-modal";
import { ACTIVE, ALL, HIDDEN } from '../../../constants/entities';
import { REDUX_API_URL } from "../../../constants/redux-actions";
import { makeSlug } from "../../../commons/utils";

const prefix = "TYPE_";
// API
const PATH_API = `${REDUX_API_URL}/types`;
const createAction = action => `${prefix}${action}`;

const defaultValues = {
  id: null,
  name: "",
  customizeSlug: false,
  slugName: "",
  status: true,
  categoryId: "",
  typeGroupId: ""
}

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  openModal: false,
  filters: {
    status: ALL
  },
  typeList: [
  ],
  type: defaultValues,
  categoryList: [],
  typeGroupList: [],
  searchKeywords: "",
};

const LIST_LOADING = createAction("LIST_LOADING");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const PREPARE_DATA = createAction("PREPARE_DATA");
const PREPARE_DATA_CATEGORY = createAction("PREPARE_DATA_CATEGORY");
const PREPARE_DATA_TYPE_GROUP = createAction("PREPARE_DATA_TYPE_GROUP");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const SET_TYPE = createAction("SET_TYPE");
const SET_DEFAULT_TYPE = createAction("SET_DEFAULT_TYPE");
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
  typeList: data
});
const prepareDataCategory = data => ({
  type: PREPARE_DATA_CATEGORY,
  categoryList: data
});

export const prepareDataTypeGroup = data => ({
  type: PREPARE_DATA_TYPE_GROUP,
  typeGroupList: data
});

const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });

export const setType = type => ({ type: SET_TYPE, type });

export const setDefaultType = type => ({ type: SET_DEFAULT_TYPE, type });

export const setSearchKeywords = searchKeywords => ({ type: SET_SEARCH_KEYWORDS, searchKeywords });

export const closeModal = () => ({ type: CLOSE_MODAL });
export const fetchAllCategory = () => async dispatch => {
  return axios
    .get(`${REDUX_API_URL}/categories-creation`, { timeout: 5000 })
    .then(response => dispatch(prepareDataCategory(response.data)))
    .catch(error => toast.error(error))
};

export const fetchAllTypeGroup = (categoryId) => async dispatch => {
  return axios
    .get(`${REDUX_API_URL}/typeGroups-creation/${categoryId}`, { timeout: 5000 })
    .then(response => dispatch(prepareDataTypeGroup(response.data)))
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

export const doSave = type => async dispatch => {
  dispatch(formLoading(true));
  console.log(type)
  const {
    id,
    name,
    slugName,
    typeGroupId,
    customizeSlug,
    status
  } = type;
  const params = {
    name,
    slugName: customizeSlug ? slugName : makeSlug(name),
    typeGroupId: typeGroupId.value,
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
  dispatch(fetchAllCategory());
  dispatch(createButtonLoading(false));
};

export const doFilters = filters => ({ type: UPDATE_FILTERS, filters });

export const getUpdateAction = typeId => async dispatch => {
  dispatch(listLoading(true));
  dispatch(fetchAllCategory());
  axios
    .get(`${PATH_API}/${typeId}`, { timeout: 5000 })
    .then(response => {
      dispatch({
        type: SET_TYPE,
        type: response.data,
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => toast.error(error))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = type => async dispatch => {
  const params = JSON.stringify(type);
  axios
    .post(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("Type is created successfully!!")
      dispatch(setType(initialState.type));
    })
    .catch(error => {
      toast.error("error")
      toast.error(error)
    })
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = type => async dispatch => {
  const params = JSON.stringify(type);
  return axios
    .put(`${PATH_API}/${type.id}`, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("Type is update successfully!!");
      dispatch(closeModal())
    })
    .catch(error => toast.error(error))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = typeId => async dispatch => {
  dispatch(listLoading(true));
  const params = JSON.stringify(typeId);
  CONFIRM_DELETE("Bạn sẽ không thể khôi phục lại dữ liệu").then((result) => {
    if (result.isConfirmed) {
      return !Array.isArray(typeId) ?
        axios
          .delete(`${PATH_API}/${typeId}`)
          .then(response => {
            dispatch(prepareData(response.data));
            toast.success(`Delete Type #${typeId} success!!`);
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
            toast.success(`Delete Type #${typeId} success!!`)
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
          typeList: action.typeList,
          loading: false
        };
      case PREPARE_DATA_CATEGORY:
        return {
          ...state,
          categoryList: action.categoryList,
        };
      case PREPARE_DATA_TYPE_GROUP:
        return {
          ...state,
          typeGroupList: action.typeGroupList,
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      case SET_TYPE:
        return {
          ...state,
          type: {
            ...action.type,
            status: action.type.status === ACTIVE ? true : false,
            customizeSlug: false,
            categoryId: state.categoryList.find(option => option.value === action.type.categoryId),
            typeGroupId: state.typeGroupList.find(option => option.value === action.type.typeGroupId)
          },
        };
      case SET_DEFAULT_TYPE:
        return {
          ...state,
          type: action.type,
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
          type: defaultValues,
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
