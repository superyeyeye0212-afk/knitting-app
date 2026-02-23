"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import { symbols, type SymbolCategory } from "@/data/symbols";
import { useFavoriteStore } from "@/store/favoriteStore";
import SymbolIcon from "@/components/SymbolIcon";
import { useTranslations, useLocale } from "next-intl";

type FilterTab = "all" | "favorites" | SymbolCategory;

export default function SymbolsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [query, setQuery] = useState("");
  const { favorites, toggleFavorite } = useFavoriteStore();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("symbols");
  const locale = useLocale();

  const filterTabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: t("categories.all") },
    { key: "favorites", label: t("categories.favorites") },
    { key: "基本", label: t("categories.basic") },
    { key: "増減", label: t("categories.increase") },
    { key: "引き上げ編み", label: t("categories.raised") },
    { key: "応用", label: t("categories.advanced") },
    { key: "特殊", label: t("categories.special") },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    let result = symbols;

    if (activeTab === "favorites") {
      result = result.filter((s) => favorites.includes(s.id));
    } else if (activeTab !== "all") {
      result = result.filter((s) => s.category === activeTab);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.nameJa.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, query, favorites]);

  return (
    <div className="px-4 pt-10 pb-24 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t("title")}</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-500"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search")}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-slate-800 placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 scrollbar-hide">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
              activeTab === tab.key
                ? "bg-[#3B82F6] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-400 dark:text-gray-500">
            {activeTab === "favorites" ? t("noFavorites") : t("notFound")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((symbol) => {
            const isFav = mounted && favorites.includes(symbol.id);
            return (
              <div key={symbol.id} className="relative">
                <Link
                  href={`/${locale}/symbols/${symbol.id}`}
                  className="block bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-md active:scale-[0.97] transition-all text-center"
                >
                  <div className="flex justify-center mb-2 text-gray-700 dark:text-gray-300">
                    <SymbolIcon svg={symbol.svg} image={symbol.image} size={60} />
                  </div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight">
                    {locale === "ja" ? symbol.nameJa : symbol.nameEn}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {locale === "ja" ? symbol.nameEn : symbol.nameJa}
                  </p>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(symbol.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 z-10"
                >
                  <Star
                    size={18}
                    className={
                      isFav
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-400"
                    }
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
