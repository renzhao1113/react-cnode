import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Qs from 'qs'
import App from './App';
// import {util} from "./assets/js/util";
axios.defaults.timeout = 1000 // 设置请求超时时间
axios.defaults.headers = {'Content-type': 'application/x-www-form-urlencoded'}
axios.defaults.transformRequest = function (data) {
	return Qs.stringify(data)
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	config.url = 'https://cnodejs.org/api/v1' + config.url
	return config
}, function (error) {
	return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	return response.data
}, function (error) {
	if (error.message.includes('timeout')) {
		error.message = '请求超时'
	}
	return Promise.reject(error.message)
})
ReactDOM.render(
	<App />,
	document.getElementById('root'))
