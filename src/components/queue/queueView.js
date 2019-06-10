import React from 'react';

import SimpleCard from './queueCard';
import { Spinner } from 'react-bootstrap';
import { fire } from '../../config/FirebaseConfig';
//import Favorite from '../pages/profile/favorite/favorite';
//import {  Route } from 'react-router-dom';

import '../../styles/style.css'

class QueueView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            //code 
            queues: [],
            notify: []
        }
        this.onShowQueue = this.onShowQueue.bind(this);
        // this.onVerifyAlreadyEnqueue = this.onVerifyAlreadyEnqueue.bind(this);
    }
    componentDidMount() {
        this.onShowQueue();
    }
        
    onShowQueue() {
        this.setState({ loading: true });
        fire.database().ref().child('queues/').on(
            'value', snap => {
                const queueProps = snap.val();
                const allQueuesGetted = Object.keys(queueProps).map(key => ({
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


    onAddUser = (quId)=> {
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


    onRemoveFavorite = quId => {        
      
        const remQueueFromUser = fire.database().ref('users/'+this.props.userID+'/favoriteQueues/')
        remQueueFromUser.orderByChild('queueId').equalTo(quId).once('value', s =>{
            s.forEach ( n =>{
                remQueueFromUser.child(n.key).remove();
            })

        })
           
    
    }
    showAlert(){
        this.state.notify.forEach(elem =>{
            alert("Attenzione tocca a te! Hai " + elem.position +" persone davanti a te nella coda "+elem.title + " "+ elem.description)
        })
    }



    render() {
        const { queues, loading } = this.state;
        return(
            <div className="favDiv">
                 <h2>Code Disponibili</h2>
                {/*durante il caricamento da realtimedb*/}
                {loading && (<Spinner color="secondary" />)}
                {/*se ci sono code*/}
                {queues && 
                    this.state.queues.map( queue => (                        
                        <SimpleCard 
                            queue={queue}
                            userId={this.props.userID}
                            onRemoveUser={this.onRemoveUser}
                            onAddUser={this.onAddUser}
                            onAddFavorite={this.onAddFavorite}
                            onRemoveFavorite={this.onRemoveFavorite}               
                            onAddToNotifyQueue= {this.onAddToNotifyQueue}
                            />                          
                            
                    ) )       
            
                        
                }
                {this.showAlert()} 
                    
            
            </div>
        )
    }
}
export default QueueView;