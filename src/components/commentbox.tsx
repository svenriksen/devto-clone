'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Tiptap from './tiptap';
import { api } from '@/trpc/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { navigate } from '@/app/actions';


export default function CommentBox({ post, subComment }
    : {
        post: { id: string },
        subComment?: boolean
    }) {
    const router = useRouter();
    const path = usePathname();
    const { data: session } = useSession();
    const [content, setContent] = React.useState("");
    const [mkdwn, setMkdwn] = React.useState("");

    const postMutation = api.post.createComment.useMutation({
        onSuccess: () => {
            console.log('success');
            // navigate(path.substring(1)).catch(console.error);
            window.location.reload();
            router.refresh();
        }
    });

    const replyCommentMutation = api.comment.replyComment.useMutation({
        onSuccess: () => {
            console.log('success');
            // navigate(path.substring(1)).catch(console.error);
            window.location.reload();
            router.refresh();
        }
    });


    if (!session) {
        return <></>
    }
    function submitForm(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        if (subComment === true) {
            replyCommentMutation.mutateAsync({ content: mkdwn, commentId: post.id }).catch(console.error);
        }
        else {
            postMutation.mutateAsync({ content: mkdwn, postId: post.id }).catch(console.error);

        }
        console.log(path.substring(1));
        // window.location.reload();
        // navigate(path.substring(1)).catch(console.error);
        router.refresh();
        // redirect(`/${session?.user.id}/${post.id}`);
    }

    return <div>
        <div className='text-sm pb-3 flex items-start'>

            {(session.user.image) ? <Image src={session.user.image} alt="" width={1000} height={1000} className='mr-2 w-8 h-auto rounded-full' /> :
                <div className='mr-2 w-8 h-8 bg-black/10 rounded-full'></div>}
            <div className='bg-[var(--background))] w-full'>
                <Tiptap onchange={() => null} content={content} setContent={setContent} mkdwn={mkdwn} setMkdwn={setMkdwn} className="!h-60 mb-3 !py-3 !px-3 text-sm md:text-base rounded-lg comment" />
                <div className='flex items-center flex-row'>
                    <button onClick={(event) => { submitForm(event) }} className='btn !px-4 !py-2 !text-base leading-6 font-medium mr-2 !bg-[rgb(59,73,223)] !text-white hover:!bg-[rgb(47,58,178)] disabled:!bg-[rgb(59,73,223)]/60' disabled={content.length == 0}>
                        Submit
                    </button>
                    <button className='btn !text-base !px-4 !py-2 leading-6 font-medium !bg-[#d6d6d7] !text-[#3d3d3d] disabled:opacity-60 disabled:!bg-[#d6d6d7] hover:!bg-[#bdbdbd]' disabled={content.length == 0}>
                        Preview
                    </button>
                </div>
            </div>
        </div >
    </div >;
}