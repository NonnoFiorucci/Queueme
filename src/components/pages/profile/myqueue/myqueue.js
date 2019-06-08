import React from 'react';

import SimpleCard from '../../../queue/queueCard';
import { Spinner, Button, Modal } from 'react-bootstrap';
import { fire } from '../../../../config/FirebaseConfig';

import '../../../../styles/style.css'

class MyQueueView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            myqueues: [],
            notify: null,
            limit: 5
        }
        this.getMyQueues = this.getMyQueues.bind(this);
        this.pushModal = this.pushModal.bind(this);
        this.getQueueDetails = this.getQueueDetails.bind(this);

    }
    componentDidMount() {
        if (this.props.userID !== null)
            this.getMyQueues();

    }


    handleClose() {
        this.setState({
            notify: null
        })
    }


    pushModal = (quId, pos) => {
        if (this.state.notify === null) {
            this.getQueueDetails(quId)
            this.setState({
                notify: {
                    queue: quId,
                    position: pos
                }
            })
        }
    }

    scanQueues() {
        this.statemyqueues.forEach(queue => {
            this.checkPosition(queue.queueId, this.props.userID)
        })
    }
    checkPosition = (quId, usId) => {
        var pos = 0
        fire.database().ref('queues/' + quId + 'userList/').limitToFirst(3).on('value', snap => {
            snap.forEach((user) => {
                (user.val().userId === usId) ? this.pushModal(quId, pos) : (pos = pos + 1)
                console.log(user.val().userId === usId)
            })
        })
    }
    getQueueDetails = quId => {
        fire.database().ref('queue/' + quId).on('value', snap => {
            this.setState({
                notify: {
                    title: snap.val().title,
                    description: snap.val().description
                }
            })
        })
    }



    getMyQueues() {
        let ref = fire.database().ref('users/' + this.props.userID + '/queuesStatus');
        ref.on('value', snapshot => {
            snapshot.forEach((queue) => {
                this.onShowQueue(queue.val().queueId)
                this.checkPosition(queue.val().queueId, this.props.userID)
            })
        });
    }
    onShowQueue = quId => {
        fire.database().ref('queues/' + quId).on(
            'value', snap => {
                const queueProps = snap.val();
                const allQueuesGetted = Object.keys(queueProps).filter(key => key === quId).map(key => ({
                    active: queueProps[key].active,
                    description: queueProps[key].description,
                    numWait: queueProps[key].numWait,
                    title: queueProps[key].title,
                    queueId: key
                }));
                this.setState({
                    queues: allQueuesGetted,
                    loading: false
                })
            }
        )
    }
    onRemoveUser = quId => {
        const remUserFromQueue = fire.database().ref('queues/' + quId + '/userList/')
        remUserFromQueue.orderByChild('userId').equalTo(this.props.userID).once('value', snap => {
            snap.forEach(n => {
                remUserFromQueue.child(n.key).remove();
            })
        })
        const remQueueFromUser = fire.database().ref('users/' + this.props.userID + '/queuesStatus/')
        remQueueFromUser.orderByChild('queueId').equalTo(quId).once('value', s => {
            s.forEach(n => {
                remQueueFromUser.child(n.key).remove();
            })
        })
    }

    onAddUser = quId => {
        fire.database().ref('queues/' + quId + '/userList/').push({
            userId: (this.props.userID)
        });
        fire.database().ref('users/' + this.props.userID + '/queuesStatus').push({
            queueId: quId
        })
    }

    onAddFavorite = quId => {
        fire.database().ref('users/' + this.props.userID + '/favoriteQueues').push({
            queueId: quId
        })
    }
    onRemoveFavorite = quId => {
        const remQueueFromUser = fire.database().ref('users/' + this.props.userID + '/favoriteQueues/')
        remQueueFromUser.orderByChild('queueId').equalTo(quId).once('value', s => {
            s.forEach(n => {
                remQueueFromUser.child(n.key).remove();
            })
        })
    }



    showNotify() {
        return (
            <Modal show='true' onHide={this.handleClose}>
                <Modal.Header>
                    {this.state.notify.position !== 0 && (<p>Ehi! Tocca quasi a te! Ci sono solo {this.state.notify.position} prima di te </p>)}
                    {this.state.notify.position === 0 && (<p>Ehi! Tocca a te!</p>)}
                </Modal.Header>
                <Modal.Body>
                    La coda {this.state.notify.title} al {this.state.notify.description}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={this.handleClose}> Ho capito! </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        const { myqueues, loading, notify } = this.state;
        if (loading) {
            return (<Spinner color="secondary" />)
        } else {
            if (notify !== null) {
                this.showNotify()
            }
            return (
                <div className="favDiv">
                    <h2 >Le mie code</h2>
                    {/*durante il caricamento da realtimedb*/}
                    {loading && (<Spinner color="secondary" />)}
                    {/*se ci sono code*/}
                    {myqueues &&
                        this.state.myqueues.map(queue => (
                            <SimpleCard
                                queue={queue}
                                userId={this.props.userID}
                                onRemoveUser={this.onRemoveUser}
                                onAddUser={this.onAddUser}
                                onAddFavorite={this.onAddFavorite}
                                onRemoveFavorite={this.onRemoveFavorite} />
                        ))


                    }

                    {this.state.myqueues.length === 0 ?
                        <h3 > Non sei inserito in nessuna coda </h3> : null}

                </div>
            )
        }
    }
}
export default MyQueueView;