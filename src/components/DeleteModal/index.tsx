/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { TiDelete } from 'react-icons/ti';
import AppContext from '../../context/AppContext';
import './styles.scss';

type Props = {
    clientid: string;
}

export default function DeleteModal(props: Props) {
  const { clientid } = props;
  const [show, setShow] = useState(false);
  const {
    clients,
    setClients,
    paymentDateList,
    setPaymentDateList,
  } = useContext(AppContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShow(false);
    const index = clients
      .findIndex((client) => client.id === clientid);
    const newList = paymentDateList.filter((payDate) => payDate.id !== clientid);
    clients.splice(index, 1);
    setClients([...clients]);
    setPaymentDateList(newList);
    localStorage.setItem('clients', JSON.stringify(clients));
    localStorage.setItem('paymentDates', JSON.stringify(newList));
  };

  return (
    <>
      <TiDelete role="button" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <p>Tem certeza que deseja excluir este atendimento?</p>
            <div className="btn-container">
              <Button type="submit">
                Sim
              </Button>
              <Button onClick={handleClose}>
                Não
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
