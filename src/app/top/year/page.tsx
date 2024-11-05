"use client";

import React, { Suspense } from "react";
import SideBar from "@/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Post from "@/components/post";
const Post = dynamic(() => import("@/components/post"), { ssr: false, loading: () => <Loading /> });
import Billboard from "@/components/billboard";
import { api } from "@/trpc/react";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";

export default function Home() {
    const allPosts = api.post.getTopReactionYear.useSuspenseQuery();
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
    const [show, setShow] = React.useState(false);

    return (

        <div className="max-w-[1380px] mx-auto p-0 md:p-2 lg:p-4 grid md:grid-cols-[2fr_5fr] lg:grid-cols-[240px_2fr_1fr] gap-5 text-sm">
            <SideBar nav={false} show={show} setShow={setShow} />
            <div className="">
                <div className="flex justify-between items-center mb-3">
                    <div className="text-base">
                        <Link href={"/"} className={(checkPath() == "Relevant" ? "font-bold" : "") + " btn leading-loose"}>Relevant</Link>
                        <Link href={"/latest"} className={(checkPath() == "Latest" ? "font-bold" : "") + " btn leading-loose"}>Latest</Link>
                        <Link href={"/top/week"} className={(checkPath() == "Top" ? "font-bold" : "") + " btn leading-loose"}>Top</Link>
                    </div>
                    <div className="text-base">
                        <Link href={"/top/week"} className={" btn leading-loose"}>Week</Link>
                        <Link href={"/top/month"} className={" btn leading-loose"}>Month</Link>
                        <Link href={"/top/year"} className={"font-bold btn leading-loose"}>Year</Link>
                        <Link href={"/top/infinity"} className={" btn leading-loose"}>Infinity</Link>
                    </div>
                </div >
                <div>
                    <Suspense fallback={<Loading />}>
                        {allPosts[1].data?.map((post, index) => {

                            if (index != 0) {
                                post.coverImage = null;
                            }
                            // const user = api.profile.getProfile.useQuery(post.createdById, { enabled: !!post.createdById });
                            // if (user.data === null) {
                            //   return null;
                            // }
                            return <Post key={index} post={post} user={null} />;
                        })}
                    </Suspense>
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
