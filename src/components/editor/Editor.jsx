import React, {Component} from 'react'
import editorStyle from './editor.less'
import ReactMde, {ReactMdeTypes} from "react-mde";
import css from 'react-mde/lib/styles/css/react-mde-all.css'
import {util} from '../../assets/js/util'
import * as Showdown from "showdown";

import PropTypes from 'prop-types'
util.addCss(css)

class Editor extends Component {
	constructor (props) {
		super(props)
		this.state = {
			mdeState: {
				markdown: props.value || ''
			},
		}
		this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
	}
	handleChange (mdeState) {
		this.setState({mdeState});
		if (this.props.change) {
			this.props.change(mdeState)
		}
	}
	getValue () {
		return this.state.mdeState.markdown
	}
	iconProvider = (name) => {
		let icon = ''
		switch (name) {
			case 'heading':
				icon = <i className='iconfont icon-biaotizhengwenqiehuan-copy' name={name}></i>
				break
			case 'bold':
				icon = <i className='iconfont icon-bold' name={name}></i>
				break
			case 'italic':
				icon = <i className='iconfont icon-xieti' name={name}></i>
				break
			case 'strikethrough':
				icon = <i className='iconfont icon-zitizhonghuaxian' name={name}></i>
				break
			case 'link':
				icon = <i className='iconfont icon-lianjie' name={name}></i>
				break
			case 'quote-right':
				icon = <i className='iconfont icon-yinhao-copy' name={name}></i>
				break
			case 'code':
				icon = <i className='iconfont icon-daima' name={name}></i>
				break
			case 'image':
				icon = <i className='iconfont icon-tupian' name={name}></i>
				break
			case 'list-ul':
				icon = <i className='iconfont icon-youxuliebiao' name={name}></i>
				break
			case 'list-ol':
				icon = <i className='iconfont icon-liebiao' name={name}></i>
				break
			case 'tasks':
				icon = <i className='iconfont icon-liebiao1' name={name}></i>
				break
		}
		return icon
	}
	render() {
		let {editor} = editorStyle
		return (
			<div className={editor}>
				<ReactMde ref='ReactMde' onChange={this.handleChange.bind(this)}
									editorState={this.state.mdeState}
									layout="horizontal"
									generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
									buttonContentOptions = {{
										iconProvider: this.iconProvider
									}}>
				</ReactMde>
			</div>
		)
	}
}
Editor.propTypes = {
	change: PropTypes.func,
	value: PropTypes.string
}
export default Editor