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
import NotificationModal from './components/notificationModal/notificationModal';
import Faq from './components/pages/faq/faq';
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
      modalshow: false,
      loading: true,
      notify: false
    }
    this.authState = this.authState.bind(this)
    this.syncRoleFromDb = this.syncRoleFromDb.bind(this)
    this.getMyQueue = this.getMyQueue.bind(this)
    this.notificationListeners = this.notificationListeners.bind(this)
  }

  authState() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userID: user.uid,
          email: user.email,
          role: user.role,
          authenticated: true,
        })
        console.log(user.role)
      
       
      }
      this.syncRoleFromDb()

    })
  }

  syncRoleFromDb() {
    if (this.state.userID ) {
      fire.database().ref('users/' + this.state.userID).on("value", snap => {
        this.setState({
          role: snap.val().role,
          loading: false
        })
      })
    }
  }


  componentDidMount() {
    this.authState()
    //this.syncRoleFromDb()
    this.setState({
      loading: false
    })
    if(this.state.userID !== null) this.getMyQueue()
  }


  getMyQueue() {
   // console.log(this.state.userID)
     let ref = fire.database().ref().child('users/'+ this.state.userID +'/queuesStatus');
     ref.on('value', snapshot => {
       var fav = snapshot.val();
       Object.keys(fav).map(key=> {
       this.notificationListeners(fav[key].queueId)
              
     }) ;        
     });
    
    
 }

  notificationListeners(quId){
    var usersRef  = fire.database.ref('queues/'+quId+'/userList');
    
    usersRef.on('child_removed', (snapshot) => {
    console.log('user was removed !!' );
          
    //  SE NUM PERSONE < 3 
    this.setState({ modalShow: true })
     
});
    
  } 

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    if (this.state.loading) {
      return (<Spinner animation="grow" />)
    } else {
      return (
        <div>
          <NotificationModal
            show={this.state.modalShow}
            onHide={modalClose}
          />
          {this.state.authenticated &&
            <>
              <Header
                authenticated={this.state.authenticated}
                role={this.state.role}
              />
              <Footer authenticated={this.state.authenticated}
                role={this.state.role} />
            </>
          }

          <BrowserRouter>
            <div className="pageStyle">
              <Switch>
                <Route exact path={ROUTES.LANDING} component={Landing} />
                <Route path={ROUTES.LOGIN} component={() => <Login authenticated={this.state.authenticated} />} />
                <Route path={ROUTES.LOGOUT} component={() => <Logout userID={this.state.userID} />} />
                <Route path={ROUTES.PROFILE} component={() => <Profile userID={this.state.userID} />} />
                <Route path={ROUTES.DELPRO} render={() => <DeleteProfile userID={this.state.userID} />} />

                <Route path={ROUTES.COMPANY} component={() => <Company userID={this.state.userID} />} />
                <Route path={ROUTES.FAQ} component={() => <Faq userID={this.state.userID} />} />
                <Route path={ROUTES.QUEUES} component={() => <QueueView userID={this.state.userID} />} />
                <Route path={ROUTES.OPERATOR} component={() => <OperatorView userID={this.state.userID} name={this.state.name} />} />
                <Route path={ROUTES.INFO} component={Info} />
                <Route path={ROUTES.FAVORITE} component={() =>
                  <Favorite
                    userID={this.state.userID}
                  />
                } />
                <Route path={ROUTES.MYQUEUES} component={() =>
                  <MyQueue userID={this.state.userID} />
                } />

              </Switch>
            </div>

          </BrowserRouter>


        </div>
      )
    }
  }
}

export default App;