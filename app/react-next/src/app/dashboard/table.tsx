import { useRouter } from 'next/navigation'

import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { addServices } from "@/redux/features/payment-slice"

export default function Table(props: {
    services: Array<{
        id: string;
        data: {
            date: string;
            service: string;
            value: number;
            pending: boolean;
        }
    }>
}) {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const payService = (service: any) => {
        let services = [];
        services.push(service);
        dispatch(addServices(services));
        router.push('/payment');
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full lg:table-fixed text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="p-6">
                            Fecha
                        </th>
                        <th scope="col" className="p-6">
                            Servicio
                        </th>
                        <th scope="col" className="p-6">
                            Valor
                        </th>
                        <th scope="col" className="p-6">
                            Pago
                        </th>
                        <th scope="col" className="p-6">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.services?.map((service) => (
                        <tr className="even:bg-gray-50 odd:bg-white border-b" key={service.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {service.data.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {service.data.service}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {service.data.value}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className={`${service.data.pending ? "bg-red-500" : "bg-lime-400"} inline-flex text-white px-8 py-2 rounded-full whitespace-nowrap`}>
                                    {service.data.pending ? "Pendiente" : "Pagado"}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {service.data.pending &&
                                    <button onClick={() => payService(service)} className="text-red-500 font-medium">
                                        Pagar
                                    </button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}