import React from 'react';
import { Card } from 'react-bootstrap';

import { FaFacebook, FaInstagram, FaTwitter,  FaPhone } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";



function Info() {
    return (
        <div>
           <Card>
  <Card.Header>INFO</Card.Header>
  <Card.Body>
    <blockquote className="blockquote mb-0">
      <p>
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
        erat a ante.{' '}
        <FaFacebook/> <FaInstagram/> <FaTwitter/> <FaPhone/> <MdEmail/>
      </p>
      <footer className="blockquote-footer">
        Someone famous in <cite title="Source Title">Source Title</cite>
      </footer>
    </blockquote>
  </Card.Body>
</Card>

        </div>
    );
}

export default Info;