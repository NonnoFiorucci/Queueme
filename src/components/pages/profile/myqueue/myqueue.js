import React from 'react';

import SimpleCard from '../../../queue/queueCard';

import { fire } from '../../../../config/FirebaseConfig';

import '../../../../styles/style.css'

class MyQueueView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myqueues: [],
            notify: [],
        }
        this.getMyQueues = this.getMyQueues.bind(this)
    }
    componentDidMount() {
        if (this.props.userID !== null) {
            this.getMyQueues()
        }

    }


    getMyQueues() {
        let ref = fire.database().ref('users/' + this.props.userID + '/queuesStatus');
        ref.on('value', snapshot => {
            snapshot.forEach((queue) => {
                this.onShowQueue(queue.val().queueId)
            })
        });
    }
    onShowQueue = quId => {
        fire.database().ref('queues/' + quId).on(
            'value', snap => {
                if(snap.val()){
                const tryObj = {
                    active: snap.val().active,
                    title: snap.val().title,
                    description: snap.val().description,
                    numWait: snap.val().numWait,
                    queueId: snap.key
                }
                this.setState({
                    myqueues: this.state.myqueues.concat([tryObj])
                })
            }
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

    onAddUser = (quId)=> {
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
    onAddToNotifyQueue = (pos,title,desc) => {
        const elem = {
            position: pos,
            title: title,
            description: desc
        }
        this.setState({
            notify: this.state.notify.concat(elem )
        })

    }
    showAlert(){
        this.state.notify.forEach(elem =>{
            alert("Attenzione tocca a te! Hai " + elem.position +" persone davanti a te nella coda "+elem.title + " "+ elem.description)
        })
    }

    render() {
        const { myqueues } = this.state;
        return (
            <>
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
                                onRemoveFavorite={this.onRemoveFavorite}
                                onAddToNotifyQueue= {this.onAddToNotifyQueue} />
                        ))}
                        {this.showAlert()}

                </div>
            </>
        )

    }
}
export default MyQueueView;