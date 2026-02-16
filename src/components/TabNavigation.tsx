"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hash, BookOpen, HelpCircle, Trophy } from "lucide-react";

const tabs = [
  { href: "/", label: "カウンター", icon: Hash },
  { href: "/symbols", label: "記号辞典", icon: BookOpen },
  { href: "/achievements", label: "実績", icon: Trophy },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
];

export default function TabNavigation() {
  const pathname = usePathname();

  // Hide tab bar on counter detail page
  if (pathname.startsWith("/counter/")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700 z-30">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 text-xs transition-colors ${
                isActive
                  ? "text-[#3B82F6] dark:text-blue-400 font-semibold"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
