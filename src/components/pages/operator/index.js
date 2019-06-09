import React from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Button,Row, Form, Col} from 'react-bootstrap';
import WorkingQueue  from './operatorWorkingView';

import '../../../styles/style.css';
import '../../../styles/btnStyle.css';


class OperatorView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workingQueueId: '',
            workingStatus: false,
            queues: []
        }
        this.setWorkingQueue = this.setWorkingQueue.bind(this)        
        this.showOperatorQueues = this.showOperatorQueues.bind(this)
    }
    componentDidMount() {
        this.showOperatorQueues()
    }


    setWorkingQueue = event => {
        this.setState({
            workingQueueId: this.refs.choosedQueueId.value,
            workingStatus: true
        })
        fire.database().ref('queues/'+this.state.queueId).update({
            active: true
        })       
        event.preventDefault()
    }


    onRenderSelect = () => {
        return (
            <Form onSubmit={this.setWorkingQueue}>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Scegli coda</Form.Label>
                    <Col sm="8">
                        <Form.Control as='select' ref='choosedQueueId' onChange={this.setWorkingQueue} required disabled={this.state.workingStatus} >
                            {this.state.queues.map(queue => (
                                <option value={queue.idQueue}>
                                    {queue.idQueue} [{queue.idCompany}]
                                    </option>
                            ))
                            }
                        </Form.Control>
                    </Col>
                    <Button type="submit" bsPrefix="btnStyle one">
                        Attiva coda
                    </Button>
                </Form.Group>
            </Form>
        )
    }


    showOperatorQueues = () => {
        fire.database().ref('operators/' + this.props.userID + '/').on(
            'value', snapQuery => {
                snapQuery.forEach(snap => {
                    const qProps = snap.val()
                    const allQGetted = Object.keys(qProps).map(k => ({
                        ...qProps[k]
                    }))
                    this.setState({
                        queues: allQGetted
                    })
                })
            }
        )

    }
    
    unmountWorkingQueue = () => {
        this.setState({
            workingQueueId: null,
            workingStatus: false,
            workingQueue: null,
        })
        fire.database().ref('queues/'+this.state.queueId).update({
            active: true
        })

    }

    render() {
        return (
            <div className="form">
                {this.onRenderSelect()}                
                {this.state.workingQueueId&&
                    (
                        <WorkingQueue 
                            queueId={this.state.workingQueueId}
                            unmountQueue={this.unmountWorkingQueue}
                            />
                    )} 
                {/* <Redirect to={`/operator/${this.state.workingQueueId}`} /> */}
            

            </div>
        )

    }
}
export default OperatorView;