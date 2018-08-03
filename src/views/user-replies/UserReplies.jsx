import React, {Component} from 'react'
import {api, util} from "../../assets/js/util"
import {Link} from 'react-router-dom'
import topicsStyle from '../user-topics/UserTopics.less'
import ListItem from '../../components/list-item/ListItem'

class UserReplies extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {}
		}
	}
	componentWillMount () {
		this.getUserInfo()
	}
	async getUserInfo () {
		let {name} = this.props.match.params
		try {
			let data = await util.get(api.userInfo.path + '/' + name)
			this.setState(data)
		} catch (e) {
			alert(e)
		}
	}
	render() {
		let {topics, userHome, title} = topicsStyle
		let {loginname, recent_replies = []} = this.state

		return (
			<div className={topics}>
				<Link to={`/user/${loginname}`} className={userHome}>{loginname}的主页</Link>
				<div className={title}>
					{loginname}参与的话题
				</div>
				<ListItem list={recent_replies}></ListItem>
			</div>
		)
	}
}

export default UserReplies