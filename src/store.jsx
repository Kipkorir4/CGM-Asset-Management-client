import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import complaintReducer from './reducers/complaintReducer';

const store = createStore(complaintReducer, applyMiddleware(thunk));

export default store;
