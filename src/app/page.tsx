"use client";

import React from "react";
import SideBar from "@/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Post from "@/components/post";
import Billboard from "@/components/billboard";

export default function Home() {

  const pathName = usePathname();

  function checkPath() {
    if (pathName === "/") {
      return "Relevant";
    } else if (pathName === "/latest") {
      return "Latest";
    } else if (pathName.includes("/top")) {
      return "Top";
    }
  }

  return (

    <div className="max-w-[1380px] mx-auto grid md:grid-cols-[2fr_5fr] lg:grid-cols-[250px_2fr_1fr] gap-5">
      <SideBar />
      <div className="">
        <div className="flex justify-between items-center">
          <div className="text-lg">
            <Link href={"/"} className={(checkPath() == "Relevant" ? "font-bold" : "") + " btn"}>Relevant</Link>
            <Link href={"/latest"} className={(checkPath() == "Latest" ? "font-bold" : "") + " btn"}>Latest</Link>
            <Link href={"/top/week"} className={(checkPath() == "Top" ? "font-bold" : "") + " btn"}>Top</Link>
          </div>
          <div className="">

          </div>
        </div >
        <div>
          <Post></Post>
          <Post></Post>
          <Post></Post>
        </div>
      </div >
      <div className="hidden lg:block">
        <Billboard title="What's happening this week" isClicked={false}>
          <div>
            <div className="font-bold text-xl mt-4">Challenges</div>
            <div className="rounded-xl border-2 border-solid border-black p-4 my-3">
              <Link href={"/"} className="text-[rgba(47,58,178)] font-bold underline">The Pinata Challenge</Link>
              <p>$3,000 in Prizes - Ends in October 13!</p>
            </div>
            <div className="rounded-xl border-2 border-solid border-black p-4 my-3">
              <Link href={"/"} className="text-[rgba(47,58,178)] font-bold underline">Hacktoberfest Writing Challenge</Link>
              <p>$3,000 in Prizes - Ends in October 13!</p>
            </div>
            <div className="font-bold">Have a great week!</div>
          </div>
        </Billboard>

        <div className="mt-6 px-3 py-4 w-100 h-auto bg-white rounded-xl">

          <div className="text-xl font-bold">#discuss</div>
          <p className="mt-1 text-xs">Discussion threads targeting the whole community</p>

        </div>

        <div className="mt-6 px-3 py-4 w-100 h-auto bg-white rounded-xl">

          <div className="text-xl font-bold">#watercooler</div>
          <p className="mt-1 text-xs">Light, and off-topic conversation.</p>

        </div>

        <div className="mt-3 border-b-[1px] border-black/50 border-solid py-6">
          <h1 className="font-bold">trending guides/resources</h1>
        </div>

        <div className="mt-3 border-b-[1px] border-black/50 border-solid py-6">
          <h1 className="font-bold">recently queries</h1>
        </div>

      </div>
    </div >
  );
}
