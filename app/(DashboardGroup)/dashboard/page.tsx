import { getProfile } from "@/app/(PublicGroup)/_actions/profileAction";
import { redirect } from "next/navigation";


export default async function DashboardPage() {
  const result = await getProfile();

  if (!result.success || !result.user) {
    redirect("/login");
  }

  switch (result.user.role?.toUpperCase()) {
    case "TENANT":
      redirect("/dashboard/tenant");

    case "LANDLORD":
      redirect("/dashboard/landlord");

    case "ADMIN":
      redirect("/dashboard/admin");

    default:
      redirect("/login");
  }
}