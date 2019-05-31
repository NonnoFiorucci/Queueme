
import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';


import * as ROUTES from '../../../constants/routes';

import '../../../styles/style.css';
import '../../../styles/btnStyle.css';



class Profile extends Component {

  constructor(props) {
    super();
    this.state = {
      name: null,
      role: null,
      email: null,
      statusNotify: null,
      ruolo: null
    }

  }

  // componentDidMount() {
  //   this.getUserData(this.props.userID)
  // }
  getUserData(uid) {
    fire.database().ref('users/' + uid).on(
      "value", snap => {
        // this.setState({
        //   name: snap.val().name,
        //   role: snap.val().role,
        //   email: snap.val().email,
        // })
      }
    )
  } */
  //TODO modificare i valori all'interno del db e modifica della password attraverso le api auth di firebase


  render() {
    return (
      <div class="formAccesso">
        <h3>Bentornato </h3>
        <a href={ROUTES.QUEUES} class="btnStyle one">
          Code disponibili
          </a>
        <a href={ROUTES.DELPRO} class="btnStyle one">
          Elimina
          </a>

        <a href={ROUTES.LOGOUT} class="btnStyle one">
          Logout
          </a>
        {/* {this.getUserData(this.props.userID)} */}


      </div>
    );
  }
}

export default Profile;


// PROFILE DI MICIO


/*
import React, { Component } from "react";
import { fire } from "../../../config/FirebaseConfig";
import { Button } from "react-bootstrap";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      nome: null,
      email: null,
      istituto: null,
      telefono: null,
      ruolo: null
    };
  }

  writeUserData(id, no, tel, ist) {
    fire
      .database()
      .ref(this.props.ruolo + "/" + id)
      .update({
        nome: no,
        telefono: tel,
        istituto: ist
      })
      .then(data => {
        //success callback
        console.log("data ", data);
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
  }


  componentDidMount() {
    this.readUserData();
  }

  render() {
    return (
                {this.props.picture === 'null'
                ? <Button variant="info" href="/profile" size="sm">
                    Inserisci immagine
                  </Button>
                : <Button variant="outline" href="/profile" size="sm">
                    <img className="profileImg" src={this.props.picture} alt="UserPicture"/>
                  </Button>
                }
                <Form className="formDati" onSubmit={(event) => this.aggiornaDati(event)} ref={(form) => { this.datiForm = form }}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        {this.props.name === 'null'
                        ?   <Form.Control className="formDatiLabel" type="text" placeholder="inserisci nome" ref={(input) => { this.aggiornaNome = input }}/>
                        :   <Form.Control className="formDatiLabel" type="text" value={this.state.nome} ref={(input) => { this.aggiornaNome = input }}/>
                        }
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="formDatiLabel" type="text" defaultValue={this.props.email} ref={(input) => { this.aggiornaEmail = input }}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Istituto</Form.Label>
                        {this.props.istituto === 'null'
                        ?   <Form.Control className="formDatiLabel" type="text" placeholder="inserisci istituto" ref={(input) => { this.aggiornaIstituto = input }}/>
                        :   <Form.Control className="formDatiLabel" type="text" value={this.state.istituto} ref={(input) => { this.aggiornaIstituto = input }}/>
                        }
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Telefono</Form.Label>
                        {this.props.telefono === 'null'
                        ?   <Form.Control className="formDatiLabel" type="text" placeholder="inserisci telefono" ref={(input) => { this.aggiornaTelefono = input }}/>
                        :   <Form.Control className="formDatiLabel" type="text" value={this.state.telefono} ref={(input) => { this.aggiornaTelefono = input }}/>
                        }
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="formDatiLabel" type="text" defaultValue={this.props.email} ref={(input) => { this.aggiornaEmail = input }}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Istituto</Form.Label>
                        <Form.Control className="formDatiLabel" type="text" placeholder={this.state.istituto} ref={(input) => { this.aggiornaIstituto = input }}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control className="formDatiLabel" type="text" placeholder={this.state.telefono} ref={(input) => { this.aggiornaTelefono = input }}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicChecbox">
                    </Form.Group>
                    <br></br>
                    <Button variant="info" type="submit" style={{fontWeight:'bold'}}>
                        Aggiorna
                    </Button>
                </Form>
      </div>
    );
  }
}

export default Profile;

*/


