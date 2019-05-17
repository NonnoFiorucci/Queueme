import React from 'react';

import QueueCardList from './queueCardList';
import { Spinner } from 'react-bootstrap';
import { fire } from '../../config/FirebaseConfig';

class QueueView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            //code 
            queues: [],
            limit: 5
        }
        this.onShowQueue = this.onShowQueue.bind(this);
    }
    componentWillMount() {
        this.onShowQueue();
    }
    
    onShowQueue() {
        this.setState({ loading: true });
        fire.database().ref().child('queues/').once(
            'value', snap => {
                const queueProps = snap.val();
                const allQueuesGetted = Object.keys(queueProps).map(key => ({
                    ...queueProps[key],
                    queueId: key
                }));
                this.setState({
                    queues: allQueuesGetted,
                    loading: false
                })                
            }
        )
    }
    //TODO fixare sta query che non me rileva 
    onVerifyAlreadyEnqueue = quId =>{
        fire.database().ref('queues/' + quId +'userList/').once('value', snap => {
            return (snap.val()!==null) ? false : true     
        })
    }
    //TODO fixare sta query che non me cancella il tizio
    onRemoveUser = quId => {
        fire.database().ref('queues/' + quId + '/userList/').child(this.props.userID).remove();
    }
    onAddUser = quId => {
        fire.database().ref('queues/'+ quId + '/userList').set();
    }

    render() {
        const { queues, loading } = this.state;
        return(
            <div>
                {/*durante il caricamento da realtimedb*/}
                {loading && (<Spinner color="secondary" />)}
                {/*se ci sono code*/}
                {queues && (
                    <QueueCardList 
                        queues={queues.map(queue => ({
                            ...queue,
                            currentUserEnqueue: this.onVerifyAlreadyEnqueue(queue.queueId)
                        }))}
                        onAddUser={this.onAddUser}
                        onRemoveUser={this.onRemoveUser}
                        />
                )}          
            
            </div>
        )
    }
}
export default QueueView;