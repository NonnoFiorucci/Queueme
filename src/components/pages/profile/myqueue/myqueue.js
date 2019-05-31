import React from 'react';

import SimpleCard from '../../../queue/queueCard';
import { Spinner } from 'react-bootstrap';
import { fire } from '../../../../config/FirebaseConfig';

class MyQueueView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            //code 
            queues: [],
            appoggio:[],
            limit: 5
        }
        this.onShowQueue = this.onShowQueue.bind(this);
        // this.onVerifyAlreadyEnqueue = this.onVerifyAlreadyEnqueue.bind(this);
    }
    componentDidMount() {
        this.onShowQueue();
    }
    
    onShowQueue() {

        let ref = fire.database().ref().child('users/'+ this.props.userID +'/queuesStatus');
        ref.on('value', snapshot => {
          var fav = snapshot.val();
          Object.keys(fav).map(key=> {
           
            this.onrealshow(fav[key].queueId)
            this.setState({favque:fav[key]})
                 
        }) ;        
        });
       
       
    }



    onrealshow = quId => {
        console.log(quId)
        fire.database().ref().child('queues/').on(
            'value', snap => {
                const queueProps = snap.val();
                const allQueuesGetted = Object.keys(queueProps).filter(key => key == quId).map(key => ({
                    
                    ...queueProps[key],
                    
                    queueId: key
                }));
               console.log(allQueuesGetted)
                this.setState({
                    
                    queues: this.state.queues.concat(allQueuesGetted),
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
                <h2 style={{textAlign:'center',marginTop:20}}>Le mie code</h2>
                {/*durante il caricamento da realtimedb*/}
                {loading && (<Spinner color="secondary" />)}
                {/*se ci sono code*/}
                {queues && 
                    this.state.queues.map( queue => (
                        <SimpleCard 
                            queue={queue}
                            userId={this.props.userID}
                            onRemoveUser={this.onRemoveUser}
                            onAddUser={this.onAddUser} />
                    ) )       
            
                        
                }          
            
            </div>
        )
    }
}
export default MyQueueView;