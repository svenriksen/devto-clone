import React from 'react';
import Image from 'next/image';
import { api } from '@/trpc/react';
import { useSession } from 'next-auth/react';

import { redirect, usePathname, useRouter } from 'next/navigation';
import { navigate } from '@/app/actions';

export default function Comment({ commentid, userid, preview }: { commentid: string, userid: string, preview: boolean }) {

    const path = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    const comment = api.post.getPostCommentById.useQuery({ id: commentid }).data;
    const user = api.profile.getProfile.useQuery(userid).data;
    const tempDeleteComment = api.post.deleteComment.useMutation();

    if (preview) {
        return (
            <div className='text-sm pb-3 flex flex-row items-start px-3  w-full'>
                {(user?.image) ? <Image src={user?.image} alt="" width={1000} height={1000} className='mr-2 w-8 h-auto rounded-full' /> :
                    <div className='mr-2 w-8 h-8 bg-black/10 rounded-full'></div>}

                <div className='bg-[--background] w-full grow p-4 pb-1'>
                    <h1 className='max-w-full w-full text-black/80 mb-1'>{user?.name}</h1>
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
            <div className='text-sm flex items-start pl-3 mr-3 mb-6'>
                {(user?.image) ? <Image src={user?.image} alt="" width={1000} height={1000} className='mr-2 w-8 h-auto rounded-full' /> :
                    <div className='mr-2 w-8 h-8 bg-black/10 rounded-full'></div>}
                <div className='w-full bg-white rounded-lg border-[1px] border-black/10 border-solid'>
                    <div className='flex flex-row justify-between'>
                        <h1 className='my-2 pt-2 px-3 text-base font-medium'>{user?.name}</h1>

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