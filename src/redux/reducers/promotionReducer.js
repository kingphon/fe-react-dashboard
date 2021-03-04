import axios from "axios";
import { REDUX_API_URL } from "../../constants/redux-actions";
import { ALL, STOP, UNAVAILABLE, AVAILABLE } from "../../constants/entites";
import {
  handleErrors,
  resetSystemErrors,
  openSystemPopup
} from "./rootReducer";

const prefix = "PROMOTION_";
// API
const PATH_API = `${REDUX_API_URL}/promotion`;
const createAction = action => `${prefix}${action}`;

export const initialState = {
  loading: true,
  createButtonLoading: false,
  formLoading: false,
  modalFormSuccessMessage: "",
  filters: {
    status: ALL
  },
  openModal: false,
  promotionList: [
    {
      promotionId: "001",
      promotionName: "Black Friday",
      percent: 20,
      startDate: new Date(2019, 10, 26),
      endDate: new Date(2019, 11, 30),
      listProductId: [11, 12, 13, 14],
      promotionCodes: [
        {
          code: "ENGND3PWQD",
          percent: 20,
          quantity: 55
        },
        {
          code: "ALOA551V97",
          percent: 25,
          quantity: 40
        },
        {
          code: "A0JSAYVNJ5",
          percent: 15,
          quantity: 66
        }
      ],
      promotionStatus: true,
      status: "STOP"
    },
    {
      promotionId: "002",
      promotionName: "Xmas",
      startDate: new Date(2019, 11, 5),
      endDate: new Date(2019, 11, 31),
      percent: 35,
      listProductId: [
        1,
        2,
        3,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ],
      promotionCodes: [
        {
          code: "JOG0ZYHS34",
          percent: 40,
          quantity: 10
        },
        {
          code: "TNHQO0R6NF",
          percent: 60,
          quantity: 5
        },
        {
          code: "3RIN3XRENS",
          percent: 20,
          quantity: 50
        }
      ],
      promotionStatus: true,
      status: "AVAILABLE"
    },
    {
      promotionId: "003",
      promotionName: "New Year",
      startDate: new Date(2020, 0, 1),
      endDate: new Date(2020, 0, 12),
      percent: 20,
      listProductId: [1, 2, 3, 4, 5, 5, 5, 5],
      promotionCodes: [
        {
          code: "S9962TS3GS",
          percent: 55,
          quantity: 55
        },
        {
          code: "N9CUUQGU5",
          percent: 42,
          quantity: 40
        },
        {
          code: "1CQ7XZQKRR",
          percent: 10,
          quantity: 100
        }
      ],
      promotionStatus: true,
      status: "UNAVAILABLE"
    }
  ],
  modalStatus: {
    codeStatus: false,
    applyStatus: ALL
  },
  promotion: {
    // status: ALL
  },
  productList: [
    { productId: 100, productName: "Samsung" },
    { productId: 101, productName: "Apple" },
    { productId: 102, productName: "Oppo" },
    { productId: 103, productName: "Viettel" },
    { productId: 104, productName: "Off White" },
    { productId: 105, productName: "Gucci" }
  ],
  productFilter: {
    categories: [
      { categoryId: 1001, categoryName: "Water" },
      { categoryId: 1002, categoryName: "Food" },
      { categoryId: 1003, categoryName: "Clothes" },
      { categoryId: 1004, categoryName: "Accessories" },
      { categoryId: 1005, categoryName: "Technologies" }
    ],
    groupTypes: [],
    types: []
  },
  selectedFilters: {
    categoriy: "",
    groupType: "",
    type: ""
  },
  errors: {
    formErrors: {},
    errorMessage: ""
  }
};

const LIST_LOADING = createAction("LIST_LOADING");
const OPEN_MODAL = createAction("OPEN_MODAL");
const CREATE_BUTTON_LOADING = createAction("CREATE_BUTTON_LOADING");
const RELOAD = createAction("RELOAD");
const PREPARE_DATA = createAction("PREPARE_DATA");
const UPDATE_FILTERS = createAction("UPDATE_FILTERS");
const MODAL_FORM_LOADING = createAction("MODAL_FORM_LOADING");
const MODAL_FORM_GET_CREATE_ACTION = createAction(
  "MODAL_FORM_GET_CREATE_ACTION"
);
const MODAL_FORM_UPDATE_SUCCESS = createAction("MODAL_FORM_UPDATE_SUCESS");
const SET_PROMOTION = createAction("SET_PROMOTION");
const SET_MODAL_STATUS = createAction("SET_MODAL_STATUS");
const SET_SELECTED_FILTER = createAction("SET_SELECTED_FILTER");
const CLOSE_MODAL = createAction("CLOSE_MODAL");
const SET_UPDATE_PROMOTION_MODAL = createAction("SET_UPDATE_PROMOTION_MODAL");
const HANDLE_ERRORS = createAction("HANDLE_ERRORS");
const SET_ERRORS = createAction("SET_ERRORS");

