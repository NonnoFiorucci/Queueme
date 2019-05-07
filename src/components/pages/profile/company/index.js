import React from 'react';
import { fire }  from '../../../config/FirebaseConfig';
import { ListGroup, ListGroupItem } from 'reactstrap';

class CreateQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,

            idQueue: [],
            title: [],
            description: [],
            image: [],
            idCompany: '',
            idOperator: [],
            numWait: [],
            active: [],            
        }
    }

    expandCreateForm = () => {
        this.setState( state => ({ showCreate: !state.showCreate}));
    }

    uniqueIDCode() {
        var ID = Date.now();
        return ID;
      }
    //da aggiungere in memoria solamente la lista delle code per quella determinata compagnia
    showQueues() {
        const dbQuery = fire.database.ref().child('queue/');

        dbQuery.once(' value ', snap => {
            snap.forEach(child  => {
                this.setState({
                    idQueue: this.state.idQueue.concat([child.key]),
                    title: this.state.title.concat([child.val().title]),
                    description: this.state.description.concatconcat([child.val().description]),
                    image: this.state.image.concat([child.val().image]),
                    //sempre lo stesso perchè la compagnia visualizza solo le sue code
                    idCompany: this.state.idCompany([child.val().idCompany]),
                    idOperator: this.state.idOperator([child.val().idOperator]),
                    numWait: this.state.idOperator([child.val().numWait]),
                    active: this.state.active([child.val().active])

                })
                
            });
        })
    }
    createNewQueue(idQueue) {
        const 

    }
    newQueue(){
        const idQueue = this.uniqueIDCode();
        const title = this.Title.value;
        const description = this.Description.value;
        const image = this.Image.value;
        const idCompany = this.state.idCompany;
        const idOperator = this.Operator.value;
        if(title === '' || description === ''|| idOperator === ''){
            alert("Compila tutti i campi!");
        } else{
            this.createNewQueue(idQueue,title,description,image,idCompany,idOperator)
        }
    }
}
//da completare