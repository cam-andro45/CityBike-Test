// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from "react";
import {Card, Row, Col, Button, Form} from "react-bootstrap";
import {Auth} from "aws-amplify";

function FederatedSignIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let challengeResponse = '';
    //Auth.configure({authenticationFlowType: 'CUSTOM_AUTH'})
    console.log(username,password)

    let req = await Auth.signIn(username,password)
      /*.then(user => {
        if(user.challengeName === 'CUSTOM_CHALLENGE'){
          Auth.sendCustomChallengeAnswer(user,challengeResponse)
            .then(user => console.log(user))
            .catch(err => console.log(err))
        } else {
          console.log(user)
        }
      });*/
    console.log(req)
  }

  return (
    <Row>
      <Col sm={3}></Col>
      <Col sm={6}>
        <Card style={{width: "100%"}}>
          <Card.Body>
            <Card.Title>
              <h3 style={{textAlign: "center"}}>BIENVENIDO</h3>
            </Card.Title>
            <Card.Text style={{textAlign: "center"}}>
              Seleccione metodo de inicio de sesión
            </Card.Text>
            <Row>
              <Col>
                <Col>
                  {" "}
                  <Button
                    style={{marginTop: '15%'}}
                    block
                    variant="success"
                    onClick={async () =>{
                      try {
                        console.log('2');
                        let req = Auth.federatedSignIn({provider: props.federatedIdName[0]})
                        console.log(req)
                      } catch (error) {
                        console.log(error)
                      }
                    }}
                  >
                    {props.federatedIdName[0]}
                  </Button>
                </Col>
                <Col>
                  {" "}
                  <Button
                    style={{marginTop: '5%'}}
                    block
                    variant="success"
                    onClick={async () =>{
                      try {
                        console.log('2');
                        let req = Auth.federatedSignIn({provider: props.federatedIdName[1]})
                        console.log(req)
                      } catch (error) {
                        console.log(error)
                      }
                    }}
                  >
                    {props.federatedIdName[1]}
                  </Button>
                </Col>
              </Col>
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                      type='text' 
                      placeholder='Ingrese su username'
                      value={username}
                      onChange={e =>{setUsername(e.target.value)}}
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type='password' 
                      placeholder='Ingrese su contraseña'
                      value={password}
                      onChange={e =>{setPassword(e.target.value)}}
                    />
                  </Form.Group>
                  <Button variant='primary' type='submit'>Iniciar sesión</Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={3}></Col>
    </Row>
  );
}

export default FederatedSignIn;
