import rootReducer from '../reducers'
import {createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware} from "redux"
const middleWare=[thunk]
//applymiddle allow async actions
const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleWare))
    )
export default store