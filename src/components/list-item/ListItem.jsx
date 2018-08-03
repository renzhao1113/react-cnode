import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './listItem.less'
import itemStyle from './listItem.less'
import PropTypes from 'prop-types'
import {util} from '../../assets/js/util'
import Paging from '../../components/paging/Paging'

class ListItem extends Component {
	constructor (props) {
		super(props)
		this.state = {
			page: props.page || 1
		}
	}
	change (page) {
		this.props.change(page)
	}
	render() {
		let {list, showPage = true} = this.props
		let {page} = this.state
		let {listItem, item, type, top, good, ask , share, itemLeft, replayCount, clickCount, count, titleBox, title, relativeTime} = itemStyle
		return (
			<div style={{backgroundColor: '#fff', padding: '10px'}}>
				<ul className={listItem}>
					{
						list.map((i, index) => {
							let tip = null
							if (i.top) {
								tip = <span className={type + ' ' + top}>置顶</span>
							} else if (i.good) {
								tip = <span className={type + ' ' + good}>精华</span>
							} else if (i.tab === 'ask') {
								tip = <span className={type + ' ' + ask}>问答</span>
							} else if (i.tab === 'share') {
								tip = <span className={type + ' ' + share}>分享</span>
							} else {
								tip = ''
							}
							return (
								<li className={item} key={i.id}>
									<div className={itemLeft}>
										<Link to={'/user/' + i.author.loginname}>
											<img src={i.author.avatar_url} alt={i.author.XadillaX}/>
										</Link>
										{
											i.reply_count !== undefined &&
											<div className={count}>
												<span className={replayCount}>{i.reply_count}/</span>
												<span className={clickCount}>{i.visit_count}</span>
											</div>
										}
										<Link to={'/detail/' + i.id}>
											<div className={titleBox}>
												{tip}
												<p className={title}>{i.title}</p>
											</div>
										</Link>
									</div>
									<span className={relativeTime}>{util.fromNow(i.last_reply_at)}</span>
								</li>
							)
						})
					}
				</ul>
				{showPage && <Paging change={this.change.bind(this)} page={page}></Paging>}
			</div>
		)
	}
}

ListItem.propTypes = {
	list: PropTypes.array.isRequired,
	change: PropTypes.func,
	showPage: PropTypes.bool
}
export default ListItem