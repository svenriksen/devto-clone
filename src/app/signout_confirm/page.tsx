"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignoutConfirm() {
    const { data: session } = useSession();

    if (!session) {
        redirect("/");
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mt-[30%]">
                <h1 className="text-2xl mb-2 font-bold">Are you sure you want to sign out?</h1>
                <button onClick={() => signOut()} className="mx-auto block bg-[rgb(59,73,223)] py-4 px-6 font-medium text-white hover:bg-[rgb(47,58,178)] rounded-lg">Yes, sign out</button>
            </div>
        </div>
    );
}