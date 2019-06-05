import React from 'react';
import { fire, secondaryApp } from '../../../config/FirebaseConfig';
import { Form, Table, Button, Collapse, Alert,  } from 'react-bootstrap';
import { IoIosCheckmark, IoIosClose, IoIosArrowDropdownCircle } from "react-icons/io";


import '../../../styles/btnStyle.css';

import * as ROLES from '../../../constants/roles';


class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showQeueueCreation: false,
            showOperatorAssign: false,

            idQueue: [],
            title: [],
            description: [],
            idCompany: this.props.userID,
            idOperator: [],
            numWait: [],
            active: [],


            role: ROLES.OPERATOR,
            userAuthProvider: null,

            listOfOperator: [],
            usersAvailableKey: [],
            usersAvailableUsername: []
        }
        this.showQueues = this.showQueues.bind(this);
        this.showOperator = this.showOperator.bind(this);
        this.handleNewQueue = this.handleNewQueue.bind(this);
        this.handleNewOperator = this.handleNewOperator.bind(this);
        this.regEmailPassword = this.regEmailPassword.bind(this)
    }
    uniqueIDCode() {
        var ID = Date.now();
        return ID;
    }
    componentDidMount() {
        this.showQueues();
        this.showUser();
        this.showOperator();
        console.log(this.props)
    }


    //utilizzato nella select del form di creazione di una nuova coda
    /* #region  Query Realtimedatabase da migrare */
    showOperator() {
        const dbQueryOperator = fire.database().ref('company/' + this.props.userID + '/operators/')
        dbQueryOperator.on('value', snap => {
            snap.forEach(s => {
                this.setState({
                    listOfOperator: this.state.listOfOperator.concat([s.val().idOperator])
                })
            })
        })
        console.log(this.state.listOfOperator)
    }
    showUser() {
        const dbQueryUser = fire.database().ref('users/');
        dbQueryUser.on('value', snapQuery => {
            snapQuery.forEach(snap => {
                this.setState({
                    usersAvailableKey: this.state.usersAvailableKey.concat([snap.key]),
                    usersAvailableUsername: this.state.usersAvailableUsername.concat([snap.val().nome])
                })
            })
        })
    }
    //fa una query per visualizzare le code gestite da una determinata azienda ## da sistemare
    showQueues() {
        console.log(this.state.idCompany);
        // *** Query per ricavare la lista di code associata a quella azienda **
        const dbQueryQueues = fire.database().ref('queues/').orderByChild('idCompany/').equalTo(this.props.userID);
        dbQueryQueues.on('value', snapQuery => {
            snapQuery.forEach(snap => {
                this.setState({
                    idQueue: this.state.idQueue.concat([snap.key]),
                    title: this.state.title.concat([snap.val().title]),
                    description: this.state.description.concat([snap.val().description]),
                    idOperator: this.state.idOperator.concat([snap.val().idOperator]),
                    numWait: this.state.numWait.concat([snap.val().numWait]),
                    active: this.state.active.concat([snap.val().active])
                })
            });
        })
    }
    /* #endregion */

    handleNewQueue(event) {
        //alert(this.refs.title.value, this.refs.description.value,this.refs.idOperator.value, this.refs.active.checked);      
        //fino a qui i valori arrivano quindi non é il form
        event.preventDefault();
        const keyQueue = this.uniqueIDCode()
        fire.database().ref('queues/').child(keyQueue).set({
            idCompany: this.props.userID,
            title: this.refs.title.value,
            description: this.refs.description.value,
            idOperator: this.refs.idOperator.value,
            numWait: 0,
            active: this.refs.active.checked
        })
            .then((data) => {
                alert("Coda aggiunta con successo");
            })
            .catch((error) => {
                alert(error);
            });
        fire.database().ref('operators/' + this.state.idOperator + '/queues/').push({
                idQueue: keyQueue,
                idCompany: this.props.userID
            })


    }
    handleNewOperator(event) {
        event.preventDefault();
        fire.database().ref('company/' + this.state.idCompany + '/operators/').push({
            idOperator: this.refs.idUserForOperator.value
        })
            .then((data) => {
                alert("Operatore aggiunto all'azienda");
            })
            .catch((error) => {
                alert(error);
            });
        fire.database().ref('users/' + this.refs.idUserForOperator.value).update({
            role: ROLES.OPERATOR
        })
    }



    getQueueList() {
        return (
           
            <Table size='sm' responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Codice </th>
                        <th>Titolo</th>
                        <th>Descrizione</th>
                        <th>IDOperatore</th>
                        <th>Persone in coda</th>
                        <th>Attiva</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.idQueue.map((codice, index) => (
                            <tr>
                                <th>{this.state.idQueue[index]}</th>
                                <th>{this.state.title[index]}</th>
                                <th>{this.state.description[index]}</th>
                                <th>{this.state.idOperator[index]}</th>
                                <th>{this.state.numWait[index]}</th>
                                <th> {
                                    this.state.active[index] ? <IoIosCheckmark size={30} /> : <IoIosClose size={30}/>
                                }
                                </th>
                            </tr>
                        ))
                    }
                </tbody>

            </Table>
            
        )
    }
    createQueueForm() {
        return (
            <Form onSubmit={this.handleNewQueue} >
                <Form.Group>
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control ref='title' type="text" placeholder="Nome coda" required />
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control ref='description' type="text" placeholder="Posizione all'interno della struttura" required />
                    <Form.Label>Operatore</Form.Label>
                    {/* <Form.Control custom ref='idOperator' as='select' id={"customSelect"}>
                            <option value='a1'>Uno</option>
                            <option value={this.state.idCompany}>Due</option>
                        </Form.Control> */}
                    <Form.Control ref='idOperator' as="select" >
                        {this.state.listOfOperator.map((codice, index) =>
                            <option value={this.state.listOfOperator[index]}> {this.state.listOfOperator[index]} </option>
                        )
                        }
                    </Form.Control>
                    <Form.Check custom ref='active' id={"customCheck"} type="checkbox" label="La lista é attiva?" />
                </Form.Group>

                <Button bsPrefix="btnStyle one" type="submit">Crea</Button>
            </Form>
        )
    }



    regEmailPassword(event) {
        const email = this.refs.registerEmail.value
        const password = this.refs.registerPwd.value
        const role = ROLES.OPERATOR
    
        secondaryApp.auth().createUserWithEmailAndPassword(email, password)
          .then((result) => {
            console.log(result.user.email)
            this.setState({
              userAuthProvider: result.user,
            //  role: role
            })
            this.mergeRealTimeDbUser()
            this.mergeRealTimeDbCompany()
          }).catch((error) => {
            if (error.code === 'auth/weak-password') {
              alert("La password deve contenere almeno 6 caratteri");
            } else if (error.code === 'auth/invalid-email') {
              alert("Email non valida");
            } else alert("Errore creazione account: " + error)
          })
          secondaryApp.auth().signOut();
        event.preventDefault()
      }

      mergeRealTimeDbUser() {
        const rootUtente = fire.database().ref("users/" + this.state.userAuthProvider.uid)
        rootUtente.on("value", snap => {
          if (snap.val() === null) {
              this.setState({
                  idOperator: snap.key
              })
              console.log(this.state.idOperator)
            rootUtente.set({
                
              name: this.state.userAuthProvider.displayName,
              email: this.state.userAuthProvider.email,
              role: ROLES.OPERATOR,
            }).then((data) => {
              console.log('data ', data)
            }).catch((error) => {
              console.log('error ', error)
            })
            console.log(this.state.userAuthProvider.displayName, this.state.userAuthProvider.uid)
          }
        });
    
      }

      mergeRealTimeDbCompany(props) {
        const rootUtente = fire.database().ref("company/" +this.props.userID +'/operators/'+ this.state.userAuthProvider.uid)
        rootUtente.on("value", snap => {
          if (snap.val() === null) {
            rootUtente.set({
              idOperator : this.state.idOperator
            }).then((data) => {
              console.log('data ', data)
            }).catch((error) => {
              console.log('error ', error)
            })
            console.log(this.state.userAuthProvider.displayName, this.state.userAuthProvider.uid)
          }
        });
    
      }

    createAnOperator() {
        /* return (
            <Form onSubmit={this.handleNewOperator}>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Utente</Form.Label>
                    <Col sm="8">
                        <Form.Control as='select' ref='idUserForOperator' required >
                            {this.state.usersAvailableKey.map((codice, index) => (
                                <option value={codice}>
                                    {this.state.usersAvailableUsername[index]} - {this.state.usersAvailableKey[index]}
                                </option>
                            ))
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Button bsPrefix="btnStyle one" type="submit">Crea operatore</Button>
            </Form>
        ) */


        
            return (
              <div className="formCreazioneOperator">
                <Form onSubmit={this.regEmailPassword}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Inserisci Email" ref='registerEmail' required />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Inserisci Password" ref='registerPwd' required />
                    <Form.Label>Sono uno</Form.Label>
                   
                  </Form.Group>
                  <Button type="submit" bsPrefix="btnStyle one">
                    Crea Operator
                  </Button>
                </Form>
                
              </div>
        
            )
          }

    

    render() {
        return (
            <div className="form">
                <Alert variant="primary">
                    Vuoi creare una nuova coda?
                        <Button variant="outline-primary" onClick={() => this.setState({ showQeueueCreation: !this.state.showQeueueCreation })}>
                        <IoIosArrowDropdownCircle />
                    </Button>
                </Alert>
                <Collapse in={this.state.showQeueueCreation}>
                    {this.createQueueForm()}
                </Collapse>
                <Alert variant="secondary">
                    Vuoi creare un nuovo operatore?
                        <Button  variant="outline-secondary" onClick={() => this.setState({ showOperatorAssign: !this.state.showOperatorAssign })}>
                        <IoIosArrowDropdownCircle />
                    </Button>
                </Alert>
                <Collapse in={this.state.showOperatorAssign}>
                    {this.createAnOperator()}
                </Collapse>

                {this.getQueueList()}
            </div>
        )
    }
}

export default Company;