
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays, Send } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import CreateRentalRequAction from "../_actions/createRentalRequAction";

interface Props {
    propertyId: string;
    propertyTitle: string;
    isGuest: boolean;
    alreadyRequested: boolean;
}

export default function RentalRequestDialog({
    propertyId,
    propertyTitle,
    isGuest,
    alreadyRequested,
}: Props) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [moveInDate, setMoveInDate] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const now = new Date();

    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
    ].join("-");

    const handleRequestClick = () => {
        if (isGuest) {
            router.push("/login");
            return;
        }

        if (alreadyRequested) {
            return;
        }

        setOpen(true);
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (isGuest) {
            router.push("/login");
            return;
        }

        if (alreadyRequested) {
            toast.error(
                "You have already requested this property."
            );
            return;
        }

        if (!moveInDate || !message.trim()) {
            toast.error("Please complete all fields.");
            return;
        }

        if (moveInDate < today) {
            toast.error("Move-in date cannot be in the past.");
            return;
        }

        setLoading(true);

        try {
            const result = await CreateRentalRequAction({
                property_id: propertyId,
                move_in_date: new Date(
                    `${moveInDate}T00:00:00`
                ),
                message: message.trim(),
            });

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            setOpen(false);
            setMoveInDate("");
            setMessage("");

            // Refresh the server page.
            // The previous request will now be detected.
            router.refresh();

        } catch (error) {
            console.error(
                "Rental request error:",
                error
            );

            toast.error(
                "Unable to submit rental request."
            );
        } finally {
            setLoading(false);
        }
    };

    // Already requested
    if (alreadyRequested) {
        return (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="font-semibold text-amber-800">
                    Already Requested
                </p>

                <p className="mt-1 text-sm text-amber-700">
                    You have already submitted a rental
                    request for this property.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Request Button */}
            <button
                type="button"
                onClick={handleRequestClick}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#2f5039] px-6 py-3 font-semibold text-white transition hover:bg-[#243f2d] sm:w-auto"
            >
                Request this property
            </button>

            {/* Dialog - only needed for tenants */}
            {!isGuest && (
                <Dialog
                    open={open}
                    onOpenChange={setOpen}
                >
                    <DialogContent className="max-w-lg rounded-2xl bg-[#fffefa]">
                        <DialogHeader>
                            <DialogTitle className="font-serif text-2xl text-[#26342a]">
                                Request this property
                            </DialogTitle>

                            <DialogDescription className="text-[#687067]">
                                Send your rental request to
                                the landlord.
                            </DialogDescription>
                        </DialogHeader>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* Property */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#26342a]">
                                    Property
                                </label>

                                <input
                                    value={propertyTitle}
                                    readOnly
                                    className="w-full rounded-xl border border-[#e4e0d5] bg-[#f5f3ed] px-4 py-3 text-sm"
                                />
                            </div>

                            {/* Move-in Date */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#26342a]">
                                    <CalendarDays size={17} />
                                    Move-in date
                                </label>

                                <input
                                    type="date"
                                    min={today}
                                    value={moveInDate}
                                    onChange={(e) =>
                                        setMoveInDate(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="w-full rounded-xl border border-[#e4e0d5] bg-white px-4 py-3 text-sm outline-none focus:border-[#55705a]"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#26342a]">
                                    Message to landlord
                                </label>

                                <textarea
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Write a message to the landlord..."
                                    rows={4}
                                    required
                                    className="w-full resize-none rounded-xl border border-[#e4e0d5] bg-white px-4 py-3 text-sm outline-none focus:border-[#55705a]"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2f5039] px-6 py-3 font-semibold text-white transition hover:bg-[#243f2d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    "Submitting..."
                                ) : (
                                    <>
                                        <Send size={17} />
                                        Submit request
                                    </>
                                )}
                            </button>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
