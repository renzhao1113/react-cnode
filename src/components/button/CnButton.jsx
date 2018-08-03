import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CnButtonStyle from './CnButton.less'

class CnButton extends Component {
	render() {
		let {text, type, size, style, click, className, loading, disabled = false} = this.props
		let {cnButton, def, large, rotate} = CnButtonStyle
		return (
			<button style={style} onClick={click}
							disabled={loading || disabled}
							className={cnButton + ' ' + (className || '')  + ' ' + (CnButtonStyle[type] || def) + ' ' + (CnButtonStyle[size] || large)}>
				{text} {loading && <i className={'iconfont icon-loading-copy ' + rotate}></i>}
			</button>
		)
	}
}
CnButton.propTypes = {
	text: PropTypes.string.isRequired,
	type: PropTypes.string,
	size: PropTypes.string,
	style: PropTypes.object,
	click: PropTypes.func,
	className: PropTypes.string,
	loading: PropTypes.bool,
	disabled: PropTypes.bool
}
export default CnButton