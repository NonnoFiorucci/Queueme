import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';

import { TiPlus } from 'react-icons/ti';
//import { FiSend } from 'react-icons/fi';




import { Card, Button, CardGroup } from 'react-bootstrap';



import '../../style.css';




class ListaCode extends Component {
  constructor(props) {
    super(props);
    this.state = {

      title: [],
      idCompany: [],
      idQueue: [],
      data: [],
      description: [],
      image: [],
      numWait: [],
      active: [],

      editQueueId: [],


      key: 'home',
      indexModal: null,
    };

    this.showQueue = this.showQueue.bind(this);
    this.enqueueUser = this.enqueueUser.bind(this);

  }

  showQueue() {
    const QueueRef = fire.database().ref();
    const queue = QueueRef.child('queues/')

    queue.once('value', snap => {
      snap.forEach(child => {
        this.setState({
          idQueue: this.state.idQueue.concat([child.key]),
          numWait: this.state.numWait.concat([child.val().numWait]),
          title: this.state.title.concat([child.val().title]),
          description: this.state.description.concat([child.val().description]),
          image: this.state.image.concat([child.val().image]),
          active: this.state.active.concat([child.val().active]),
        });
      });
    });
  }

  //TODO da fixare
  enqueueUser(event) {
    event.preventDefault();
    // fire.database().ref('queues/'+idQueue+'/userList').push(this.props.userID);
    // fire.database().ref('queue/'+idQueue+'/numWait').update({
    //   numWait: this.state.numWait[index] +1
    // }),
    // this.setState(
    //   numWait[index] = this.state.numWait[index]+1
    // )
  }


  uniqueIDCode() {
    var ID = Date.now();
    return ID;
  }




  //TODO da sistemare il card deck in modo da inserire solo 3/4 card per riga
  getQueue() {
    return (
      <div>
        <CardGroup>
        {this.state.idQueue.map((idQueue, index) => (
            <Card className="QCard" key={index}>
              <Card.Header>{this.state.title[index]} </Card.Header>
              {/* <Card.Img variant="top" src={this.state.image[index]} /> */}
              <Card.Body className="text-left">
                <Card.Subtitle> {this.state.description[index]}</Card.Subtitle>
                <Card.Text> {this.state.numWait[index]} </Card.Text>
                <Button className='btnAdd' size="lg" onClick={this.enqueueUser} block disabled={!this.state.active[index]}>< TiPlus /></Button>
              </Card.Body>
            </Card>

        ))
          }}
        </CardGroup>
      </div>
    )
  }
  componentWillMount() {
    this.showQueue()
  }


  render() {
    return (
      <div>
        <h2>Code Disponibili:</h2>
        {this.getQueue()}
      </div>
    );
  }
}



export default ListaCode;