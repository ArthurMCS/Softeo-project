/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect, useMemo, useState } from 'react';
import AppContext from './AppContext';
import { Iclient, PaymentDate, Props } from '../interfaces';

export default function AppProvider(props: Props) {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState(Array<Iclient>);
  const [paymentDateList, setPaymentDateList] = useState(Array<PaymentDate>);
  const { children } = props;

  useEffect(() => {
    const allClients = JSON.parse(localStorage.getItem('clients') || '[]');
    const allPaymentsDates = JSON.parse(localStorage.getItem('paymentDates') || '[]');
    setClients(allClients);
    setPaymentDateList(allPaymentsDates);
  }, []);

  const value = useMemo(() => ({
    search,
    setSearch,
    clients,
    setClients,
    paymentDateList,
    setPaymentDateList,
  }), [search, clients, paymentDateList]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
