import React from 'react';

import { Card, Button } from 'react-bootstrap';

import { TiPlus, TiDeleteOutline } from 'react-icons/ti';

import '../style.css';


class SimpleQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enqueued: this.props.queue.currentUserEnqueue
            //enqueued: false,
        };
    }
    componentWillMount(){
        console.log(this.props.queue.currentUserEnqueue);
    }
    onToggleAddUserQueue= () =>{
        this.setState({
            enqueued: true
        });
        //punta alla lista di coda
        this.props.onAddUser( this.props.queue.queueId );
    }
    onToggleRemoveUserQueue= () =>{
        this.setState({
            enqueued: false
        });
        //punta alla lista di code
        this.props.onRemoveUser( this.props.queue.queueId );
    }
    render() {
        const { queue } = this.props;
        // console.log(queueState.active, queueState.enqueued);
        return (
            <Card className="QCard">
                <Card.Header> {queue.title} </Card.Header>
                {/* <Card.Img variant="top" src={this.state.image[index]} /> */}
                <Card.Body className="text-left">
                    <Card.Subtitle> {queue.description}</Card.Subtitle>
                    <Card.Text> {queue.numWait} </Card.Text>                  
                </Card.Body>  
                <Card.Footer>
                        <Button className='btnAdd' size="lg" block onClick={this.onToggleAddUserQueue} disabled={(!queue.active || queue.currentUserEnqueue)}>
                            < TiPlus />
                        </Button>
                        <Button className='btnDel' size="lg" block onClick={this.onToggleRemoveUserQueue} disable={!queue.currentUserEnqueue} >
                            < TiDeleteOutline />
                        </Button>
                    </Card.Footer>
            </Card>
        )
    }
}
export default SimpleQueue;