"use client";

import { useState, useMemo, useCallback, Fragment } from "react";
import { Search, ChevronDown } from "lucide-react";
import { faqs, faqCategories, type FAQCategory } from "@/data/faqs";
import { faqsEn } from "@/data/faqs.en";
import { useTranslations, useLocale } from "next-intl";

type FilterTab = "all" | FAQCategory;

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-700 text-gray-800 dark:text-yellow-100 rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

function formatAnswer(answer: string, query: string) {
  const lines = answer.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <br key={i} />;

    if (/^【.+】/.test(trimmed)) {
      return (
        <p key={i} className="font-bold text-gray-800 dark:text-gray-100 mt-3 first:mt-0">
          {highlightText(trimmed, query)}
        </p>
      );
    }

    if (trimmed.startsWith("■")) {
      return (
        <p key={i} className="font-bold text-gray-700 dark:text-gray-200 mt-2">
          {highlightText(trimmed, query)}
        </p>
      );
    }

    if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
      return (
        <p key={i} className="ml-4 text-gray-600 dark:text-gray-400">
          {highlightText(trimmed, query)}
        </p>
      );
    }

    if (/^\d+\./.test(trimmed)) {
      return (
        <p key={i} className="ml-4 text-gray-600 dark:text-gray-400">
          {highlightText(trimmed, query)}
        </p>
      );
    }

    if (trimmed.startsWith("→")) {
      return (
        <p key={i} className="ml-4 text-gray-500 dark:text-gray-400 italic">
          {highlightText(trimmed, query)}
        </p>
      );
    }

    if (trimmed.startsWith("「")) {
      return (
        <p key={i} className="ml-2 text-gray-600 dark:text-gray-400">
          {highlightText(trimmed, query)}
        </p>
      );
    }

    return (
      <p key={i} className="text-gray-600 dark:text-gray-400">
        {highlightText(trimmed, query)}
      </p>
    );
  });
}

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const t = useTranslations("faq");
  const locale = useLocale();

  const faqData = locale === "en" ? faqsEn : faqs;

  const filtered = useMemo(() => {
    let result = faqData;

    if (activeTab !== "all") {
      result = result.filter((f) => f.category === activeTab);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, query, faqData]);

  const toggleOpen = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="px-4 pt-10 pb-24 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t("title")}</h1>
      <p className="text-gray-400 dark:text-gray-500 mt-1 mb-4">{t("subtitle")}</p>

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
        <button
          onClick={() => setActiveTab("all")}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
            activeTab === "all"
              ? "bg-[#3B82F6] text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {t("all")}
        </button>
        {faqCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
              activeTab === cat
                ? "bg-[#3B82F6] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      {filtered.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-400 dark:text-gray-500">{t("notFound")}</p>
          <p className="text-gray-300 dark:text-gray-600 text-sm mt-1">
            {t("notFoundHint")}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900 shadow-sm"
                    : "bg-white dark:bg-slate-800 border-gray-100 dark:border-gray-700"
                }`}
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-bold text-gray-800 dark:text-gray-100 text-sm pr-2 leading-snug">
                    {highlightText(faq.question, query)}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 text-sm leading-relaxed">
                      {formatAnswer(faq.answer, query)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
