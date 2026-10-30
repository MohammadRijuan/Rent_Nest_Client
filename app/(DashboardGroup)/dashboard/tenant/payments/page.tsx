
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import PaymentsAction from "../../../_actions/paymentsAction";

interface Payment {
    id: string;
    amount: number;
    status: string;
    transaction: string;
    createdAt: string;
    rental?: {
        id: string;
        property?: {
            id: string;
            titles: string;
            location?: string;
        };
    };
}

const TenantPaymentsPage = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPayments = async () => {
            try {
                const result = await PaymentsAction();

                if (result.success) {

                    setPayments(result.data || []);
                }
                else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.error("Payment history error:", error);
                toast.error("Failed to load payment history");
            } finally {
                setLoading(false);
            }
        };

        getPayments();
    }, []);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "SUCCESS":
                return "bg-green-100 text-green-700";
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";
            case "FAILED":
            case "CANCELLED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Payment History</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Track all your rental payment transactions.
                </p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-5">
                    <p className="text-sm text-muted-foreground">Total Payments</p>
                    <p className="mt-2 text-2xl font-bold">
                        {loading ? "..." : payments.length}
                    </p>
                </div>

                <div className="rounded-lg border p-5">
                    <p className="text-sm text-muted-foreground">
                        Successful Payments
                    </p>
                    <p className="mt-2 text-2xl font-bold text-green-600">
                        {loading
                            ? "..."
                            : payments.filter((p) => p.status === "SUCCESS").length}
                    </p>
                </div>

                <div className="rounded-lg border p-5">
                    <p className="text-sm text-muted-foreground">Pending Payments</p>
                    <p className="mt-2 text-2xl font-bold text-orange-600">
                        {loading
                            ? "..."
                            : payments.filter((p) => p.status === "PENDING").length}
                    </p>
                </div>
            </div>

            {/* Payment Table */}
            <div className="overflow-hidden rounded-lg border">
                <div className="border-b p-5">
                    <h2 className="font-semibold">Transaction Records</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Your complete payment transaction history.
                    </p>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                        Loading payment history...
                    </div>
                ) : payments.length === 0 ? (
                    <div className="p-8 text-center">
                        <h3 className="font-semibold">No payments found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your payment transactions will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                                <tr className="text-left">
                                    <th className="whitespace-nowrap px-5 py-4 font-medium">
                                        Property
                                    </th>
                                    <th className="whitespace-nowrap px-5 py-4 font-medium">
                                        Transaction ID
                                    </th>
                                    <th className="whitespace-nowrap px-5 py-4 font-medium">
                                        Amount
                                    </th>
                                    <th className="whitespace-nowrap px-5 py-4 font-medium">
                                        Date
                                    </th>
                                    <th className="whitespace-nowrap px-5 py-4 font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {payments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-muted/30">
                                        <td className="min-w-[180px] px-5 py-4">
                                            <p className="font-medium">
                                                {payment.rental?.property?.titles || "Property"}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {payment.rental?.property?.location || "—"}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            {payment.transaction || "—"}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 font-medium">
                                            ৳{Number(payment.amount).toLocaleString("en-BD")}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            {payment.createdAt
                                                ? new Date(payment.createdAt).toLocaleDateString(
                                                    "en-GB"
                                                )
                                                : "—"}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                                    payment.status
                                                )}`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TenantPaymentsPage;
