/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { createContext } from 'react';
import { PaymentDate } from './AppProvider';

export interface Client {
    id: string;
    name: string;
    email: string;
    procedureValue: string;
    quotas: string;
    serviceDay: string;
    quotaValue: number;
}

interface Value {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    clients: Array<Client>;
    setClients: React.Dispatch<React.SetStateAction<Array<Client>>>;
    paymentList: Array<PaymentDate>
    setPaymentList: React.Dispatch<React.SetStateAction<Array<PaymentDate>>>;
}

const AppContext = createContext({} as Value);

export default AppContext;
