"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher/page";
import { Button, buttonVariants } from "../ui/button";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex justify-between border border-muted shadow-md p-6">
        {/* Logo */}
        <div>
          <Link href="/">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-[#6366F1]" />
              <span className="text-2xl font-semibold tracking-tight">
                IntelliMeet
              </span>
            </div>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />

          <Link href="/explore">
            <Button>Explore</Button>
          </Link>

          {session ? (
            <>
              <Link href="/create">
                <Button>Create</Button>
              </Link>
              <Link href="/profile">
                <Image
                  src={session.user?.image || "/default.png"}
                  alt="user"
                  className="rounded-full"
                  width={32}
                  height={32}
                />
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
