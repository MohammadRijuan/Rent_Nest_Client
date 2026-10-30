"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import RentalsAction from "../../_actions/rentalsAction";
import PaymentsAction from "../../_actions/paymentsAction";

interface Rental {
  id: string;
  move_in_date: string;
  message: string;
  status: string;
  createdAt: string;
  property: {
    id: string;
    titles: string;
  };
  payments: unknown[];
}

const TenantDashboard = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const rentalResult = await RentalsAction();
        const paymentResult = await PaymentsAction();

        if (rentalResult.success) {
          setRentals(rentalResult.data.data || []);
        } else {
          toast.error(rentalResult.message);
        }

        if (paymentResult.success) {
          setPayments(paymentResult.data.data || []);
        } else {
          toast.error(paymentResult.message);
        }
      } catch {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  const pendingRentals = rentals.filter(
    (rental) => rental.status === "PENDING"
  ).length;

  const approvedRentals = rentals.filter(
    (rental) => rental.status === "APPROVED"
  ).length;

  const cancelledRentals = rentals.filter(
    (rental) => rental.status === "CANCELLED"
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tenant Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          View your rental requests and payment history.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Total Rental Requests
          </h2>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : rentals.length}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Pending Requests
          </h2>
          <p className="mt-2 text-3xl font-bold text-orange-600">
            {loading ? "Loading..." : pendingRentals}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Approved Requests
          </h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {loading ? "Loading..." : approvedRentals}
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Total Payments
          </h2>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : payments.length}
          </p>
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-semibold">Rental Request History</h2>
            <p className="text-sm text-muted-foreground">
              Track your property rental requests.
            </p>
          </div>
        </div>

        {loading ? (
          <p className="p-5 text-sm text-muted-foreground">
            Loading rental history...
          </p>
        ) : rentals.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">
            You haven't made any rental requests yet.
          </p>
        ) : (
          <div className="divide-y">
            {rentals.map((rental) => (
              <div
                key={rental.id}
                className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-semibold">
                    {rental.property.titles}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Move-in:{" "}
                    {new Date(rental.move_in_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Requested:{" "}
                    {new Date(rental.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      rental.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : rental.status === "APPROVED"
                          ? "bg-blue-100 text-blue-700"
                          : rental.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {rental.status}
                  </span>

                  {rental.status === "APPROVED" && (
                    <Link
                      href={`/dashboard/tenant/requests/${rental.id}/pay`}
                      className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
                    >
                      Pay Now
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between rounded-lg border p-5">
        <div>
          <h2 className="font-semibold">Payment History</h2>
          <p className="text-sm text-muted-foreground">
            View your previous rental payments.
          </p>
        </div>

        <Link
          href="/dashboard/tenant/payments"
          className="text-sm text-primary hover:underline"
        >
          View Payments →
        </Link>
      </div>
    </div>
  );
};

export default TenantDashboard;