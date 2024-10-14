"use client";
import React, { useEffect } from "react";
import { navigate } from "../actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Icon from "/public/icon.png";

export default function CreatePost() {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = React.useState(true);
    useEffect(() => {

        if (!session) {
            navigate("/login").catch(console.error);
        }
    }, [session]);
    return <div className="absolute w-screen h-screen top-0 left-0 z-50 bg-[--background]">
        <form className="relative w-full grid p-0 gap-2 grid-cols-[100%] grid-rows-[min-content_1fr_min-content] md:gap-4 md:px-2 lg:px-4">
            <div className="flex flex-row justify-between items-center px-2 h-14">
                <div className="flex items-center">
                    <Link href="/" className="mr-4 hidden md:inline-block">
                        <Image src={Icon} alt="" width={0} height={0} style={{ width: "auto", height: "40px" }} />
                    </Link>
                    <div className="font-medium hidden sm:inline-block">Create Post</div>
                </div>
                <div className="flex items-center">
                    <button onClick={(event) => { event.preventDefault(); setIsEditing(true); }} className={(isEditing ? "font-medium " : "") + "btn mx-1"}>Edit</button>
                    <button onClick={(event) => { event.preventDefault(); setIsEditing(false); }} className={(isEditing == false ? "font-medium " : "") + "btn mx-1"}>Preview</button>
                    <button onClick={async (event) => { event.preventDefault(); await navigate() }} className="ml-4md:absolute p-2 hover:text-[rgba(47,58,178)] hover:bg-[rgba(59,73,223,0.1)] rounded-lg right-2 top-2 ml-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="crayons-icon c-btn__icon"><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"></path></svg>
                    </button>
                </div>
            </div>
            <div className="bg-white h-[calc(100vh - 128px)] flex flex-col">
                <div className="mb-5">Add a cover image</div>
                <div className="mb-2">

                </div>
                <div className="mb-8 bg-[--background]">bruh</div>
                <div className="h-full">
                    <textarea name="" id="" className="min-h-[243px]"></textarea>
                </div>
            </div>
            <div className="h-[72px] px-2 flex items-center">
                <button className="bg-[rgb(59,73,223)] py-2 px-4 font-medium text-white hover:bg-[rgb(47,58,178)] rounded-lg mr-2">Publish</button>
                <button className="py-2 px-4 font-medium btn rounded-lg mr-2 text-ellipsis leading-tight">Save draft</button>
                <button className="py-2 px-4 font-medium btn rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="crayons-icon c-btn__icon"><path d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                </button>
                <button className="py-2 px-4 font-medium btn rounded-lg mr-2 leading-tight">
                    Revert new changes
                </button>

            </div>
        </form >
    </div >;

}