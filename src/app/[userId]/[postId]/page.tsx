"use client";
import { navigate } from "@/app/actions";
import Comment from "@/components/comment";
import CommentBox from "@/components/commentbox";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function Post({ params }: { params: { userId: string, postId: string } }) {
    const { data: session } = useSession();
    const post = api.post.getPostById.useQuery({ id: params.postId });
    const user = api.profile.getProfile.useQuery(post.data?.createdById ?? "", { enabled: !!post.data?.createdById }).data;
    const comments = api.post.getPostAllComments.useQuery({ id: post.data?.id ?? "", quantity: -1 }).data;
    const temp = api.post.deletePosts.useMutation();
    const reactions = api.post.getPostReactionCount.useQuery({ id: post.data?.id ?? "" });
    const isCurrentUserReaction = api.post.getPostReactions.useQuery({ id: post.data?.id ?? "" });

    const tempAddReaction = api.post.reactToPost.useMutation();
    const tempRemoveReaction = api.post.removePostReaction.useMutation();

    const [react, setReact] = useState(false);
    const [reactionsCount, setReactionsCount] = useState(0);

    useEffect(() => {
        if (isCurrentUserReaction === undefined) { return; }
        if (isCurrentUserReaction.data) {
            setReact(true);
            reactions.refetch().then(() => {
                setReactionsCount(reactions.data! ?? 0);
            }).catch(console.error);
        }
        else {
            setReact(false);
            reactions.refetch().then(() => {
                setReactionsCount(reactions.data! ?? 0);
            }).catch(console.error);
        }
    }, [isCurrentUserReaction, reactions]);

    const [formFocus, setFormFocus] = useState(false);

    function reactToPost(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        if (isCurrentUserReaction.data!.length === 0) {
            tempAddReaction.mutate({ id: post.data?.id ?? "", reaction: "like" });
            isCurrentUserReaction.refetch().then(() => {
                setReact(isCurrentUserReaction.data!.length > 0);
            }).catch(console.error);
            reactions.refetch().then(() => {
                setReactionsCount(reactions.data! ?? 0);
            }).catch(console.error);
        }
        else {
            // api.post.reactToPost.useMutation({ id: post.data?.id ?? "", reaction: "unlike" });
            if (isCurrentUserReaction.data!.length > 0) {
                tempRemoveReaction.mutate({ id: isCurrentUserReaction.data![0]!.id ?? 0 });
                isCurrentUserReaction.refetch().then(() => {
                    setReact(isCurrentUserReaction.data!.length > 0);
                }).catch(console.error);
                reactions.refetch().then(() => {
                    setReactionsCount(reactions.data! ?? 0);
                }).catch(console.error);
            }
        }
    }

    return (

        <>
            <div className="max-w-[1308px] w-full mx-auto grid grid-cols-1 gap-0 md:gap-2 md:p-2 md:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_7fr_3fr] lg:gap-4 lg:p-4">
                <aside className="hidden md:grid gap-6 justify-center items-start mt-[calc(56px+6vh)] sticky w-full top-[calc(56px+6vh)] ">
                    <div className="grid gap-6 items-center">
                        <button onClick={(event) => reactToPost(event)}>
                            <svg className={(react ? "!fill-red-500" : "") + " hover:bg-black/20 rounded-lg"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#eb4d05" role="img" aria-hidden="true" >
                                <g clipPath="url(#clip0_988_3276)">
                                    <path d="M19 14V17H22V19H18.999L19 22H17L16.999 19H14V17H17V14H19ZM20.243 4.75698C22.505 7.02498 22.583 10.637 20.479 12.992L19.059 11.574C20.39 10.05 20.32 7.65998 18.827 6.16998C17.324 4.67098 14.907 4.60698 13.337 6.01698L12.002 7.21498L10.666 6.01798C9.09103 4.60598 6.67503 4.66798 5.17203 6.17198C3.68203 7.66198 3.60703 10.047 4.98003 11.623L13.412 20.069L12 21.485L3.52003 12.993C1.41603 10.637 1.49503 7.01898 3.75603 4.75698C6.02103 2.49298 9.64403 2.41698 12 4.52898C14.349 2.41998 17.979 2.48998 20.242 4.75698H20.243Z" fill="#525252"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_988_3276">
                                        <rect width="24" height="24" fill="#eb4d05"></rect>
                                    </clipPath>
                                </defs>
                            </svg>

                            {reactionsCount}
                        </button>

                        <button className="hover:bg-black/20 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
                                <path d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path>
                            </svg>
                            {comments?.length}
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
                                <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1zm13 2H6v15.432l6-3.761 6 3.761V4z"></path>
                            </svg>
                        </button>
                    </div>
                </aside >
                <div className="bg-white rounded-lg pb-8">
                    {(post.data?.coverImage !== null && post.data?.coverImage.replace("data:application/octet-stream;base64,", "").trim() !== "") ? <Image alt="" src={post.data?.coverImage ?? ""} width={2000} height={2000} />
                        : null}
                    <div className="pt-8 px-12 relative md:px-16">

                        <Link href={`${user?.id}`} className="py-3 relative">
                            <div className="absolute w-8 h-8 -left-10 top-0 rounded-full">
                                <Image alt="" src={user?.image ?? ""} width={1000} height={1000} className="w-full h-auto rounded-full" />
                            </div>
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="font-medium text-base">{user?.name}</div>
                                    <div className="text-xs text-[rgb(82,82,82)] mb-5">{post.data?.createdAt.toUTCString()}</div>
                                </div>
                                {(session?.user.id === post.data?.createdById ? <button onClick={(event) => {
                                    event.preventDefault();
                                    temp.mutate({ id: post.data?.id ?? "" });
                                    navigate("/").catch(console.error);
                                }} className="absolute -right-7 px-2 py-2 border-[1px] text-sm md:text-base border-solid border-red-500 rounded-lg text-red-500 hover:bg-red-300">Delete</button> : null)}

                            </div>
                        </Link>

                        <h1 className="text-4xl lg:text-5xl font-bold mb-2 leading-tight">{post.data?.title}</h1>

                        <div className="pb-4">
                            {post.data?.tags.map((tag, index) => {
                                return <Link href={"/"} key={index} className="text-sm btn !px-2 !py-1 mr-2 border-[1px] border-transparent !bg-white hover:!bg-[rgba(59,73,223)]/25 hover:border-[rgba(59,73,223)] hover:border-[1px] hover:border-solid transition duration-300">
                                    <span className="text-[rgba(59,73,223)]">#</span>{tag}
                                </Link>
                            })}
                        </div>
                    </div>
                    <div className="pt-8 px-12 relative md:px-16">
                        <div dangerouslySetInnerHTML={{ __html: post.data?.content ?? "" }} style={{ all: "initial" }} className="prose">

                        </div>
                    </div>
                    <div className="mb-4 border-t-[1px] border-solid border-black/10 py-8 px-12 md:px-16">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="font-bold text-2xl">Top comments { }</div>
                            <button className="rounded-lg leading-6 border-2 border-solid border-[#d6d6d7] hover:bg-[#f9f9f9] py-1 px-3">Subscribe</button>

                        </div>
                        <div onFocus={(event) => {
                            event.preventDefault();
                            setFormFocus(true);
                        }} className="">

                            {session?.user ? (formFocus ?
                                < CommentBox post={{ id: post.data?.id ?? "" }} /> :
                                <div className='text-sm pb-3 flex items-start pl-3 mr-3'>
                                    {(session.user.image) ? <Image src={session.user.image} alt="" width={1000} height={1000} className='mr-2 w-8 h-auto rounded-full' /> :
                                        <div className='mr-2 w-8 h-8 bg-black/10 rounded-full'></div>}
                                    <textarea className="w-full h-28 border-solid border-[1px] border-black/40 rounded-lg p-2" placeholder="Add to the discussion" >
                                    </textarea>
                                </div>
                            ) : null}
                        </div>

                        {(comments?.map((comment, index) => {
                            return <Comment commentid={comment.id} userid={user?.id ?? ""} preview={false} key={index} />;
                        })
                        )}
                    </div>
                </div>
                <div className="hidden lg:block">
                    <div className="brand-bg-2 rounded-lg">
                        <div className="pt-12 md:pt-16 w-100 max-w-[1024px] md:mx-2 rounded-lg lg:mx-auto pb-4">
                            <div className="mt-2 bg-white">
                                <div className="relative px-4 -mt-4">
                                    <div className="flex items-end">
                                        <Image alt="" src={user?.image ?? ""} width={1000} height={1000} className="-top-10 mb-2 mr-3 w-10 h-auto rounded-lg" />
                                        <h1 className="mb-2 font-bold text-lg">{user?.name}</h1>
                                    </div>
                                </div>
                                <div className="p-4">

                                    <button className="bg-[rgb(59,73,223)] w-full font-medium text-white hover:bg-[rgb(47,58,178)] rounded-lg py-2 mb-4">
                                        Follow
                                    </button>
                                    <h1 className="mb-4 ">{(user?.bio ? user?.bio : "No bio for this user")}</h1>
                                </div>
                                <div className="mx-auto p-4 md:text-center text-base border-[1px] border-solid border-black/10">
                                    Work in progress <div>{user?.emailVerified?.toDateString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}