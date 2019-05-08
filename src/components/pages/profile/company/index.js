import React from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Form, FormGroup, Label, Col, Input, Button, Table } from 'react-bootstrap';


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
        const dbQueryOperator = fire.database.ref('/operator').orderByChild('idCompany').equalTo(this.state.idCompany)
        dbQueryOperator.once('value', snap => {
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
        const dbQuery = fire.database.ref('/queue').orderByChild('idCompany').equalTo(this.state.idCompany)

        dbQuery.once(' value ', snap => {
            snap.forEach(child => {
                this.setState({
                    idQueue: this.state.idQueue.concat([child.key]),
                    title: this.state.title.concat([child.val().title]),
                    description: this.state.description.concatconcat([child.val().description]),
                    image: this.state.image.concat([child.val().image]),
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
            <Table striped>
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
            <Form onSubmit={this.newQueue}>
                <FormGroup row>
                    <Label for="title" sm={2}>Titolo</Label>
                    <Col sm={10}>
                        <Input type="text" name="email" id="title" placeholder="with a placeholder" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="description" sm={2}>Descrizione</Label>
                    <Col sm={10}>
                        <Input type="text" name="password" id="description" placeholder="password placeholder" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="idOperator">Seleziona l'operatoré </Label>
                    <Input type="select" name="select" id="idOperator">
                        {this.state.listOfOperator.map(operator =>
                            <option value={operator.operatorId}>{operator.name}+ [{operator.operatorId}</option>
                        )

                        }
                    </Input>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" id="active"/>
                        La coda deve essere attiva sin da subito_
                    </Label>
                </FormGroup>
                <Button type="submit" variant="secondary">Crea</Button>
            </Form>

        )
    }
}

//da usare gli elementi di react bootstrap
export default Company;