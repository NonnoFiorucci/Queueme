import React, { Component } from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Button } from 'react-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import * as ROUTES from '../../../../constants/routes';

class deleteProfile extends Component {

  constructor() {
    super();
    this.state = {
      nome: null,
      email: null,
      ruolo: null
    }
    this.deleteaccount = this.deleteaccount.bind(this);
  }

  readUserData() {
    const rootUtente = fire.database().ref('users/' + this.props.userID);
    rootUtente.on('value', snap => { 
      if (snap.val() !== null) { 
        this.setState({
          nome: snap.val().nome,
          email: snap.val().email,
          ruolo: snap.val().role
        })
        //imposto ruolo e state App
        this.props.setLocalRole(this.state.ruolo)
        this.props.setStateUser()
      } else if (snap.val() === null) {  
        alert('problemi lettura dati account')
      }
    })
  }



  deleteaccount() {
    fire.database().ref('users/' + this.props.userID).remove();
    fire.auth().signOut()
    this.deleteStorage()
  }

  deleteStorage() {
    let keysToRemove = ["userID", "email", "role", "username",];
    keysToRemove.forEach(k => localStorage.removeItem(k))
  }

  componentDidMount() {
    this.readUserData();
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button variant='secondary' href={ROUTES.PROFILE}>
            <FaAngleLeft />
          </Button>
        </div>

        <h1>Elimina il tuo profilo</h1>


        <OverlayTrigger
          trigger="click"
          key='bottom' placement='bottom'
          overlay={
            <Popover
              id={`popover-positioned-bottom`}
              title={`Elimina`}
            >
              <strong>Eliminare Definitivamnte ?</strong>  <br />
              <br />
              <br />
              <div className="btn-toolbar" style={{ display: 'felx' }}>

                <Button variant="danger" onClick={this.deleteaccount} > Elimina</Button>  {}
                <Button style={{ marginLeft: 50 }} href={ROUTES.DELPRO} variant="secondary">Annulla</Button>
              </div>
            </Popover>
          }
        >
          <Button variant="secondary">Elimina account </Button>
        </OverlayTrigger>
      </div>
    );
  }
}

export default deleteProfile;