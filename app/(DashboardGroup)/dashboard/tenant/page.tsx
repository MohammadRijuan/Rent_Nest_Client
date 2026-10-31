"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import PaymentsAction from "../../_actions/paymentsAction";
import RentalsAction from "../../_actions/rentalsAction";

interface Payment {
  id: string;
  amount: number;
  status: string;
  transaction_id?: string;
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

interface Rental {
  id: string;
  move_in_date: string;
  message: string;
  status: string;
  property?: {
    id: string;
    titles: string;
  };
}

const TenantDashboard = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const [paymentResult, rentalResult] = await Promise.all([
          PaymentsAction(),
          RentalsAction(),
        ]);

        if (paymentResult.success) {
          setPayments(paymentResult.data || []);
        } else {
          toast.error(paymentResult.message);
        }

        if (rentalResult.success) {
          setRentals(rentalResult.data?.data || []);
        } else {
          toast.error(rentalResult.message);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  const successfulPayments = payments.filter(
    (payment) => payment.status === "SUCCESS"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "PENDING"
  ).length;

  const failedPayments = payments.filter(
    (payment) =>
      payment.status === "FAILED" ||
      payment.status === "CANCELLED"
  ).length;

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-2xl font-bold">Tenant Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          View your rental requests and payment overview.
        </p>
      </div>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Total Rental Requests */}
        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Total Rental Requests
          </h2>

          <p className="mt-2 text-3xl font-bold text-primary">
            {loading ? "Loading..." : rentals.length}
          </p>
        </div>

        {/* Total Payments */}
        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Total Payments
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : payments.length}
          </p>
        </div>

        {/* Successful Payments */}
        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Successful Payments
          </h2>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {loading ? "Loading..." : successfulPayments}
          </p>
        </div>

        {/* Pending Payments */}
        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Pending Payments
          </h2>

          <p className="mt-2 text-3xl font-bold text-orange-600">
            {loading ? "Loading..." : pendingPayments}
          </p>
        </div>

        {/* Failed Payments */}
        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Failed / Cancelled Payments
          </h2>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {loading ? "Loading..." : failedPayments}
          </p>
        </div>

      </div>

      {/* Rental Requests */}
      <div className="flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Rental Requests</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View your submitted rental requests and their statuses.
          </p>
        </div>

        <Link
          href="/dashboard/tenant/requests"
          className="inline-flex w-fit items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          View Requests →
        </Link>
      </div>

      {/* Payment History */}
      <div className="flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Payment History</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View all your rental payment transactions and their statuses.
          </p>
        </div>

        <Link
          href="/dashboard/tenant/payments"
          className="inline-flex w-fit items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          View Payments →
        </Link>
      </div>
    </div>
  );
};

export default TenantDashboard;