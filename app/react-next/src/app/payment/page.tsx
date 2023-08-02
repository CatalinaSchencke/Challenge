'use client';

import { useState } from 'react';

import Title from '../components/common/title'
import Service from './service-detail'
import PaymentForm from './form'

import { useAppSelector } from '@/redux/store';

export default function Payment() {

    const [paymentMethod, setPaymentMethod] = useState("Debito");
    const services = useAppSelector((state) => state.paymentReducer.value.services);

    const togglePaymentMethod = (method: string) => {
        setPaymentMethod(method);
    }

    const getTotalValue = () => {
        let total = 0;
        services.forEach((service: any) => {
            total += service.data.value;
        })
        return total;
    }

    const selectedPaymentButtonClasses = "bg-white rounded-3xl shadow text-gray-600"

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full h-[calc(100vh_-_5rem)]">
                <div className="order-last lg:order-none lg:col-span-2 bg-tertiary h-full p-10">
                    <div className="p-10 bg-white shadow-lg border-gray-200 rounded-2xl">
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <Title text="Método de pago" />
                            <div className="mt-4 md:mt-0 rounded-3xl text-gray-500 px-2 py-2 bg-gray-100 grid grid-cols-2 place-items-center">
                                <button onClick={() => togglePaymentMethod("Debito")} className={`${paymentMethod == "Debito" ? selectedPaymentButtonClasses : ""} cursor-pointer px-6 py-1`}>
                                    Débito
                                </button>
                                <button onClick={() => togglePaymentMethod("Credito")} className={`${paymentMethod == "Credito" ? selectedPaymentButtonClasses : ""} cursor-pointer px-6 py-1`}>
                                    Crédito
                                </button>
                            </div>
                        </div>
                        <PaymentForm />
                    </div>
                </div>
                <div className="h-full flex flex-col justify-center p-10 space-y-8">
                    {services.length > 0 ?
                        <>
                            <Title text="Estás por pagar" />
                            <div className="flex justify-between">
                                <h3 className="text-6xl font-semibold text-gray-800">{getTotalValue()}</h3>
                                <span className="text-3xl text-gray-500 self-end">CLP</span>
                            </div>
                            <div className="divide-y">
                                {
                                    services.map((service) => {
                                        return (
                                            <Service service={service} key={service.id} />
                                        )
                                    })
                                }
                            </div>
                        </>
                        :
                        <div className="flex flex-col items-center justify-center pb-20">
                            <h3 className="text-2xl font-semibold text-gray-800">No hay servicios por pagar</h3>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}