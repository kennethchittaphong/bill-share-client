/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {
  Button, Container, Nav,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Bill Share</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/bill/new">Add a bill</Nav.Link>
          <Nav.Link href="/pages/about.js">About</Nav.Link>
        </Nav>
        <Button type="button" className="rounded-pill btn-primary" onClick={signOut}>
          Sign Out
        </Button>
      </Container>
    </Navbar>
  );
}
