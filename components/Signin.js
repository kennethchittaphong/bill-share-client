import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {
  Button, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import home from './home.png';

function Signin() {
  return (
    <>
      <div className="Home">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/">Bill Share</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/bill/new">Add a bill</Nav.Link>
              <Nav.Link href="/pages/about.js">About</Nav.Link>
            </Nav>
            <Button type="button" className="rounded-pill" onClick={signIn}>
              Log In
            </Button>
          </Container>
        </Navbar>
        <Image
          src={home}
          alt="home"
          className="container-div"
        />
      </div>
    </>

  );
}

export default Signin;
