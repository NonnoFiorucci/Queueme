import React from 'react';
import { Redirect } from 'react-router-dom';
import { fire } from '../../../config/FirebaseConfig';
import { Row, Form, Col, Button} from 'react-bootstrap';

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

        
        event.preventDefault()
    }


    onRenderSelect = () => {
        return (
            <Form onSubmit={this.setWorkingQueue}>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">Scegli coda</Form.Label>
                    <Col sm="8">
                        <Form.Control as='select' ref='choosedQueueId' required >
                            {this.state.queues.map(queue => (
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
        // TODO update queue active: false

    }

    render() {
        return (
            <div className="form">
                {!this.state.workingStatus&&this.onRenderSelect()}                
                {this.state.workingQueueId&&<Redirect to={`/operator/${this.state.workingQueueId}`} />}
            

            </div>
        )

    }
}
export default OperatorView;