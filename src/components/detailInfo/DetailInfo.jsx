import React, {Component} from 'react'
import detailInfoStyle from './detailInfo.less'
import {Link} from 'react-router-dom'
import {util} from '../../assets/js/util'

class DetailInfo extends Component {
	render() {
		let {createDate, author, seeCount, tab} = this.props
		let {detailInfo, dot} = detailInfoStyle
		return (
			<div className={detailInfo}>
				发布于 {util.fromNow(createDate)} <i className={dot}></i>作者 <Link to={`/user/${author}`}>{author}</Link><i className={dot}></i>{seeCount} 次浏览<i className={dot}></i>来自 {tab}
			</div>
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
export default DetailInfo