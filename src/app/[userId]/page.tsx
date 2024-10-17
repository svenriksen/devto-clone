'use client';
import React, { Suspense, useEffect } from "react";
import { api } from "@/trpc/react";
import { navigate } from "../actions";
import { notFound } from "next/navigation";
import Post from "@/components/post";

export default function Profile({ params }: { params: { userId: string } }) {

    const userId = api.profile.getProfile.useQuery(params.userId);
    const postNumber = api.profile.getPostCount.useQuery(params.userId).data;
    const commentNumber = api.profile.getCommentCount.useQuery(params.userId).data;
    const posts = api.profile.getAllPostsFromUser.useQuery(params.userId).data;

    // const [profile, setProfile] = React.useState(api.profile.getProfile.useQuery(params.userId).data);

    // useEffect(() => {

    // userId.then((data) => {
    //     if (data === null) {
    //         notFound();
    //     }
    //     else {
    //         setProfile(data);
    //     }
    // }).catch(() => {
    //     console.error("Failed to fetch profile");
    // });
    // }, [userId]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="brand-bg ">
                <div className="pt-12 md:pt-16 w-100 max-w-[1024px] md:mx-2 rounded-lg lg:mx-auto pb-4">
                    <div className="mt-2 bg-white rounded-lg">
                        <div className="relative mb-4 -mt-4">
                            <div className="flex justify-end pt-6 pr-6 md:top-16">
                                <button className="bg-[rgb(59,73,223)] py-2 px-4 font-medium text-white hover:bg-[rgb(47,58,178)] rounded-lg mr-2">
                                    Follow
                                </button>
                                <button className="px-2 hover:bg-[rgb(0,0,0)]/5 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="abyohdzalx6c4nxnqym92x9n2cecu84w" className="crayons-icon dropdown-icon"><title id="abyohdzalx6c4nxnqym92x9n2cecu84w">User actions</title><path fill-rule="evenodd" clip-rule="evenodd" d="M7 12a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0zm5 2a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-4">

                            <h1 className="mb-2 md:text-center font-bold text-3xl">{userId.data?.name}</h1>
                            <h1 className="mx-auto md:text-center md:text-lg mb-4 ">{(userId.data?.bio ? userId.data?.bio : "No bio for this user")}</h1>
                        </div>
                        <div className="mx-auto p-4 md:text-center text-base border-[1px] border-solid border-black/10">
                            Work in progress <div>{userId.data?.emailVerified?.toDateString()}</div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 md:pt-0 md:grid md:grid-cols-[2fr_5fr] md:gap-4 w-100 max-w-[1024px] md:mx-2 rounded-lg lg:mx-auto">
                    <div className="hidden md:block p-4 bg-white rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a5kpnmz878tjvhq81r8kpgojye57ax16" className="mr-3 fill-black/50"><title id="a5kpnmz878tjvhq81r8kpgojye57ax16">Post</title>
                                <path d="M19 22H5a3 3 0 01-3-3V3a1 1 0 011-1h14a1 1 0 011 1v12h4v4a3 3 0 01-3 3zm-1-5v2a1 1 0 002 0v-2h-2zm-2 3V4H4v15a1 1 0 001 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z"></path>
                            </svg>
                            {postNumber} posts published
                        </div>
                        <div className="flex items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="anh03bsppscntuqknxyyt3s732fac5fr" className="mr-3 fill-black/50"><title id="anh03bsppscntuqknxyyt3s732fac5fr">Comment</title>
                                <path d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path>
                            </svg>
                            {commentNumber} posts published
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="aol3ax86n0xn2i2ba47umgjwh3qh1lzu" className="mr-3 fill-black/50"><title id="aol3ax86n0xn2i2ba47umgjwh3qh1lzu">Tag</title>
                                <path d="M7.784 14l.42-4H4V8h4.415l.525-5h2.011l-.525 5h3.989l.525-5h2.011l-.525 5H20v2h-3.784l-.42 4H20v2h-4.415l-.525 5h-2.011l.525-5H9.585l-.525 5H7.049l.525-5H4v-2h3.784zm2.011 0h3.99l.42-4h-3.99l-.42 4z"></path>
                            </svg>
                            No tag yet
                        </div>
                    </div>
                    {posts ?
                        <div className="flex flex-col">
                            {posts.map((post) => {
                                return <div className="mb-4">
                                    <Post post={post} user={{
                                        name: userId.data?.name as string,
                                        image: userId.data?.image as string,
                                        id: userId.data?.id as string
                                    }} />
                                </div>;
                            })}
                        </div>
                        :
                        <div className="p-4">No posts yet</div>}



                </div>
            </div>
        </Suspense>
    );
}