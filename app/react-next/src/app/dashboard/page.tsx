'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import Title from '../components/common/title'
import Table from '../dashboard/table'

import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { addServices } from "@/redux/features/payment-slice"

export default function Dashboard() {

    const router = useRouter();
    const servicesData = useAppSelector((state) => state.servicesReducer.value.services);
    const loggedIn = useAppSelector((state) => state.authReducer.value.isAuth);
    const dispatch = useDispatch<AppDispatch>();

    const [services, setServices] = useState(servicesData);

    useEffect(() => {
        // checks if the user is authenticated
        loggedIn
            ? router.push("/dashboard")
            : router.push("/");
    }, []);

    const payAllServices = () => {
        //pending services
        const pendingServices = services.filter((service: any) => service.data.pending);
        dispatch(addServices(pendingServices));
        router.push('/payment');
    }

    return (
        <>
            <div className="bg-tertiary min-h-[calc(100vh_-_5rem)]">
                <div className="max-w-7xl w-10/12 mx-auto space-y-6 py-10">
                    <div className="flex justify-between items-end">
                        <Title text="Servicios realizados" />
                        <Image src="./3-paws.svg" height={0} width={0} className="h-16 w-auto hidden sm:block" alt="paws" />
                    </div>
                    {services.length > 0 ?
                        <>
                            <Table services={services} />
                            <div className="flex flex-col items-end">
                                <button onClick={() => payAllServices()} className="bg-red-500 text-white rounded-lg px-20 py-2 disabled:cursor-not-allowed disabled:bg-red-200">
                                    Pagar pendientes
                                </button>
                                <p className="mt-2 text-sm text-gray-600">
                                    Solo los servicios con estado "pendientes" serán pagados.
                                </p>
                            </div>
                        </>
                        :
                        <div className="flex flex-col items-center justify-center pb-20">
                            <h3 className="text-2xl font-semibold text-gray-800">No tienes servicios realizados</h3>
                            <p className="text-gray-600 text-sm">Cuando realices un servicio, aparecerá aquí.</p>
                        </div>
                    }

                    <div>
                        <Image src="/dogs-circle.png" height={800} width={1200} className="h-52 w-full object-contain" alt="paws" />
                    </div>
                </div>
            </div>
        </>
    )
}