'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAppSelector } from '@/redux/store';

export default function Nav() {

    const loggedIn = useAppSelector((state) => state.authReducer.value.isAuth);
    const email = useAppSelector((state) => state.authReducer.value.email);

    return (
        <div className={"flex justify-around items-center h-20 text-[15px] text-[#424242]"}>

            <Link href="/">
                <Image src="/logo.svg" alt="logo luna pets" width={0} height={0} className="w-auto h-14" />
            </Link>

            {!loggedIn ?

                <>
                    <div className="hidden md:flex space-x-10">
                        <Link href="/" >
                            Inicio
                        </Link>
                        <Link href="#" >
                            Sobre Nosotros
                        </Link>
                        <Link href="#" >
                            Servicios
                        </Link>
                    </div>
                    <div>
                        ES
                    </div>
                </>

                :

                <>
                    <div className="hidden md:flex space-x-10">
                        ES
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:block font-semibold">
                            {email}
                        </span>
                        <Image src="/dog.png" width={100} height={100} alt="dog" className="h-14 w-auto" />
                    </div>
                </>

            }

        </div>
    )
}