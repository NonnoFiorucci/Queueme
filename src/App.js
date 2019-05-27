import React from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { fire } from './config/FirebaseConfig';
import { Spinner, Container  } from 'react-bootstrap';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/pages/login/login';
import Logout from './components/pages/logout/logout';
import Landing from './components/pages/landing/landing';
import Profile from './components/pages/profile/profile';

import ModifyProfile from './components/pages/profile/modify/modify';
import DeleteProfile from './components/pages/profile/delete/delete';
import Company from './components/pages/profile/company';
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
      authenticated: false,
      ruolo: null,
      loading: true,
      userID: null,
      notify: false,
      email: null,
      name: null, 
    }
    this.setAuthenticated = this.setAuthenticated.bind(this)
    this.setRuolo = this.setRuolo.bind(this)
    this.setStateUser = this.setStateUser.bind(this)
  }

  updateUserInfo( id, email, role , name) {
    localStorage.setItem('userName', name)
    localStorage.setItem('userID', id)
    localStorage.setItem('userEmail', email)
    localStorage.setItem('userRole', role)    
    this.setState({
      userID: id,
      email: email,
      name: role,
      role: name
    })
  }

  setStateUser() {
    
  }

  setAuthenticated(param) {
    this.setState({
      authenticated: param
    });
  }

  setRuolo(param) {
    this.setState({
      ruolo: param
    });
  }

  updateNotifyPermission(accessNotify){
    this.setState({
      notify: accessNotify
    })
    localStorage.setItem('notify', accessNotify);
  }

  componentDidMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
    this.setStateUser()
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
        {this.state.authenticated
          ?
          <div className="headerStyle">
            <Header authenticated={this.state.authenticated} />
          </div>
          : null
        }
        <Container>
            <BrowserRouter>
              <div className="pageStyle">
                <Switch>
                  <Route exact path={ROUTES.LANDING} component={Landing} />
                  <Route path={ROUTES.LOGIN} render={() =>
                    <Login
                      setAuthenticated={this.setAuthenticated}
                      authenticated={this.state.authenticated}
                      updateUserSession={this.updateUserInfo} />
                  } />

                  {this.state.authenticated
                    ? <>
                      <Route path={ROUTES.LOGOUT} render={() =>
                        <Logout
                          userID={this.state.userID} />
                      } />

                      <Route path={ROUTES.PROFILE} render={() =>
                        <Profile
                         userID={this.state.userID}  
                         />
                      } />


                      <Route path={ROUTES.MODPRO} render={() =>
                        <ModifyProfile
                          userID={this.state.userID}
                          email={this.state.email}
                          name={this.state.name}

                          ruolo={this.state.ruolo}
                          istituto={this.state.istituto}

                          setRuolo={this.state.setRuolo}
                          setStateUser={this.setStateUser}

                          setLocalName={this.setLocalName}
                          setLocalRole={this.setLocalRole}

                          setLocalUser={this.setLocalUser} />
                      } />

                      <Route path={ROUTES.DELPRO} render={() =>
                        <DeleteProfile
                          userID={this.state.userID}
                          email={this.state.email}
                          name={this.state.name}

                          ruolo={this.state.ruolo}

                          setRuolo={this.state.setRuolo}
                          setStateUser={this.setStateUser}

                          setLocalName={this.setLocalName}
                          setLocalRole={this.setLocalRole}

                          setLocalUser={this.setLocalUser} />
                      } />

                      <Route path={ROUTES.COMPANY} render={() =>
                        <Company
                          userID={this.state.userID}
                           />
                      } />

                      <Route path={ROUTES.QUEUES} render={() =>
                        <QueueView
                          userID={this.state.userID}
                          />
                      } />
                      
                      <Route path={ROUTES.OPERATOR} render={() =>
                        <OperatorView
                          userID={this.state.userID}
                          name={this.state.name}
                        />    
                      }/>

                      <Route path={ROUTES.INFO} component={Info} />
                      <Route path={ROUTES.FAVORITE} component={Info} />
                      <Route path={ROUTES.MYQUEUES} component={Info} />
                    </>
                    : <Redirect to={ROUTES.LOGIN} />
                  }
                </Switch>
              </div>
            </BrowserRouter>
        </Container >

        <div className="footerstyle">
          <Footer authenticated={this.state.authenticated} />
        </div>

      </div>
    );
  }
}

export default App;