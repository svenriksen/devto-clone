"use client";
import React, { useEffect } from "react";
import { navigate } from "../actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Icon from "/public/icon.png";
import Tiptap from "@/components/tiptap";
import { Tooltip } from "@nextui-org/tooltip"


export default function CreatePost() {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = React.useState(true);

    const [isActive, setIsActive] = React.useState([false, false, false, false]);
    const [currentSize, setCurrentSize] = React.useState(0);
    const [tags, setTags] = React.useState<string[]>([]);
    const [image, setImage] = React.useState<boolean>(false);

    function asideGuideChange(index: number) {
        let active = isActive;
        active = active.map((_, i) => i == index);
        setIsActive(active);
    }


    function handleTags(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log(event.target.value);
        if (event.target.value.length > 0 && currentSize < 4) {

            if (tags.includes(event.target.value)) {
                return;
            }

            const ul = document.getElementById("ul-tag");
            const li = document.createElement("li");
            li.className = "self-center";
            li.innerHTML = `
                <div class="flex items-center mr-1">
                    <button onclick="event.preventDefault()" class="bg-[rgba(59,73,223,0.1)] px-2 py-1 " style="border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem;"># ${event.target.value}</button>
                    <button class="!p-1 !bg-[rgba(59,73,223,0.1)]" style="border-top-right-radius: 0.5rem; border-bottom-right-radius: 0.5rem;">
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="crayons-icon"><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"></path></svg>
                    </button>
                </div>
                `;
            li.addEventListener("click", function (this: typeof li, eventLi) {
                eventLi.preventDefault();
                if (this.parentNode != null) {
                    this.parentNode.removeChild(this);
                    setCurrentSize(currentSize - 1);
                    setTags(tags.filter((tag) => tag != event.target.value));
                }
            });
            if (ul != null) {
                ul.appendChild(li);
                setCurrentSize(currentSize + 1);
                setTags([...tags, event.target.value]);
                event.target.value = "";
            }
        }
    }

    useEffect(() => {

        if (!session) {
            navigate("/login").catch(console.error);
        }
    }, [session]);

    function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log("called");

        // console.log(event.target);

        if (event.target.files == null) {
            setImage(false);
            return;
        }
        console.log(event.target.files[0]);

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById("image-preview") as HTMLImageElement;
            img.src = e.target?.result as string;
        }
        reader.readAsDataURL(event.target.files[0] as Blob);

        setImage(true);

    }

    return <div className="absolute w-screen h-screen top-0 left-0 z-50 bg-[--background] text-sm">
        <div className="relative">
            <form className="max-w-[1380px] mx-auto grid p-0 gap-x-2 grid-cols-[100%] md:grid-cols-[64px_7fr_3fr] grid-rows-[min-content_1fr_min-content] md:gap-x-4 md:px-2 lg:px-4">
                <div className="flex flex-row justify-between items-center h-14 col-span-2">
                    <div className="flex items-center">
                        <Link href="/" className="mr-4 hidden md:inline-block">
                            <Image src={Icon} alt="" width={0} height={0} style={{ width: "auto", height: "40px" }} />
                        </Link>
                        <div className="font-medium hidden sm:inline-block">Create Post</div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={(event) => { event.preventDefault(); setIsEditing(true); }} className={(isEditing ? "font-medium " : "") + "btn mx-1 !p-2"}>Edit</button>
                        <button onClick={(event) => { event.preventDefault(); setIsEditing(false); }} className={(isEditing == false ? "font-medium " : "") + "btn mx-1 !p-2"}>Preview</button>
                        <button onClick={async (event) => { event.preventDefault(); await navigate() }} className="md:absolute p-2 hover:text-[rgba(47,58,178)] hover:bg-[rgba(59,73,223,0.1)] rounded-lg right-2 top-2 ml-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="crayons-icon c-btn__icon"><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"></path></svg>
                        </button>
                    </div>
                </div>
                <div className="rounded-lg bg-white h-[calc(100vh-128px)] relative shadow flex flex-col overflow-y-auto md:row-start-2 md:row-end-2 md:col-span-2 lg:col-span-1 lg:col-start-2 lg:col-end-2">
                    <div className="py-5 px-5 md:py-8 md:px-12 lg:px-16">
                        <div className="flex flex-row items-center mb-5">
                            <div className="flex items-center">
                                {(image ? <Image src={""} alt="" id="image-preview" className="w-[40%] h-auto" /> : null)}
                                <Tooltip className="w-fit bg-black/90 text-white text-sm py-1 px-2 rounded-lg" placement="bottom" size="sm" content="Use a ratio of 1000:420 for best results.">
                                    <label htmlFor="image" className="w-auto z-10 cursor-pointer font-medium border-[#a3a3a3] border-solid border-2 rounded-lg py-2 px-4 text-sm">
                                        {(image ? "Change" : "Add a cover image")}
                                        <input type="file" onChange={(event) => uploadImage(event)} accept="image/*" className="outline-0 absolute -z-10 opacity-0 hidden" id="image" name="image" />
                                    </label>
                                    <button className=" w-auto z-10 cursor-pointer font-medium text-red-600 border-solid border-2 rounded-lg py-2 px-4 text-sm" onClick={(event) => {
                                        event.preventDefault();
                                        setImage(false);
                                        const img = document.getElementById("image-preview") as HTMLImageElement;
                                        img.src = "";
                                    }}>
                                        Remove
                                    </button>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="mb-2 items-center">
                            <textarea name="title" onFocus={() => asideGuideChange(0)} id="title" placeholder="New post title here..." className="h-max text-3xl placeholder:text-4xl placeholder:font-bold font-bold placeholder:text-black/65 text-black w-full"></textarea>
                        </div>
                        <ul id="ul-tag" className="flex flex-row items-center flex-wrap w-100">
                            <li className="self-center grow" style={{ order: "1" }}>
                                {currentSize < 4 ? <input type="text" name="tags" id="tags-input" placeholder={(currentSize == 0 ? "Add up to 4 tags" : "Add another...")} className="w-full" onFocus={() => asideGuideChange(1)} onBlur={handleTags} />
                                    : null
                                }</li>
                        </ul>
                    </div>

                    <Tiptap onchange={() => asideGuideChange(2)} />

                </div>
                <div className="hidden md:block md:row-start-2 md:row-end-2 md:col-start-3">
                    <div className={(isActive[0] ? "" : "opacity-0") + " sticky top-36"}>
                        <div className={(isActive[0] ? "transition-aside" : "")}>
                            <h4 className="font-bold mb-2">Writing a Great Post Title</h4>
                            <ul className="list-disc pl-4 font-light">
                                <li className="mb-2">Think of your post title as a super short (but compelling!) description - like an overview of the actual post in one short sentence.</li>
                                <li>Use keywords where appropriate to help ensure people can find your post by search</li>
                            </ul>
                        </div>
                    </div>
                    <div className={(isActive[1] ? "" : "opacity-0") + " sticky top-[229px]"}>
                        <div className={(isActive[1] ? "transition-aside" : "")}>
                            <h4 className="font-bold mb-2">Tagging Guidelines</h4>
                            <ul className="list-disc pl-4 font-light">
                                <li>Tags help people find your post - think of them as the topics or categories that best describe your post.</li>
                                <li>Add up to four comma-separated tags per post. Use existing tags whenever possible.</li>
                                <li>Some tags have special posting guidelines - double check to make sure your post complies with them.</li>
                            </ul>
                        </div>
                    </div>
                    <div className={(isActive[2] ? "" : "opacity-0") + " sticky top-[362px]"}>
                        <div className={(isActive[2] ? "transition-aside" : "")}>
                            <h4 className="font-bold mb-2">Editor Basics</h4>
                            <ul className="list-disc pl-4 font-light">
                                <li>Use <a href="#markdown">Markdown</a> to write and format posts.</li>
                                <li>Embed rich content such as Tweets, YouTube videos, etc. Use the complete URL: <code>&#123;% embed https://... %&#125;.</code> <a href="#liquid">See a list of supported embeds</a>.</li>
                                <li>In addition to images for the post&#39;s content, you can also drag and drop a cover image.</li>
                            </ul>
                        </div>
                    </div>
                    <div className={(isActive[3] ? "" : "opacity-0") + " sticky top-[890px]"}>
                        <div className={(isActive[3] ? "transition-aside" : "")}>
                            <h4 className="font-bold mb-2">Publishing Tips</h4>
                            <ul className="list-disc pl-4 font-light">
                                <li>Ensure your post has a cover image set to make the most of the home feed and social media platforms.</li>
                                <li>Share your post on social media platforms or with your co-workers or local communities.</li>
                                <li>Ask people to leave questions for you in the comments. It&#39;s a great way to spark additional discussion describing personally why you wrote it or why people might find it helpful.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="h-[72px] px-2 md:p-0 flex items-center row-start-3 col-span-2 md:col-start-1 lg:col-start-2" onMouseEnter={() => asideGuideChange(3)}>
                    <button type="submit" className="bg-[rgb(59,73,223)] py-2 px-4 font-medium text-white hover:bg-[rgb(47,58,178)] rounded-lg mr-2">Publish</button>
                    <button className="py-2 px-4 font-medium btn rounded-lg mr-2 text-ellipsis leading-tight">Save draft</button>
                    <button className="py-2 px-4 font-medium btn rounded-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="crayons-icon c-btn__icon"><path d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                    </button>
                    <button className="py-2 px-4 font-medium btn rounded-lg mr-2 leading-tight">
                        Revert new changes
                    </button>
                </div>
            </form >
        </div >
    </div >;

}