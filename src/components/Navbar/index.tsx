/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppContext from '../context/AppContext';
import NewClientModal from '../NewClientModal';
import PaymentModal from '../PaymentModal';
import ReceivableModal from '../ReceivableModal';
import './styles.scss';

export default function NavbarComponent() {
  const [state, setState] = useState('');
  const { setSearch, paymentList } = useContext(AppContext);

  useEffect(() => {
    if (!state.length) {
      setSearch('');
    }
  }, [state]);

  const totalValue = useMemo(() => (
    paymentList.reduce((acc, curr) => acc + curr.value, 0).toFixed(2)), [paymentList]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(state);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '400px' }}
            navbarScroll
          >
            <NewClientModal />
            <ReceivableModal />
            <PaymentModal />
          </Nav>
          <h1 data-testid="total-receivable">
            Total a receber:
            {' '}
            R$
            {totalValue}
          </h1>
          <Form className="d-flex" onSubmit={(e) => handleSubmit(e)}>
            <Form.Control
              type="search"
              placeholder="Nome do cliente"
              className="me-2"
              aria-label="Search"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
