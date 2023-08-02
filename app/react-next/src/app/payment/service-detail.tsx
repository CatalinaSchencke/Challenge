export default function ServiceDetail(props: {
    service: {
        id: string;
        data: {
            date: string;
            service: string;
            value: number;
            pending: boolean;
        }
    }
}) {
    return (
        <div className="grid grid-cols-3 py-5">
            <div className="flex flex-col gap-1">
                <h4 className="text-gray-500 font-medium">Servicio</h4>
                <p className="text-2xl font-semibold">{props.service.data.service}</p>
            </div>
            <div className="flex flex-col gap-1">
                <h4 className="text-gray-500 font-medium">Valor</h4>
                <p className="text-2xl font-semibold">{props.service.data.value}</p>
            </div>
            <div className="flex flex-col gap-1">
                <h4 className="text-gray-500 font-medium">Fecha</h4>
                <p className="text-2xl font-semibold">{props.service.data.date}</p>
            </div>
        </div>
    );
}