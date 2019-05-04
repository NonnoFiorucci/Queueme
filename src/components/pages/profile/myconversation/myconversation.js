import React from "react";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

function MyConversation() {
  return (
    <div>
      <Button variant="info" href="/profile">
        <FaAngleLeft />
      </Button>

      <br />
      <br />

      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        overlay={
          <Popover id={`popover-positioned-bottom`} title={`Conversazione 1`}>
            <h1>ciao</h1>
            <h1>ciao</h1>
            <h1>ciao</h1>
          </Popover>
        }
      >
        <Button variant="outline-info">Conversazione 1</Button>
      </OverlayTrigger>
    </div>
  );
}

export default MyConversation;
