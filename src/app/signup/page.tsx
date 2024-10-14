"use client";
import React from 'react';
import DevIcon from "/public/icon.png";
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
export default function Signup() {
    const { data: session } = useSession();
    if (session) {
        redirect("/");
    }
    return <div className="max-w-[640px] px-4 mx-auto flex flex-col items-center mt-12">
        <Image src={DevIcon} alt={""} height={0} width={0} className='w-auto h-12'></Image>
        <div className="text-2xl md:text-3xl font-bold mt-4">Join the DEV Community</div>
        <p className='mt-1 text-base font-light mb-6'>DEV Community is a community of 2,165,578 amazing developers</p>
        <button onClick={() => signIn('google')} className='flex flex-row p-3 border-solid border-[1px] border-black/50 w-full text-sm rounded-lg items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" className="crayons-icon crayons-icon--default">
                <path d="M18.09 18.75c2.115-1.973 3.052-5.25 2.49-8.393h-8.392v3.473h4.777a3.945 3.945 0 0 1-1.777 2.67l2.902 2.25Z" fill="#4285F4"></path>
                <path d="M4.215 15.982A9 9 0 0 0 18.09 18.75l-2.902-2.25a5.37 5.37 0 0 1-8.018-2.813l-2.955 2.296Z" fill="#34A853"></path>
                <path d="M7.17 13.687c-.375-1.17-.375-2.25 0-3.42L4.215 7.965a9.06 9.06 0 0 0 0 8.025l2.955-2.303Z" fill="#FBBC02"></path>
                <path d="M7.17 10.267c1.035-3.24 5.438-5.115 8.393-2.347l2.58-2.528A8.85 8.85 0 0 0 4.215 7.965l2.955 2.302Z" fill="#EA4335"></path>
            </svg>
            <div className='grow'>Sign up with Google</div>
        </button>
        <p className='mt-4 italic text-sm'>By signing up, you are agreeing to our privacy policy, terms of use and code of conduct.</p>
        <hr className='border-solid border-black border-t-[1px] mt-4 opacity-70 w-full'></hr>
        <p className='mt-4 text-sm'>Already have an account? <Link href={"/login"} className='text-blue-700'>Log in</Link></p>

    </div>;
}