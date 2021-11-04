import axios from "axios";
import { toast } from "react-toastify";

import { CONFIRM_DELETE } from "../../../commons/sweet-alert-modal";
import { ALL, ACTIVE, HIDDEN } from '../../../constants/entities';
import { REDUX_API_URL } from "../../../constants/redux-actions";
import { makeSlug } from "../../../commons/utils";

const prefix = "CATEGORY_";
// API
const PATH_API = `${REDUX_API_URL}/classification/categories`;
const createAction = action => `${prefix}${action}`;

const defaultValues = {
  id: null,
  name: "",
  customizeSlug: false,
  slugName: "",
  status: true
}

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  openModal: false,
  filters: {
    status: ALL
  },
  categoryList: [
  ],
  category: defaultValues,
  searchKeywords: "",
};

const LIST_LOADING = createAction("LIST_LOADING");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const PREPARE_DATA = createAction("PREPARE_DATA");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const SET_CATEGORY = createAction("SET_CATEGORY");
const SET_DEFAULT_CATEGORY = createAction("SET_DEFAULT_CATEGORY");
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
  categoryList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });

export const setCategory = category => ({ type: SET_CATEGORY, category });

export const setDefaultCategory = category => ({ type: SET_DEFAULT_CATEGORY, category });

export const setSearchKeywords = searchKeywords => ({ type: SET_SEARCH_KEYWORDS, searchKeywords });

export const closeModal = () => ({ type: CLOSE_MODAL });

export const fetchAll = () => async dispatch => {
  dispatch(listLoading(true));
  return axios
    .get(PATH_API, { timeout: 5000 })
    .then(response => dispatch(prepareData(response.data)))
    .catch(error => toast.error(error))
    .finally(() => dispatch(listLoading(false)));
};

export const doSave = category => async dispatch => {
  dispatch(formLoading(true));
  const {
    id,
    name,
    slugName,
    customizeSlug,
    status
  } = category;
  const params = {
    name,
    slugName: customizeSlug ? slugName : makeSlug(name),
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
  dispatch(setOpenModal(true))
  dispatch(createButtonLoading(false));
};

export const doFilters = filters => ({ type: UPDATE_FILTERS, filters });

export const getUpdateAction = categoryId => async dispatch => {
  dispatch(listLoading(true));
  axios
    .get(`${PATH_API}/${categoryId}`, { timeout: 5000 })
    .then(response => {
      dispatch({
        type: SET_CATEGORY,
        category: response.data,
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => toast.error(error))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = category => async dispatch => {
  const params = JSON.stringify(category);
  axios
    .post(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("Category is created successfully!!")
      dispatch(setDefaultCategory(initialState.category));
    })
    .catch(error => {
      toast.error(error)
    })
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = category => async dispatch => {
  const params = JSON.stringify(category);
  return axios
    .put(`${PATH_API}/${category.id}`, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      toast.success("Category is update successfully!!");
      dispatch(closeModal())
    })
    .catch(error => toast.error(error))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = categoryId => async dispatch => {
  dispatch(listLoading(true));
  const params = JSON.stringify(categoryId);
  CONFIRM_DELETE("Bạn sẽ không thể khôi phục lại dữ liệu").then((result) => {
    if (result.isConfirmed) {
      return !Array.isArray(categoryId) ?
        axios
          .delete(`${PATH_API}/${categoryId}`)
          .then(response => {
            dispatch(prepareData(response.data));
            toast.success(`Delete Category #${categoryId} success!!`);
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
            toast.success(`Delete Category #${categoryId} success!!`)
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
          categoryList: action.categoryList,
          loading: false
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      case SET_CATEGORY:
        return {
          ...state,
          category: {
            ...action.category,
            status: action.category.status === ACTIVE ? true : false,
            customizeSlug: false,
          },
        };
      case SET_DEFAULT_CATEGORY:
        return {
          ...state,
          category: action.category,
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
          category: defaultValues,
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
