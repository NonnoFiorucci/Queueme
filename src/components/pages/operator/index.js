import React from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Row, Form, Col, Button } from 'react-bootstrap';
import WorkingQueue from './operatorWorkingView';

import '../../../styles/style.css';
import '../../../styles/btnStyle.css';


class OperatorView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workingQueueId: '',
            workingStatus: false,
            workingQueue: '',

            queues: []
        }
        this.onMountQueues = this.onMountQueues.bind(this)
        this.onRenderSelect = this.onRenderSelect.bind(this)
        this.setWorkingQueue = this.setWorkingQueue.bind(this)
    }

    componentDidMount() {
        this.onMountQueues()
    }

    setWorkingQueue(event){
        console.log(this.state.workingStatus)
        this.onMountWorkingQueue()
        event.preventDefault();
    }

    onRenderSelect = () => {
        return (
            <Form onSubmit={this.setWorkingQueue}>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Scegli coda</Form.Label>
                        <Col sm="8">
                            <Form.Control as='select' ref='wQueue' required >
                                {this.state.queues.map(queue=> (
                                    <option value={queue.idQueue}>
                                            {queue.idQueue} [{queue.idCompany}]
                                    </option>
                                ))
                                }
                            </Form.Control>
                        </Col>              
                </Form.Group>
                <Button bsPrefix="btnStyle one" type="submit">Lavora la coda</Button>
            </Form>
        )
    }

    onMountQueues= () => {
        this.setState({
            workingQueueId: this.refs.wQueue.value,
            workingStatus: true
        })
        fire.database().ref('operators/'+ this.props.userID +'/').on(
            'value', snapQuery => {
                snapQuery.forEach(snap => {
                    const qProps = snap.val()
                    const allQGetted = Object.keys(qProps).map( k =>({
                        ...qProps[k]
                    }))
                    this.setState({
                        queues: allQGetted 
                    })      
                })
            }
        )

    }

    onMountWorkingQueue = () => {
        fire.database().ref('queues/'+ this.state.workingQueue).on('value', 
        snap => {
            this.setState({
                
                // workingQueue: snap.val()
            })
        })
        // TODO update query active: true
        // fire.database().ref('queues/'+this.workingQueue).update('value', )

    }
    unmountWorkingQueue = () => {
        this.setState({
            workingQueueId: null,
            workingStatus: false,
            workingQueue: null,
        })
        // TODO update query active: false

    }

    render() {
        return (
            <div className="form">
                {this.onRenderSelect()}
                {this.state.workingStatus &&
                    <WorkingQueue 
                        queue= {this.state.workingQueue}
                        queueId= {this.state.workingQueueId}
                        unmountQueue= {this.unmountWorkingQueue}
                    />
                }


            </div>
        )

    }
}
export default OperatorView;