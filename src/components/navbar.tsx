import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 h-14 bg-white">
            <Link href="/">
                <Image src="/public/icon.png" alt="" width={125} height={125} />
            </Link>
        </nav>
    );
}