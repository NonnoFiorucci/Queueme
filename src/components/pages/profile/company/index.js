import React from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Form, Table, Row, Button } from 'react-bootstrap';


class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,

            idQueue: [],
            title: [],
            description: [],
            idCompany: this.props.userID,
            idOperator: [],
            numWait: [],
            active: [],

            listOfOperator: []
            // operatorName: [],
            // operatorId: []
        }
        this.showQueues = this.showQueues.bind(this);
    }

    expandCreateForm = () => {
        this.setState(state => ({ showCreate: !state.showCreate }));
    }
 
    uniqueIDCode() {
        var ID = Date.now();
        return ID;
    }
    //utilizzato nella select del form di creazione di una nuova coda
    showOperator() {
        const dbQueryOperator = fire.database().ref().child('operator/').orderByChild('idCompany').equalTo(this.state.idCompany)
        dbQueryOperator.on('value', snap => {
            const previusList = this.state.listOfOperator;
            previusList.append({
                operatorKey: snap.key,
                operatorId: snap.val().operatorId,
                operatorName: snap.val().operatorName
            })
            this.setState({
                listOfOperator: previusList,
            })
        })
    }
    //fa una query per visualizzare le code gestite da una determinata azienda
    showQueues() {
        const dbQueryQueues = fire.database().ref().child('queue').orderByChild('idCompany').equalTo(this.state.idCompany);

        dbQueryQueues.once('value', snap => {
            snap.forEach(child => {
                this.setState({
                    idQueue: this.state.idQueue.concat([child.key]),
                    title: this.state.title.concat([child.val().title]),
                    description: this.state.description.concatconcat([child.val().description]),
                    //image: this.state.image.concat([child.val().image]),
                    //sempre lo stesso perchè la compagnia visualizza solo le sue code
                    idOperator: this.state.idOperator([child.val().idOperator]),
                    numWait: this.state.idOperator([child.val().numWait]),
                    active: this.state.active([child.val().active])
                })
            });
        })
    }
    
    createNewQueueOnDb(idQueue, title, description, idOperator, active) {
        fire.database().ref('queue/' + idQueue).set({
            idCompany: this.props.userID,
            title: title,
            description: description,
            idOperator: idOperator,
            active: active
        })
            .then((data) => {
                console.log('data', data)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }
    newQueue = event => {

        if (this.refs.title.value === '' || this.refs.description === '')
            alert("Compila i campi base")
        else
            this.createNewQueueOnDb(this.uniqueIDCode, this.refs.title.value, this.refs.description.value, this.refs.idOperator.value, this.refs.active.value)
        event.preventDefault();
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
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.idQueue.map((codice, index) => (
                            <tr>
                                <th>{this.state.idQueue}</th>
                                <th>{this.state.title}</th>
                                <th>{this.state.description}</th>
                                <th>{this.state.idOperator}</th>
                            </tr>
                        ))
                    }
                </tbody>

            </Table>
        )
    }
    createQueueForm() {
        return (
            <Form onSubmit={this.newQueue} >
                <Form.Group as={Row} controlId="title">
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control type="text" placeholder="Nome coda" required/>
                </Form.Group>
                <Form.Group as={Row} controlId="description">
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control type="text" placeholder="Posizione all'interno della struttura" required/>
                </Form.Group>
                <Form.Group as={Row} controlId="operator">
                    <Form.Label>Operatore</Form.Label>
                    <Form.Control as="select" required>
                        {this.state.listOfOperator.map(
                            operator =>
                            <option value={operator.operatorId}>{operator.name} [{operator.operatorId}]</option>
                            )
                        }
                    </Form.Control>
                </Form.Group>                
                <Form.Group controlId="Active">
                    <Form.Check type="checkbox" label="La lista é attiva?"/>
                </Form.Group>
                <Form.Group>
                    <Button variant="second" type="submit"/> 

                </Form.Group>
            </Form>            
        )
    }
    render(){
        return(
            <div>
                {this.createQueueForm()} 
                {this.getQueueList()}  
            </div>
            
        )
    }
}

//da sincronizzare con firebase database e riformattare il form
export default Company;