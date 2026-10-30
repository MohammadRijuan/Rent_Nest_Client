import { House } from "lucide-react";

type BrandMarkProps = {
  inverse?: boolean;
  className?: string;
};

export default function BrandMark({
  inverse = false,
  className = "",
}: BrandMarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 whitespace-nowrap ${className}`}
      aria-label="RentNest"
    >
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-full border ${
          inverse
            ? "border-white/30 text-[#e7c2a8]"
            : "border-[#c9d0c3] bg-[#2f5039] text-[#f3f0e7]"
        }`}
      >
        <House size={17} strokeWidth={1.7} />
      </span>
      <span
        className={`text-[1.25rem] font-semibold tracking-[-0.06em] ${
          inverse ? "text-white" : "text-[#25332a]"
        }`}
      >
        Rent
        <span className={`font-normal ${inverse ? "text-[#d3b39b]" : "text-[#9a5c40]"}`}>
          Nest
        </span>
      </span>
    </span>
  );
}
