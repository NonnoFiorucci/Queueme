import React from 'react';
import { Card } from 'react-bootstrap';

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import UnicamLogo from "../../media/LogoQME.png";

import  "../../../styles/style.css";



function Info() {
    return (
      <div>
      <div>
        <br />
        <div
          className="infoCard"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card style={{borderRadius: "20px", width: "18rem", textAlign:'center'}}  text="grey">
            <Card.Header>Queue Me</Card.Header>
            <Card.Body>
              <p>v 1.0.0</p>
              <p>Web, Android, iOS</p>
              <p>
                Sviluppato da:{" "}
                <a
                  href="https://www.unicam.it/"
                  style={{
                    color: "grey",
                    textDecoration: "underline",
                    textDecorationColor: "grey"
                  }}
                >
                  Unicam
                </a>
                <img
                  className="unicamLogo"
                  src={UnicamLogo}
                  alt="unicamLogo"
                />
              </p>
            </Card.Body>
          </Card>
        </div>

        <br />

        <div
          className="infoCard"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card style={{borderRadius: "20px", width: "18rem", textAlign:'center'}}  text="">
            <Card.Header>Seguici</Card.Header>
            <Card.Body>
              <p>
                <a
                  href="https://www.instagram.com/?hl=it"
                  style={{
                    color: "grey",
                    textDecoration: "underline",
                    textDecorationColor: "grey"
                  }}
                >
                  Instagram
                </a>
                <FaInstagram className="infoIcon" />
              </p>
              <p>
                <a
                  href="https://www.facebook.com/"
                  style={{
                    color: "grey",
                    textDecoration: "underline",
                    textDecorationColor: "grey"
                  }}
                >
                  Facebook
                </a>
                <FaFacebook className="infoIcon" />
              </p>
              <p>
                <a
                  href="https://www.youtube.com/"
                  style={{
                    color: "grey",
                    textDecoration: "underline",
                    textDecorationColor: "grey"
                  }}
                >
                  Youtube
                </a>
                <FaYoutube className="infoIcon" />
              </p>
              <p>
                <a
                  href="https://twitter.com/"
                  style={{
                    color: "grey",
                    textDecoration: "underline",
                    textDecorationColor: "grey"
                  }}
                >
                  Twitter
                </a>
                <FaTwitter className="infoIcon" />
              </p>
            </Card.Body>
          </Card>
        </div>

        <br />

        <div
          className="infoCard"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card style={{borderRadius: "20px", width: "18rem", marginBottom:'80px', textAlign:'center'}}  text="grey">
            <Card.Header>Contattaci</Card.Header>
            <Card.Body>
              <p>
                <a
                  href="tel:0123456789"
                  style={{
                    color: "grey",
                    textDecoration: "underline",
                    textDecorationColor: "grey"
                  }}
                >
                  3334445550
                </a>
                <FaPhone className="infoIconTelefona" />
              </p>
              <p>
                <a
                  href="mailto:project.unicam@gmail.com"
                  style={{
                    color: "grey",
                    textDecoration: "underline",
                    textDecorationColor: "grey"
                  }}
                >
                 info@queueme.it
                </a>
                <MdEmail className="infoIcon" />
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    );
}

export default Info;