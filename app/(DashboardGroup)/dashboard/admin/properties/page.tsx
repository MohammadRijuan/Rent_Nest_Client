
"use client";

import AdminPropertiesAction from "@/app/(DashboardGroup)/_actions/adminPropertiesAction";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type Property = {
  id: string;
  titles: string;
  location: string;
  rent: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  category?: {
    name: string;
  };
};

const AdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadProperties = useCallback(async () => {
    setLoading(true);

    try {
      const result = await AdminPropertiesAction();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      const response = result.data.data;
      setProperties(response.data);
      setTotal(response.meta.total);
    } catch {
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProperties();
  }, [loadProperties]);

  return (
    <section className="w-full min-w-0 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            All Properties
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View properties listed on RentNest.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadProperties()}
          disabled={loading}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh properties"}
        </button>
      </div>

      <div className="rounded-xl border p-5">
        <p className="text-sm text-muted-foreground">
          Total properties
        </p>
        <p className="mt-2 text-3xl font-bold">
          {loading ? "—" : total}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Rent</th>
                <th className="px-4 py-3 font-medium">Bedrooms</th>
                <th className="px-4 py-3 font-medium">Bathrooms</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center">
                    Loading properties...
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No properties found.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr
                    key={property.id}
                    className="border-t hover:bg-muted/30"
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium">{property.titles}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        ID: {property.id}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      {property.category?.name || "—"}
                    </td>

                    <td className="px-4 py-4">
                      {property.location || "—"}
                    </td>

                    <td className="px-4 py-4">
                      ৳{Number(property.rent).toLocaleString("en-BD")}
                    </td>

                    <td className="px-4 py-4">{property.bedrooms}</td>

                    <td className="px-4 py-4">{property.bathrooms}</td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs">
                        {property.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminProperties;
