import { combineReducers } from '@reduxjs/toolkit';
import { LOGIN, ALLOCATE_BUDGET } from './action';


const initialState = {
  username: '',
  complaints: [
    { complaintNumber: 1, category: 'Category A', budgetBalance: 1000, amountAllocated: 0 },
    { complaintNumber: 2, category: 'Category B', budgetBalance: 2000, amountAllocated: 0 },
    // Add more initial complaints if needed
  ],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload,
      };
    case ALLOCATE_BUDGET:
      return {
        ...state,
        complaints: state.complaints.map((complaint) =>
          complaint.complaintNumber === action.payload.complaintNumber
            ? { ...complaint, amountAllocated: action.payload.amount }
            : complaint
        ),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;