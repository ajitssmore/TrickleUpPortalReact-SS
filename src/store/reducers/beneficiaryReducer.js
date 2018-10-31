import * as actionTypes from "../actions/actionTypes";

const initialState = {
  beneficiaryList: [],
  beneficiaryError: null,
  currentBeneficiary: null,
  bulkUploadHistory: [],
  bulkUserData : [],
  bulkUserError : false
};

const beneficiaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BENEFICIARY_LIST:
      return {
        ...state,
        beneficiaryList: action.beneficiaryList,
        beneficiaryError: null
      };
    case actionTypes.LOG_BENEFICIARY_ERROR:
      return {
        ...state,
        beneficiaryError: action.error
      };
    case actionTypes.STORE_CURRENT_BENEFICIARY:
      return {
        ...state,
        currentBeneficiary: action.currentBeneficiary
      };
    case actionTypes.STORE_BULK_UPLOAD_HISTORY:
      return {
        ...state,
        bulkUploadHistory: action.bulkUploadHistory
      };
      case actionTypes.CLEAR_BENEFICIARY_ERROR:
      return {
        ...state,
        beneficiaryError: null
      };
      case actionTypes.VALIDATE_BULKDATA_SUCCESS:
      return {
        ...state,
        bulkUserError : false
      };
       case actionTypes.VALIDATE_BULKDATA_ERROR:
      return {
        ...state,
        bulkUserData: action.bulkUserData,
        bulkUserError : true
      };
    default:
      return state;
  }
};
export default beneficiaryReducer;
