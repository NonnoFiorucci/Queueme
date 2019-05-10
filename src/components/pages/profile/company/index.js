import React from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Card, Form, Table, Button } from 'react-bootstrap';



class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,

            // queueCreation = {
            //     title: '',
            //     desc: '',
            //     idOperator: '',
            //     active: ''
            // },
            idQueue: [],
            title: [],
            description: [],
            idCompany: '',
            idOperator: [],
            numWait: [],
            active: [],

            listOfOperator: []
        }
        this.showQueues = this.showQueues.bind(this);
    }

    expandCreateForm = () => {
        this.setState(state => ({ showCreate: !this.state.showCreate }));
    }

    uniqueIDCode() {
        var ID = Date.now();
        return ID;
    }
    //utilizzato nella select del form di creazione di una nuova coda
    showOperator() {
        const dbQueryOperator = fire.database().ref('operator/').child().orderByChild('idCompany').equalTo(this.state.idCompany)
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
        const dbQueryQueues = fire.database().ref('queue/').orderByChild('idCompany').equalTo(this.state.idCompany);

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

    createNewQueueOnDb(title, description, idOperator, active) {
        fire.database().ref('provacode/' + this.uniqueIDCode()).set({
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
        console.log(this.refs.title.value, this.refs.description.value, this.refs.active.value);      
        //fino a qui i valori arrivano quindi non é il form
        this.createNewQueueOnDb(this.refs.title.value, this.refs.description.value, this.refs.idOperator.value, this.refs.active.value);
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
            <Card>
                <Form onSubmit={this.newQueue}  ref={(form) => { this.segnForm = form }} >
                    <Form.Group >
                        <Form.Label>Titolo</Form.Label>
                        <Form.Control ref='title' type="text" placeholder="Nome coda" required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control ref='description' type="text" placeholder="Posizione all'interno della struttura" required />
                    </Form.Group>
                    <Form.Group  >
                        <Form.Label>Operatore</Form.Label>
                        <Form.Control ref='operator' as="select" >
                            {this.state.listOfOperator.map(
                                operator =>
                                    <option value={operator.operatorId}>{operator.name} [{operator.operatorId}]</option>
                            )
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Check ref='active' type="checkbox" label="La lista é attiva?" />
                    </Form.Group>

                    <Button variant="secondary" type="submit">Crea</Button>


                </Form>
            </Card>
        )
    }
    render() {
        return (
            <div>
                {/* {this.createQueueForm()}
                {this.getQueueList()} */}
            </div>

        )
    }
}

//da sincronizzare con firebase database e riformattare il form
export default Company;