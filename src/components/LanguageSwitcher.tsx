"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1];

  const toggleLanguage = () => {
    const newLocale = currentLocale === "ja" ? "en" : "ja";
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
      aria-label="言語切り替え / Switch Language"
    >
      <Languages className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {currentLocale === "ja" ? "EN" : "JA"}
      </span>
    </button>
  );
}
