import React from 'react';
import { fire } from '../../config/FirebaseConfig';

import { Card, Button, Row } from 'react-bootstrap';

import { TiPlus, TiTrash, TiStarOutline, TiStarFullOutline } from 'react-icons/ti';

import '../../styles/style.css';
import '../../styles/btnStyle.css';

class SimpleQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enqueued: "",
            favorite: "",
            lastNumber: 0,
            notified: false
        }
        this.onRenderVerifyEnqueue = this.onRenderVerifyEnqueue.bind(this);
        this.onRenderFavoriteEnqueue = this.onRenderFavoriteEnqueue.bind(this);
        this.checkPosition = this.checkPosition.bind(this);
    }
    componentDidMount() {
        this.onRenderVerifyEnqueue();
        this.onRenderFavoriteEnqueue();
        this.checkPosition(this.props.userId)
    }
    onToggleAddUserQueue = () => {
        this.setState({
            enqueued: !this.state.enqueued
        })
        //punta alla lista di coda
        this.props.onAddUser(this.props.queue.queueId);
    }

    onToggleAddFavoriteQueue = () => {
        this.setState({
            favorite: !this.state.favorite
        })
        this.props.onAddFavorite(this.props.queue.queueId)
    }

    onToggleRemoveFavoriteQueue = () => {
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
            .orderByChild('queueId').equalTo(this.props.queue.queueId).on('value', s => {
                if (s.val()) {
                    this.setState({
                        enqueued: true
                    })
                }
                else {
                    this.setState({
                        enqueued: false
                    })
                }
            })
    }

    onRenderFavoriteEnqueue = () => {
        fire.database().ref('users/' + this.props.userId + '/favoriteQueues/')
            .orderByChild('queueId').equalTo(this.props.queue.queueId).on('value', s => {
                if (s.val()) {
                    this.setState({
                        favorite: false,
                    })
                }
                else {
                    this.setState({
                        favorite: true,
                    })
                }
            })
    }

    checkPosition = usId => {
            var position = 0
            fire.database().ref('queues/' + this.props.queue.queueId + '/userList').orderByChild('userId').limitToFirst(3).on('value', snap => {
                snap.forEach(us => {
                    if (us.val().userId === usId && !this.state.notified) {
                        this.props.onAddToNotifyQueue(position, this.props.queue.title, this.props.queue.description)
                    }
                    else
                        position = position + 1
                })
            })
        
    }



    render() {

        const { queue } = this.props;
        return (
            <>
                <Card className="QCard text-center">
                    <Card.Header className="QActive"> {queue.title}
                        {this.state.favorite === false ?
                            <Button variant="outline-warning" onClick={this.onToggleRemoveFavoriteQueue}  >
                                <TiStarFullOutline size={25} />
                            </Button>
                            :
                            <Button variant="outline-warning" onClick={this.onToggleAddFavoriteQueue}  >
                                <TiStarOutline size={25} />
                            </Button>}
                    </Card.Header>
                    {/* <Card.Img variant="top" src={this.state.image[index]} /> */}
                    <Card.Body >
                        <Card.Subtitle>
                            {queue.description}
                        </Card.Subtitle>
                        <Card.Text className="QNumber"> Persone in coda: {queue.numWait} </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row className="justify-content-center" md={{ span: 1, offset: 3 }}>
                            <Button variant="outline-success" onClick={this.onToggleAddUserQueue} disabled={(!queue.active || this.state.enqueued)}>
                                < TiPlus size={40} />
                            </Button>
                            <br />
                            <Button variant="outline-danger" onClick={this.onToggleRemoveUserQueue} disabled={!this.state.enqueued} >
                                < TiTrash size={40} />
                            </Button>
                        </Row>
                    </Card.Footer>
                </Card></>
        )
    }
}
export default SimpleQueue;