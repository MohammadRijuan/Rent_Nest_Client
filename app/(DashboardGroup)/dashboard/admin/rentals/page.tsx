
"use client";

import AdminRentalsAction from "@/app/(DashboardGroup)/_actions/adminRentalsAction";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";



type Rental = {
  id: string;
  status?: string;
  createdAt?: string;
  startDate?: string;
  endDate?: string;
  tenant?: {
    name?: string;
    email?: string;
  };
  user?: {
    name?: string;
    email?: string;
  };
  property?: {
    titles?: string;
    name?: string;
    address?: string;
    location?: string;
    rent?: number;
    price?: number;
  };
};

const AdminRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRentals = useCallback(async () => {
    setLoading(true);

    try {
      const result = await AdminRentalsAction();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      const response = result.data;

      

      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

          console.log(list)

      setRentals(list);
    } catch {
      toast.error("Failed to load rentals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRentals();
  }, [loadRentals]);

  const formatDate = (date?: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString();
  };

  return (
    <section className="w-full min-w-0 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            All Rentals
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor rental records across RentNest.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadRentals()}
          disabled={loading}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh rentals"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">
            Total rentals
          </p>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "—" : rentals.length}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">
            Confirmed rentals
          </p>
          <p className="mt-2 text-3xl font-bold">
            {loading
              ? "—"
              : rentals.filter(
                  (rental) =>
                    rental.status?.toUpperCase() === "CONFIRMED"
                ).length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Rental ID</th>
                <th className="px-4 py-3 font-medium">Tenant</th>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Rent</th>
                <th className="px-4 py-3 font-medium">Start date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    Loading rentals...
                  </td>
                </tr>
              ) : rentals.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No rental records found.
                  </td>
                </tr>
              ) : (
                rentals.map((rental) => {
                  const tenant = rental.tenant || rental.user;
                  const property = rental.property;
                  const rent = property?.rent ?? property?.price;

                  console.log(property)

                  return (
                    <tr
                      key={rental.id}
                      className="border-t hover:bg-muted/30"
                    >
                      <td className="px-4 py-4 font-medium">
                        {rental.id}
                      </td>

                      <td className="px-4 py-4">
                        <p>{tenant?.name || "Unknown tenant"}</p>
                        <p className="text-xs text-muted-foreground">
                          {tenant?.email || ""}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p>
                          {property?.titles ||
                            property?.name ||
                            "Unknown property"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {property?.address ||
                            property?.location ||
                            ""}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        {rent != null
                          ? `৳${rent.toLocaleString()}`
                          : "—"}
                      </td>

                      <td className="px-4 py-4">
                        {formatDate(
                          rental.startDate || rental.createdAt
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
                          {rental.status || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminRentals;
