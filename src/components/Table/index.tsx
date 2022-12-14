/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import AppContext from '../../context/AppContext';
import DeleteModal from '../DeleteModal';
import './styles.scss';

export default function ClientTable() {
  const { clients, search, paymentDateList } = useContext(AppContext);

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
            <th>Excluir</th>
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
                Number(client.quotas) - paymentDateList
                  .filter((payment) => payment.id === client.id).length
                }
              </td>
              <td className="delete-btn-wrapper">
                <DeleteModal clientid={client.id} />
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </div>
  );
}
