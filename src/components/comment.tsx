import React from 'react';
import Image from 'next/image';
import { api } from '@/trpc/react';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { usePathname, useRouter } from 'next/navigation';
import { navigate } from '@/app/actions';

export default function Comment({ commentid, userid, preview }: { commentid: string, userid: string, preview: boolean }) {

    const path = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    dayjs.extend(relativeTime);

    const comment = api.post.getPostCommentById.useQuery({ id: commentid }).data;
    const user = api.profile.getProfile.useQuery(userid).data;
    const tempDeleteComment = api.post.deleteComment.useMutation();

    if (preview) {
        return (
            <div className='text-sm pb-3 flex flex-row items-start px-3 w-full'>
                {(user?.image) ? <Image src={user?.image} alt="" width={1000} height={1000} className='mr-2 w-8 h-auto rounded-full' /> :
                    <div className='mr-2 w-8 h-8 bg-black/10 rounded-full'></div>}

                <div className='rounded-lg bg-[--background] w-full grow p-4 pb-1'>
                    <div className='max-w-full w-full flex flex-row itemts-center'>
                        <h1 className='text-black/80 mb-1 font-medium mr-2'>{user?.name}</h1>
                        <h2 className='text-sm text-[#717171]'>{dayjs(comment?.createdAt.toLocaleTimeString()).fromNow()}</h2>
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
            <div className='text-sm flex items-start pl-3 mb-6'>
                {(user?.image) ? <Image src={user?.image} alt="" width={1000} height={1000} className='mr-2 w-8 h-auto rounded-full' /> :
                    <div className='mr-2 w-8 h-8 bg-black/10 rounded-full'></div>}
                <div className='w-full bg-white rounded-lg border-[1px] border-black/10 border-solid'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row items-center'>
                            <h1 className='my-2 pt-2 px-3 text-base font-medium'>{user?.name}</h1>
                            <span className="text-black/30 pt-2 px-2 text-xl md:pl-0 align-middle self-center" role="presentation">•</span>
                            <h2 className='text-sm pt-2 text-[#717171]'>{comment?.createdAt.toLocaleDateString()}</h2>
                        </div>
                        <div>
                            {/* delete button */}
                            {(session?.user.id === comment?.createdById ? <button onClick={(event) => {
                                event.preventDefault();
                                tempDeleteComment.mutateAsync({ id: commentid }).catch(console.error);
                                navigate(path.substring(1)).catch(console.error);
                                // window.location.reload();
                                router.refresh();
                            }} className="mx-3 mt-2 px-2 py-1 border-[1px] text-sm md:text-base border-solid border-red-500 rounded-lg text-red-500 hover:bg-red-300">Delete</button> : null)}
                        </div>
                    </div>
                    <div className='px-3 mb-4'>
                        <div dangerouslySetInnerHTML={{ __html: comment?.content ?? "" }} style={{ all: "initial" }} className="prose text-sm">

                        </div>

                    </div>
                </div>

            </div>
        );
    }
}