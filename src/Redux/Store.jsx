import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import RootReducer from "./Reducers/RootReducer";
import rootSaga from "./Sagas/RootSaga";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};


const persistedReducer = persistReducer(rootPersistConfig, RootReducer);


// export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const composeEnhancers = (process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);