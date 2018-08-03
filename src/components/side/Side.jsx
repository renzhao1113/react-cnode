import React, {Component} from 'react'
import sidesTyle from './side.less'
class Side extends Component {
	render() {
		let {side, sidePain, sidePainTitle, sidePainList} = sidesTyle
		return (
			<div className={side}>
				<div className={sidePain}>
					<div className={sidePainTitle}>
						无人回复的问题
					</div>
					<ul className={sidePainList}>
						<li>qwe</li>
						<li>qwe</li>
						<li>qwe</li>
						<li>qwe</li>
						<li>qwe</li>
					</ul>
				</div>
				<div className={sidePain}>
					<div className={sidePainTitle}>
						积分榜
					</div>
					<ul className={sidePainList}>
						<li>sadf</li>
						<li>sadf</li>
						<li>sadf</li>
						<li>sadf</li>
					</ul>
				</div>
			</div>
		)
	}
}
export default Side