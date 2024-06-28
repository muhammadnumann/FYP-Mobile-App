import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./AuthReducer";
import ClientReducer from "./client/ClientReducer";
import NotificationReducer from "./notifications/NotificationReducer";

const RootReducers = combineReducers({
  // reducers
  AuthReducer,
  ClientReducer,
  NotificationReducer,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));
