import React from 'react';

import SimpleCard from './queueCard';
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
        this.onVerifyAlreadyEnqueue = this.onVerifyAlreadyEnqueue.bind(this);
    }
    componentDidMount() {
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
           
        const verify = fire.database().ref('queues/' + quId + '/userList/')
        verify.orderByChild('userId').equalTo(this.props.userID).once( "value")
        .then(function(snap){
           return (snap.exists())
        })
         
    }
    
    onRemoveUser = quId => {
        
        const remQuery = fire.database().ref('queues/' + quId + '/userList/')
        remQuery.orderByChild('userId').equalTo(this.props.userID).once('value', snap=> {
            snap.forEach ( n =>{
                remQuery.child(n.key).remove();
            })
        }

        )

    }
    onAddUser = quId => {
        fire.database().ref('queues/'+ quId + '/userList/').push({
            userId: (this.props.userID)
        });
    }

    render() {
        const { queues, loading } = this.state;
        return(
            <div>
                
                {/*durante il caricamento da realtimedb*/}
                {loading && (<Spinner color="secondary" />)}
                {/*se ci sono code*/}
                {queues && 
                    this.state.queues.map( queue => (
                        <SimpleCard 
                            queue={queue}
                            onRemoveUser={this.onRemoveUser}
                            onAddUser={this.onAddUser} />
                    ) )       
            
                        
                }          
            
            </div>
        )
    }
}
export default QueueView;