import React from 'react';
import { fire, secondaryApp } from '../../../config/FirebaseConfig';
import { Form, Table, Button, Collapse, Alert,  } from 'react-bootstrap';
import { IoIosCheckmark, IoIosClose, IoIosArrowDropdownCircle } from "react-icons/io";


import '../../../styles/btnStyle.css';

import * as ROLES from '../../../constants/roles';


class Company extends React.Component {
    usersAvailableKey = [];

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
            
            userAuthProvider: null,

            listOfOperator: [],

            usersAvailableKey: []
        }
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
        dbQueryUser.on('value', snap => {
            snap.forEach(s => {
                this.setState({
                    usersAvailableKey: this.state.usersAvailableKey.concat([s.key])
                })
                console.log(s.key)
            })
        })
         const dbQueryOperator = fire.database().ref('company/' + this.state.idCompany + '/operators/')
         dbQueryOperator.on('value', snap => {
             snap.forEach(s => {
                 this.setState({
                     listOfOperator: this.state.listOfOperator.concat([s.val().idOperator])
                 })
                 console.log(s.val().idOperator)
             })
         })
    }
    //fa una query per visualizzare le code gestite da una determinata azienda ## da sistemare
    showQueues() {
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
                console.log(snap.key)
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
    handleNewOperator(idOp) {
        fire.database().ref('company/' + this.state.idCompany + '/operators/').push({
            idOperator: idOp
        })
            .then((data) => {
                alert("Operatore aggiunto all'azienda");
            })
            .catch((error) => {
                alert(error);
            });
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
                                    this.state.active[index] ? <IoIosCheckmark size={30} /> : <IoIosClose size={30} />
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
                    <Form.Control ref='idOperator' as="select" >
                        {this.state.listOfOperator.map((codice) =>
                            <option value={codice}> {codice} </option>
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
        const name = this.refs.registerName.value
        const role = ROLES.OPERATOR
    
        secondaryApp.auth().createUserWithEmailAndPassword(email, password)
          .then((result) => {
            console.log(result.user.email)
            this.setState({
              userAuthProvider: result.user,
              role: role.OPERATOR
            })
            this.mergeRealTimeDbUser(name)
            this.handleNewOperator(result.user.uid)
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

    mergeRealTimeDbUser(name) {
        const rootUtente = fire.database().ref("users/" + this.state.userAuthProvider.uid)
        rootUtente.on("value", snap => {
          if (snap.val() === null) {
            rootUtente.set({                
              name: name,
              email: this.state.userAuthProvider.email,
              role: ROLES.OPERATOR,
            }).then((data) => {
              console.log('data ', data)
            }).catch((error) => {
              console.log('error ', error)
            })
        }
        });    
    }

    createAnOperator() {      
            return (
              <div className="">
                <Form onSubmit={this.regEmailPassword}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Inserisci Email" ref='registerEmail' required />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Inserisci Password" ref='registerPwd' required />                  
                    <Form.Label>Nome e cognome</Form.Label>
                    <Form.Control type="text" placeholder="Inserisci Nome e Cognome" ref='registerName' required />                  
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
                        <Button variant="outline-secondary" onClick={() => this.setState({ showOperatorAssign: !this.state.showOperatorAssign })}>
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