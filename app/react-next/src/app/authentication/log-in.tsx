'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from "react";

import { logIn } from "@/redux/features/auth-slice";
import { addServices } from "@/redux/features/services-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';

import Title from '../components/common/title';

export default function LogIn() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const baseUrl = 'http://localhost:3002';

    const fetchLogIn = async () => {

        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const data = await response.json();

        if (data.status === "success") {
            dispatch(logIn(email));
            dispatch(addServices(data.services));
            router.push('/dashboard');
        }
    }

    const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetchLogIn();
    }

    return (
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh_-_5rem)]">
            <div className="grid place-items-center lg:place-items-start lg:grid-rows-3 lg:justify-items-center">
                <form onSubmit={(event) => onSubmitLogin(event)} className="row-span-2 row-start-2 row-end-2 flex flex-col gap-6 w-10/12 md:w-1/2">
                    <Title text="Iniciar sesión" />
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo electrónico" className="px-6 py-3 bg-[#FFF6E5] outline-primary rounded-lg" />
                    <input type="submit" className="cursor-pointer px-4 py-3 bg-primary hover:bg-primary-400 text-white font-medium rounded-lg" value="Ingresar" />
                </form>
                <div className="row-span-1 row-start-3 row-end-3 justify-self-start self-end">
                    <Image src="./paws.svg" height={0} width={0} className="h-24 w-auto" alt="paws" />
                </div>
            </div>
            <div className="hidden lg:block justify-self-end">
                <Image src="/woman-dog.png" alt="woman with a dog" height={1500} width={1500} className="object-contain mr-0 w-auto h-[calc(100vh_-_5rem)] justify-self-end" />
            </div>
        </div>
    )
}