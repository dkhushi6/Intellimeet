"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher/page";
import { Button } from "../ui/button";

import { Sparkles } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div>
      {" "}
      <div className="flex justify-between border border-muted shadow-md p-6">
        <div>
          {" "}
          <Link href="/">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-2xl font-semibold  tracking-tight">
                IntelliMeet
              </span>
            </div>{" "}
          </Link>
        </div>
        <div className="flex gap-4">
          <div>
            <ThemeSwitcher />
          </div>
          <div>
            <Link href="/create">
              <Button>Create</Button>
            </Link>
          </div>
          <div>
            <Link href="/explore">
              <Button>Explore</Button>
            </Link>
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
    </div>
  );
}
