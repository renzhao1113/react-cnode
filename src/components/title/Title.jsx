import React, {Component} from 'react'
import titleStyle from './Title.less'
import PropTypes from "prop-types";

class Title extends Component {
	render() {
		let {title} = titleStyle
		let text = this.props.text
		return (
			<div className={title}>
				{text}
			</div>
		)
	}
}
Title.propTypes = {
	text: PropTypes.string.isRequired
}
export default Title