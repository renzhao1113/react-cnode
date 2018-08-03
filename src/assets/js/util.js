import axios from 'axios'
import api from '../../api-urls'
import momnet from 'moment/min/moment-with-locales'
momnet.locale('zh-cn')
const util = {
	post (api, options) {
		return new Promise((resolve, reject) => {
			if (options) {
				axios.post(api, options)
					.then(res => {
						if (res.success) {
							resolve(res.data)
						} else {
							reject(new Error(res.error_msg))
						}
					})
					.catch(e => {
						reject(e)
					})
			} else {
				axios.post(api)
					.then(res => {
						if (res.success) {
							resolve(res.data)
						} else {
							reject(new Error(res.error_msg))
						}
					})
					.catch(e => {
						reject(e)
					})
			}
		})
	},
	get (api) {
		return new Promise((resolve, reject) => {
			axios.get(api)
				.then(res => {
					if (res.success) {
						resolve(res.data)
					} else {
						reject(new Error('请求失败'))
					}
				})
				.catch(e => {
					reject(e)
				})
		})
	},
	fromNow (time) {
		return momnet(time).fromNow();
	},
	addCss (href) {
		let link = document.createElement('link')
		link.href = href
		link.rel = 'stylesheet'
		document.head.appendChild(link)
	}
}
export {
	util,
	api
}