"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import LandlordPropertiesAction from "../../_actions/landlordPropertiesAction";
import LandlordRequestsAction from "../../_actions/landlordRequestsAction";

const LandlordDashboard = () => {
  const [properties, setProperties] = useState(0);
  const [requests, setRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const propertyResult = await LandlordPropertiesAction();
        const requestResult = await LandlordRequestsAction();

        if (propertyResult.success) {
          const data = propertyResult.data;

          const list = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
              ? data.data
              : Array.isArray(data?.data?.data)
                ? data.data.data
                : [];

          setProperties(list.length);
        }

        if (requestResult.success) {
          const data = requestResult.data;
          const list = Array.isArray(data) ? data : data?.data ?? [];

          setRequests(list.length);
          setPendingRequests(
            list.filter((item: { status: string }) => item.status === "PENDING")
              .length
          );
        }
      } catch {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Landlord Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage your properties and rental requests.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Total Properties
          </h2>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : properties}
          </p>
          <Link
            href="/dashboard/landlord/properties"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Manage Properties →
          </Link>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Total Rental Requests
          </h2>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : requests}
          </p>
          <Link
            href="/dashboard/landlord/requests"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Manage Requests →
          </Link>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Pending Requests
          </h2>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : pendingRequests}
          </p>
          <Link
            href="/dashboard/landlord/requests"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Review Requests →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;