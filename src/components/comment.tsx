import React, { Suspense } from 'react';
import Image from 'next/image';
import { api } from '@/trpc/react';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { usePathname, useRouter } from 'next/navigation';

import CommentBox from './commentbox';
import Link from 'next/link';
import Loading from './loading';

import moment from 'moment';

export default function Comment({ commentid, userid, preview }: { commentid: string, userid: string, preview: boolean }) {

    const router = useRouter();
    const { data: session } = useSession();

    const [clicked, setClicked] = React.useState(false);

    dayjs.extend(relativeTime);

    const comment = api.post.getPostCommentById.useSuspenseQuery({ id: commentid })[1].data;
    const user = api.profile.getProfile.useSuspenseQuery(userid)[1].data;
    const tempDeleteComment = api.post.deleteComment.useMutation({
        onSuccess: () => {
            window.location.reload();
            router.refresh();
        }
    });

    const replyComment = api.comment.getAllReplyComments.useQuery({ id: commentid }).data;

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        setClicked(!clicked);
    }

    if (preview) {
        return (
            <div className='text-sm pb-3 flex flex-row items-start px-3 w-full'>
                {(user?.image) ? <Image src={user?.image} alt="" width={1000} height={1000} className='mr-2 w-8 h-auto rounded-full' /> :
                    <div className='mr-2 w-8 h-8 bg-black/10 rounded-full'></div>}

                <div className='rounded-lg bg-[--background] w-full grow p-4 pb-1'>
                    <div className='max-w-full w-full flex flex-row itemts-center'>
                        <Link prefetch={false} href={"/" + user?.id} className='text-black/80 mb-1 font-medium mr-2'>{user?.name}</Link>
                        <h2 className='text-sm text-[#717171]'>{moment(comment?.createdAt).fromNow()}</h2>
                    </div>
                    <div className='object-contain w-auto'>
                        <div className='w-full text-black/80 '>
                            <div style={{ all: "initial" }} className="prose text-sm">

                                <div className='max-h-24 !truncate !font-normal !text-base' dangerouslySetInnerHTML={{ __html: comment?.content ?? "" }}></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    else {
        return (
            <div className='text-sm flex items-start pb-3'>
                {(user?.image) ? <Image src={user?.image} alt="" width={1000} height={1000} className='mr-2 w-8 h-auto rounded-full' /> :
                    <div className='mr-2 w-8 h-8 bg-black/10 rounded-full'></div>}
                <div className='w-full'>
                    <div className='w-full bg-white rounded-lg border-[1px] border-black/10 border-solid'>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row items-center'>
                                <Link prefetch={false} href={"/" + user?.id} className='my-2 pt-2 px-3 text-base font-medium'>{user?.name}</Link>
                                <span className="text-black/30 pt-2 px-2 text-xl md:pl-0 align-middle self-center" role="presentation">•</span>
                                <h2 className='text-sm pt-2 text-[#717171]'>{moment(comment?.createdAt).format("DD/MM/YYYY")}</h2>
                            </div>
                            <div>
                                {/* delete button */}
                                <Suspense fallback={<Loading />}>
                                    {(session?.user.id === comment?.createdById ? <button onClick={(event) => {
                                        event.preventDefault();
                                        tempDeleteComment.mutateAsync({ id: commentid }).catch(console.error);
                                        // navigate(path.substring(1)).catch(console.error);
                                        // window.location.reload();
                                        router.refresh();
                                    }} className="mx-3 mt-2 px-2 py-1 border-[1px] text-sm md:text-base border-solid border-red-500 rounded-lg text-red-500 hover:bg-red-300">Delete</button> : null)}
                                </Suspense>
                            </div>
                        </div>
                        <div className='px-3 mb-4'>
                            <div dangerouslySetInnerHTML={{ __html: comment?.content ?? "" }} style={{ all: "initial" }} className="prose text-sm">

                            </div>

                        </div>
                    </div>
                    <div className='flex items-center mb-3'>
                        <button className='py-1 px-2 hover:bg-black/5 rounded-lg inline-flex mr-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="a2amz5klbke5dy23eona1f8fd4qoyysz" className="crayons-icon reaction-icon not-reacted"><title id="a2amz5klbke5dy23eona1f8fd4qoyysz">Like comment: </title><path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path></svg>
                            { }
                            <span className='hidden md:inline-block'> likes</span>
                        </button>
                        <button className='py-1 px-2 hover:bg-black/5 rounded-lg inline-flex mr-1' onClick={(event) => handleClick(event)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="aha27iz36hxa721bo9nmtrwc3jdzmllf" className="crayons-icon reaction-icon not-reacted"><title id="aha27iz36hxa721bo9nmtrwc3jdzmllf">Comment button</title><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path></svg>{ }
                            <span className='hidden md:inline-block'> Reply</span>
                        </button>

                    </div>
                    <Suspense fallback={<Loading />}>
                        {session?.user ? (clicked ?
                            < CommentBox post={{ id: comment?.id ?? "" }} subComment={true} /> :
                            null
                        ) : null}
                    </Suspense>
                    <Suspense fallback={<Loading />}>
                        <div className='pl-5 w-full'>
                            {replyComment?.map((comment, index) => {
                                return <Comment key={index} commentid={comment.id} userid={comment.createdById} preview={false} />
                            })}
                        </div>
                    </Suspense>
                </div>

            </div>
        );
    }
}