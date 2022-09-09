/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AppContext from '../../context/AppContext';
import './styles.scss';

export default function ReceivableModal() {
  const [show, setShow] = useState(false);
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const { paymentDateList } = useContext(AppContext);
  const [totalValue, setTotalValue] = useState(0);

  const handleClose = () => {
    setInitialDate('');
    setFinalDate('');
    setTotalValue(0);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initial = new Date(initialDate);
    const final = new Date(finalDate);

    const paymentDatesFiltered = paymentDateList
      .filter((paymentDate) => new Date(paymentDate.date) >= initial
      && new Date(paymentDate.date) <= final);

    const value = paymentDatesFiltered.reduce((acc, curr) => acc + curr.value, 0);

    setTotalValue(value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn-modal">
        Valores a receber por período
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Valores a receber</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Data inicial</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                value={initialDate}
                onChange={(e) => setInitialDate(e.target.value)}
                data-testid="initialDate-input"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Data final</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                value={finalDate}
                onChange={(e) => setFinalDate(e.target.value)}
                data-testid="finalDate-input"
              />
            </Form.Group>
            <div className="btn-and-value-wrapper">
              <Button type="submit">Ver valor</Button>
              {totalValue !== 0 && (
              <h1 data-testid="amounts-receivable">
                R$
                {totalValue.toFixed(2)}
              </h1>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
