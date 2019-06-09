
import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';


import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';

import '../../../styles/style.css';
import '../../../styles/btnStyle.css';



class Profile extends Component {

  constructor(props) {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    if(this.props.userID !== null)
        this.getUserData(this.props.userID)
  }
  getUserData(uid) {
    fire.database().ref('users/' + uid).once(
      "value", snap => {
        if(snap.val()){
        this.setState({
          name: snap.val().name,
          email: snap.val().email
        })
      }
      }
    )
  } 
  //TODO modificare i valori all'interno del db e modifica della password attraverso le api auth di firebase


  render() {
    return (
      <div className="formAccesso">
        <h3>Bentornato {this.state.name} </h3>
        <h4>Sei registrato con questa mail:  {this.state.email} </h4>

        {((this.props.role === ROLES.USER)
       ? <a href={ROUTES.QUEUES} className="btnStyle one">
          Code disponibili
          </a> : null )}
          {((this.props.role === ROLES.COMPANY)
       ? <a href={ROUTES.COMPANY} className="btnStyle one">
         Gestisci azienda
          </a> : null )}
          {((this.props.role === ROLES.OPERATOR)
       ? <a href={ROUTES.OPERATOR} className="btnStyle one">
          Gestisci coda
          </a> : null )}
        <a href={ROUTES.DELPRO} className="btnStyle one">
          Elimina
          </a>

        <a href={ROUTES.LOGOUT} className="btnStyle one">
          Logout
          </a>
        {/* {this.getUserData(this.props.userID)} */}


      </div>
    );
  }
}

export default Profile;


