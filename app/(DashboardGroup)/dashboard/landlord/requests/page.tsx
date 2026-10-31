"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import LandlordRequestsAction from "@/app/(DashboardGroup)/_actions/landlordRequestsAction";
import UpdateRentalRequestAction from "@/app/(DashboardGroup)/_actions/updateRentalRequestAction";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RentalRequest {
  id: string;
  move_in_date: string;
  message: string;
  status: "PENDING" | "APPROVED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  tenant: {
    name: string;
  };
  property: {
    id: string;
    titles: string;
  };
  payments: unknown[];
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);

    const result = await LandlordRequestsAction();

    if (result.success) {
      setRequests(result.data.data || []);
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (
    id: string,
    status: "APPROVED" | "CANCELLED"
  ) => {
    const actionText = status === "APPROVED" ? "approve" : "cancel";

    if (!window.confirm(`Are you sure you want to ${actionText} this request?`)) {
      return;
    }

    setUpdatingId(id);

    const result = await UpdateRentalRequestAction(id, status);

    if (result.success) {
      toast.success(
        status === "APPROVED"
          ? "Rental request approved"
          : "Rental request cancelled"
      );

      await fetchRequests();
    } else {
      toast.error(result.message);
    }

    setUpdatingId(null);
  };

  const getStatusBadge = (status: RentalRequest["status"]) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Pending
          </Badge>
        );

      case "APPROVED":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Approved
          </Badge>
        );

      case "CANCELLED":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Cancelled
          </Badge>
        );

      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="p-6">Loading rental requests...</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Rental Requests</h1>
        <p className="text-sm text-muted-foreground">
          Manage rental requests for your properties.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{requests.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {requests.filter((item) => item.status === "PENDING").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {requests.filter((item) => item.status === "APPROVED").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="font-semibold">No rental requests yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Requests from tenants will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardContent className="space-y-4 p-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {request.property.titles}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Tenant: {request.tenant.name}
                    </p>
                  </div>

                  {getStatusBadge(request.status)}
                </div>

                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground">Move-in date</p>
                    <p className="font-medium">
                      {new Date(request.move_in_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Request date</p>
                    <p className="font-medium">
                      {new Date(request.createdAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                    Tenant message
                  </p>
                  <p className="rounded-md bg-muted p-3 text-sm">
                    {request.message || "No message provided"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    Payments: {request.payments.length}
                  </p>

                  {request.status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        disabled={updatingId === request.id}
                        onClick={() =>
                          handleStatusUpdate(request.id, "CANCELLED")
                        }
                      >
                        Cancel
                      </Button>

                      <Button
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#2f5039] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#243f2d]"
                        disabled={updatingId === request.id}
                        onClick={() =>
                          handleStatusUpdate(request.id, "APPROVED")
                        }
                      >
                        {updatingId === request.id
                          ? "Updating..."
                          : "Approve"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestsPage;