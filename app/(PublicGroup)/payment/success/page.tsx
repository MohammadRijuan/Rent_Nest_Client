"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import PaymentsAction from "@/app/(DashboardGroup)/_actions/paymentsAction";

const PaymentSuccessPage = () => {
  const [status, setStatus] = useState<"loading" | "success" | "pending" | "error">("loading");

  useEffect(() => {
    const checkPayment = async () => {
      const result = await PaymentsAction();

      if (!result.success) {
        setStatus("error");
        return;
      }

      const payments = Array.isArray(result.data)
        ? result.data
        : result.data?.data ?? [];

      const successfulPayment = payments.some(
        (payment: { status: string }) => payment.status === "SUCCESS"
      );

      setStatus(successfulPayment ? "success" : "pending");
    };

    checkPayment();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-5 rounded-xl border bg-background p-8 text-center shadow-sm">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-14 w-14 animate-spin" />
            <h1 className="text-2xl font-bold">Checking Payment...</h1>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Your payment has been verified successfully.
            </p>
          </>
        )}

        {status === "pending" && (
          <>
            <Loader2 className="mx-auto h-14 w-14 text-yellow-500" />
            <h1 className="text-2xl font-bold">Payment Pending</h1>
            <p className="text-muted-foreground">
              We couldn't find a successful payment record yet. Please check your payment history.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold">Unable to Verify Payment</h1>
            <p className="text-muted-foreground">
              We couldn't retrieve your payment records.
            </p>
          </>
        )}

        <Link
          href="/dashboard/tenant"
          className="inline-flex w-full justify-center rounded-md bg-primary px-5 py-3 text-primary-foreground"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;