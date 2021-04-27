import axios from "axios";
import { toast } from "react-toastify";

import { CONFIRM_DELETE } from "../../../commons/sweet-alert-modal";
import { ACTIVE, ALL, HIDDEN } from '../../../constants/entities';
import { REDUX_API_URL } from "../../../constants/redux-actions";
import { makeSlug } from "../../../commons/utils";

const prefix = "TYPE_GROUP_";
// API
const PATH_API = `${REDUX_API_URL}/type-groups`;
const createAction = action => `${prefix}${action}`;

const defaultValues = {
  id: null,
  name: "",
  customizeSlug: false,
  slugName: "",
  status: true,
  categoryId: ""
}

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  openModal: false,
  filters: {
    status: ALL
  },
  typeGroupList: [
  ],
  typeGroup: defaultValues,
  categoryList: [],
  searchKeywords: "",
};

const LIST_LOADING = createAction("LIST_LOADING");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const PREPARE_DATA = createAction("PREPARE_DATA");
const PREPARE_DATA_CATEGORY = createAction("PREPARE_DATA_CATEGORY");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const SET_TYPE_GROUP = createAction("SET_TYPE_GROUP");
const SET_DEFAULT_TYPE_GROUP = createAction("SET_DEFAULT_TYPE_GROUP");
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
  typeGroupList: data
});
const prepareDataCategory = data => ({
  type: PREPARE_DATA_CATEGORY,
  categoryList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });

export const setTypeGroup = typeGroup => ({ type: SET_TYPE_GROUP, typeGroup });

export const setDefaultTypeGroup = typeGroup => ({ type: SET_DEFAULT_TYPE_GROUP, typeGroup });

export const setSearchKeywords = searchKeywords => ({ type: SET_SEARCH_KEYWORDS, searchKeywords });

export const closeModal = () => ({ type: CLOSE_MODAL });
export const fetchAllCategory = () => async dispatch => {

  return axios
    .get(`${REDUX_API_URL}/categories-creation`, { timeout: 5000 })
    .then(response => dispatch(prepareDataCategory(response.data)))
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

export const doSave = typeGroup => async dispatch => {
  dispatch(formLoading(true));
  const {
    id,
    name,
    slugName,
    categoryId,
    customizeSlug,
    status
  } = typeGroup;
  const params = {
    name,
    slugName: customizeSlug ? slugName : makeSlug(name),
    categoryId: categoryId.value,
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

export const getUpdateAction = typeGroupId => async dispatch => {
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
    .catch(error => toast.error(error))
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
      toast.error(error)
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
    .catch(error => toast.error(error))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = typeGroupId => async dispatch => {
  dispatch(listLoading(true));
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
            toast.success(`Delete TypeGroup #${typeGroupId} success!!`)
          })
          .catch(error => {
            toast.error("error")
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
          errors: action.loading ? initialState.errors : state.errors
        };
      case PREPARE_DATA:
        return {
          ...state,
          typeGroupList: action.typeGroupList,
          loading: false
        };
      case PREPARE_DATA_CATEGORY:
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
      default:
        return { ...state };
    }
  } catch (error) {
    console.log(error);
  } finally {
  }

  return state;
}
