import React from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { fire } from './config/FirebaseConfig';
import { Spinner } from 'react-bootstrap'

//eslint-disable-next-line
import Style from './components/style.css';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/pages/login/login';
import Logout from './components/pages/logout/logout';
import Landing from './components/pages/landing/landing';
import Profile from './components/pages/profile/profile';
import ModifyProfile from './components/pages/profile/modify/modify';
import DeleteProfile from './components/pages/profile/delete/delete';
import Info from './components/pages/info/info';
import QueueList from './components/pages/queuelist/queuelist';
import MyQueue from './components/pages/profile/myqueue/myqueue';

import Faq from './components/pages/faq/faq';

import './components/style.css';





class App extends React.Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      ruolo: null,
      loading: true,
      userID: null,
      email: null,
      name: null,

      telefono: null,
    }
    this.setAuthenticated = this.setAuthenticated.bind(this)
    this.setRuolo = this.setRuolo.bind(this)
    this.setStateUser = this.setStateUser.bind(this)
  }

  setLocalUser(id, em, na, pic) {
    localStorage.setItem('userID', id);
    localStorage.setItem('userEmail', em);
    localStorage.setItem('userName', na);
    localStorage.setItem('userPicture', pic);
    //localStorage.setItem('userRole', ru);
  }

  setLocalRole(r) {
    localStorage.setItem('userRole', r);
  }

  setLocalName(na) {
    localStorage.setItem('userName', na);
  }

  setLocalTelefono(tel) {
    localStorage.setItem('userTelefono', tel);
  }

  setLocalIstituto(is) {
    localStorage.setItem('userIstituto', is);
  }

  setStateUser() {
    this.setState({
      userID: localStorage.getItem('userID'),
      email: localStorage.getItem('userEmail'),
      name: localStorage.getItem('userName'),
      picture: localStorage.getItem('userPicture'),
      ruolo: localStorage.getItem('userRole'),
      telefono: localStorage.getItem('userTelefono'),
      istituto: localStorage.getItem('userIstituto')
    })
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
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
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
        <div className="mainStyle">
          <BrowserRouter>
            <div className="pageStyle">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/login" render={() =>
                  <Login
                    userID={this.state.userID}
                    setAuthenticated={this.setAuthenticated}
                    authenticated={this.state.authenticated}
                    setStateUser={this.setStateUser}
                    setLocalUser={this.setLocalUser} />
                } />

                {this.state.authenticated
                  ? <>
                    <Route path="/logout" render={() =>
                      <Logout
                        userID={this.state.userID} />
                    } />

                    <Route path="/profile" render={() =>
                      <Profile />
                    } />


                    <Route path="/modifyProfile" render={() =>
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

                    <Route path="/deleteProfile" render={() =>
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



                    <Route path="/queuelist" render={() =>
                      <QueueList
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


                    <Route path="/myqueue" render={() =>
                      <MyQueue
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

                    <Route path="/info" component={Info} />


                    <Route path="/faq" component={Faq} />


                  </>
                  : <Redirect to='/login' />
                }
              </Switch>
            </div>
          </BrowserRouter>
          <div className="footerstyle">
            <Footer authenticated={this.state.authenticated} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;