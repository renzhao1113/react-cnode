import React, {Component} from 'react';
import Header from './components/header/Header'

import { Provider } from 'react-redux'

import Index from './views/index/Index'
import Detail from './views/detail/Detail'
import Good from './views/good/Good'
import Invite from './views/invite/Invite'
import Asking from './views/asking/Asking'
import Share from './views/share/Share'
import Test from './views/test/Test'
import Fotter from './components/footer/Footer'
import UserInfo from './views/user-info/UserInfo'
import UserReplies from './views/user-replies/UserReplies'
import UserTopics from './views/user-topics/UserTopics'
import CreateTopic from './views/create-topic/CreateTopic'
import Message from './views/message/Message'

import { BrowserRouter as Router, Route } from "react-router-dom";
import store from './store'

class App extends Component {
	render () {
		return (
			// 注册store到全局当中
			<Provider store={store}>
				<Router>
					<div id="app">
						<Header />
						<main className="container">
							<Route exact path="/" component={Index}></Route>
							<Route path="/detail/:id" component={Detail}></Route>
							<Route path="/good" component={Good}></Route>
							<Route path="/share" component={Share}></Route>
							<Route path="/asking" component={Asking}></Route>
							<Route path="/invite" component={Invite}></Route>
							<Route path="/test" component={Test}></Route>
							<Route exact path="/user/:name" component={UserInfo}></Route>
							<Route exact path="/user/:name/topics" component={UserTopics}></Route>
							<Route exact path="/user/:name/replies" component={UserReplies}></Route>
							<Route path="/topic/create" component={CreateTopic}></Route>
							<Route path="/my/messages" component={Message}></Route>
						</main>
						<Fotter />
					</div>
				</Router>
			</Provider>
		)
	}
}
export default App;
