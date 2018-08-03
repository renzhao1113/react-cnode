import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import detailStyle from './detail.less'
import {api, util} from '../../assets/js/util'
import DetailInfo from '../../components/detailInfo/DetailInfo'
import Qs from 'qs'
import Title from '../../components/title/Title'
import Editor from '../../components/editor/Editor'
import CnButton from '../../components/button/CnButton'

class Detail extends Component {
	constructor (props) {
		super(props)
		this.state = {
			detail: null,
			replyText: '',
			replyBoxIndex: [],
			btnLoading: false,
			showCommentBox: true
		}
	}
	componentWillMount () {
		this.getDetai()
	}
	async getDetai () {
		let options = Qs.stringify({
			mdrender: true,
			accesstoken: this.props.token
		})
		try {
			let data = await util.get(api.topic.path + '/' + this.props.match.params.id + '?' + options)
			this.setState({
				detail: data
			})
		} catch (e) {
			alert(e)
		}
	}
	async ups (id) {
		try {
		   await util.post('/reply/' + id + '/ups', {accesstoken: this.props.token})
			 this.getDetai()
		} catch (e) {
			alert(e)
		}
	}
	reply (name, index) {
		// let name = '@' + name + ' '
		this.setState({
			replyText: '@' + name + ' '
		})
		let replyBoxIndex = this.state.replyBoxIndex
		if (replyBoxIndex.includes(index)) {
			replyBoxIndex.splice(replyBoxIndex.indexOf(index), 1)
		} else {
			replyBoxIndex.push(index)
		}
		this.setState({
			replyBoxIndex: replyBoxIndex
		})
	}
	async replyBtn (topicId, name, id, index) {
		let text = this.refs['editor_' + id].getValue()
		this.setState({
			btnLoading: true
		})
		try {
			await util.post(`/topic/${topicId}/replies`, {
				content: text,
				accesstoken: this.props.token,
				reply_id: id
			})
			this.setState({
				btnLoading: false,
				replyBoxIndex: []
			})
			this.getDetai()
		} catch (e) {
			this.setState({
				btnLoading: false
			})
			alert(e)
		}
	}
	async comment (id) {
		let value = this.refs.editor.getValue()
		if (!value.trim()) {
			return alert('请输入内容')
		}
		try {
			this.setState({
				btnLoading: true
			})
			await util.post(`/topic/${id}/replies`, {
				content: value,
				accesstoken: this.props.token
			})
			this.setState({
				btnLoading: false
			})
			this.getDetai()
			this.clear()
		} catch (e) {
			this.setState({
				btnLoading: false
			})
			alert(e)
		}
	}
	clear () {
		this.setState({
			showCommentBox: false
		}, () => {
			this.setState({
				showCommentBox: true
			})
		})
	}
	async collect (id, is_collect) {
		try {
			let url = is_collect ? api.deCollect.path : api.collect.path
			await util.post(url, {
				accesstoken: this.props.token,
				topic_id: id
			})
			this.getDetai()
		} catch (e) {
			alert(e)
		}
	}
	render () {
		let {detail, type, istop, isgood, isask, isshare, detailContent, reply, replyList,
			listLeft, listRight, rightHeader, upsOrReply, isUped, addReply, collectBtn} = detailStyle
		let {btnLoading} = this.state
		if (!this.state.detail) return <div className={detail + ' container'}></div>
		let {title = '', content = <div></div>, good, tab, top, create_at, author, visit_count, reply_count, replies, id, is_collect} = this.state.detail
		let tip = null
		if (top) {
			tip = <span className={type + ' ' + istop}>置顶</span>
		} else if (good) {
			tip = <span className={type + ' ' + isgood}>精华</span>
		} else if (tab === 'ask') {
			tip = <span className={type + ' ' + isask}>问答</span>
		} else if (tab === 'share') {
			tip = <span className={type + ' ' + isshare}>分享</span>
		} else {
			tip = ''
		}

		return (
			<div className={detail}>
				<h2>
					{tip}{title}
					<CnButton click={this.collect.bind(this, id, is_collect)} className={collectBtn} text={is_collect ? '取消收藏' : '收藏'} type={is_collect ? 'def' : 'success'} />
				</h2>

				<DetailInfo createDate={create_at} author={author.loginname} seeCount={visit_count} tab={tab} fro={tab}/>
				<div className={detailContent} dangerouslySetInnerHTML={{__html: content}}></div>
				{
					replies.length > 0 &&
					(
						<div className={reply}>
							<Title text={reply_count + '回复'}></Title>
							<ul className={replyList}>
								{
									replies.map((item, index) => {
										return (
											<li key={item.id} id={item.id} className='iconfont'>
												<div className={listLeft}>
													<Link to={`/user/${item.author.loginname}`}>
														<img src={item.author.avatar_url} alt={item.author.loginname}/>
													</Link>
												</div>
												<div className={listRight}>
													<div className={rightHeader}>
														<Link to={`/user/${item.author.loginname}`}>
															<span>{item.author.loginname}</span>
														</Link>
														<a href={`#${item.id}`} style={{marginLeft: '10px'}}>
															<span>{index+1}楼 · {util.fromNow(item.create_at)}</span>
														</a>
													</div>
													<div dangerouslySetInnerHTML={{__html: item.content}}></div>
													{
														this.state.replyBoxIndex.includes(index) &&
														<div style={{width: '100%'}}>
															<Editor ref={'editor_' + item.id} value={this.state.replyText}></Editor>
															<CnButton type='primary' text='回复' click={this.replyBtn.bind(this, id, item.author.loginname, item.id, index)}/>
														</div>
													}
												</div>
												<div className={upsOrReply}>
													<span className={'icon-zan1 '+ (item.is_uped ? [isUped] : '')} onClick={this.ups.bind(this, item.id)}></span>
													{item.ups.length > 0 && <span>{item.ups.length}</span>}
													<span className='icon-huifu' onClick={this.reply.bind(this, item.author.loginname, index)}></span>
												</div>
											</li>
										)
									})
								}
							</ul>
						</div>
					)
				}
				<div className={addReply}>
					<Title text='添加回复'></Title>
					<div style={{padding: '20px'}}>
						{this.state.showCommentBox && <Editor ref='editor'></Editor>}
					</div>
					<CnButton loading={btnLoading} style={{margin: '0 0 0 20px'}} type='primary' size='large' text='回复' click={this.comment.bind(this, id)}></CnButton>
				</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		token: state.token
	}
}
export default connect(mapStateToProps)(Detail)