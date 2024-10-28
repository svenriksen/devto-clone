"use client";
import Link from "next/link";
import Image from "next/image";
import Icon from "/public/icon.png";
// import SearchIcon from "/public/search.svg";
import { type FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import SideBar from "./sidebar";
import { navigate } from "@/app/actions";

import { api } from "@/trpc/react";
import moment from 'moment';
import { set } from "zod";

export { Navbar };

function Navbar() {
    const [input, setInput] = useState("");
    const [focus, setFocus] = useState(false);
    const searchResult = api.post.searchFirstFivePosts.useSuspenseQuery({ query: input });
    const [profileClickedState, setProfileClickedState] = useState(false);
    const { data: session } = useSession();
    const [show, setShow] = useState(false);

    function onChangeSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFocus(true);
        const data = new FormData(e.currentTarget);
        // searchResult = api.post.searchFirstFivePosts.useSuspenseQuery({ query: data.get("query") as string });

        setInput(data.get("query") as string);

    }

    function handleSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        navigate("search?q=" + (data.get("query") as string)).catch(console.error);
        console.log(data.get("query"));
    }

    function profileClicked() {
        setProfileClickedState(!profileClickedState);
    }

    function profileClickedFalse() {
        setProfileClickedState(false);
    }
    function handleShow(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        setShow(!show);
    }

    return (
        <header className="fixed-top-0 left-0 right-0 bg-white shadow-sm z-20">
            <nav className="flex items-center justify-between p-0 md:p-2 lg:p-4 h-14 m-auto relative max-w-[1380px]">

                <div className={show ? 'absolute w-screen h-screen z-[10] left-0 top-0 bg-[#090909] opacity-50' : 'hidden'}></div>
                <div className="flex flex-row flex-1">

                    <button onClick={(event) => handleShow(event)} className="md:hidden mx-2 !py-2 !px-2 btn !bg-transparent hover:!bg-[rgba(59,73,223)]/25">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="asv9jjhu4oetdozzir2f9sb8ke3zeszp" className="crayons-icon"><title id="asv9jjhu4oetdozzir2f9sb8ke3zeszp">Navigation menu</title>
                            <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
                        </svg>
                    </button>
                    <SideBar nav={true} show={show} setShow={setShow} />
                    <Link href="/">
                        <Image src={Icon} alt="" width={0} height={0} style={{ width: "auto", height: "40px" }} />
                    </Link>

                    <form onSubmit={handleSearch} onChange={(event) => onChangeSearch(event)} className="hidden relative md:flex flex-1 mx-4 max-w-[680px] border-black/20 border-solid border-[1px] rounded-lg pl-[40px] pr-[142px]">

                        <button type="submit" className="absolute right-auto top-1 left-1 bottom-1">

                            {/* search icon */}
                            {/* <Image src={SearchIcon} alt="" width={0} height={0} style={{ width: "auto", height: "24px" }} /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="crayons-icon c-btn__icon" focusable="false"><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z"></path></svg>

                        </button>
                        <input onFocus={(event) => {
                            event.preventDefault();
                            setFocus(true);

                        }} type="text" name="query" className="w-full " placeholder="Search..." />
                        <Link href={"https://www.algolia.com/developers/?utm_source=devto&utm_medium=referral"} className="absolute text-xs flex flex-row items-center right-2 top-1 mt-2 opacity-75">Powered by
                            <svg className="mx-1" xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="14" height="14" viewBox="0 0 500 500.34"><defs></defs><path d="M250,0C113.38,0,2,110.16,.03,246.32c-2,138.29,110.19,252.87,248.49,253.67,42.71,.25,83.85-10.2,120.38-30.05,3.56-1.93,4.11-6.83,1.08-9.52l-23.39-20.74c-4.75-4.22-11.52-5.41-17.37-2.92-25.5,10.85-53.21,16.39-81.76,16.04-111.75-1.37-202.04-94.35-200.26-206.1,1.76-110.33,92.06-199.55,202.8-199.55h202.83V407.68l-115.08-102.25c-3.72-3.31-9.43-2.66-12.43,1.31-18.47,24.46-48.56,39.67-81.98,37.36-46.36-3.2-83.92-40.52-87.4-86.86-4.15-55.28,39.65-101.58,94.07-101.58,49.21,0,89.74,37.88,93.97,86.01,.38,4.28,2.31,8.28,5.53,11.13l29.97,26.57c3.4,3.01,8.8,1.17,9.63-3.3,2.16-11.55,2.92-23.6,2.07-35.95-4.83-70.39-61.84-127.01-132.26-131.35-80.73-4.98-148.23,58.18-150.37,137.35-2.09,77.15,61.12,143.66,138.28,145.36,32.21,.71,62.07-9.42,86.2-26.97l150.36,133.29c6.45,5.71,16.62,1.14,16.62-7.48V9.49C500,4.25,495.75,0,490.51,0H250Z"></path></svg>
                            Algolia
                        </Link>
                        <div onMouseLeave={(event) => {
                            event.preventDefault();
                            setFocus(false);
                        }} className={searchResult[1].data.length === 0 || (!focus) ? "hidden " : "" + "hidden md:flex flex-col absolute top-[101%] mt-1 z-[1000] bg-white rounded-[0.375rem] shadow w-full left-0 border-solid border-black/20 border-[1px]"}>

                            {searchResult[1].data?.map((post, index) => {
                                return <Link href={"/" + post.createdById + "/" + post.id} key={index} className="p-2 list-none hover:bg-black/5 hover:cursor-pointer">

                                    <p className="text-xs leading-tight text-black/60 font-light">@{post.createdById}</p>
                                    <h1 className="text-base text-[rgb(23,23,23)] font-bold">{post.title}</h1>
                                    <p className="text-xs leading-tight text-black/60 font-light">{moment(post.createdAt.toUTCString()).format('MMM DD \'YY').toString()}</p>
                                </Link>
                            })}
                        </div>
                    </form>

                </div>
                {session ? <div className="ml-auto">
                    <ul className="flex flex-row items-center">
                        <Link href={"/search"} className="md:hidden p-2 inline-block hover:text-[rgba(47,58,178)] hover:bg-[rgba(59,73,223,0.1)] rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a1vjn6flmyx96gwpwe9bigfhx323vwlh" className="crayons-icon"><title id="a1vjn6flmyx96gwpwe9bigfhx323vwlh">Search</title>
                                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z"></path>
                            </svg>
                        </Link>

                        <Link href="/new" className="hidden md:inline-block font-medium" onClick={profileClickedFalse}>
                            <li className="mx-2 py-2 px-4 whitespace-nowrap border-solid text-[rgba(47,58,178)] hover:underline hover:!text-white hover:bg-[rgba(47,58,178)] border-[rgba(47,58,178)] border-[1px] rounded-lg font-medium">
                                Create Post
                            </li>
                        </Link>
                        <Link href="/notifications" className="mx-1 inline-block p-2 hover:text-[rgba(47,58,178)] hover:bg-[rgba(59,73,223,0.1)] rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a9pv4vm1pbo34da7o51vet751dp05zkq" className="crayons-icon"><title id="a9pv4vm1pbo34da7o51vet751dp05zkq">Notifications</title>
                                <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1116 0v7zm-2 0v-7a6 6 0 10-12 0v7h12zm-9 4h6v2H9v-2z"></path>
                            </svg>
                        </Link>
                        <div className="mx-1 hover:bg-black/25 rounded-full">
                            <button onClick={profileClicked} className="flex items-center p-1">
                                <Image src={session.user.image ?? ""} alt="" width={1000} height={1000} className="w-8 h-8 rounded-full object-contain"></Image>
                            </button>
                        </div>
                    </ul>

                    <ul className={(profileClickedState ? "inline-block opacity-100" : "hidden opacity-0 pre-click") + " absolute bg-white w-[98vw] min-w-[250px] md:max-w-[360px] md:w-max transition-profile left-2 md:left-auto md:right-2 top-full p-2 mt-1 z-[400]"}>

                        <li className="w-full pb-2 mb-2 border-b-[1px] border-solid border-black/20" onClick={profileClickedFalse}>
                            <Link href={"/" + session.user.id} className="rounded-lg inline-block px-4 py-2 leading-tight hover:underline hover:text-[rgb(47,58,178)] hover:bg-[rgba(59,73,223,0.1)] w-full">

                                <p className="text-inherit block font-medium leading-tight">{session.user.name}</p>
                                <span className="text-inherit text-sm opacity-75">{"@" + session.user.id}</span>

                            </Link>
                        </li>
                        <li className="w-full leading-tight" onClick={profileClickedFalse}>
                            <Link href={"/dashboard"} className="w-full rounded-lg inline-block px-4 py-2 leading-tight hover:underline hover:text-[rgb(47,58,178)] hover:bg-[rgba(59,73,223,0.1)]">
                                Dashboard
                            </Link>
                        </li>
                        <li className="w-full leading-tight" onClick={profileClickedFalse}>
                            <Link href={"/new"} className="w-full rounded-lg inline-block px-4 py-2 leading-tight hover:underline hover:text-[rgb(47,58,178)] hover:bg-[rgba(59,73,223,0.1)]">
                                Create Post
                            </Link>
                        </li>
                        <li className="w-full leading-tight" onClick={profileClickedFalse}>
                            <Link href={"/dashboard"} className="w-full rounded-lg inline-block px-4 py-2 leading-tight hover:underline hover:text-[rgb(47,58,178)] hover:bg-[rgba(59,73,223,0.1)]">
                                Reading List
                            </Link>
                        </li>
                        <li className="w-full pb-2 leading-tight border-b-[1px] border-solid border-black/20" onClick={profileClickedFalse}>
                            <Link href={"/dashboard"} className="w-full rounded-lg inline-block px-4 py-2 leading-tight hover:underline hover:text-[rgb(47,58,178)] hover:bg-[rgba(59,73,223,0.1)]">
                                Settings
                            </Link>
                        </li>
                        <li className="w-full pt-2 leading-tight" onClick={profileClickedFalse}>
                            <Link href={"/signout_confirm"} className="w-full rounded-lg inline-block px-4 py-2 leading-tight hover:underline hover:text-[rgb(47,58,178)] hover:bg-[rgba(59,73,223,0.1)]">
                                Sign out
                            </Link>
                        </li>
                    </ul>
                </div> :
                    <ul className="flex flex-row items-center">
                        <Link href={"/search"} className="md:hidden p-2 inline-block hover:text-[rgba(47,58,178)] hover:bg-[rgba(59,73,223,0.1)] rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a1vjn6flmyx96gwpwe9bigfhx323vwlh" className="crayons-icon"><title id="a1vjn6flmyx96gwpwe9bigfhx323vwlh">Search</title>
                                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z"></path>
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
                }
            </nav>
        </header >
    );
}