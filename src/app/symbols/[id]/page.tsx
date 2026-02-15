"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, ExternalLink } from "lucide-react";
import { getSymbolById, symbols } from "@/data/symbols";
import { useFavoriteStore } from "@/store/favoriteStore";
import SymbolIcon from "@/components/SymbolIcon";

export default function SymbolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const symbol = getSymbolById(id);

  if (!symbol) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <p className="text-gray-400 text-lg">記号が見つかりません</p>
        <button
          onClick={() => router.push("/symbols")}
          className="mt-4 text-[#3B82F6] font-medium"
        >
          辞典に戻る
        </button>
      </div>
    );
  }

  const isFav = mounted && favorites.includes(symbol.id);
  const relatedSymbols = (symbol.relatedIds || [])
    .map((rid) => symbols.find((s) => s.id === rid))
    .filter(Boolean);

  return (
    <div className="px-4 pt-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/symbols")}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => toggleFavorite(symbol.id)}
          className="p-2 -mr-2"
        >
          <Star
            size={24}
            className={
              isFav
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-gray-500"
            }
          />
        </button>
      </div>

      {/* Symbol Display */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4 text-gray-800">
          <SymbolIcon svg={symbol.svg} size={120} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{symbol.nameJa}</h1>
        <p className="text-gray-400 mt-1">{symbol.nameEn}</p>
        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-500">
          {symbol.category}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
          説明
        </h2>
        <p className="text-gray-700 leading-relaxed">{symbol.description}</p>
      </div>

      {/* Detail URL */}
      <div className="mb-8">
        <a
          href={symbol.detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#3B82F6] text-white font-medium rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all"
        >
          Roniqueサイトで詳しい編み方を見る
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Related Symbols */}
      {relatedSymbols.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
            関連する記号
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {relatedSymbols.map((rs) =>
              rs ? (
                <Link
                  key={rs.id}
                  href={`/symbols/${rs.id}`}
                  className="shrink-0 bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md active:scale-95 transition-all text-center w-[100px]"
                >
                  <div className="flex justify-center mb-1 text-gray-700">
                    <SymbolIcon svg={rs.svg} size={36} />
                  </div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">
                    {rs.nameJa}
                  </p>
                </Link>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
