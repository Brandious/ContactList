import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [ thunk, sagaMiddleware ];
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga);

export default store;