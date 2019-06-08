import React from 'react';

import SimpleCard from '../../../queue/queueCard';
import { Spinner, Button, Modal } from 'react-bootstrap';
import { fire } from '../../../../config/FirebaseConfig';

import '../../../../styles/style.css'

class MyQueueView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myqueues: [],
            notify: null,
            showNot: false,
            posApp: 0,
            limit: 5
        }
        this.getMyQueues = this.getMyQueues.bind(this)
        this.alertQueuePosition = this.alertQueuePosition.bind(this)
    }
    componentDidMount() {
        if (this.props.userID !== null) {
            this.getMyQueues()
        }

    }


    handleClose() {
        this.setState({
            notify: null
        })
    }


    alertQueuePosition = (quId, pos) => {
        if (this.state.notify === null) {
            this.setState({
                notify: {
                    queue: quId,
                    position: pos
                }
            })
            alert("Attenzione! Ci sono "+pos+ " persone prima di te nella fila " )
        }
    }

    // scanQueues() {
    //     console.log(this.state.myqueues)
    //     this.state.myqueues.forEach(queue => {
    //         this.checkPosition(queue.queueId, this.props.userID)
    //     })
    // }
    checkPosition = (quId, usId) => {
        fire.database().ref('queues/' + quId + '/userList').orderByChild('userId').limitToFirst(3).on('value', snap => {
            snap.forEach(us => {
                if (us.val().userId === usId)
                    this.alertQueuePosition(quId, this.state.posApp)
                else
                    this.setState({ posApp: this.state.posApp + 1 })

            })
        })
    }
    // getQueueDetails = quId => {
    //     fire.database().ref('queue/' + quId).on('value', snap => {
    //         return ({
    //             title: snap.val().title,
    //             desc: snap.val().description
    //         })
    //     })
    // }



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
                const tryObj = {
                    active: snap.val().active,
                    title: snap.val().title,
                    description: snap.val().description,
                    numWait: snap.val().numWait,
                    queueId: snap.key
                }
                this.setState({
                    myqueues: this.state.myqueues.concat(tryObj)
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



    // showNotify() {
    //     if (this.state.showNot)
    //         return (
    //             <Modal show={this.state.showNot} onHide={this.handleClose}>
    //                 <Modal.Header>
    //                     {this.state.notify.position !== 0 && (<p>Ehi! Tocca quasi a te! Ci sono solo {this.state.notify.position} prima di te </p>)}
    //                     {this.state.notify.position === 0 && (<p>Ehi! Tocca a te!</p>)}
    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     La coda {this.state.notify.title} al {this.state.notify.description}
    //                 </Modal.Body>
    //                 <Modal.Footer>
    //                     <Button variant="dark" onClick={this.handleClose}> Ho capito! </Button>
    //                 </Modal.Footer>
    //             </Modal>
    //         )
    // }

    render() {
        const { myqueues, notify } = this.state;
        return (
            <>
                {this.showNotify()}
                <div className="favDiv">
                    <h2 >Le mie code</h2>
                    {myqueues.length === 0 ?
                        <h3 > Non sei inserito in nessuna coda </h3> : myqueues.map(queue => (
                            <SimpleCard
                                queue={queue}
                                userId={this.props.userID}
                                onRemoveUser={this.onRemoveUser}
                                onAddUser={this.onAddUser}
                                onAddFavorite={this.onAddFavorite}
                                onRemoveFavorite={this.onRemoveFavorite} />
                        ))}

                </div>
            </>
        )

    }
}
export default MyQueueView;