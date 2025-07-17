"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const tabStyle =
  "relative flex items-center space-x-2 py-3 px-4 text-[15px] font-medium";

const countStyle =
  "ml-1 px-2 py-0.5 rounded-full text-xs font-semibold transition-colors";

export default function ProfileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const tabs = [
    {
      label: "Purchased Events",
      href: "/profile/purchased",
      count: 8, // Replace with dynamic value
    },
    {
      label: "Created Events",
      href: "/profile/created",
      count: 12,
    },
    {
      label: "Saved Events",
      href: `/profile/saved/${session?.user?.id}`,
      count: 5,
    },
  ];

  return (
    <div className="w-full border-b border-muted dark:border-gray-700 rounded-t-2xl  ">
      <nav className="flex justify-center space-x-8">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link key={tab.label} href={tab.href}>
              <div
                className={`${tabStyle} ${
                  isActive
                    ? "text-[#6366F1] "
                    : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`${countStyle} ${
                    isActive
                      ? "bg-[#6366F1] text-white "
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {tab.count}
                </span>

                {isActive && (
                  <span className="absolute left-0 -bottom-[1px] h-0.5 w-full bg-[#6366F1]  rounded-full" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
