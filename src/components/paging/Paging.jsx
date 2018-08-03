import React, {Component} from 'react'
import ProtoType from 'prop-types'
import CnButton from '../button/CnButton'

import {connect} from 'react-redux'

class Paging extends Component {
	constructor (props) {
		super(props)
		this.state = {
			page: props.page || 1
		}
	}
	up () {
		let {page} = this.state
		if (page > 1) {
			page -= 1
		}
		this.setState({page})
		this.props.change(page)
	}
	down () {
		let {page} = this.state
		page++
		this.setState({page})
		this.props.change(page)
	}
	render() {
		let {page} = this.state
		return (
			<div style={{marginTop: '10px'}}>
				<CnButton click={this.up.bind(this)} type='primary' text='上一页' disabled={page === 1}></CnButton>
				<span style={{margin: '0 10px', color: '#000'}}>{page}</span>
				<CnButton click={this.down.bind(this)} type='primary' text='下一页'></CnButton>
			</div>
		)
	}
}
Paging.propTypes = {
	page: ProtoType.number,
	up: ProtoType.func,
	down: ProtoType.func,
	change: ProtoType.func
}
export default connect()(Paging)