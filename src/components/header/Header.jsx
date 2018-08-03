import React, {Component} from 'react'
import head from './header.less'
import CnButton from '../button/CnButton'
import {Link} from 'react-router-dom'
import {api, util} from '../../assets/js/util'
import {connect} from 'react-redux'
import Qs from 'qs'

class Header extends Component {
	constructor (props) {
		super(props)
		this.state = {
			count: 0
		}
	}
	async componentWillMount () {
		let params = Qs.stringify({accesstoken: this.props.token})
		try {
			let data = await util.get(api.count.path + '?' + params)
			this.setState({
				count: data.data
			})
		} catch (e) {
			alert(e)
		}
	}
	render () {
		let {header, noReadCount} = head
		return (
			<header>
					<div className={'container ' + header}>
						<Link to='/'>
							<h1>cnodejs</h1>
						</Link>
						<div style={{float: 'right', height: '40px', lineHeight: '40px'}}>
							<Link to='/my/messages' style={{marginRight: '20px'}}>
								<span style={{color: '#fff', position: 'relative'}}>
									{this.state.count > 0 && <i className={noReadCount}>{this.state.count}</i>}
									未读消息
								</span>
							</Link>
							<Link to='/topic/create'>
								<CnButton size='small' type='success' text='发布话题'></CnButton>
							</Link>
						</div>
					</div>
			</header>
		)
	}
}
const mapStateToProps = (state) => (
	{
		token: state.token
	}
)


export default connect(mapStateToProps)(Header)