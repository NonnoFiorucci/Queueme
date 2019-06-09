import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fire } from './config/FirebaseConfig';
import { Spinner } from 'react-bootstrap';


import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/pages/login/login';
import Logout from './components/pages/logout/logout';
import Landing from './components/pages/landing/landing';
import Profile from './components/pages/profile/profile';

import Favorite from './components/pages/profile/favorite/favorite';
import MyQueue from './components/pages/profile/myqueue/myqueue';
//import NotificationModal from './components/notificationModal/notificationModal';
import Faq from './components/pages/faq/faq';
import DeleteProfile from './components/pages/profile/delete/delete';
import Company from './components/pages/company';
import Info from './components/pages/info/info';
import OperatorView from './components/pages/operator';
import QueueView from './components/queue/queueView';

import * as ROUTES from './constants/routes';
import * as ROLES from './constants/roles';


import './styles/style.css';
import './styles/btnStyle.css';



class App extends React.Component {

  constructor() {
    super();
    this.state = {
      userID: null,
      email: null,
      name: null,
      role: null,
      // notToken: null,

      listQueueNotify: [],

      authenticated: false,
      modalshow: false,
      loading: true,
      notify: false
    }
    this.authState = this.authState.bind(this)
    this.syncRoleFromDb = this.syncRoleFromDb.bind(this)
  }

  authState() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userID: user.uid,
          email: user.email,
          authenticated: true,
        })
        this.syncRoleFromDb()
      }
      
    })
  }

  syncRoleFromDb() {
    fire.database().ref('users/' + this.state.userID).on("value", snap => {
      if (snap.val()) {
        this.setState({
          role: snap.val().role,
          loading: false
        })
      }
    })
  }

  handleOfflineSession = () => {
    this.setState({
      userID: localStorage.getItem('userId'),
      auth: localStorage.getItem('email')
    })
  }


  componentDidMount() {
    this.authState()      
    // this.handleOfflineSession()
   
    this.setState({
      loading: false
    })
  }


  render() {
    if (this.state.loading) {
      return (<Spinner animation="grow" />)
    }
    else {
      return (
        <div>
          {this.state.authenticated && (
            <>
              <Header
                authenticated={this.state.authenticated}
                role={this.state.role}
              />
              <Footer authenticated={this.state.authenticated}
                role={this.state.role} />
              }
            </>
          )}
          <div className="pageStyle">
            <BrowserRouter>
              <Switch>
                <Route exact path={ROUTES.LANDING} component={Landing} />
                <Route path={ROUTES.LOGIN} component={() => <Login authenticated={this.state.authenticated} />} />
                <Route path={ROUTES.LOGOUT} component={() => <Logout userID={this.state.userID} />} />
                <Route path={ROUTES.DELPRO} render={() => <DeleteProfile userID={this.state.userID} />} />
                <Route path={ROUTES.PROFILE} component={() => <Profile userID={this.state.userID} role={this.state.role} />} />
                <Route path={ROUTES.DELPRO} render={() => <DeleteProfile userID={this.state.userID} />} />
                {this.state.role === ROLES.COMPANY ? (<Route path={ROUTES.COMPANY} component={() => <Company userID={this.state.userID} />} />) : null}
                <Route path={ROUTES.FAQ} component={() => <Faq userID={this.state.userID} />} />
                {this.state.role === ROLES.USER ? (<Route path={ROUTES.QUEUES} component={() => <QueueView userID={this.state.userID} />} />) : null}
                {this.state.role === ROLES.OPERATOR ? (<Route path={ROUTES.OPERATOR} component={() => <OperatorView userID={this.state.userID} name={this.state.name} />} />) : null}
                <Route path={ROUTES.INFO} component={Info} />
                {this.state.role === ROLES.USER ? (<Route path={ROUTES.FAVORITE} component={() => <Favorite userID={this.state.userID} />} />) : null}
                {this.state.role === ROLES.USER ? (<Route path={ROUTES.MYQUEUES} component={() => <MyQueue userID={this.state.userID} />} />) : null}
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      )
    }
  }
}

export default App;