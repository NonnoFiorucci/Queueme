import React from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Form, Table, Button, Collapse, Alert, Col, Row } from 'react-bootstrap';
import { IoIosCheckmark, IoIosClose, IoIosArrowDropdownCircle } from "react-icons/io";





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
            //--- alterantiva ---
            // listOfQueues: [],
            listOfOperator: [],
            usersAvailableKey: [],
            usersAvailableUsername: []
        }
        this.showQueues = this.showQueues.bind(this);
        this.showOperator = this.showOperator.bind(this);
        this.handleNewQueue = this.handleNewQueue.bind(this);
        this.handleNewOperator = this.handleNewOperator.bind(this)
    }

    getIdCompany() {
        return this.state.idCompany;
    }
    uniqueIDCode() {
        var ID = Date.now();
        return ID;
    }
    componentWillMount() {
        this.showQueues();
        this.showUser();
        this.showOperator();
    }


    //utilizzato nella select del form di creazione di una nuova coda
    /* #region  Query Realtimedatabase da migrare */
    showOperator() {
        const dbQueryOperator = fire.database().ref('company/' + this.state.idCompany + '/operators/')
        dbQueryOperator.on('value', snap => {
            snap.forEach(s => {
                this.setState({
                    listOfOperator: this.state.listOfOperator.concat([s.val().idOperator])
                })
            })
        })
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
        // *** Query per ricavare la lista di code associata a quella azienda **
        const dbQueryQueues = fire.database().ref('queues/').orderByChild('idCompany/').equalTo(this.props.userID);
        dbQueryQueues.on('value', snapQuery => {
            snapQuery.forEach(snap => {
                this.setState({
                    idQueue: this.state.idQueue.concat([snap.key]),
                    title: this.state.title.concat([snap.val().title]),
                    description: this.state.description.concat([snap.val().description]),
                    //image: this.state.image.concat([child.val().image]),
                    //sempre lo stesso perchè la compagnia visualizza solo le sue code
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
        fire.database().ref('operators/' + this.refs.idUserForOperator.value + '/queues/'+ this.props.userID).push({
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
    }

    getQueueList() {
        return (
            <Table striped bordered hover variant="dark">
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
                                    this.state.active[index] ? <IoIosCheckmark /> : <IoIosClose />
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
    createAnOperator() {
        return (
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