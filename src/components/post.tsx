import Link from "next/link";

export default function Post() {
    return <div className="relative w-100 bg-white my-4 rounded-xl">
        <div className="absolute w-8 h-8 left-3 md:left-4 top-3 bg-gray-300 rounded-full"></div>

        <div className="max-w-[80%] mx-auto">
            <div className="py-3">
                <div className="w-20 h-4 bg-gray-300"></div>
                <div className="w-10 h-3 bg-gray-300"></div>
            </div>
            <div className="pb-3">
                <Link href={""} className="text-2xl font-bold hover:text-[rgba(47,58,178)]">Lorem ipsum this is a link</Link>
            </div>
            <div className="pb-4">
                <Link href={"/"} className="text-sm btn border-[1px] border-transparent !bg-white hover:!bg-[rgba(59,73,223)]/25 hover:border-[rgba(59,73,223)] hover:border-[1px] hover:border-solid transition duration-300">#tag 1</Link>
                <Link href={"/"} className="text-sm btn border-[1px] border-transparent !bg-white hover:!bg-[rgba(59,73,223)]/25 hover:border-[rgba(59,73,223)] hover:border-[1px] hover:border-solid transition duration-300">#tag 2</Link>
                <Link href={"/"} className="text-sm btn border-[1px] border-transparent !bg-white hover:!bg-[rgba(59,73,223)]/25 hover:border-[rgba(59,73,223)] hover:border-[1px] hover:border-solid transition duration-300">#tag 3</Link>
                <Link href={"/"} className="text-sm btn border-[1px] border-transparent !bg-white hover:!bg-[rgba(59,73,223)]/25 hover:border-[rgba(59,73,223)] hover:border-[1px] hover:border-solid transition duration-300">#tag 4</Link>
            </div>
            <div className="pb-4">
                <Link href={"/"}></Link>
                <Link href={"/"}></Link>
            </div>
        </div>
    </div>;
}