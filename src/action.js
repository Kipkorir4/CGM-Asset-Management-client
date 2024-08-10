export const LOGIN = 'LOGIN';
export const ALLOCATE_BUDGET = 'ALLOCATE_BUDGET';

export const login = (username) => ({
  type: LOGIN,
  payload: username,
});

export const allocateBudget = (complaintNumber, amount) => ({
  type: ALLOCATE_BUDGET,
  payload: { complaintNumber, amount },
});