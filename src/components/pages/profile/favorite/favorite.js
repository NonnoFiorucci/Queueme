import React from 'react';

import SimpleCard from '../../../queue/queueCard';
import { Spinner } from 'react-bootstrap';
import { fire } from '../../../../config/FirebaseConfig';

class MyQueueView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            //code             
            favorite:[],
            limit: 5
        }
        this.getFavQueue = this.getFavQueue.bind(this);
        
        // this.onVerifyAlreadyEnqueue = this.onVerifyAlreadyEnqueue.bind(this);
    }
    componentDidMount() {
       if(this.props.userID !== null) this.getFavQueue();
    }
    
    
    getFavQueue() {
        console.log(this.props.userID)
        this.setState({ loading: true });
        let ref = fire.database().ref().child('users/'+ this.props.userID +'/favoriteQueues');
        ref.on('value', snapshot => {
          snapshot.forEach(q => {
              this.getPropsFromQueue(q.queueId)
          })     
        });      
       
    }

    getPropsFromQueue = quId => {
        console.log(quId)
        fire.database().ref().child('queues/'+ quId).on(
            'value', snap => {               
                this.setState({                    
                    favorite: this.state.favorite.concat([{key: snap.key, queueProps: snap.val()}]),
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

    onAddFavorite = quId => {
       
      fire.database().ref('users/'+this.props.userID+'/favoriteQueues').push({
          queueId: quId
      })

  }


  onRemoveFavorite = quId => {        
    
      const remQueueFromUser = fire.database().ref('users/'+this.props.userID+'/favoriteQueues/')
      remQueueFromUser.orderByChild('queueId').equalTo(quId).once('value', s =>{
          s.forEach ( n =>{
              remQueueFromUser.child(n.key).remove();
          })

      })
         
  
  }



  render() {
      const { favorite, loading } = this.state;
      return(
          <div>
              <h2 style={{textAlign:'center',marginTop:20}}>Preferiti</h2>
              {/*durante il caricamento da realtimedb*/}
              {loading && (<Spinner color="secondary" />)}
              {/*se ci sono code*/}
              {favorite && 
                  this.state.favorite.map( queue => (
                      <SimpleCard 
                          queue={queue}
                          userId={this.props.userID}
                          onRemoveUser={this.onRemoveUser}
                          onAddUser={this.onAddUser}
                          onAddFavorite={this.onAddFavorite}
                          onRemoveFavorite={this.onRemoveFavorite}                      
                          
                          />
                  ) )       
          
                      
              }          
          
          </div>
        )
    }
}
export default MyQueueView;