import {
    FETCH_COMPLAINTS_REQUEST,
    FETCH_COMPLAINTS_SUCCESS,
    FETCH_COMPLAINTS_FAILURE,
    ALLOCATE_BUDGET_SUCCESS,
    DECLINE_COMPLAINT_SUCCESS
  } from '../actions/complaintActions';
  
  const initialState = {
    complaints: [],
    loading: false,
    error: null
  };
  
  const complaintReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COMPLAINTS_REQUEST:
        return { ...state, loading: true };
      case FETCH_COMPLAINTS_SUCCESS:
        return { ...state, loading: false, complaints: action.payload };
      case FETCH_COMPLAINTS_FAILURE:
        return { ...state, loading: false, error: action.error };
      case ALLOCATE_BUDGET_SUCCESS:
        return {
          ...state,
          complaints: state.complaints.map(c =>
            c.id === action.payload.complaintId
              ? { ...c, amountAllocated: action.payload.amount }
              : c
          )
        };
      case DECLINE_COMPLAINT_SUCCESS:
        return {
          ...state,
          complaints: state.complaints.filter(c => c.id !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default complaintReducer;
  