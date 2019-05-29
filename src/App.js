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

import Favorite from './components/pages/profile/favorite/favorite';
import MyQueue from './components/pages/profile/myqueue/myqueue';

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
      userID: null,
      email: null,
      name: null,
      role: null,
      authenticated: false,
      
      loading: true,      
      notify: false      
    }
    this.authState = this.authState.bind(this)
    // this.setRuolo = this.setRuolo.bind(this)
    this.updateUserInfo = this.updateUserInfo.bind(this)
    //this.setStateUser = this.setStateUser.bind(this)
  }

  updateUserInfo() {
  
  }
  authState() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userID: user.uid,
          email: user.email,
          name: user.displayName,
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          userID: null,
          emai: null,
          name: null,
          authenticated: false,
          loading: false
        })
      }
      console.log(user.uid)

    })
  }

  syncRoleFromDb(){
    if(this.state.userID){
      fire.database().ref('users/'+this.state.userID).on("value", snap =>{
        this.setState({
          role: snap.val().role
        })
      })
    }
   

  }
  componentDidMount() {
    this.authState()
    this.syncRoleFromDb()

    
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
            <Header 
                authenticated={this.state.authenticated}
                role={this.state.role}
                />
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
                      authenticated={this.state.authenticated}
                      updateUserInfo={this.updateUserInfo} />
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

                          // ???? setRuolo={this.state.setRuolo}
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

                           // ???? setRuolo={this.state.setRuolo}
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