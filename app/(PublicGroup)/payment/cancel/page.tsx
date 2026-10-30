"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

const PaymentCancelPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-5 rounded-xl border bg-background p-8 text-center shadow-sm">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />

        <h1 className="text-2xl font-bold">Payment Cancelled</h1>

        <p className="text-muted-foreground">
          You cancelled the payment process. No successful payment has been confirmed.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard/tenant"
            className="rounded-md bg-primary px-5 py-3 text-primary-foreground hover:opacity-90"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/dashboard/tenant/requests"
            className="rounded-md border px-5 py-3 hover:bg-muted"
          >
            View Rental Requests
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;