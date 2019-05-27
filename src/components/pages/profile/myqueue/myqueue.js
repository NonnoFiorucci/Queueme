import React from 'react';


import { Spinner } from 'react-bootstrap';
import { fire } from '../../../../config/FirebaseConfig';

class MyQueueView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            //code 
            queues: [],
          
        }
        this.onShowQueue = this.onShowQueue.bind(this);
        // this.onVerifyAlreadyEnqueue = this.onVerifyAlreadyEnqueue.bind(this);
    }
    componentDidMount() {
        this.onShowQueue();
    }
    
    onShowQueue() {
        this.setState({ loading: true });
        fire.database().ref().child('users/'+ this.props.userID + '/queuesStatus').on(
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
    
    onRemoveUser = quId => {        
        const remUserFromQueue = fire.database().ref('queues/' + quId + '/userList/')
        remUserFromQueue.orderByChild('userId').equalTo(this.props.userID).once('value', snap=> {
            snap.forEach ( n =>{
                remUserFromQueue.child(n.key).remove();
            })
        })
        const remQueueFromUser = fire.database().ref('users/'+this.props.userID+'/queuesStatus/')
        remQueueFromUser.orderByChild('queueId').equalTo(quId).once('value', s =>{
            s.forEach ( n =>{
                remQueueFromUser.child(n.key).remove();
            })

        })
           
    
    }

    onAddUser = quId => {
        fire.database().ref('queues/'+ quId + '/userList/').push({
            userId: (this.props.userID)
        });
        fire.database().ref('users/'+this.props.userID+'/queuesStatus').push({
            queueId: quId
        })

    }

    render() {
        const { queues, loading } = this.state;
        return(
            <div>
                
                {/*durante il caricamento da realtimedb*/}
                {loading && (<Spinner color="secondary" />)}
                {/*se ci sono code*/}
               {/*  {queues && 
                    this.state.queues.map( queue => (
                        <MyQueue 
                            queue={queue}
                            userId={this.props.userID}
                            onRemoveUser={this.onRemoveUser}
                            onAddUser={this.onAddUser} />
                    ) )       
            
                        
                }      */}     
            
            </div>
        )
    }
}
export default MyQueueView;