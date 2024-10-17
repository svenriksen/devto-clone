"use client";
import { api } from "@/trpc/react";

export default function Post({ params }: { params: { userId: string, postId: string } }) {
    const post = api.post.getPostById.useQuery({ id: params.postId });

    return (
        <div>
            <h1>Post</h1>
            <h2>{post.data?.title}</h2>
            <p>{post.data?.content}</p>
        </div>
    );
}