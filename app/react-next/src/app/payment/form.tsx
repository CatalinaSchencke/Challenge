'use client';

import { useState } from "react";
import { useAppSelector } from "@/redux/store";

import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { addServices } from "@/redux/features/payment-slice";

export default function PaymentForm() {

    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cardCvv, setCardCvv] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    const services = useAppSelector((state) => state.paymentReducer.value.services);

    const checkDisabledState = cardNumber.length < 19 || cardDate.length < 5 || cardCvv.length < 3 || services.length == 0;

    const onCardNumberChange = (e: any) => {
        setCardNumber(e.target.value);
    };

    const onCardDateChange = (e: any) => {
        setCardDate(e.target.value);
    };

    const onCardCvvChange = (e: any) => {
        setCardCvv(e.target.value);
    };

    const ccFormat = (value: string) => {
        const onlyNumbers = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

        // Check if there are any numbers in the input
        if (onlyNumbers.length === 0) {
            return ""; // If there are no numbers, return an empty string
        }

        // Truncate to a maximum of 16 characters (credit card numbers usually have 16 digits)
        const truncatedValue = onlyNumbers.substring(0, 16);

        const parts = [];
        for (let i = 0; i < truncatedValue.length; i += 4) {
            parts.push(truncatedValue.substring(i, i + 4));
        }

        return parts.join(" ");
    };

    const dateFormat = (value: string) => {
        const onlyNumbers = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

        // Check if there are any numbers in the input
        if (onlyNumbers.length === 0) {
            return ""; // If there are no numbers, return an empty string
        }

        // Truncate to a maximum of 4 characters (assuming it's a year)
        const truncatedValue = onlyNumbers.substring(0, 4);

        const parts = [];
        for (let i = 0; i < truncatedValue.length; i += 2) {
            parts.push(truncatedValue.substring(i, i + 2));
        }

        return parts.length > 1 ? parts.join("/") : value;
    };

    const cvvFormat = (value: string) => {
        const onlyNumbers = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

        // Check if there are any numbers in the input
        if (onlyNumbers.length === 0) {
            return ""; // If there are no numbers, return an empty string
        }

        // Truncate to a maximum of 4 characters (assuming it's a year)
        const truncatedValue = onlyNumbers.substring(0, 3);

        return truncatedValue;
    };

    const baseUrl = 'http://localhost:3002';

    const payServices = async () => {
        services.forEach(async (service) => {
            const response = await fetch(`${baseUrl}/service/updateService`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: service.id, pending: false }),
            });
            const data = await response.json();
            console.log(data);
        });
        dispatch(addServices([]));
    }

    return (
        <form className="mt-5 flex flex-col gap-7 w-full md:w-3/5">
            <label>
                <p className="text-gray-500 mb-2">Número de tarjeta</p>

                <input value={ccFormat(cardNumber)}
                    onChange={onCardNumberChange} type="email" placeholder="X X X X   X X X X   X X X X   X X X X" className="w-full px-6 py-3 bg-[#FFF6E5] outline-primary rounded-lg" />
            </label>
            <div className="grid grid-cols-2 gap-3">
                <label>
                    <p className="text-gray-500 mb-2">Fecha expiración</p>
                    <input value={dateFormat(cardDate)}
                        onChange={onCardDateChange}
                        type="email" placeholder="M M / A A" className="w-full px-6 py-3 bg-[#FFF6E5] outline-primary rounded-lg" />
                </label>
                <label>
                    <p className="text-gray-500 mb-2">Número de tarjeta</p>
                    <input value={cvvFormat(cardCvv)}
                        onChange={onCardCvvChange} type="password" placeholder="X  X  X" className="w-full px-6 py-3 bg-[#FFF6E5] outline-primary rounded-lg" />
                </label>
            </div>
            <button disabled={checkDisabledState} onClick={() => payServices()} type="button" className="cursor-pointer px-4 py-3 bg-primary hover:bg-primary-400 text-white font-medium rounded-lg disabled:cursor-not-allowed disabled:bg-primary-200 disabled:hover:bg-primary-200">Realizar pago</button>
        </form>
    );
}