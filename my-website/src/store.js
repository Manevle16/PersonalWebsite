import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const initialState = {};

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,

  initialState,
  composeEnhancers(applyMiddleware(...middleware, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
