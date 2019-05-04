import React, { Component } from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Button, Form } from 'react-bootstrap';
import {FaAngleLeft} from 'react-icons/fa';

class modifyProfile extends Component{

    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            istituto: null,
            telefono: null,
            ruolo: null
          }      
      }

      readUserData() {
        const rootUtente = fire.database().ref('Utente/'+this.props.userID);
        const rootPsicologo = fire.database().ref('Psicologo/'+this.props.userID);        
        
        rootUtente.on('value', snap => {  //verifico se utente
            if (snap.val() !== null) {  //utente
              this.setState({
                nome: snap.val().nome,
                istituto: snap.val().istituto,
                telefono: snap.val().telefono,
                ruolo: 'Utente'
              })
              //imposto ruolo e state App
              //this.props.setLocalIstituto(this.state.istituto)
              this.props.setLocalRole(this.state.ruolo)
              this.props.setStateUser()
            } else if (snap.val() === null) {  //se non è utente
              rootPsicologo.on('value', snapshot => { //verifico se psicologo
                if (snapshot.val() !== null) {  //se psicologo
                  this.setState({
                    nome: snapshot.val().nome,
                    email: snapshot.val().email,
                    istituto: snapshot.val().istituto,
                    telefono: snapshot.val().telefono,
                    ruolo: 'Psicologo'
                  })
                  //imposto ruolo e state App
                  this.props.setLocalName(this.state.nome)
                  this.props.setLocalTelefono(this.state.telefono)
                  this.props.setLocalIstituto(this.state.istituto)
                  this.props.setLocalRole(this.state.ruolo)
                  this.props.setStateUser()
                } else if (snapshot.val() === null) {  //altrimenti nulla
                  alert('problemi lettura dati account')
                }
            })  
            }
        })
      }

      writeUserData(id, no, tel, ist) {
        fire.database().ref(this.props.ruolo + '/' + id).update({
            nome: no,
            telefono: tel,
            istituto: ist
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
      }

      aggiornaDati() {
        const nome = this.aggiornaNome.value
        const istituto = this.aggiornaIstituto.value            
        const telefono = this.aggiornaTelefono.value
        if (nome !== '' && istituto !== '' && telefono !== '') {
          this.writeUserData(this.props.userID, nome, telefono, istituto)
          //this.props.setLocalName(nome)
          //this.props.setStateUser()
          //alert('dati aggiornati')
        } else {
          alert("Tutti i campi devono essere compilati")
        }
        //this.datiForm.reset();
      }

      componentDidMount() {
        this.readUserData();
      }

      render () {        
        return (
            <div>
                 <div style={{display:"flex", justifyContent:"left"}}><Button variant="info" href="/profile"> <FaAngleLeft    /> </Button></div>
                
                <h3>Profilo {this.props.ruolo}</h3>
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
                    </Form.Group> */}
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

export default modifyProfile;