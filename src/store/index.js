import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import favouritesReducer from "./reducers/favourites";
import jobsReducer from "./reducers/jobs";
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt';
 
export const initialState = {
  favourites: {
    elements: [],
  },
  jobs: {
    elements: [],
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mainReducer = combineReducers({
  favourites: favouritesReducer,
  jobs: jobsReducer,
});


const persistConfig = {
  key:'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SUPER_SECRET_KEY,
      onError: function (error) {
        console.log(error)
      },
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, mainReducer);

const configureStore =  createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(configureStore);

export {configureStore, persistor }
