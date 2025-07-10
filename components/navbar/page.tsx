"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher/page";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between shadow-md p-6">
      <div>
        {" "}
        <Link href="/">I n t e l l i M e e t</Link>
      </div>
      <div className="flex gap-4">
        <div>
          <ThemeSwitcher />
        </div>
        <div>
          <Link href="/create">Create</Link>
        </div>
        <div>
          <Link href={`/saved/${session?.user?.id}`}>Saved</Link>
        </div>
        {session ? (
          <div>
            <Link href="/profile">
              <div className="">
                <Image
                  src={session.user?.image || "default"}
                  alt="user"
                  className=" rounded-full "
                  width={32}
                  height={32}
                />
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/login">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}
