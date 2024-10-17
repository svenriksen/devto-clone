"use client";
import Link from "next/link";
import Image from "next/image";
import { navigate } from "@/app/actions";
import { api } from "@/trpc/react";
import React from "react";

export default function Post({
    post,
    user
}: {
    post: {
        title: string;
        tags: string[];
        content: string;
        coverImage: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    },
    user: {
        name: string;
        image: string;
        id: string;
    } | null
}) {

    if (user === null) {
        const temp = api.profile.getProfile.useQuery(post.createdById).data;
        user = {
            name: temp?.name || "",
            image: temp?.image || "",
            id: temp?.id || ""
        }
    }



    return <div className="my-4">
        {(post.coverImage !== null) ? <Image className="object-cover w-full h-32 object-center" style={{ borderTopRightRadius: "0.75rem", borderTopLeftRadius: "0.75rem" }} src={post.coverImage || ""} alt="" width={1000} height={1000} />
            : null}
        <div className={"relative hover:cursor-pointer w-100 bg-white " + (post.coverImage === null ? "rounded-lg" : "")} style={{
            borderBottomRightRadius: "0.75rem",
            borderBottomLeftRadius: "0.75rem",
        }} >


            <div className="relative max-w-[80%] mx-auto" onClick={async () => { await navigate(`${user?.id}/${post.id}`) }}>
                <div className="py-3">
                    <div className="absolute w-8 h-8 -left-10 top-3 rounded-full">
                        <Image alt="" src={user?.image || ""} width={1000} height={1000} className="w-full h-auto rounded-full" />
                    </div>
                    <div className="font-medium text-sm">{user?.name}</div>
                    <div className="text-xs text-[rgb(82,82,82)]">{post.createdAt.toUTCString()}</div>
                </div>
                <div className="pb-3">
                    <Link href={`${user?.id}/${post.id}`} className="text-2xl font-bold hover:text-[rgba(47,58,178)]">{post.title}</Link>
                </div>
                <div className="pb-4">
                    {post.tags.map((tag, index) => {
                        return <Link href={"/"} className="text-sm btn !px-2 !py-1 border-[1px] border-transparent !bg-white hover:!bg-[rgba(59,73,223)]/25 hover:border-[rgba(59,73,223)] hover:border-[1px] hover:border-solid transition duration-300">
                            <span className="text-[rgba(59,73,223)]">#</span>{tag}
                        </Link>
                    })}
                </div>
                <div className="pb-4">
                    <Link href={"/"}></Link>
                    <Link href={"/"}></Link>
                </div>
            </div>
        </div>
    </div >;
}