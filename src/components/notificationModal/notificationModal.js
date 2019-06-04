import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class MyVerticallyCenteredModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        loading: false,
      
        myqueues: [],
        
        
        limit: 5
    }
    
}

componentDidMount() {
  
  
}


    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              ATTENZIONE
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Il tuo turno si sta avvicinando!</h4>
            <p>
              Nella coda : {this.props.nomeCoda} <br/>
              Rimangono : {this.props.num} persone
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Capito!</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

  export default MyVerticallyCenteredModal;


// THIS IS HOW YOU USE IT IN APP.JS
  /* 
  class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => this.setState({ modalShow: true })}
        >
          Launch vertically centered modal
        </Button>

        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
} 
*/