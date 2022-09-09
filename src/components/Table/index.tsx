/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import AppContext from '../../context/AppContext';
import './styles.scss';

export default function ClientTable() {
  const { clients, search, paymentList } = useContext(AppContext);

  const clientsFiltered = search.length
    ? clients.filter((client) => client.name.toLowerCase().includes(search.toLowerCase()))
    : clients;

  return (
    <div className="table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Valor do Proced.</th>
            <th>Total de parcelas</th>
            <th>Valor das parcelas</th>
            <th>Parcelas pagas</th>
          </tr>
        </thead>
        <tbody>
          {
          clientsFiltered.map((client, index) => (
            <tr key={client.id}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>
                R$
                {Number(client.procedureValue).toFixed(2)}
              </td>
              <td>
                {client.quotas}
                X
              </td>
              <td>
                R$
                {client.quotaValue.toFixed(2)}
              </td>
              <td>
                {
                Number(client.quotas) - paymentList
                  .filter((payment) => payment.id === client.id).length
                }
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </div>
  );
}
