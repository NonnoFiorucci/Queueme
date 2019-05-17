import React from 'react';

import QueueCardList from './queueCardList';
import { Spinner } from 'reactstrap';
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
    componentDidMount() {
        this.onShowQueue();
    }
    
    onShowQueue() {
        this.setState({ loading: true });
        fire.database().ref().child('queues/').once(
            'value', snap => {
                const queueProps = snap.val();
                allQueuesGetted = Object.keys(queueProps).map(key => ({
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
    onVerifyAlreadyEnqueue(){
        fire.database().ref()
        return 
    }

    onRemoveUser = queueId => {
        //fare la query per rimuovere l'utente dalla coda
        //decrementare il contatore
    }
    onAddUser = queueId => {
        //fare la query per aggiungere l'utente dalla coda
        //decrementare il contatore
    }

    rendere() {
        return(
            <div>
                //durante il caricamento da realtimedb
                {loading && (<Spinner color="secondary" />)}
                //se ci sono code
                {queues && (
                    <QueueCardList 
                        queues={

                        }
                )}
            
            
            </div>
        )
    }


}