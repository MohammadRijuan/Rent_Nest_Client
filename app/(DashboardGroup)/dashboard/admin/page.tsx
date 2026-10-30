
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import AllUserAction from "../../_actions/allUserAction";
import AdminPropertiesAction from "../../_actions/adminPropertiesAction";
import AdminRentalsAction from "../../_actions/adminRentalsAction";



const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [properties, setProperties] = useState(0);
  const [rentals, setRentals] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const userResult = await AllUserAction();
        const propertyResult = await AdminPropertiesAction();
        const rentalResult = await AdminRentalsAction();

        if (userResult.success) {
          const data = userResult.data;
          const list = Array.isArray(data) ? data : data?.data ?? [];
          setUsers(list.length);
        }

        if (propertyResult.success) {
          const data = propertyResult.data;
          const list = Array.isArray(data) ? data : data?.data ?? [];
          setProperties(list.length);
        }

        if (rentalResult.success) {
          const data = rentalResult.data;
          const list = Array.isArray(data) ? data : data?.data ?? [];
          setRentals(list.length);
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
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage users, properties, and rentals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">Total Users</h2>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : users}
          </p>
          <Link
            href="/dashboard/admin/users"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Manage Users →
          </Link>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">
            Total Properties
          </h2>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : properties}
          </p>
          <Link
            href="/dashboard/admin/properties"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Manage Properties →
          </Link>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="text-sm text-muted-foreground">Total Rentals</h2>
          <p className="mt-2 text-3xl font-bold">
            {loading ? "Loading..." : rentals}
          </p>
          <Link
            href="/dashboard/admin/rentals"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Manage Rentals →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
