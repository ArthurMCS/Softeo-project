/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AppContext from '../context/AppContext';

export default function NewClientModal() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [procedureValue, setProcedureValue] = useState('');
  const [quotas, setQuotas] = useState('');
  const [payDay, setPayDay] = useState('');

  const { clients, setClients } = useContext(AppContext);

  const handleClose = () => {
    const quotaValue = Number(procedureValue) / Number(quotas);
    const newClient = {
      name,
      email,
      procedureValue,
      quotas,
      payDay,
      quotaValue,
    };

    const allClients = JSON.parse(localStorage.getItem('clients') || '[]');

    localStorage.setItem('clients', JSON.stringify([...allClients, newClient]));

    setClients([...clients, newClient]);

    setName('');
    setEmail('');
    setProcedureValue('');
    setQuotas('');
    setPayDay('');
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cadastrar Cliente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="nome do cliente"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor do procedimento</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                value={procedureValue}
                onChange={(e) => setProcedureValue(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero de parcelas</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                value={quotas}
                onChange={(e) => setQuotas(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data da primeira parcela</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                value={payDay}
                onChange={(e) => setPayDay(e.target.value)}
              />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}