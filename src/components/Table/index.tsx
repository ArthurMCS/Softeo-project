/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import AppContext from '../context/AppContext';
import './styles.scss';

export default function ClientTable() {
  const { clients, search } = useContext(AppContext);

  const clientsFiltered = search.length
    ? clients.filter((client) => client.name.toLowerCase().includes(search.toLowerCase()))
    : clients;

  console.log(clients);

  return (
    <div className="table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Valor do Proced.</th>
            <th>Numero de parcelas</th>
            <th>Valor das parcelas</th>
          </tr>
        </thead>
        <tbody>
          {
          clientsFiltered.map((client, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>
                R$
                {client.procedureValue}
              </td>
              <td>
                {client.quotas}
                X
              </td>
              <td>
                R$
                {client.quotaValue}
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </div>
  );
}
