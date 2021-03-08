// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useState} from "react";
import {Card, Row, Col, Button, Modal, Spinner} from "react-bootstrap";
import axios from 'axios'


function MainRequest(props) {
  const [json, setJson] = useState(null);
  const [show, setShow] = useState(false);

  function handleSubmit() {
    setShow(true);
    getData();
  }

  function handleClose() {
    setJson(null);
    setShow(!show);
  }

  async function getData() {
    const apiName = "https://gkv4u90k8f.execute-api.us-east-1.amazonaws.com/dev/servicio";
    //const apiName = "https://cvcpud9n35.execute-api.us-east-1.amazonaws.com/dev/users/create";
    const myInit = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: props.token
      }
    };
    const req =  await axios.get(apiName, myInit);
    console.log(req)
    setJson(req.data.message + req.data.userpoolID);
    return req
  }

  return (
    <>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <Card style={{width: "100%"}}>
            <Card.Body>
              <Card.Title>
                <h3 style={{textAlign: "center"}}>Bienvenido </h3>
              </Card.Title>
              <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                  {" "}
                  <Button
                    variant="outline-success"
                    onClick={handleSubmit}
                    block
                  >
                    Consumir servicio
                  </Button>
                </Col>
                <Col sm={2}> </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}></Col>
      </Row>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h3 style={{textAlign: "center"}}>Respuesta</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {json ? (
            <p>Aqui esta la respuesta: <b>{json}</b></p>
          ) : (
            <h3 style={{textAlign: "center"}}>
              <Spinner animation="border" variant="primary" />
            </h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MainRequest;
