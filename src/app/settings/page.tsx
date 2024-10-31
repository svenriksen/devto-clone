"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/trpc/react';
import { navigate } from '../actions';
import Link from 'next/link';

export default function Settings() {

    const { data: session } = useSession();

    const [isClicked, setIsClicked] = React.useState([true, false, false, false, false, false]);
    const user = api.profile.getProfile.useQuery(session?.user.id ?? "").data;


    if (!session) {
        navigate('login').catch(console.error);
    }

    const updateUsertemp = api.profile.updateProfile.useMutation({
        onSuccess: () => {
            window.location.reload();
        }
    });

    function checkClick(index: number) {
        return () => {
            const newIsClickded = isClicked.map((value, i) => {
                if (i == index) {
                    return true;
                }
                return false;
            });
            setIsClicked(newIsClickded);
        }
    }

    if (!session) {
        navigate('login').catch(console.error);
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const form = new FormData(event.currentTarget);
            updateUsertemp.mutateAsync({
                name: form.get('Name') as string,
                email: form.get('Email') as string,
                username: form.get('Username') as string,
                bio: form.get('Bio') as string
            }).catch(console.error);
            form.forEach((value, key) => {
                console.log(key, value);
            });
        }
        catch (error) {
            console.error(error);
        }
        // console.log(event);
        // const formData = new FormData(form.);
        // const data = Object.fromEntries(formData.entries());
        // console.log(form);
    }

    return <>
        <div className='text-lg text-[rgb(23,23,23)]'>
            <div className='max-w-[1024px] md:p-4 gap-4 w-100 mx-auto grid md:grid-cols-[240px_1fr] text-base mt-3'>
                <div className='flex flex-col'>
                    <button className={"btn !p-2 flex items-center" + (isClicked[0] ? " !bg-white font-medium" : "")} onClick={checkClick(0)}>
                        <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="ajk7lm2ww631prem7bzy2507cpxqaupj" ><title id="ajk7lm2ww631prem7bzy2507cpxqaupj">Profile</title>
                            <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" fill="#FFCC4D"></path>
                            <path d="M7.842 15.123c.025.1.649 2.433 4.158 2.433 3.51 0 4.133-2.333 4.158-2.433a.277.277 0 00-.464-.265c-.011.01-1.086 1.03-3.695 1.03-2.607 0-3.683-1.02-3.692-1.03a.28.28 0 00-.452.087.278.278 0 00-.014.178zM10.056 9.5c0 1.074-.622 1.944-1.39 1.944-.767 0-1.388-.87-1.388-1.944 0-1.074.621-1.944 1.389-1.944.767 0 1.389.87 1.389 1.944zm6.666 0c0 1.074-.621 1.944-1.389 1.944-.767 0-1.389-.87-1.389-1.944 0-1.074.622-1.944 1.39-1.944.767 0 1.388.87 1.388 1.944z" fill="#664500"></path>
                        </svg>
                        <span>Profile</span>
                    </button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[1] ? " !bg-white font-medium" : "")} onClick={checkClick(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="ar81y95lemkyug409whwckia37uz5z1r" className="mr-2"><title id="ar81y95lemkyug409whwckia37uz5z1r">Customization</title>
                            <path d="M12 16.444a4.444 4.444 0 110-8.889 4.444 4.444 0 010 8.89zm8.889-6.11H19.02a7.16 7.16 0 00-.879-2.12l1.322-1.32a1.112 1.112 0 000-1.572l-.786-.786a1.11 1.11 0 00-1.571 0l-1.321 1.322a7.167 7.167 0 00-2.12-.88V3.112A1.111 1.111 0 0012.557 2h-1.112a1.11 1.11 0 00-1.11 1.111V4.98a7.167 7.167 0 00-2.12.879l-1.32-1.322a1.111 1.111 0 00-1.572 0l-.786.786a1.112 1.112 0 000 1.571l1.322 1.321a7.172 7.172 0 00-.88 2.12H3.112A1.111 1.111 0 002 11.443v1.112a1.11 1.11 0 001.111 1.11H4.98c.18.76.48 1.473.879 2.119l-1.322 1.322a1.112 1.112 0 000 1.571l.786.786a1.113 1.113 0 001.571 0l1.321-1.322c.655.405 1.37.702 2.12.88v1.867A1.111 1.111 0 0011.443 22h1.112a1.111 1.111 0 001.11-1.111V19.02c.76-.18 1.473-.48 2.119-.879l1.322 1.322a1.108 1.108 0 001.571 0l.786-.786a1.111 1.111 0 000-1.571l-1.322-1.321a7.16 7.16 0 00.88-2.12h1.867A1.111 1.111 0 0022 12.557v-1.112a1.111 1.111 0 00-1.111-1.11z" fill="#66757F"></path>
                        </svg>
                        <span>Customization</span>
                    </button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[2] ? " !bg-white font-medium" : "")} onClick={checkClick(2)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="akcfvdnsohchrqkgwmdf4kqqapdpe27r" className="mr-2"><title id="akcfvdnsohchrqkgwmdf4kqqapdpe27r">Notifications</title>
                            <path d="M14.222 20.333c0 1.228-4.444 1.228-4.444 0v-5.555a2.222 2.222 0 114.444 0v5.555z" fill="#C1694F"></path>
                            <path d="M16.444 3.667H7.556v11.11h13.333V8.112a4.444 4.444 0 00-4.445-4.444z" fill="#99AAB5"></path>
                            <path d="M7.556 3.667A4.444 4.444 0 003.11 8.11v6.667H12V8.11a4.445 4.445 0 00-4.444-4.444" fill="#292F33"></path>
                            <path d="M20.889 9.222h-6.667a1.111 1.111 0 000 2.222h4.445v1.112a1.11 1.11 0 001.11 1.11h1.112A1.111 1.111 0 0022 12.557v-2.223a1.111 1.111 0 00-1.111-1.11z" fill="#DD2E44"></path>
                        </svg>
                        <span>Notifications</span></button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[3] ? " !bg-white font-medium" : "")} onClick={checkClick(3)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="asoz14lspjw7v9f83glzymtpl6uustj0" className='mr-2'><title id="asoz14lspjw7v9f83glzymtpl6uustj0">Account</title>
                            <path d="M14.728 9.999a9.75 9.75 0 00-1.6 1.345c-.07-2.358-.637-5.408-3.762-6.901-.618-3.364-7.83-1.655-7.183-1.329 1.285.65 1.97 2.305 2.796 3.175 1.474 1.552 3.113 1.647 3.928.433 1.927 1.252 2.054 3.627 1.995 6.166-.006.28-.013.542-.013.78v7.776c0 .614 2.223.614 2.223 0v-6.383c.3-.53 1.179-1.947 2.46-2.941.881.774 2.301.527 3.59-.83.829-.871 1.275-2.525 2.56-3.176.68-.342-7.11-2.218-6.993 1.885" fill="#77B255"></path>
                        </svg>
                        <span>Accounts</span></button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[4] ? " !bg-white font-medium" : "")} onClick={checkClick(4)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="a9aug7a6isju6ozy57imytwxgfgu58ps" className="mr-2"><title id="a9aug7a6isju6ozy57imytwxgfgu58ps">Organization</title>
                            <path d="M20.889 9.222a1.111 1.111 0 01-1.111 1.111h-3.334a1.111 1.111 0 01-1.11-1.11V8.11A1.111 1.111 0 0116.443 7h3.334a1.11 1.11 0 011.11 1.111v1.111zm-12.222 0a1.111 1.111 0 01-1.111 1.111H4.222a1.111 1.111 0 01-1.11-1.11V8.11A1.111 1.111 0 014.221 7h3.334a1.111 1.111 0 011.11 1.111v1.111z" fill="#DAC8B1"></path>
                            <path d="M22 20.889A1.111 1.111 0 0120.889 22H3.11A1.111 1.111 0 012 20.889V9.222a1.111 1.111 0 011.111-1.11H20.89A1.111 1.111 0 0122 9.221V20.89z" fill="#F1DCC1"></path>
                            <path d="M14.222 7V5.889c0-.41-.224-.765-.555-.957v-.154a1.111 1.111 0 00-1.111-1.111h-1.112a1.11 1.11 0 00-1.11 1.11v.155a1.106 1.106 0 00-.556.957V7h-.556v15h5.556V7h-.556z" fill="#DAC8B1"></path>
                            <path d="M10.889 7H9.778V5.889h1.11V7zm2.222 0h1.111V5.889h-1.11V7zm-.555 0h-1.112V5.889h1.112V7z" fill="#55ACEE"></path>
                            <path d="M11.444 18.111h-1.11v-7.778h1.11v7.778zm2.223 0h-1.111v-7.778h1.11v7.778z" fill="#3B88C3"></path>
                            <path d="M16.444 18.111h-1.11v-6.667h1.11v6.667zm2.223 0h-1.111v-6.667h1.11v6.667zm2.222 0h-1.111v-6.667h1.11v6.667zm-16.667 0h-1.11v-6.667h1.11v6.667zm2.222 0h-1.11v-6.667h1.11v6.667zm2.223 0H7.556v-6.667h1.11v6.667zm-4.445 1.667h-1.11v-1.111h1.11v1.11zm2.222 0h-1.11v-1.111h1.11v1.11zm2.223 0H7.556v-1.111h1.11v1.11z" fill="#55ACEE"></path>
                            <path d="M11.444 19.778h-1.11v-1.111h1.11v1.11zm2.223 0h-1.111v-1.111h1.11v1.11z" fill="#3B88C3"></path>
                            <path d="M16.444 19.778h-1.11v-1.111h1.11v1.11zm2.223 0h-1.111v-1.111h1.11v1.11zm2.222 0h-1.111v-1.111h1.11v1.11z" fill="#55ACEE"></path>
                            <path d="M4.222 22h-1.11v-1.667h1.11V22zm2.222 0h-1.11v-1.667h1.11V22zm2.223 0H7.556v-1.667h1.11V22zm2.777 0h-1.11v-1.667h1.11V22zm2.223 0h-1.111v-1.667h1.11V22zm2.777 0h-1.11v-1.667h1.11V22zm1.112 0h1.11v-1.667h-1.11V22zm3.333 0h-1.111v-1.667h1.11V22z" fill="#66757F"></path>
                        </svg>
                        <span>Organization</span></button>
                    <button className={"btn !p-2 flex items-center" + (isClicked[5] ? " !bg-white font-medium" : "")} onClick={checkClick(5)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-labelledby="a6zasfullkh4elut3l9ist2isaprohx3" className="mr-2"><title id="a6zasfullkh4elut3l9ist2isaprohx3">Extensions</title>
                            <path d="M7.556 22a.554.554 0 01-.494-.81l3.87-7.523h-6.71a.556.556 0 01-.363-.976L16.082 2.135a.555.555 0 01.857.675l-3.87 7.523h6.709a.556.556 0 01.363.976L7.919 21.865a.555.555 0 01-.363.135" fill="#FFAC33"></path>
                        </svg>
                        <span>Extensions</span>
                    </button>
                </div>
                <form onSubmit={(event) => onSubmit(event)} className=''>
                    {(isClicked[0]) ? <div>
                        <Link prefetch={false} href={session?.user.id ?? ""} className="text-2xl mb-4 md:mb-6 text-[rgb(59,73,223)] md:text-3xl font-bold">@{session?.user.name}</Link>
                        <div className='bg-white rounded-lg p-4 md:p-6 mb-4 md:mb-6 grid gap-4 md:gap-6'>
                            <h1 className='font-bold text-lg'>User</h1>
                            <div className='flex flex-col'>
                                <label htmlFor="Name">Name</label>
                                <input type="text" name='Name' defaultValue={user?.name ?? ""} className='mt-2 p-2 border-solid border-[1.5px] border-[rgb(212,212,212)] rounded-lg focus:border-[rgb(59,73,223)]' required />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="Email">Email</label>
                                <input type="email" name='Email' defaultValue={user?.email ?? ""} className='mt-2 p-2  border-solid border-[1.5px] border-[rgb(212,212,212)] rounded-lg focus:border-[rgb(59,73,223)]' required />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="Username">Username</label>
                                <input type="text" name='Username' defaultValue={user?.id ?? ""} className='mt-2 p-2  border-solid border-[1.5px] border-[rgb(212,212,212)] rounded-lg focus:border-[rgb(59,73,223)]' required />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="Bio">Bio</label>
                                <textarea defaultValue={user?.bio ?? ""} name='Bio' placeholder='A short bio..' className='mt-2 p-2 border-solid border-[1.5px] border-[rgb(212,212,212)] rounded-lg focus:border-[rgb(59,73,223)]' />
                            </div>
                        </div>
                        <div className='bg-white rounded-lg p-4 md:p-6 mb-4 md:mb-6 grid gap-4 md:gap-6'>
                            <button type='submit' className='btn font-medium mr-2 !bg-[rgb(59,73,223)] !text-white hover:!bg-[rgb(47,58,178)]'>
                                Save Profile Information
                            </button>
                        </div>
                    </div> : null}
                </form>
            </div>
        </div>
    </>
}