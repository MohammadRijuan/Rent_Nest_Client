
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import RentalsAction from "../../../_actions/rentalsAction";

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
  payments: {
    id: string;
    status: string;
  }[];
}

const AllRequests = () => {
  const [requests, setRequests] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const result = await RentalsAction();

        if (result.success) {
          setRequests(result.data.data || []);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Rental requests error:", error);
        toast.error("Failed to load rental requests");
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, []);

  // Display rejected requests as cancelled.
  const getDisplayStatus = (status: string) => {
    if (status === "REJECTED") {
      return "CANCELLED";
    }

    return status;
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "APPROVED":
        return "bg-blue-100 text-blue-700";

      case "CANCELLED":
      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusMessage = (status: string, isPaid: boolean) => {
    switch (status) {
      case "PENDING":
        return "Your request is waiting for landlord approval.";

      case "APPROVED":
        return isPaid
          ? "Your payment has been completed successfully."
          : "Your request has been approved. You can now proceed with payment.";

      case "REJECTED":
      case "CANCELLED":
        return "Your rental request has been cancelled.";

      default:
        return "Check your rental request status.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">My Rental Requests</h1>
        <p className="text-sm text-muted-foreground">
          View and track all your rental requests.
        </p>
      </div>

      {/* Requests Container */}
      <div className="rounded-lg border">
        <div className="border-b p-5">
          <h2 className="font-semibold">All Requests</h2>

          <p className="text-sm text-muted-foreground">
            {requests.length} rental requests found
          </p>
        </div>

        {loading ? (
          <p className="p-5 text-sm text-muted-foreground">
            Loading requests...
          </p>
        ) : requests.length === 0 ? (
          <div className="p-10 text-center">
            <h3 className="font-semibold">
              No rental requests found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              You haven't requested any properties yet.
            </p>

            <Link
              href="/properties"
              className="mt-4 inline-block text-sm text-primary hover:underline"
            >
              Browse Properties →
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {requests.map((request) => {
              const isPaid = request.payments?.some(
                (payment) => payment.status === "SUCCESS"
              );

              const displayStatus = getDisplayStatus(
                request.status
              );

              return (
                <div
                  key={request.id}
                  className="space-y-4 p-5"
                >
                  {/* Property and Status */}
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-semibold">
                        {request.property?.titles || "Property"}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Requested on:{" "}
                        {new Date(
                          request.createdAt
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        displayStatus
                      )}`}
                    >
                      {displayStatus}
                    </span>
                  </div>

                  {/* Request Details */}
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <p className="text-muted-foreground">
                        Move-in Date
                      </p>

                      <p className="font-medium">
                        {new Date(
                          request.move_in_date
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">
                        Payments
                      </p>

                      <p className="font-medium">
                        {request.payments?.length || 0}
                      </p>
                    </div>
                  </div>

                  {/* Tenant Message */}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Your Message
                    </p>

                    <p className="mt-1 rounded-md bg-muted p-3 text-sm">
                      {request.message || "No message provided"}
                    </p>
                  </div>

                  {/* Status Information */}
                  <div
                    className={`rounded-md p-3 text-sm ${
                      request.status === "PENDING"
                        ? "bg-yellow-50 text-yellow-800"
                        : request.status === "APPROVED"
                          ? "bg-blue-50 text-blue-800"
                          : "bg-red-50 text-red-800"
                    }`}
                  >
                    {getStatusMessage(
                      request.status,
                      isPaid
                    )}
                  </div>

                  {/* Payment Action */}
                  {request.status === "APPROVED" &&
                    (isPaid ? (
                      <span className="inline-block rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                        Paid ✓
                      </span>
                    ) : (
                      <Link
                        href={`/dashboard/tenant/requests/${request.id}/pay`}
                        className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        Pay Now →
                      </Link>
                    ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
