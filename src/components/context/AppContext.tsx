import React, { createContext } from 'react';

export interface Client {
    name: string;
    email: string;
    procedureValue: string;
    quotas: string;
    payDay: string;
    quotaValue: number;
}

interface Value {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    clients: Array<Client>;
    setClients: React.Dispatch<React.SetStateAction<Array<Client>>>;
}

const AppContext = createContext({} as Value);

export default AppContext;
