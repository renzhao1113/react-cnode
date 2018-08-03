import React, {Component} from 'react'
import { NavLink } from "react-router-dom";

import navbarStyle from './navbar.less'

class NavBar extends Component {
	render() {
		let {navbar} = navbarStyle
		return (
			<ul className={navbar}>
				<li>
					<NavLink exact to="/">全部</NavLink>
				</li>
				<li>
					<NavLink to="/good">精华</NavLink>
				</li>
				<li>
					<NavLink to="/share">分享</NavLink>
				</li>
				<li>
					<NavLink to="/asking">问答</NavLink>
				</li>
				<li>
					<NavLink to="/invite">招聘</NavLink>
				</li>
				<li>
					<NavLink to="/test">测试</NavLink>
				</li>
			</ul>
		)
	}
}

// 将store中的值添加到this.props中
// 返回一个对象，对象的属性即是props的属性
// const mapStateToProps = (state, ownProps) => (
// 	{

//	}
// )
// 根据组件中的操作触发action
// ownProps是组件对象的props属性
// const mapDispatchToProps = (dispatch, ownProps) => (
//	{

//	}
// )
export default NavBar