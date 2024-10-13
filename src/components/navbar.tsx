"use client";
import Link from "next/link";
import Image from "next/image";
import Icon from "/public/icon.png";
// import SearchIcon from "/public/search.svg";
import { FormEvent, useState } from "react";



export { Navbar };

function Navbar() {

    const [clicked, setClicked] = useState(false);

    function handleHamburger() {

        setClicked(!clicked);
    }

    function handleSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(data.get("query"));
    }

    return (
        <header className="fixed-top-0 left-0 right-0 z-[100] bg-white shadow-sm">
            <nav className="flex items-center justify-between p-4 h-14 m-auto max-w-[1380px]">
                <div className="flex flex-row flex-1 max-w-[680px]">

                    <button onClick={handleHamburger} className="md:hidden mx-2 !py-2 !px-2 btn !bg-transparent hover:!bg-[rgba(59,73,223)]/25">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                        </svg>
                    </button>
                    <Link href="/">
                        <Image src={Icon} alt="" width={0} height={0} style={{ width: "auto", height: "40px" }} />
                    </Link>

                    <form onSubmit={handleSearch} className="hidden relative md:flex flex-1 mx-4 border-black border-solid border-[1px] pl-[40px] pr-[142px]">

                        <button type="submit" className="absolute right-auto top-1 left-1 bottom-1">

                            {/* search icon */}
                            {/* <Image src={SearchIcon} alt="" width={0} height={0} style={{ width: "auto", height: "24px" }} /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z" />
                            </svg>
                        </button>
                        <input type="text" name="query" className="w-full" placeholder="Search..." />
                        <Link href={"https://www.algolia.com/developers/?utm_source=devto&utm_medium=referral"} className="absolute text-xs flex flex-row items-center right-2 top-1 mt-2 opacity-75">Powered by
                            <svg className="mx-1" xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="14" height="14" viewBox="0 0 500 500.34"><defs></defs><path d="M250,0C113.38,0,2,110.16,.03,246.32c-2,138.29,110.19,252.87,248.49,253.67,42.71,.25,83.85-10.2,120.38-30.05,3.56-1.93,4.11-6.83,1.08-9.52l-23.39-20.74c-4.75-4.22-11.52-5.41-17.37-2.92-25.5,10.85-53.21,16.39-81.76,16.04-111.75-1.37-202.04-94.35-200.26-206.1,1.76-110.33,92.06-199.55,202.8-199.55h202.83V407.68l-115.08-102.25c-3.72-3.31-9.43-2.66-12.43,1.31-18.47,24.46-48.56,39.67-81.98,37.36-46.36-3.2-83.92-40.52-87.4-86.86-4.15-55.28,39.65-101.58,94.07-101.58,49.21,0,89.74,37.88,93.97,86.01,.38,4.28,2.31,8.28,5.53,11.13l29.97,26.57c3.4,3.01,8.8,1.17,9.63-3.3,2.16-11.55,2.92-23.6,2.07-35.95-4.83-70.39-61.84-127.01-132.26-131.35-80.73-4.98-148.23,58.18-150.37,137.35-2.09,77.15,61.12,143.66,138.28,145.36,32.21,.71,62.07-9.42,86.2-26.97l150.36,133.29c6.45,5.71,16.62,1.14,16.62-7.48V9.49C500,4.25,495.75,0,490.51,0H250Z"></path></svg>
                            Algolia
                        </Link>
                    </form>

                </div>

                <ul className="flex flex-row items-center">
                    <Link href={"/search"} className="md:hidden mx-1 bg-[rgb(245,245,245)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z" />
                        </svg>
                    </Link>
                    <Link href="/login" className="font-medium">
                        <li className="hidden md:flex mx-2 py-2 px-4 whitespace-nowrap hover:underline bg-[rgba(245,245,245)] hover:text-[rgba(47,58,178)] hover:bg-[rgba(59,73,223)]/25 rounded-lg">
                            Log in
                        </li>
                    </Link>
                    <Link href="/signup" className="font-medium">
                        <li className="mx-2 py-2 px-4 whitespace-nowrap border-solid text-[rgba(47,58,178)] hover:underline hover:!text-white hover:bg-[rgba(47,58,178)] border-[rgba(47,58,178)] border-[1px] rounded-lg font-medium">
                            Create account
                        </li>
                    </Link>
                </ul>

            </nav>
        </header>
    );
}