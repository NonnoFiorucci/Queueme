import React from 'react';

import { Card, Button } from 'react-bootstrap';

import { TiPlus, TiDeleteOutline } from 'react-icons/ti';

import '../style.css';


class SimpleQueue extends React.Component {
    constructor(props) {
        this.state = {
            active: props.active,
            enqueued: props.currentUserEnqueue,
        };
    };
    onToggleAddUserQueue= () =>{
        this.setState({
            enqueued: true
        });
        //punta alla lista di code
        this.props.onAddUser( queue.queueId );
    }
    onToggleRemoveUserQueue= () =>{
        this.setState({
            enqueued: false
        });
        //punta alla lista di code
        this.props.onRemoveUser( this.props.queue );
    }
    render() {
        const { queue } = this.props;
        const { queueState } = this.state;
        return (
            <Card className="QCard">
                <Card.Header> {queue.title} </Card.Header>
                {/* <Card.Img variant="top" src={this.state.image[index]} /> */}
                <Card.Body className="text-left">
                    <Card.Subtitle> {queue.description}</Card.Subtitle>
                    <Card.Text> {queue.numWait} </Card.Text>
                    <Card.Footer>
                        <Button className='btnAdd' size="lg" onClick={this.onAddUser} disabled={!queueState.active || queueState.enqueueUser}>
                            < TiPlus />
                        </Button>
                        <Button className='btnDel' size="lg" onClick={this.onRemoveUser} disabled={!queueState.enqueueUser}>
                            < TiDeleteOutline />
                        </Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }
}
export default SimpleQueue;