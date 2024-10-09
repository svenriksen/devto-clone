"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Billboard from './billboard';

export default function SideBar() {
    const isHamburgerClicked = false;

    console.log(isHamburgerClicked);
    const [isHamburger, setHamburger] = useState(isHamburgerClicked);

    useEffect(() => {
        setHamburger(isHamburgerClicked);
    }, [isHamburgerClicked]);

    return <aside className={(isHamburger ? "absolute" : "absolute hidden") + " md:static md:flex flex-col mt-4 mb-4"}>
        <div></div>
        <ul className='text-sm'>
            <Link href={"/"}>

                <li className='btn'>Home</li>
            </Link>
            <Link href={"/"}><li className='btn'>Dev++</li></Link>
            <Link href={"/"}><li className='btn'>Podcasts</li></Link>
            <Link href={"/"}><li className='btn'>Videos</li > </Link>
            <Link href={"/"}><li className='btn'>Tags</li ></Link>
            <Link href={"/"}><li className='btn'>DEV Help</li ></Link>
            <Link href={"/"}><li className='btn'>Forem Shop</li ></Link>
            <Link href={"/"}><li className='btn'>Advertise on DEV</li ></Link>
            <Link href={"/"}><li className='btn'>DEV Challenges</li ></Link>
            <Link href={"/"}><li className='btn'>DEV Showcase</li ></Link>
            <Link href={"/"}><li className='btn'>About</li ></Link>
            <Link href={"/"}><li className='btn'>Contact</li ></Link>
            <Link href={"/"}><li className='btn'>Free Postgres Database</li ></Link>
            <Link href={"/"}><li className='btn'>Guides</li ></Link>
            <Link href={"/"}><li className='btn'>Software comparisons</li ></Link>
        </ul >

        <div className="mb-4">
            <h2 className="pl-4 py-2 font-bold">Other</h2>
            <ul className='text-sm'>
                <Link href={"/"}><li className='btn'>Code of Conduct</li ></Link>
                <Link href={"/"}><li className='btn'>Privacy Policy</li ></Link>
                <Link href={"/"}><li className='btn'>Terms of use</li ></Link>
            </ul>
        </div>

        <div className="mb-4 flex justify-start">
            <Link href={"/"} className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ paddingBottom: "2px" }} role="img" aria-labelledby="adovcqcamj59bpuso3zedhxgocx8j1m1" ><title id="adovcqcamj59bpuso3zedhxgocx8j1m1">Twitter</title>
                    <g id="surface1">
                        <path style={{ stroke: "none", fillRule: "evenodd", fillOpacity: "1" }} d="M 12 0 C 18.628906 0 24 5.371094 24 12 C 24 18.628906 18.628906 24 12 24 C 5.371094 24 0 18.628906 0 12 C 0 5.371094 5.371094 0 12 0 Z M 12 0 "></path>
                        <path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(100%,100%,100%)", fillOpacity: "1" }} d="M 14.9375 7.386719 L 16.5 7.386719 L 13.082031 11.292969 L 17.105469 16.613281 L 13.953125 16.613281 L 11.488281 13.386719 L 8.664062 16.613281 L 7.097656 16.613281 L 10.753906 12.433594 L 6.894531 7.386719 L 10.125 7.386719 L 12.355469 10.335938 Z M 14.386719 15.675781 L 15.253906 15.675781 L 9.652344 8.273438 L 8.722656 8.273438 Z M 14.386719 15.675781 "></path>
                    </g>

                </svg>
            </Link>
            <Link href={"/"} className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="ahk37c04ixp67qowcnpd6986y96soxvr" ><title id="ahk37c04ixp67qowcnpd6986y96soxvr">Facebook</title>
                    <path d="M15.402 21v-6.966h2.333l.349-2.708h-2.682V9.598c0-.784.218-1.319 1.342-1.319h1.434V5.857a19.188 19.188 0 00-2.09-.107c-2.067 0-3.482 1.262-3.482 3.58v1.996h-2.338v2.708h2.338V21H4a1 1 0 01-1-1V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1h-4.598z"></path>
                </svg>
            </Link>
            <Link href={"/"} className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="abikgl12srq5fgnklaunelayr4abqobt" ><title id="abikgl12srq5fgnklaunelayr4abqobt">Github</title>
                    <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0022 12c0-5.525-4.475-10-10-10z"></path>
                </svg>
            </Link>
            <Link href={"/"} className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a2c3f4zmkrgjfkvjgbg1oyyqpodk2k0e" ><title id="a2c3f4zmkrgjfkvjgbg1oyyqpodk2k0e">Instagram</title>
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"></path>
                </svg>
            </Link>
            <Link href={"/"} className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="acwnf1gh5sjaay26c2n3c11kywalfhf7" ><title id="acwnf1gh5sjaay26c2n3c11kywalfhf7">Twitch</title>
                    <path d="M4.3 3H21v11.7l-4.7 4.7h-3.9l-2.5 2.4H7v-2.4H3V6.2L4.3 3zM5 17.4h4v2.4h.095l2.5-2.4h3.877L19 13.872V5H5v12.4zM15 8h2v4.7h-2V8zm0 0h2v4.7h-2V8zm-5 0h2v4.7h-2V8z"></path>
                </svg>
            </Link>
            <Link href={"/"} className='p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a4c26zu8m68is8dq28t9qn0qk3yd1hti" ><title id="a4c26zu8m68is8dq28t9qn0qk3yd1hti">Mastodon</title>
                    <path d="M21.258 13.99c-.274 1.41-2.456 2.955-4.962 3.254-1.306.156-2.593.3-3.965.236-2.243-.103-4.014-.535-4.014-.535 0 .218.014.426.04.62.292 2.215 2.196 2.347 4 2.41 1.82.062 3.44-.45 3.44-.45l.076 1.646s-1.274.684-3.542.81c-1.25.068-2.803-.032-4.612-.51-3.923-1.039-4.598-5.22-4.701-9.464-.031-1.26-.012-2.447-.012-3.44 0-4.34 2.843-5.611 2.843-5.611 1.433-.658 3.892-.935 6.45-.956h.062c2.557.02 5.018.298 6.451.956 0 0 2.843 1.272 2.843 5.61 0 0 .036 3.201-.397 5.424zm-2.956-5.087c0-1.074-.273-1.927-.822-2.558-.567-.631-1.308-.955-2.229-.955-1.065 0-1.871.41-2.405 1.228l-.518.87-.519-.87C11.276 5.8 10.47 5.39 9.405 5.39c-.921 0-1.663.324-2.229.955-.549.631-.822 1.484-.822 2.558v5.253h2.081V9.057c0-1.075.452-1.62 1.357-1.62 1 0 1.501.647 1.501 1.927v2.79h2.07v-2.79c0-1.28.5-1.927 1.5-1.927.905 0 1.358.545 1.358 1.62v5.1h2.08V8.902l.001.001z"></path>
                </svg>
            </Link>
        </div>

        <Billboard isClicked={false} title={"Dev Diamond Sponsors"} className="border-2 border-black border-solid">
            <div>
                <h1 className='my-2 font-bold'>Thank you to our Diamond Sponsor Neon</h1>
                <p className='my-2'>Neon is the official database partner of DEV</p>
                <p className='my-2'>Happy Coding</p>
            </div>
        </Billboard>

        <Billboard isClicked={false} title={"Dev Diamond Sponsors"} className='mt-6'>
            <div>
                <h1 className='text-lg my-2 font-bold'>Life is too short to browse without dark mode.</h1>
                <p className='my-2'>You can customize your theme, font, and more when you are signed in</p>
            </div>
        </Billboard>

        <footer className={(isHamburgerClicked ? "hidden" : "block") + " md:block mt-6 text-[0.875em]"}>
            <p>
                <a className="font-medium text-[rgba(59,73,223)] hover:underline" aria-label="DEV Community Home" href="/">DEV Community </a>
                A constructive and inclusive social network for software developers. With you every step of your journey.
            </p>

            <p className="mt-4">Built on <a className="font-medium text-[rgba(59,73,223)] hover:underline" target="_blank" rel="noopener" href="https://www.forem.com">Forem</a> — the <a target="_blank" rel="noopener" className="font-medium text-[rgba(59,73,223)] hover:underline" href="https://dev.to/t/opensource">open source</a> software that powers <a target="_blank" rel="noopener" className="font-medium text-[rgba(59,73,223)] hover:underline" href="https://dev.to">DEV</a> and other inclusive communities.</p>
            <p className="mt-4">Made with love and <a target="_blank" rel="noopener" className="font-medium text-[rgba(59,73,223)] hover:underline" href="https://dev.to/t/rails">Ruby on Rails</a>. DEV Community <span title="copyright">©</span> 2016 - 2024.</p>
        </footer>

    </aside >;
}
