// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, {useEffect, useState, Fragment} from "react";
import Amplify, {Auth, Hub} from "aws-amplify";
import {Container} from "react-bootstrap";

import Navigation from "./components/Navigation.js";
import FederatedSignIn from "./components/FederatedSignIn.js";
import MainRequest from "./components/MainRequest.js";
import "./App.css";

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_jCOnOGPsz",
    userPoolWebClientId: "5thfncg26mnuh36342gt8r0r1s",
    //authenticationFlowType: 'CUSTOM_AUTH',
    oauth: {
      domain: "eficiente-test.auth.us-east-1.amazoncognito.com",
      scope: ["openid"],
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "https://google.com",
      responseType: "code"
    }
  }
});

const federatedIdName = ["a2censo","tsf"]

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({payload: {event, data}}) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          setToken("grating...");
          getToken().then(userToken => {
            setToken(userToken.idToken.jwtToken);
            localStorage.setItem('token',userToken.idToken.jwtToken)
          });
          break;
        case "signOut":
          setToken(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
        default:
          break;
      }
    });
  }, []);

  function getToken() {
    return Auth.currentSession()
      .then(session => session)
      .catch(err => console.log(err));
  }

  return (
    <Fragment>
      <Navigation token={token} />
      <Container fluid>
        <br />
        {token ? (
          <MainRequest token={token} />
        ) : (
            <FederatedSignIn federatedIdName={federatedIdName} />
        )}
        <br />
      </Container>
    </Fragment>
  );
}

export default App;
