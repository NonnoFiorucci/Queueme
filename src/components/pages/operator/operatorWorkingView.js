import React from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Card, Row, Col, Button } from 'react-bootstrap';

import { TiArrowShuffle, TiDelete } from 'react-icons/ti';

import '../../../styles/style.css';
import '../../../styles/btnStyle.css';

class WorkingQueue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            queue: {},
            currentUser: null
        }
        this.showCurrentUser = this.showCurrentUser.bind(this)
    }
    componentDidMount() {

        this.showQueue()
        this.showCurrentUser()
    }
    onToggleNextUser() {
       if(this.state.currentUser) {const shiftQueue = fire.database().ref('queues/' + this.props.queueId + '/userList')
        shiftQueue.limitToFirst(1).orderByChild('userId').equalTo(this.state.currentUser)
        .once('value', s=> {
            s.forEach( n => {
                shiftQueue.child(n.key).remove()                
            })
        })}

    }

    showCurrentUser() {
        const cUser = fire.database().ref('queues/' + this.props.queueId + '/userList')
        cUser.limitToFirst(1)
        .on('value', s=> {
            s.forEach( n => {
              if(n){
                  this.setState({currentUser: n.val().userId})
                }
            })
        })
    }

    showQueue() {
        fire.database().ref('queues/' + this.props.queueId + '/').on(
            'value', snapQuery => {
                this.setState({
                    queue: snapQuery.val()
                })

            }
        )
    }
    render() {

        return (
          
            <div>  
           
                {this.state.queue && (
                    <Card className="QCard text-center">
                        <Card.Header> {this.state.queue.title} </Card.Header>
                        <Card.Body>
                        <Card.Subtitle>
                            {this.state.queue.description}
                        </Card.Subtitle>
                        <Card.Text> Persone in coda: {this.state.queue.numWait} </Card.Text>
                        <Row>
                            <Col md={{ span: 3, offset: 3 }}>
                                <Button block variant="outline-success" size="sl" onClick={this.onToggleNextUser} >
                                    < TiArrowShuffle size={40} />
                                </Button></Col>
                            <Col md={{ span: 3 }}>
                                <Button block variant="outline-danger" size="sl" onClick={this.props.unmountQueue} >
                                    < TiDelete size={40} />
                                </Button></Col>
                        </Row>
                        </Card.Body>
                    <Card.Footer>
                        {this.state.currentUser}
                    </Card.Footer>
                    </Card>
            )}
            </div>

        )
    }
}
export default WorkingQueue;