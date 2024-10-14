'use server'

import { redirect } from 'next/navigation'

export async function navigate(input?: string) {
    if (input !== undefined) {
        redirect(`/${input}`);
    }
    redirect('/');
}