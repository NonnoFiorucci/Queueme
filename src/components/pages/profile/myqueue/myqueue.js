import React from 'react';

import SimpleCard from '../../../queue/queueCard';
import { Spinner } from 'react-bootstrap';
import { fire } from '../../../../config/FirebaseConfig';

class MyQueueView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            myqueues: [],

            limit: 5
        }
        this.getMyQueue = this.getMyQueue.bind(this);

    }
    componentDidMount() {
         if (this.props.userID !== null) 
         this.getMyQueue();

    }

     getMyQueue() {
         console.log(this.props.userID)
         let ref = fire.database().ref().child('users/' + this.props.userID + '/queuesStatus');
         ref.on('value', snapshot => {
             if(snapshot.val() ){
             var fav = snapshot.val();
             Object.keys(fav).map(key => {
                 this.onShowQueue(fav[key].queueId)
                 this.setState({ favque: fav[key] })

             });
            }
         });
     }



    onShowQueue = quId => {
        console.log(quId)
        fire.database().ref().child('queues/').on(
            'value', snap => {
                const queueProps = snap.val();
                const allQueuesGetted = Object.keys(queueProps).filter(key => key === quId).map(key => ({
                    ...queueProps[key],
                    queueId: key
                }));
                console.log(allQueuesGetted)
                this.setState({
                    myqueues: this.state.myqueues.concat(allQueuesGetted),
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

    render() {
        const { myqueues, loading } = this.state;
        if (loading) {
            return (<Spinner color="secondary" />)
        } else {
            return (
                <div>
                    <h2 style={{ textAlign: 'center', marginTop: 20 }}>Le mie code</h2>
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
                    <h3 style={{textAlign:"center"}}> Non sei inserito in nessuna cosa </h3> :null}

                </div>
            )
        }
    }
}
export default MyQueueView;