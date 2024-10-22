"use client";
import Link from "next/link";
import Image from "next/image";
import { navigate } from "@/app/actions";
import { api } from "@/trpc/react";
import React from "react";
import Comment from "./comment";


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
    const comments = api.post.getPostCommentsCount.useQuery({ id: post.id }).data;
    const reactions = api.post.getPostReactionCount.useQuery({ id: post.id }).data;
    const allComments = api.post.getPostAllComments.useQuery({ id: post.id, quantity: 2 }).data;


    if (user === null) {
        const temp = api.profile.getProfile.useQuery(post.createdById).data;
        user = {
            name: temp?.name ?? "",
            image: temp?.image ?? "",
            id: temp?.id ?? ""
        }
    }



    return <div className="mb-4">
        {(post.coverImage !== null) ? <Image className="object-cover w-full h-32 object-center" style={{ borderTopRightRadius: "0.375rem", borderTopLeftRadius: "0.375rem" }} src={post.coverImage ?? ""} alt="" width={1000} height={1000} />
            : null}
        <div className={"relative hover:cursor-pointer w-100 bg-white border-solid border-[1px] border-black/10" + (post.coverImage === null ? "rounded-lg" : "")} style={{
            borderBottomRightRadius: "0.75rem",
            borderBottomLeftRadius: "0.75rem",
        }} >


            <div className="relative pb-3 flex flex-row items-start px-3  w-full" onClick={async () => { await navigate(`${user?.id}/${post.id}`) }}>
                {(user?.image) ? <Image src={user?.image} alt="" width={1000} height={1000} className='mr-2 my-3 w-8 h-auto rounded-full' /> :
                    <div className='mr-2 my-3 w-8 h-8 bg-black/10 rounded-full'></div>}

                <div>
                    <div className="py-3">
                        <div className="absolute w-8 h-8 -left-10 top-3 rounded-full">
                        </div>
                        <div className="font-medium text-sm">{user?.name}</div>
                        <div className="text-xs text-[rgb(82,82,82)]">{post.createdAt.toUTCString()}</div>
                    </div>
                    <div className="pb-3">
                        <Link href={`${user?.id}/${post.id}`} className="text-2xl font-bold hover:text-[rgba(47,58,178)]">{post.title}</Link>
                    </div>
                    <div className="pb-4 -ml-2">
                        {post.tags.map((tag, index) => {
                            return <Link href={"/"} key={index} className="text-sm btn !px-2 !py-1 border-[1px] border-transparent !bg-white hover:!bg-[rgba(59,73,223)]/25 hover:border-[rgba(59,73,223)] hover:border-[1px] hover:border-solid transition duration-300">
                                <span className="text-[rgba(59,73,223)]">#</span>{tag}
                            </Link>
                        })}
                    </div>
                    <div className="pb-4 -ml-2 flex items-center" >
                        <Link href={"/"} className="flex items-center hover:bg-slate-100/50 px-2 py-1 w-fit rounded">
                            <Image alt="" src="https://dev.to/assets/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg" width="24" height="24" />
                            <div className="ml-2">{reactions} Reactions</div>
                        </Link>
                        <Link href={"/"} className="flex items-center hover:bg-slate-100/50 px-2 py-1 w-fit rounded">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" ><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path></svg>
                            <div className="ml-2">{comments} Comments</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="-mt-2 bottom-3">
                {allComments?.map((comment, index) => {
                    return <div key={index} className="">
                        <Comment commentid={comment.id} userid={comment.createdById} preview={true} />
                    </div>
                })}
            </div>
        </div>
    </div >;
}