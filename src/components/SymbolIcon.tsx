"use client";

interface SymbolIconProps {
  svg: string;
  size?: number;
  className?: string;
}

export default function SymbolIcon({ svg, size = 60, className = "" }: SymbolIconProps) {
  const scaled = svg
    .replace(/width="40"/, `width="${size}"`)
    .replace(/height="40"/, `height="${size}"`);

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: scaled }}
    />
  );
}
