/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import AppProvider from './components/context/AppProvider';
import NavbarComponent from './components/Navbar';
import ClientTable from './components/Table';

function App() {
  return (
    <AppProvider>
      <NavbarComponent />
      <ClientTable />
    </AppProvider>
  );
}

export default App;
