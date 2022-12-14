/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AppContext from '../../context/AppContext';
import { PaymentDate } from '../../interfaces';

export default function PaymentModal() {
  const [show, setShow] = useState(false);
  const [clientId, setClientId] = useState('');
  const [chosenClientQuotas, setChosenClientQuotas] = useState<PaymentDate[]>([]);
  const [payment, setPayment] = useState('');
  const {
    paymentDateList,
    setPaymentDateList,
  } = useContext(AppContext);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const { clients } = useContext(AppContext);

  useEffect(() => {
    if (clientId) {
      const clientQuotas = paymentDateList.filter((pay) => pay.id === clientId);
      setChosenClientQuotas(clientQuotas);
    }
  }, [clientId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const index = paymentDateList
      .findIndex((pay) => pay.id === clientId && pay.date === payment);
    paymentDateList.splice(index, 1);
    setPaymentDateList([...paymentDateList]);
    localStorage.setItem('paymentDates', JSON.stringify(paymentDateList));
    handleClose();
    setChosenClientQuotas([]);
    setClientId('');
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn-modal">
        Cadastrar pagamento
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar pagamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome do cliente</Form.Label>
              <Form.Control as="select" onChange={(e) => setClientId(e.target.value)} required>
                <option>{}</option>
                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                  >
                    {client.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {
              chosenClientQuotas.length > 0 && (
                <Form.Group className="mb-3">
                  <Form.Label>Parcelas a pagar</Form.Label>
                  <Form.Control as="select" onChange={(e) => setPayment(e.target.value)} required>
                    <option>{}</option>
                    {chosenClientQuotas
                      .map((pay) => (
                        <option
                          key={pay.date}
                          value={pay.date}
                        >
                          Valor:
                          {' '}
                          {pay.value.toFixed(2)}
                          {' '}
                          -
                          {' '}
                          Data:
                          {' '}
                          {pay.date}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              )
            }
            <Modal.Footer>
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
