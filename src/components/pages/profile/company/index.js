import React from 'react';
import { fire } from '../../../../config/FirebaseConfig';
import { Card, Form, Table, Button } from 'react-bootstrap';



class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxChecked: false,
            showCreate: false,

            idQueue: [],
            title: [],
            description: [],
            idCompany: this.props.userID,
            idOperator: [],
            numWait: [],
            active: [],

            listOfQueues: [],

            listOfOperator: []
        }
        this.showQueues = this.showQueues.bind(this);
        this.handleNewQueue = this.handleNewQueue.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.createNewQueueOnDb = this.createNewQueueOnDb.bind(this);
    }

    expandCreateForm = () => {
        this.setState(state => ({ showCreate: !this.state.showCreate }));
    }
    handleChange(evt) {
        this.setState({ checkboxChecked: evt.target.checked });
    }

    uniqueIDCode() {
        var ID = Date.now();
        return ID;
    }
    componentWillMount() {
        this.showQueues();
        //this.showOperator();

    }
    //utilizzato nella select del form di creazione di una nuova coda
    showOperator() {
        const dbQueryOperator = fire.database().ref('operator/').orderByChild('idCompany/').equalTo(this.state.idCompany)
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
    //fa una query per visualizzare le code gestite da una determinata azienda ## da sistemare
    showQueues() {
        // *** Query per ricavare la lista di code associata a quella azienda **
        const dbQueryQueues = fire.database().ref('queue/').orderByChild('idCompany/').equalTo(this.props.userID);


        dbQueryQueues.on('value', snap => {
            snap.forEach(snap => {
                // const queueValues = snap.val();
                // if (queueValues) {
                //     const queueList = Object.keys(queueValues).map(key => ({
                //         ...queueValues[key]
                //     }));
                //     this.setState({
                //         listOfQueues: queueList
                //     })
                // }


                // console.log(snap.key + ' ' + snap.val());
                    this.setState({
                        idQueue: this.state.idQueue.concat([snap.key]),
                        title: this.state.title.concat([snap.val().titletxt]),
                        description: this.state.description.concat([snap.val().description]),
                        //image: this.state.image.concat([child.val().image]),
                        //sempre lo stesso perchè la compagnia visualizza solo le sue code
                        //idOperator: this.state.idOperator([child.val().idOperator]),
                        numWait: this.state.idOperator.concat([snap.val().number]),
                        active: this.state.active.concat([snap.val().active])
                    })
            });
        })
    }
    // showQueue() {
    //     const dbQueryQueues = fire.database().ref('queue/').orderByChild('idCompany/').equalTo(this.state.idCompany);


    //     dbQueryQueues.once('value', snap => {
    //         snap.forEach(child => {
    //             this.setState({
    //                 idQueue: this.state.idQueue.concat([child.key]),
    //                 title: this.state.title.concat([child.val().title]),
    //                 description: this.state.description.concatconcat([child.val().description]),
    //                 //image: this.state.image.concat([child.val().image]),
    //                 //sempre lo stesso perchè la compagnia visualizza solo le sue code
    //                 idOperator: this.state.idOperator([child.val().idOperator]),
    //                 numWait: this.state.idOperator([child.val().numWait]),
    //                 active: this.state.active([child.val().active])
    //             })
    //         });
    //     })
    // }


    // createNewQueueOnDb(title, description, idOperator, active) {

    // }
    handleNewQueue = (event) => {
        //alert(this.refs.title.value, this.refs.description.value,this.refs.idOperator.value, this.refs.active.checked);      
        //fino a qui i valori arrivano quindi non é il form

        fire.database().ref('queues/' + this.uniqueIDCode).set({
            idCompany: this.props.userID,
            title: this.refs.title.value,
            description: this.refs.description.value,
            idOperator: this.refs.idOperator.value,
            active: this.refs.active.value
        })
            .then((data) => {
                alert(data);
            })
            .catch((error) => {
                alert(error);
            });

        event.preventDefault();
    }

    // firebaseTest() {
    //     fire.database().ref('tt/').push({
    //         prova: 1
    //     }

    //     )
    // }

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
                                <th>{this.state.idQueue[index]}</th>
                                <th>{this.state.title[index]}</th>
                                <th>{this.state.description[index]}</th>
                                <th>{this.state.idOperator[index]}</th>
                            </tr>
                        ))
                    }
                    {/* {
                        this.state.idQueue.map((codice, index) => (
                            <tr>
                                <th>{this.state.}</th>
                                <th>{this.state.title}</th>
                                <th>{this.state.description}</th>
                                <th>{this.state.idOperator}</th>
                            </tr>
                        ))
                    } */}
                </tbody>

            </Table>
        )
    }
    createQueueForm() {
        return (
            <Card>
                <Form onSubmit={this.handleNewQueue} ref={(form) => { this.segnForm = form }} >
                    <Form.Group controlId='formCreateQueue'>
                        <Form.Label>Titolo</Form.Label>
                        <Form.Control ref='title' type="text" placeholder="Nome coda" required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control ref='description' type="text" placeholder="Posizione all'interno della struttura" required />
                    </Form.Group>
                    <Form.Group  >
                        <Form.Label>Operatore</Form.Label>
                        <Form.Control ref='operator' as='select'>
                            <option value='1'>Uno</option>
                        </Form.Control>
                        {/* <Form.Control ref='operator' as="select" >
                            {this.state.listOfOperator.map(
                                operator =>
                                    <option value={operator.operatorId}>{operator.name} [{operator.operatorId}]</option>
                            )
                            }
                        </Form.Control> */}
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
                {this.createQueueForm()}
                {this.getQueueList()}
            </div>

        )
    }
}

//da sincronizzare con firebase database e riformattare il form
export default Company;