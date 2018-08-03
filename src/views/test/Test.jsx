import React, {Component} from 'react'
import { connect } from 'react-redux'
import ListItem from '../../components/list-item/ListItem'
import {api, util} from "../../assets/js/util";
import Navbar from '../../components/navbar/NavBar'
import Qs from "qs";

class Test extends Component {
	constructor (props) {
		super(props)
		this.state = {
			list: [],
			options: {
				page: 1,
				tab: 'dev',
				limit: 15,
				mdrender: false
			}
		}
	}
	componentDidMount () {
		this.getList()
	}

	async getList () {
		let options = Qs.stringify(this.state.options)
		try {
			let list = await util.get(api.topics.path + '?' + options)
			this.setState({
				list
			})
		} catch (e) {
			alert(e)
		}
	}
	paging (page) {
		let {options} = this.state
		options.page = page
		this.setState({options})
		this.getList()
	}
	render() {
		return (
			<div>
				<Navbar />
				<ListItem list={this.state.list} page={this.state.options.page} change={this.paging.bind(this)}></ListItem>
			</div>
		)
	}
}

export default connect()(Test)