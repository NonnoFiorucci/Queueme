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

import ModifyProfile from './components/pages/profile/modify/modify';
import DeleteProfile from './components/pages/profile/delete/delete';
import Company from './components/pages/company';
import Info from './components/pages/info/info';
import OperatorView from './components/pages/operator';
import QueueView from './components/queue/queueView';

import * as ROUTES from './constants/routes';


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
      authenticated: false,

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
        console.log(user.uid)
      }
      this.syncRoleFromDb()

    })
  }

  syncRoleFromDb() {
    if (this.state.userID) {
      fire.database().ref('users/' + this.state.userID).on("value", snap => {
        this.setState({
          role: snap.val().role
        })
      })
    }
  }


  componentDidMount() {
    this.authState()
    this.syncRoleFromDb()
    this.setState({
      loading: false
    })
  }


  render() {
    if (this.state.loading === true) {
      return (
        <div className="loading">
          <Spinner animation="grow" />
        </div>
      )
    }
    return (
      <div>
        {this.state.authenticated && (
          <>
            <Header
              authenticated={this.state.authenticated}
              role={this.state.role}
            />
            <Footer authenticated={this.state.authenticated} />
          </>)
        }

        <BrowserRouter>
          <div className="pageStyle">
            <Switch>
              <Route exact path={ROUTES.LANDING} component={Landing} />
              <Route path={ROUTES.LOGIN} component={() =>  <Login authenticated={ this.state.authenticated } />} />
              <Route path={ROUTES.LOGOUT} component={() =>  <Logout userID={this.state.userID} />  } />
              <Route path={ROUTES.PROFILE} component={() =>  <Profile userID={this.state.userID} /> } />
              {/* <Route path={ROUTES.MODPRO} component={() => <ModifyProfile userID={this.state.userID} /> } /> */}

              <Route path={ROUTES.DELPRO} render={() => <DeleteProfile userID={this.state.userID} /> } />
              <Route path={ROUTES.COMPANY} component={() => <Company userID={this.state.userID}/> } />
              <Route path={ROUTES.QUEUES} component={() => <QueueView userID={this.state.userID} /> } />
              <Route path={ROUTES.OPERATOR} component={() => <OperatorView  userID={this.state.userID} name={this.state.name} /> } />
              <Route path={ROUTES.INFO} component={Info} />
              <Route path={ROUTES.FAVORITE} render={() =>
                <Favorite
                  userID={this.state.userID}
                />
              } />
              <Route path={ROUTES.MYQUEUES} render={() =>
                <MyQueue
                  userID={this.state.userID}
                />
              } />

            </Switch>
          </div>

        </BrowserRouter>


      </div>
    )
  }
}

export default App;