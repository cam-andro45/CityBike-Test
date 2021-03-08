// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import {Navbar, Button} from "react-bootstrap";
import {Auth} from "aws-amplify";

function Navigation(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        &nbsp; AWS Amplify prueba
      </Navbar.Brand>
      {props.token ? (
        <Button style={{textAlign: "right"}} onClick={() =>{ 
            Auth.signOut();
            localStorage.clear();
          }}>
          Cerrar sesión
        </Button>
      ) : null}
    </Navbar>
  );
}

export default Navigation;
