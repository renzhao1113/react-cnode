import { createStore } from "redux";
import { combineReducers } from 'redux';
import * as actions from './actions'
import * as reducers from './reducers'

const reducer = combineReducers(reducers)
const store = createStore(reducer)


store.subscribe(function () {
	console.log(store.getState())
})
// 给state设置初始值
store.dispatch(actions['SetToken']('a503c52d-76a9-4fc4-a51b-f9cbf8e2c70f'))

export default store