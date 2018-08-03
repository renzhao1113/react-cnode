import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {api, util} from '../../assets/js/util'
import userInfoStyle from './userinfo.less'
import ListItem from '../../components/list-item/ListItem'

class UserInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {}
		}
	}
	componentWillMount () {
		this.getUserInfo()
	}
	componentDidUpdate () {
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
		let {userInfo, face, myDetail, github, myLastedTopic, myLastedJoinTopic, title, more} = userInfoStyle
		let {loginname, githubUsername, create_at, recent_replies = [], recent_topics = [], score, avatar_url} = this.state
		return (
			<div className={userInfo}>
				<div className={myDetail}>
					<div className={face}>
						<img src={avatar_url} alt={loginname} />
						<span>{loginname}</span>
					</div>
					<div>{score}积分</div>
					<div className={github}><i className='iconfont icon-github' style={{fontSize: '12px'}}> </i><a href={'https://github.com/' + githubUsername}>@{githubUsername}</a></div>
					<div>注册时间 {util.fromNow(create_at)}</div>
				</div>
				<div className={myLastedTopic}>
					<div className={title}>
						最近创建的话题
					</div>
					<ListItem showPage={false} list={recent_topics.slice(0, 5)}></ListItem>
					{
						recent_topics.length > 5 &&
						<Link to={`/user/${loginname}/topics`} className={more}>查看更多>></Link>
					}
				</div>
				<div className={myLastedJoinTopic}>
					<div className={title}>
						最近参与的话题
					</div>
					<ListItem showPage={false} list={recent_replies.slice(0, 5)}></ListItem>
					{
						recent_replies.length > 5 &&
						<Link to={`/user/${loginname}/replies`} className={more}>查看更多>></Link>
					}
				</div>
			</div>
		)
	}
}

export default UserInfo