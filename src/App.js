import React from 'react';
import Router from './Components/Router';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <Container style={{ height: '100%', minHeight: '100vh' }} className="bg-dark d-flex p-0 m-0 flex-column justify-content-center col-12 h-100">
        <Router/>  
    </Container>
  );
}

export default App;
