
import React, { Component } from 'react';

import { Row, Col  } from 'react-bootstrap';

import * as ROUTES from '../../../constants/routes'; 

import '../../../styles/style.css';
import '../../../styles/btnStyle.css';



class Profile extends Component {

  constructor() {
    super();
    this.state = {
      nome: null,
      statusNotify: false,
      ruolo: null
    }
  }


  render() {
    return (
      <div class="formAccesso">
        <h3>Bentornato </h3>
        <Col>
          <Row>
            <a href={ROUTES.QUEUES} class="btnStyle one">
              Code disponibili
          </a>
            <a href={ROUTES.DELPRO} class="btnStyle one">
              Elimina
          </a>
          </Row>
          <Row>
            <a href={ROUTES.LOGOUT} class="btnStyle one">
              Logout
          </a>
          </Row>
        </Col>
        
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

  aggiornaDati() {
    const nome = this.aggiornaNome.value;
    const istituto = this.aggiornaIstituto.value;
    const telefono = this.aggiornaTelefono.value;
    if (nome !== "" && istituto !== "" && telefono !== "") {
      this.writeUserData(this.props.userID, nome, telefono, istituto);
      //this.props.setLocalName(nome)
      //this.props.setStateUser()
      //alert('dati aggiornati')
    } else {
      alert("Tutti i campi devono essere compilati");
    }
    //this.datiForm.reset();
  }

  componentDidMount() {
    this.readUserData();
  }

  render() {
    return (
      <div>
        <h3>Profilo {this.props.ruolo}</h3>
        <br />
        <br />

        <Button href="/myconversation" variant="info" size="lg">
          Le mie conversazioni
        </Button>

        <br />
        <br />
        <Button href="modifyProfile" variant="info" size="lg">
          Modifica profilo
        </Button>

        {/*

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


