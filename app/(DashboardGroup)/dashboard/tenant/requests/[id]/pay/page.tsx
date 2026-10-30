"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import CreatePaymentAction from "@/app/(DashboardGroup)/_actions/createPaymentAction";
import { Button } from "@/components/ui/button";

const PaymentPage = () => {
  const params = useParams();
  const rentalId = params.id as string;

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const result = await CreatePaymentAction(rentalId);

    if (result.success) {
      window.location.href = result.data.gatewayUrl;
      return;
    }

    toast.error(result.message);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-lg border p-6">
      <div>
        <h1 className="text-2xl font-bold">Complete Your Payment</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You will be redirected to SSLCommerz to complete your rental payment
          securely.
        </p>
      </div>

      <div className="rounded-lg bg-muted p-4">
        <p className="text-sm text-muted-foreground">Rental ID</p>
        <p className="break-all text-sm font-medium">{rentalId}</p>
      </div>

      <Button
        className="w-full"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Redirecting to payment..." : "Proceed to Payment"}
      </Button>
    </div>
  );
};

export default PaymentPage;