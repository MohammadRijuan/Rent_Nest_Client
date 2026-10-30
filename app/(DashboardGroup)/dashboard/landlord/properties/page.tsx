
"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import LandlordPropertiesAction from "@/app/(DashboardGroup)/_actions/landlordPropertiesAction";
import CreatePropertyAction from "@/app/(DashboardGroup)/_actions/createPropertyAction";
import CategoriesAction from "@/app/(DashboardGroup)/_actions/categoriesAction";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

type Category = {
  id: string;
  name: string;
};

const LandlordProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    category_id: "",
    titles: "",
    description: "",
    location: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    status: "AVAILABLE" as "AVAILABLE" | "RENTED",
  });

  const loadProperties = useCallback(async () => {
    setLoading(true);

    try {
      const result = await LandlordPropertiesAction();

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

  const loadCategories = async () => {
    try {
      const result = await CategoriesAction();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setCategories(result.data.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    loadProperties();
    loadCategories();
  }, [loadProperties]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.category_id) {
      toast.error("Please select a category");
      return;
    }

    setSubmitting(true);

    try {
      const result = await CreatePropertyAction({
        category_id: form.category_id,
        titles: form.titles,
        description: form.description,
        location: form.location,
        rent: Number(form.rent),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        amenities: form.amenities,
        status: form.status,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Property created successfully!");

      setOpen(false);

      setForm({
        category_id: "",
        titles: "",
        description: "",
        location: "",
        rent: "",
        bedrooms: "",
        bathrooms: "",
        amenities: "",
        status: "AVAILABLE",
      });

      loadProperties();
    } catch {
      toast.error("Failed to create property");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full min-w-0 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">My Properties</h1>
          <p className="text-sm text-muted-foreground">
            Manage your rental properties.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger >
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              + Add New Property
            </button>
          </DialogTrigger>

          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Property Title
                </label>
                <input
                  required
                  value={form.titles}
                  onChange={(e) =>
                    setForm({ ...form, titles: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Beautiful Apartment"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Category
                </label>
                <select
                  required
                  value={form.category_id}
                  onChange={(e) =>
                    setForm({ ...form, category_id: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2"
                  rows={3}
                  placeholder="Describe your property"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Location
                </label>
                <input
                  required
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Chattogram, Bangladesh"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Monthly Rent (৳)
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.rent}
                    onChange={(e) =>
                      setForm({ ...form, rent: e.target.value })
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Bedrooms
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.bedrooms}
                    onChange={(e) =>
                      setForm({ ...form, bedrooms: e.target.value })
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Bathrooms
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.bathrooms}
                    onChange={(e) =>
                      setForm({ ...form, bathrooms: e.target.value })
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as "AVAILABLE" | "RENTED",
                      })
                    }
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="RENTED">Rented</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Amenities
                </label>
                <textarea
                  required
                  value={form.amenities}
                  onChange={(e) =>
                    setForm({ ...form, amenities: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="WiFi, Parking, Lift, Security"
                  rows={2}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create Property"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border p-5">
        <p className="text-sm text-muted-foreground">Total Properties</p>
        <p className="mt-2 text-3xl font-bold">
          {loading ? "—" : total}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Rent</th>
                <th className="px-4 py-3">Bedrooms</th>
                <th className="px-4 py-3">Bathrooms</th>
                <th className="px-4 py-3">Status</th>
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
                  <td colSpan={7} className="px-4 py-10 text-center">
                    No properties found.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-4 font-medium">
                      {property.titles?.trim()}
                    </td>
                    <td className="px-4 py-4">
                      {property.category?.name || "—"}
                    </td>
                    <td className="px-4 py-4">{property.location}</td>
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

export default LandlordProperties;
