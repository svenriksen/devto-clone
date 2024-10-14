import { useSession } from "next-auth/react";
import React from "react";

export default function Profile() {
    const { data: session } = useSession();
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}