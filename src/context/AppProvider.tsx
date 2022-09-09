/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect, useMemo, useState } from 'react';
import AppContext, { Client } from './AppContext';

interface Props {
  children: React.ReactNode
}

export interface PaymentDate {
  id: string,
  date: string,
  value: number,
}

export interface Payment {
  id?: string;
  quotasPaid?: number;
}

export default function AppProvider(props: Props) {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState(Array<Client>);
  const [paymentList, setPaymentList] = useState(Array<PaymentDate>);
  const { children } = props;

  useEffect(() => {
    const allClients = JSON.parse(localStorage.getItem('clients') || '[]');
    const allPaymentsDates = JSON.parse(localStorage.getItem('paymentDates') || '[]');
    setClients(allClients);
    setPaymentList(allPaymentsDates);
  }, []);

  const value = useMemo(() => ({
    search,
    setSearch,
    clients,
    setClients,
    paymentList,
    setPaymentList,
  }), [search, clients, paymentList]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
