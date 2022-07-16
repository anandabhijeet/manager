import { applyMiddleware,  createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducer from "./Reducers/RootReducer";

const composeEnhancer =  composeWithDevTools(
    applyMiddleware(thunk)
)
const store = createStore(RootReducer, composeEnhancer );

export default store;