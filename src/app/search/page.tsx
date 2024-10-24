"use client";

import Post from "@/components/post";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { FormEvent } from "react";
import { navigate } from "../actions";


export default function Search() {
    const params = useSearchParams();
    console.log(params.get('q'));
    const [isClicked, setIsClicked] = React.useState([true, false, false, false, false, false]);
    function handleSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        navigate("search?q=" + (data.get("query") as string)).catch(console.error);
        console.log(data.get("query"));
    }

    function checkClick(index: number) {
        return () => {
            const newIsClickded = isClicked.map((value, i) => {
                if (i == index) {
                    return true;
                }
                return false;
            });
            setIsClicked(newIsClickded);
        }
    }
    let posts = null;
    if (!params.get('q')) {

    }
    else {
        posts = api.post.searchPosts.useQuery({ query: params.get('q') ?? "" }).data;
    }

    return (
        <div className="mx-auto max-w-[1024px] w-full py-2 md:p-2 lg:p-4">
            <form onSubmit={handleSearch} className="flex relative md:hidden mx-4 max-w-[680px] h-auto border-black/20 focus:border-[rgb(59,73,223)] border-solid border-[1px] rounded-lg">

                <button type="submit" className="btn !bg-white !rounded-lg right-auto top-0 left-0 ">

                    {/* search icon */}
                    {/* <Image src={SearchIcon} alt="" width={0} height={0} style={{ width: "auto", height: "24px" }} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="crayons-icon c-btn__icon" focusable="false"><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z"></path></svg>

                </button>
                <input type="text" name="query" className="w-full rounded-lg" placeholder="Search..." />

            </form>
            <div className="flex flex-row items-center justify-between w-full">
                <h1 className="hidden md:inline-block font-bold text-3xl">Search result for</h1>
                <div className="text-base flex flex-row">
                    <Link href={"/"} className={"font-bold" + " btn leading-loose"}>Most relevant</Link>
                    <Link href={"/latest"} className={"" + " btn leading-loose"}>Newest</Link>
                    <Link href={"/top/week"} className={"" + " btn leading-loose"}>Oldest</Link>
                </div>
            </div>
            <div className="w-full mt-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-0 md:gap-2 lg:gap-4">
                <div className='flex flex-row md:flex-col pl-4 md:pl-0'>
                    <button className={"btn !p-2 flex items-center" + (isClicked[0] ? " !bg-white font-bold" : "")} onClick={checkClick(0)}>
                        Posts
                    </button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[1] ? " !bg-white font-bold" : "")} onClick={checkClick(1)}>
                        People
                    </button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[2] ? " !bg-white font-bold" : "")} onClick={checkClick(2)}>
                        Organization
                    </button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[3] ? " !bg-white font-bold" : "")} onClick={checkClick(3)}>
                        Tags
                    </button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[4] ? " !bg-white font-bold" : "")} onClick={checkClick(4)}>
                        Comments
                    </button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[5] ? " !bg-white font-bold" : "")} onClick={checkClick(5)}>
                        My posts only
                    </button>
                </div>
                <div className="mt-2 md:mt-0">
                    {posts?.map((post, index) => {
                        return (
                            <Post key={index} post={post} user={null} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}