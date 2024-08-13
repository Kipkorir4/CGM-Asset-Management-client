import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import complaintReducer from './reducers/complaintReducer';

const store = configureStore({
  reducer: complaintReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
