export const FETCH_COMPLAINTS_REQUEST = 'FETCH_COMPLAINTS_REQUEST';
export const FETCH_COMPLAINTS_SUCCESS = 'FETCH_COMPLAINTS_SUCCESS';
export const FETCH_COMPLAINTS_FAILURE = 'FETCH_COMPLAINTS_FAILURE';

export const ALLOCATE_BUDGET_REQUEST = 'ALLOCATE_BUDGET_REQUEST';
export const ALLOCATE_BUDGET_SUCCESS = 'ALLOCATE_BUDGET_SUCCESS';
export const ALLOCATE_BUDGET_FAILURE = 'ALLOCATE_BUDGET_FAILURE';

export const DECLINE_COMPLAINT_REQUEST = 'DECLINE_COMPLAINT_REQUEST';
export const DECLINE_COMPLAINT_SUCCESS = 'DECLINE_COMPLAINT_SUCCESS';
export const DECLINE_COMPLAINT_FAILURE = 'DECLINE_COMPLAINT_FAILURE';

export const fetchComplaints = () => async dispatch => {
  dispatch({ type: FETCH_COMPLAINTS_REQUEST });
  try {
    const response = await fetch('http://127.0.0.1:5000/accepted-complaints', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    dispatch({ type: FETCH_COMPLAINTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_COMPLAINTS_FAILURE, error });
  }
};

export const allocateBudget = (complaintId, amount) => async dispatch => {
  dispatch({ type: ALLOCATE_BUDGET_REQUEST });
  try {
    const response = await fetch(`http://127.0.0.1:5000/allocate-budget/${complaintId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
      credentials: 'include',
    });
    const data = await response.json();
    dispatch({ type: ALLOCATE_BUDGET_SUCCESS, payload: { complaintId, amount, data } });
  } catch (error) {
    dispatch({ type: ALLOCATE_BUDGET_FAILURE, error });
  }
};

export const declineComplaint = (complaintId) => async dispatch => {
  dispatch({ type: DECLINE_COMPLAINT_REQUEST });
  try {
    const response = await fetch(`http://127.0.0.1:5000/decline-complaint/${complaintId}`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await response.json();
    dispatch({ type: DECLINE_COMPLAINT_SUCCESS, payload: complaintId });
  } catch (error) {
    dispatch({ type: DECLINE_COMPLAINT_FAILURE, error });
  }
};
