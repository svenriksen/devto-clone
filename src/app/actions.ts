'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'


export async function navigate(input?: string) {

    if (input !== undefined) {
        revalidatePath(`/${input}`);
        redirect(`/${input}`);
    }
    revalidatePath('/');
    redirect('/');
}