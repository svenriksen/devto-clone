import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import "./globals.css";

// import { HamburgerClicked } from "@/util/context";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"text-gray-900 font-sans"}
      >

        <Navbar />
        <div className="p-4">
          {children}
        </div>
      </body>
    </html >
  );
}