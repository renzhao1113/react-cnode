import React, {Component} from 'react'

class Footer extends Component {
	render() {
		return (
			<footer style={{width: '100%', height: '200px', lineHeight: '200px', backgroundColor: '#333', marginTop: '30px'}}>
				<h2 style={{lineHeight: '100px', color: '#fff', textAlign: 'center'}}>React-CNodejs</h2>
				<h3 style={{lineHeight: '50px', color: '#fff', textAlign: 'center'}}>@author: renzhao</h3>
			</footer>
		)
	}
}

export default Footer