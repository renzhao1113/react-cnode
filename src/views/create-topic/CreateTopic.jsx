import React, {Component} from 'react'
import Title from '../../components/title/Title'
import Editor from '../../components/editor/Editor'
import CnButton from '../../components/button/CnButton'
import createTopicStyle from './createTopicStyle.less'
import {util, api} from '../../assets/js/util'

import {connect} from 'react-redux'

class CreateTopic extends Component {
	constructor (props) {
		super(props)
		this.state = {
			loading: false,
			form: {
				title: '',
				tab: 'dev',
				accesstoken: props.token,
				content: ''
			}
		}
	}
	input (e) {
		let {tab, accesstoken, content} = this.state.form
		this.setState({
			form: {tab, accesstoken, content, title: e.target.value.trim()}
		})
	}
	change (mdeState) {
		let {title, tab, accesstoken} = this.state.form
		this.setState({
			form: {title, tab, accesstoken, content: mdeState.markdown}
		})
	}
	async submit () {
		if (this.state.form.title.length < 10) {
			return alert('标题不能少于10个字')
		}
		this.setState({
			loading: true
		})
		try {
			await util.post(api.topics.path, this.state.form)
			this.setState({
				loading: false
			})
			this.props.history.push('/test')
		} catch (e) {
			this.setState({
				loading: false
			})
			alert(e)
		}
	}
	render() {
		let {createTopic, main, bankuai} = createTopicStyle
		return (
			<div className={createTopic}>
				<Title text='发布话题'></Title>
				<div className={main}>
					<p className={bankuai}>板块：客户端测试</p>
					<input onInput={this.input.bind(this)} type="text" placeholder='标题必须10字以上'/>
					<Editor ref='editor' change={this.change.bind(this)}></Editor>
					<CnButton click={this.submit.bind(this)} loading={this.state.loading} style={{marginTop: '20px'}} type='primary' text='提交'></CnButton>
				</div>
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
CreateTopic.propTypes = {}
export default connect(mapStateToProps)(CreateTopic)