/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect, useMemo, useState } from 'react';
import AppContext, { Client } from './AppContext';

interface Props {
  children: React.ReactNode
}

export default function AppProvider(props: Props) {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState(Array<Client>);

  const { children } = props;

  useEffect(() => {
    const allClients = JSON.parse(localStorage.getItem('clients') || '[]');
    setClients(allClients);
  }, []);

  const value = useMemo(() => ({
    search,
    setSearch,
    clients,
    setClients,
  }), [search, clients]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
