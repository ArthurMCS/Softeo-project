import React from 'react';

export interface Iclient {
    id: string;
    name: string;
    email: string;
    procedureValue: string;
    quotas: string;
    firstQuotaDate: string;
    quotaValue: number;
}

export interface Props {
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

export interface Value {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    clients: Array<Iclient>;
    setClients: React.Dispatch<React.SetStateAction<Array<Iclient>>>;
    paymentDateList: Array<PaymentDate>
    setPaymentDateList: React.Dispatch<React.SetStateAction<Array<PaymentDate>>>;
}
