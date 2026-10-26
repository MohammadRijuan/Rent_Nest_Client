export default function Loading() {
    return (
        <main
            className="flex min-h-[70vh] items-center justify-center bg-[#FAFAF7] px-4"
            role="status"
            aria-label="Loading page"
        >
            <div className="flex flex-col items-center text-center">
                {/* Animated loader */}
                <div className="relative flex size-16 items-center justify-center">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-100 border-t-green-800" />

                    <span className="text-xl font-bold text-green-800">R</span>
                </div>

                {/* Loading text */}
                <h2 className="mt-6 text-lg font-semibold text-zinc-900">
                    Finding your place...
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                    Please wait while RentNest gets everything ready.
                </p>

                {/* Loading indicator */}
                <div className="mt-6 flex items-center gap-1.5">
                    <span className="size-1.5 animate-pulse rounded-full bg-green-800" />
                    <span className="size-1.5 animate-pulse rounded-full bg-green-800 [animation-delay:150ms]" />
                    <span className="size-1.5 animate-pulse rounded-full bg-green-800 [animation-delay:300ms]" />
                </div>
            </div>
        </main>
    );
}