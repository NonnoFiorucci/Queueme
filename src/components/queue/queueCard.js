import React from 'react';
import { fire } from '../../config/FirebaseConfig';

import { Card, Button, Col, Row, Spinner } from 'react-bootstrap';

import { TiPlus, TiTrash, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';

import '../../styles/style.css';
import '../../styles/btnStyle.css';

class SimpleQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enqueued: "",
            favorite:"",
        }
        this.onRenderVerifyEnqueue = this.onRenderVerifyEnqueue.bind(this);
        this.onRenderFavoriteEnqueue = this.onRenderFavoriteEnqueue.bind(this);
    }
    componentDidMount() {
        this.onRenderVerifyEnqueue();
        this.onRenderFavoriteEnqueue();
    }

    onToggleAddUserQueue = () => {
        this.setState({
            enqueued: !this.state.enqueued
        })
        //punta alla lista di coda
        this.props.onAddUser(this.props.queue.queueId);
    }

    onToggleAddFavoriteQueue =() => {
        this.setState({
            favorite: !this.state.favorite
        })
        this.props.onAddFavorite(this.props.queue.queueId)
    }

    onToggleRemoveFavoriteQueue =() => {
        this.setState({
            favorite: !this.state.favorite
        })
        this.props.onRemoveFavorite(this.props.queue.queueId)
    }

    onToggleRemoveUserQueue = () => {
        this.setState({
            enqueued: !this.state.enqueued
        })
        //punta alla lista di code
        this.props.onRemoveUser(this.props.queue.queueId);
    }
    onRenderVerifyEnqueue = () => {
    
        fire.database().ref('users/' + this.props.userId + '/queuesStatus/')
        .orderByChild('queueId').equalTo(this.props.queue.queueId).on('value',s => {
            if (s.val()){
                this.setState({
                    enqueued: true,
                    
                })
            }
            else{
                this.setState({
                    enqueued: false
                })
            }
        })
    

    }
    onRenderFavoriteEnqueue = () => {
    
        fire.database().ref('users/' + this.props.userId + '/favoriteQueues/')
        .orderByChild('queueId').equalTo(this.props.queue.queueId).on('value',s => {
            if (s.val()){
                this.setState({
                    favorite: false,
                    
                })
            }
            else{
                this.setState({
                    favorite: true,
                })
            }
        })
    

    }
    render() {
        const { queue } = this.props;

        return (
            <Card className="QCard text-center">
                <Card.Header > {queue.title} </Card.Header>
                {/* <Card.Img variant="top" src={this.state.image[index]} /> */}
                <Card.Body className="text-center">
                    <Card.Subtitle> 
                    {queue.description}                         
                        {queue.active && (<Spinner animation="border" variant="success"/>)} 
                        {!queue.active && (<Spinner animation="grow" variant="danger"/>)} 
                    </Card.Subtitle>
                    <Card.Text> Persone in coda: {queue.numWait} </Card.Text>
                    
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col md={{ span: 3, offset: 3  }}>
                            <Button block variant="outline-success" size="sl" onClick={this.onToggleAddUserQueue} disabled={(!queue.active || this.state.enqueued)}>
                                < TiPlus size={40} />
                            </Button></Col>
                            <br/>
                        <Col md={{ span: 3 }}>
                            <Button block variant="outline-danger" size="sl" onClick={this.onToggleRemoveUserQueue} disabled={!this.state.enqueued} >
                                < TiTrash size={40} />
                            </Button></Col>
                            <br/>
                            <Col md={{ span: 3 }}>
                                {this.state.favorite === false  ? <Button block variant="outline-danger" size="sl" onClick={this.onToggleRemoveFavoriteQueue}  >
                                <TiHeartFullOutline  size={40} />
                            </Button>
                            : 
                            <Button block variant="outline-danger" size="sl" onClick={this.onToggleAddFavoriteQueue}  >
                                <TiHeartOutline  size={40} />
                            </Button>}


                            </Col>
                    </Row>
                </Card.Footer>
            </Card>
        )
    }
}
export default SimpleQueue;