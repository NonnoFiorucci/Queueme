import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';


import { TiDeleteOutline } from 'react-icons/ti';
import { TiPlus } from 'react-icons/ti';
import { FiSend } from 'react-icons/fi';




import { Card, Button, Form } from 'react-bootstrap';



import '../../style.css';



class ListaCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      codice: [],
      number: [],

      titletxt: [],
      description: [],
      image: [],
      idCompany: [],
      data: [],
      key: 'home',
      indexModal: null,
    };

    this.showQueue = this.showQueue.bind(this);

  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  showQueue() {
    const QueueRef = fire.database().ref();
    const queue = QueueRef.child('queue/')

    queue.once('value', snap => {
      snap.forEach(child => {
        this.setState({
          codice: this.state.codice.concat([child.key]),
          number: this.state.number.concat([child.val().number]),

          titletxt: this.state.titletxt.concat([child.val().titletxt]),
          description: this.state.description.concat([child.val().description]),
          image: this.state.image.concat([child.val().image]),
        });
      });
    });
  }


  writeQueue(codice, idAzienda, Titolo, Descrizione, Immagine) {
    fire.database().ref('queue/' + codice).set({
      idCompany: idAzienda,
      titletxt: Titolo,
      description: Descrizione,
      number: 0,
      image: Immagine,
    }).then((data) => {
      //success callback
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  }

  uniqueIDCode() {
    var ID = Date.now();
    return ID;
  }

  addQueue() {
    /* const codice = this.accountInput.value
    const idUtente = this.usernameInput.value */
    const titolo = this.Titolo.value
    const descrizione = this.Descrizione.value

    const image = this.Immagine.value

    const numero = 0;

    const codiceQueue = this.uniqueIDCode();
    //const data = this.getData();
    if (titolo !== '') {
      if (codiceQueue !== '' && codiceQueue !== null) {
        this.writeQueue(codiceQueue, this.props.userID, titolo, descrizione, numero, image) //id=this.state.userID
        alert('Coda ' + codiceQueue + ' inviata correttamente')
      } else {
        alert('Errore generazione codice coda, riprova')
      }
    } else {
      alert("Tutti i campi devono essere compilati")
    }
    this.segnForm.reset();
  }

  resetForm() {
    this.segnForm.reset();
  }




  getQueueForm() {
    return (
      <div className="QueueForm">
        <Form onSubmit={() => { this.addQueue() }} ref={(form) => { this.segnForm = form }}>
          <Card  >

            <Card.Header style={{ fontWeight: 'bold' }}>Crea coda</Card.Header>
            <Card.Body>
              <Card.Text>
                <Form.Group controlId="formBasicInput">

                  <Form.Group className="testoForm" controlId="formBasicInput">
                    <Form.Label style={{ fontWeight: 'bold' }}> Titolo: </Form.Label>
                    <Form.Control className="testoForm" as="textarea" rows="1" ref={(input) => { this.Titolo = input }} />
                    <Form.Label style={{ fontWeight: 'bold' }}> Descrizione: </Form.Label>
                    <Form.Control className="testoForm" as="textarea" rows="2" ref={(input2) => { this.Descrizione = input2 }} />
                    <Form.Label style={{ fontWeight: 'bold' }}> Immagine: </Form.Label>
                    <Form.Control className="testoForm" as="textarea" rows="2" ref={(input3) => { this.Immagine = input3 }} />
                  </Form.Group>
                </Form.Group>
              </Card.Text>
              <Button variant="success" style={{ fontWeight: 'bold' }} className="segnalazioneButton" type="submit">Invia<FiSend className="blogIcon" />
              </Button>
              <Button variant="danger" style={{ fontWeight: 'bold' }} className="segnalazioneButton"
                onClick={() => { this.resetForm() }} ref={(form) => { this.segnForm = form }}>Reset Dati Inseriti 
                    <TiDeleteOutline className="blogIcon" />
              </Button>
            </Card.Body>
          </Card>
        </Form>
      </div>
    )
  }






  getQueue() {

    return (
      <div>
        {this.state.codice.map((codice, index) => (
          <div  >
            <br />
            <Card className="QCard" >
              {/* <Card.Img variant="top" src={this.state.image[index]} /> */}
              <Card.Body>
                <Card.Title>{this.state.titletxt[index]}  </Card.Title>
                <Card.Text>
                  {this.state.description[index]}
                  <br />
                  {this.state.number[index]}
                </Card.Text>
                <Button className ='btnAdd'>< TiPlus /></Button>
                
              </Card.Body>
            </Card>
            <br />


          </div>
        ))}

      </div>
    )
  }




  componentDidMount() {
    this.showQueue()
  }


  render() {


    return (
      <div>
        {/*    IF AZIENDA    */}

        {this.getQueueForm()}




        {/*    IF UTENTE    */}
        <p>Code Disponibili:</p>
        {this.getQueue()}


      </div>
    );
  }
}



export default ListaCode;