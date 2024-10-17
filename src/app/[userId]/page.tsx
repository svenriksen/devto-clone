'use client';
import React, { useEffect } from "react";
import { api } from "@/trpc/react";
import { navigate } from "../actions";
import { notFound } from "next/navigation";

export default function Profile({ params }: { params: { userId: string } }) {

    const userId = api.profile.getProfile.useQuery(params.userId);
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
        <div className="brand-bg">
            <div className="pt-8 md:pt-16 w-100 max-w-[1024px] rounded-lg mx-auto">
                <div className="mt-2 bg-white">
                    <div className="relative mb-4 -mt-8">
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

                        <h1 className="mb-2 text-center font-bold text-3xl">{userId.data?.name}</h1>
                        <h1 className="mb-2 text-center font-bold text-3xl">{userId.data?.bio}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}