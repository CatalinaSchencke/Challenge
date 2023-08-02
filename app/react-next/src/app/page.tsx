
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/redux/store';

import LogIn from './authentication/log-in'

export default function Home() {

  const loggedIn = useAppSelector((state) => state.authReducer.value.isAuth);
  const email = useAppSelector((state) => state.authReducer.value.email);

  return (
    <>
      {!loggedIn
        ?
        <LogIn />
        :
        <>
          <div className="flex h-[calc(100vh_-_5rem)] bg-tertiary justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <h2 className='text-3xl font-medium'>Iniciaste sesión como <span className="text-primary font-semibold">{email}</span></h2>
              <Link href="/dashboard" className="px-20 py-2 rounded-xl bg-primary text-white font-medium">Ir al dashboard</Link>
            </div>
          </div>
        </>
      }
    </>
  )
}
