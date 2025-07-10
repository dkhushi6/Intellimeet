"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProfileNav() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center py-2">
      {" "}
      {/* Reduced from py-4 to py-2 */}
      <div className="inline-flex border rounded-2xl p-0.5 bg-muted">
        <Link href="/profile/created">
          <Button
            variant={pathname === "/profile/created" ? "default" : "ghost"}
            className="rounded-l-2xl px-4 py-1 text-sm"
          >
            Created
          </Button>
        </Link>

        <Link href="/profile/purchased">
          <Button
            variant={pathname === "/profile/purchased" ? "default" : "ghost"}
            className="rounded-r-2xl px-4 py-1 text-sm"
          >
            Purchased
          </Button>
        </Link>
      </div>
    </div>
  );
}
