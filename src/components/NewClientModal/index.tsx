/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import getDateQuotas from '../../utils/getDateQuotas';
import AppContext from '../context/AppContext';

export default function NewClientModal() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [procedureValue, setProcedureValue] = useState('');
  const [quotas, setQuotas] = useState('');
  const [serviceDay, setServiceDay] = useState('');

  const {
    clients,
    setClients,
    paymentList,
    setPaymentList,
  } = useContext(AppContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = uuidv4();

    const quotaValue = Number(procedureValue) / Number(quotas);
    const newClient = {
      id,
      name,
      email,
      procedureValue,
      quotas,
      serviceDay,
      quotaValue,
    };

    const list = getDateQuotas(id, serviceDay, quotas, quotaValue);
    const allDates = JSON.parse(localStorage.getItem('paymentDates') || '[]');

    localStorage.setItem('paymentDates', JSON.stringify([...allDates, ...list]));

    setPaymentList([...paymentList, ...list]);

    const allClients = JSON.parse(localStorage.getItem('clients') || '[]');

    localStorage.setItem('clients', JSON.stringify([...allClients, newClient]));

    setClients([...clients, newClient]);

    setName('');
    setEmail('');
    setProcedureValue('');
    setQuotas('');
    setServiceDay('');
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn-modal"
      >
        Cadastrar atendimento
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="nome do cliente"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                required
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
                maxLength={20}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, preencha este campo.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor do procedimento</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                value={procedureValue}
                onChange={(e) => setProcedureValue(e.target.value)}
                required
                data-testid="procedure-value-input"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, preencha este campo.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numero de parcelas</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                value={quotas}
                onChange={(e) => setQuotas(e.target.value)}
                required
                data-testid="number-of-quotas-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data da primeira parcela</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                value={serviceDay}
                onChange={(e) => setServiceDay(e.target.value)}
                required
                data-testid="first-quota-date-input"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, preencha este campo.
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Fechar
              </Button>
              <Button variant="primary" type="submit">
                Cadastrar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
