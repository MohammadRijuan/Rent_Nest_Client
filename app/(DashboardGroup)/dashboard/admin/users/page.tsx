
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AllUserAction from "@/app/(DashboardGroup)/_actions/allUserAction";
import UpdateUserAction from "@/app/(DashboardGroup)/_actions/updateUserAction";



type User = {
  id: string;
  name?: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
};

type PendingAction = {
  user: User;
  role: User["role"];
};

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pending, setPending] = useState<PendingAction | null>(null);

  const router = useRouter();

  const loadUsers = useCallback(async () => {
    setLoading(true);

    try {
      const result = await AllUserAction();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      const response = result.data;

      const userList = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setUsers(userList);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const confirmRoleChange = async () => {
    if (!pending || saving) return;

    setSaving(true);

    try {
      const result = await UpdateUserAction(pending.user.id, {
        role: pending.role,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("User role updated successfully");
      setPending(null);

      await loadUsers();
      router.refresh();
    } catch {
      toast.error("Something went wrong while updating the role");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="w-full min-w-0 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            All Users
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View users and manage their account roles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadUsers()}
          disabled={loading}
          className="w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Loading..." : "Refresh users"}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Current Role</th>
                <th className="px-4 py-3 font-medium">Change Role</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium">
                        {user.name || "Unnamed user"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <Select
                        value={user.role}
                        onValueChange={(value) => {
                          const nextRole = value as User["role"];

                          if (nextRole === user.role) return;

                          setPending({
                            user,
                            role: nextRole,
                          });
                        }}
                        disabled={saving}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="TENANT">
                            Tenant
                          </SelectItem>
                          <SelectItem value="LANDLORD">
                            Landlord
                          </SelectItem>
                          <SelectItem value="ADMIN">
                            Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog
        open={!!pending}
        onOpenChange={(open) => {
          if (!open && !saving) {
            setPending(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm role change
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to change{" "}
              <span className="font-medium text-foreground">
                {pending?.user.name || pending?.user.email}
              </span>
              {" "}from{" "}
              <span className="font-medium text-foreground">
                {pending?.user.role}
              </span>
              {" "}to{" "}
              <span className="font-medium text-foreground">
                {pending?.role}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={saving}
              onClick={(event) => {
                event.preventDefault();
                void confirmRoleChange();
              }}
            >
              {saving ? "Updating..." : "Confirm Change"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default AllUsers;
