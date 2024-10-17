"use client";
import { api } from "@/trpc/react";
import Image from "next/image";
import { navigate } from "@/app/actions";
import Link from "next/link";

export default function Post({ params }: { params: { userId: string, postId: string } }) {
    const post = api.post.getPostById.useQuery({ id: params.postId });
    const user = api.profile.getProfile.useQuery(post.data?.createdById || "", { enabled: !!post.data?.createdById }).data;
    return (

        <>
            <div className="max-w-[1308px] w-full mx-auto grid grid-cols-1 gap-0 md:gap-2 md:p-2 md:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_7fr_3fr] lg:gap-4 lg:p-4">
                <aside className="hidden md:grid gap-6 justify-center items-start mt-[calc(56px+6vh)] sticky w-full top-[calc(56px+6vh)] ">
                    <div className="grid gap-6 items-center">
                        <button className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" >
                                <g clipPath="url(#clip0_988_3276)">
                                    <path d="M19 14V17H22V19H18.999L19 22H17L16.999 19H14V17H17V14H19ZM20.243 4.75698C22.505 7.02498 22.583 10.637 20.479 12.992L19.059 11.574C20.39 10.05 20.32 7.65998 18.827 6.16998C17.324 4.67098 14.907 4.60698 13.337 6.01698L12.002 7.21498L10.666 6.01798C9.09103 4.60598 6.67503 4.66798 5.17203 6.17198C3.68203 7.66198 3.60703 10.047 4.98003 11.623L13.412 20.069L12 21.485L3.52003 12.993C1.41603 10.637 1.49503 7.01898 3.75603 4.75698C6.02103 2.49298 9.64403 2.41698 12 4.52898C14.349 2.41998 17.979 2.48998 20.242 4.75698H20.243Z" fill="#525252"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_988_3276">
                                        <rect width="24" height="24" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>

                        <button className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
                                <path d="M10 3h4a8 8 0 010 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8zm2 14h2a6 6 0 000-12h-4a6 6 0 00-6 6c0 3.61 2.462 5.966 8 8.48V17z"></path>
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
                                <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1zm13 2H6v15.432l6-3.761 6 3.761V4z"></path>
                            </svg>
                        </button>
                    </div>
                </aside>
                <div className="bg-white rounded-lg pb-8">
                    <Image alt="" src={post.data?.coverImage || ""} width={2000} height={2000} />
                    <div className="pt-8 px-12 relative md:px-16">

                        <Link href={`${user?.id}`} className="py-3 relative">
                            <div className="absolute w-8 h-8 -left-10 top-0 rounded-full">
                                <Image alt="" src={user?.image || ""} width={1000} height={1000} className="w-full h-auto rounded-full" />
                            </div>
                            <div className="font-medium text-base">{user?.name}</div>
                            <div className="text-xs text-[rgb(82,82,82)] mb-5">{post.data?.createdAt.toUTCString()}</div>
                        </Link>

                        <h1 className="text-4xl lg:text-5xl font-bold mb-2 leading-tight">{post.data?.title}</h1>

                        <div className="pb-4">
                            {post.data?.tags.map((tag, index) => {
                                return <Link href={"/"} className="text-sm btn !px-2 !py-1 mr-2 border-[1px] border-transparent !bg-white hover:!bg-[rgba(59,73,223)]/25 hover:border-[rgba(59,73,223)] hover:border-[1px] hover:border-solid transition duration-300">
                                    <span className="text-[rgba(59,73,223)]">#</span>{tag}
                                </Link>
                            })}
                        </div>
                    </div>
                    <div className="pt-8 px-12 relative md:px-16">
                        <div dangerouslySetInnerHTML={{ __html: post.data?.content || "" }} style={{ all: "initial" }} className="prose">

                        </div>
                    </div>
                </div>
                <div>
                    <div className="brand-bg-2 rounded-lg">
                        <div className="pt-12 md:pt-16 w-100 max-w-[1024px] md:mx-2 rounded-lg lg:mx-auto pb-4">
                            <div className="mt-2 bg-white">
                                <div className="relative px-4 -mt-4">
                                    <div className="flex items-end">
                                        <Image alt="" src={user?.image || ""} width={1000} height={1000} className="-top-10 mb-2 mr-3 w-10 h-auto rounded-lg" />
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