import { House } from "lucide-react";
import BrandMark from "@/components/shared/brandMark";

export default function Loading() {
    return (
        <main
            className="flex min-h-[70vh] items-center justify-center bg-[#fbfaf6] px-4"
            role="status"
            aria-label="Loading page"
        >
            <div className="flex flex-col items-center text-center">
                {/* Animated loader */}
                <div className="relative flex size-16 items-center justify-center">
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#dfe5dc] border-t-[#2f5039]" />
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#2f5039] text-[#f3f0e7]">
                        <House size={19} strokeWidth={1.7} />
                    </span>
                </div>

                {/* Loading text */}
                <BrandMark className="mt-5" />

                <h2 className="mt-4 text-lg font-semibold text-[#26342a]">
                    Finding your place...
                </h2>

                <p className="mt-2 text-sm text-[#687067]">
                    Please wait while RentNest gets everything ready.
                </p>

                {/* Loading indicator */}
                <div className="mt-6 flex items-center gap-1.5">
                    <span className="size-1.5 animate-pulse rounded-full bg-[#2f5039]" />
                    <span className="size-1.5 animate-pulse rounded-full bg-[#2f5039] [animation-delay:150ms]" />
                    <span className="size-1.5 animate-pulse rounded-full bg-[#2f5039] [animation-delay:300ms]" />
                </div>
            </div>
        </main>
    );
}