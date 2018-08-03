import React, {Component} from 'react'
import MessageStyle from './message.less'
import Title from '../../components/title/Title'
import {api, util} from '../../assets/js/util'
import Qs from 'qs'

import {connect} from 'react-redux'

class Message extends Component {
	async componentWillMount () {
		let params = Qs.stringify({accesstoken: this.props.token, mdrender: 'true'})
		try {
			await util.get(api.messages.path + '?' + params)
		} catch (e) {
			alert(e)
		}
	}
	render() {
		let {message, msgBox} = MessageStyle
		return (
			<div className={message}>
				<Title text='新消息'></Title>
				<ul className={msgBox}>

				</ul>
				<Title text='过往消息'></Title>
				<ul className={msgBox}>

				</ul>
			</div>
		)
	}
}

// 将store中的值添加到this.props中
// 返回一个对象，对象的属性即是props的属性
const mapStateToProps = (state, ownProps) => (
	{
		token: state.token
	}
)
// 根据组件中的操作触发action
// ownProps是组件对象的props属性
// const mapDispatchToProps = (dispatch, ownProps) => (
//	{

//	}
// )
Message.propTypes = {}
export default connect(mapStateToProps)(Message)