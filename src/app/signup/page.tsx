import React from 'react';
import DevIcon from "/public/icon.png";
import Image from 'next/image';
import Link from 'next/link';
export default function Signup() {
    return <div className="max-w-[768px] px-4 mx-auto flex flex-col items-center mt-12">
        <Image src={DevIcon} alt={""} height={0} width={0} className='w-auto h-12'></Image>
        <div className="text-2xl md:text-3xl font-bold mt-4">Join the DEV Community</div>
        <p className='mt-4 text-lg'>DEV Community is a community of 2,165,578 amazing developers</p>
        <p className='mt-4 italic text-sm'>By signing up, you are agreeing to our privacy policy, terms of use and code of conduct.</p>
        <hr className='border-solid border-black border-t-[1px] mt-4 opacity-70 w-full'></hr>
        <p className='mt-4 text-lg'>Already have an account? <Link href={"/login"} className='text-blue-700'>Log in</Link></p>

    </div>;
}