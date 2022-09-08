/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('Testes', () => {
  beforeAll(async () => {
    await act(async () => {
      render(
        <App />,
      );
    });

    const addNewClientBtn = await screen.findByText('Cadastrar atendimento');
    expect(addNewClientBtn).toBeInTheDocument();
    fireEvent.click(addNewClientBtn);

    const newClientNameInput = screen.getByPlaceholderText('nome do cliente');
    expect(newClientNameInput).toBeInTheDocument();

    const newClientEmailInput = screen.getByPlaceholderText('name@example.com');
    expect(newClientEmailInput).toBeInTheDocument();

    const newClientProcedureValue = screen.getByTestId('procedure-value-input');
    expect(newClientProcedureValue).toBeInTheDocument();

    const newClientNumberQuotas = screen.getByTestId('number-of-quotas-input');
    expect(newClientNumberQuotas).toBeInTheDocument();

    const firstQuotaDateInput = screen.getByTestId('first-quota-date-input');
    expect(firstQuotaDateInput).toBeInTheDocument();

    fireEvent.change(newClientNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(newClientEmailInput, { target: { value: 'johnDoe@gmail.com' } });
    fireEvent.change(newClientProcedureValue, { target: { value: '1000' } });
    fireEvent.change(newClientNumberQuotas, { target: { value: '10' } });
    fireEvent.change(firstQuotaDateInput, { target: { value: '2022-10-01' } });

    const submitBtn = screen.getByText('Cadastrar');
    fireEvent.click(submitBtn);
  });

  it('Testa ao cadastrar um novo atendimento', async () => {
    const customerName = screen.getByText('John Doe');
    expect(customerName).toBeInTheDocument();

    const procedureValue = screen.getByText('R$1000.00');
    expect(procedureValue).toBeInTheDocument();

    const totalOfQuotas = screen.getByText('10X');
    expect(totalOfQuotas).toBeInTheDocument();

    const paidQuotas = screen.getByText('0');
    expect(paidQuotas).toBeInTheDocument();
  });

  it('Testa a funcionalidade de ver os valores ao receber por período', async () => {
    await act(async () => {
      render(
        <App />,
      );
    });

    const receivableBtn = await screen.findByText('Valores a receber por período');
    expect(receivableBtn).toBeInTheDocument();
    fireEvent.click(receivableBtn);

    const initialDateInput = await screen.findByTestId('initialDate-input');
    expect(initialDateInput).toBeInTheDocument();
    fireEvent.change(initialDateInput, { target: { value: '2022-10-01' } });
    const finalDateInput = await screen.findByTestId('finalDate-input');
    expect(finalDateInput).toBeInTheDocument();
    fireEvent.change(finalDateInput, { target: { value: '2022-10-31' } });

    const submitBtn = screen.getByText('Ver valor');
    fireEvent.click(submitBtn);

    const amountsReceivable = await screen.findByTestId('amounts-receivable');
    expect(amountsReceivable).toHaveTextContent('R$100.00');
  });

  it('Testa o valor total a receber e por período ao cadastrar um novo atendimento', async () => {
    await act(async () => {
      render(
        <App />,
      );
    });

    const totalReceivable = await screen.findByTestId('total-receivable');
    expect(totalReceivable).toHaveTextContent('Total a receber: R$1000.00');

    const addNewClientBtn = await screen.findByText('Cadastrar atendimento');
    expect(addNewClientBtn).toBeInTheDocument();
    fireEvent.click(addNewClientBtn);

    const newClientNameInput = screen.getByPlaceholderText('nome do cliente');
    expect(newClientNameInput).toBeInTheDocument();

    const newClientEmailInput = screen.getByPlaceholderText('name@example.com');
    expect(newClientEmailInput).toBeInTheDocument();

    const newClientProcedureValue = screen.getByTestId('procedure-value-input');
    expect(newClientProcedureValue).toBeInTheDocument();

    const newClientNumberQuotas = screen.getByTestId('number-of-quotas-input');
    expect(newClientNumberQuotas).toBeInTheDocument();

    const firstQuotaDateInput = screen.getByTestId('first-quota-date-input');
    expect(firstQuotaDateInput).toBeInTheDocument();

    fireEvent.change(newClientNameInput, { target: { value: 'Fulano' } });
    fireEvent.change(newClientEmailInput, { target: { value: 'Fulano@gmail.com' } });
    fireEvent.change(newClientProcedureValue, { target: { value: '5000' } });
    fireEvent.change(newClientNumberQuotas, { target: { value: '10' } });
    fireEvent.change(firstQuotaDateInput, { target: { value: '2022-10-01' } });

    const submitBtn = screen.getByText('Cadastrar');
    fireEvent.click(submitBtn);

    const receivableBtn = await screen.findByText('Valores a receber por período');
    expect(receivableBtn).toBeInTheDocument();
    fireEvent.click(receivableBtn);

    const newTotalReceivable = await screen.findByTestId('total-receivable');
    expect(newTotalReceivable).toHaveTextContent('Total a receber: R$6000.00');

    const initialDateInput = await screen.findByTestId('initialDate-input');
    expect(initialDateInput).toBeInTheDocument();
    fireEvent.change(initialDateInput, { target: { value: '2022-10-01' } });
    const finalDateInput = await screen.findByTestId('finalDate-input');
    expect(finalDateInput).toBeInTheDocument();
    fireEvent.change(finalDateInput, { target: { value: '2022-10-31' } });

    const submitBtn2 = screen.getByText('Ver valor');
    fireEvent.click(submitBtn2);

    const amountsReceivable = await screen.findByTestId('amounts-receivable');
    expect(amountsReceivable).toHaveTextContent('R$600.00');
  });
});
