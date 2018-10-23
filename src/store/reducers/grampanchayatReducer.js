import * as actionTypes from "../actions/actionTypes";

const initialState = {
  grampanchayatsList: [],
  grampanchayats: [],
  grampanchayatMasterError: null
};

const grampanchayatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GRAMPANCHAYAT_LIST:
      return {
        ...state,
        grampanchayatsList: action.grampanchayatsList,
        grampanchayats: action.grampanchayats,
        grampanchayatMasterError: null,
      };
    case actionTypes.LOG_GRAMPANCHAYAT_ERROR:
      return {
        ...state,
        grampanchayatMasterError : action.error
      };
    default:
      return state;
  }
};
export default grampanchayatReducer;