const listLoading = loading => ({ type: LIST_LOADING, loading });
const createButtonLoading = loading => ({
  type: CREATE_BUTTON_LOADING,
  loading
});
const formLoading = loading => ({ type: MODAL_FORM_LOADING, loading });
const prepareData = data => ({
  type: PREPARE_DATA,
  promotionList: data
});
const setOpenModal = openModal => ({ type: OPEN_MODAL, openModal });
const setErrors = errors => ({ type: SET_ERRORS, errors });
const modalFormSuccessMessage = message => ({
  type: MODAL_FORM_UPDATE_SUCCESS,
  message
});

export const setPromotion = promotion => ({ type: SET_PROMOTION, promotion });

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

export const doSave = promotion => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(formLoading(true));
  const {
    promotionId,
    firstName,
    middleName,
    lastName,
    email,
    phone,
    promotionGroup,
    status
  } = promotion;
  const promotionGroupId = promotionGroup.promotionGroupId;
  const params = {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    promotionGroupId,
    status
  };
  if (!promotionId) {
    dispatch(doCreate(params));
  } else {
    dispatch(doUpdate({ ...params, promotionId }));
  }
};
export const getCreateAction = () => dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(createButtonLoading(true));
  return axios
    .get(`${PATH_API}/create`, { timeout: 5000 })
    .then(({ data: { promotionGroupList = [], provinceList = [] } }) => {
      dispatch({
        type: MODAL_FORM_GET_CREATE_ACTION,
        promotionGroupList,
        provinceList
      });
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(createButtonLoading(false)));
};

export const doFilters = filters => ({ type: UPDATE_FILTERS, filters });

export const getUpdateAction = promotionId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(modalFormSuccessMessage(""));
  dispatch(listLoading(true));
  axios
    .get(`${PATH_API}/update/${promotionId}`, { timeout: 5000 })
    .then(response => {
      dispatch({
        type: SET_UPDATE_PROMOTION_MODAL,
        promotion: response.data.promotion,
        promotionGroupList: response.data.promotionGroupList
      });
      dispatch(setOpenModal(true));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

const doCreate = promotion => async dispatch => {
  const params = JSON.stringify(promotion);
  axios
    .post(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(modalFormSuccessMessage("Promotion is created successfully!!"));
      dispatch(setPromotion(initialState.promotion));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

const doUpdate = promotion => async dispatch => {
  const params = JSON.stringify(promotion);
  return axios
    .patch(PATH_API, params, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(modalFormSuccessMessage("Promotion is update successfully!!"));
    })
    .catch(error => dispatch(handleErrors(error, HANDLE_ERRORS)))
    .finally(() => dispatch(formLoading(false)));
};

export const doDelete = promotionId => async dispatch => {
  dispatch(resetSystemErrors());
  dispatch(listLoading(true));
  dispatch(setErrors(initialState.errors));
  return axios
    .delete(`${PATH_API}/${promotionId}`)
    .then(response => {
      dispatch(prepareData(response.data));
      dispatch(
        openSystemPopup(true, `Delete Promotion #${promotionId} success!!`)
      );
    })
    .catch(errors => dispatch(handleErrors(errors, HANDLE_ERRORS)))
    .finally(() => dispatch(listLoading(false)));
};

export const setFilters = filters => ({ type: UPDATE_FILTERS, filters });

export default function(state = initialState, action) {
  // console.log(action.type)
  try {
    switch (action.type) {
      case LIST_LOADING:
        return { ...state, loading: action.loading };
      case CREATE_BUTTON_LOADING:
        return { ...state, createButtonLoading: action.loading };
      case RELOAD:
        return { ...state, reload: true };
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
          promotionList: action.promotionList,
          loading: false
        };
      case UPDATE_FILTERS:
        return {
          ...state,
          filters: action.filters
        };
      case MODAL_FORM_GET_CREATE_ACTION:
        return {
          ...state,
          promotion: initialState.promotion,
          promotionGroupList: action.promotionGroupList,
          openModal: true,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_PROMOTION:
        console.log(action);
        return {
          ...state,
          promotion: action.promotion,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_MODAL_STATUS:
        return {
          ...state,
          modalStatus: action.modalStatus,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_SELECTED_FILTER:
        return {
          ...state,
          selectedFilters: action.selectedFilters,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case SET_UPDATE_PROMOTION_MODAL:
        return {
          ...state,
          promotion: {
            ...action.promotion,
            promotionGroup: action.promotionGroupList.find(
              item =>
                item.promotionGroupId === action.promotion.promotionGroupId
            )
          },
          promotionGroupList: action.promotionGroupList,
          modalFormSuccessMessage: initialState.modalFormSuccessMessage
        };
      case CLOSE_MODAL:
        return {
          ...state,
          openModal: false,
          listLoading: false,
          promotion: initialState.promotion,
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
